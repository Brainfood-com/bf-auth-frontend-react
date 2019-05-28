import flow from 'lodash/flow'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import PersonIcon from '@material-ui/icons/Person'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Enum from 'es6-enum'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EventListener from 'react-event-listener'
import NewWindow from 'react-new-window'
import Timer from 'react-compound-timer'

import thunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider, connect} from 'react-redux'

const AuthContext = React.createContext()

const ACTIONS = Enum(
  'AUTH_CONFIG',
  'AUTH_READY',
  'AUTH_ME',
  'AUTH_ERROR',
  'AUTH_LOGIN',
  'AUTH_LOGIN_CANCEL',
  'AUTH_LOGOUT',

  'AUTH_LOGIN_PROVIDER',
  'AUTH_LOGIN_PROVIDERS',

  'AUTH_SESSION_TIME',

  'AUTH_PROVIDER_ROLES',
)

const defaultState = {
  config: {
    authBase: process.env.AUTH_BASE,
  },
  ready: false,
  me: null,
  e: null,
  login: false,
  providers: [],
  provider: null,
  providerRoles: {},

  timerId: null,
  timeLeft: null,
  currentTime: null,
}
export function reducer(state = defaultState, action) {
  switch (action.type) {
    case ACTIONS.AUTH_READY:
      state = {...state, ready: true}
      break
    case ACTIONS.AUTH_CONFIG:
      state = {...state, config: {...state.config, ...action.config}}
      break
    case ACTIONS.AUTH_ME:
      state = {...state, me: action.me}
      break
    case ACTIONS.AUTH_ERROR:
      state = {...state, e: action.e}
      break
    case ACTIONS.AUTH_LOGIN:
      state = {...state, login: true, providers: []}
      break
    case ACTIONS.AUTH_LOGIN_CANCEL:
      state = {...state, login: false, providers: [], provider: null}
      break
    case ACTIONS.AUTH_LOGIN_PROVIDERS:
      state = {...state, providers: action.providers}
      break
    case ACTIONS.AUTH_LOGIN_PROVIDER:
      state = {...state, provider: action.provider}
      break
    case ACTIONS.AUTH_LOGIN_PROVIDER:
      state = {...state, provider: action.provider}
      break
    case ACTIONS.AUTH_SESSION_TIME:
      state = {...state, timerId: action.timerId, timeLeft: action.timeLeft, currentTime: action.currentTime}
      break
    case ACTIONS.AUTH_PROVIDER_ROLES: {
      state = {...state, providerRoles: Object.entries(action.providerRoles).reduce((result, [name, roles]) => {
        if (roles === null) {
          if (result[name]) {
            result = {...result}
            delete result[name]
          }
        } else if (JSON.stringify(result[name]) !== JSON.stringify(roles)) {
          result = {...result, [name]: roles}
        }
        return result
      }, state.providerRoles)}
      break
    }
    default:
      return state
  }
  console.log('Auth:reducer', action, state)
  return state
}

const enhancer = compose(
  applyMiddleware(thunk),
)
const store = createStore(
  combineReducers({
    auth: reducer,
  }),
  compose(applyMiddleware(thunk)),
)
  
const authTryCatch = handler => {
  return async (dispatch, getState) => {
    try {
      return handler(dispatch, getState)
    } catch(e) {
      console.error(e)
      dispatch({type: ACTIONS.AUTH_ERROR, e})
    }
  }
}
const authFetch = (dispatch, getState, path) => {
  const {auth: {config: {authBase}}} = getState()
  return fetch(`${authBase}${path}`, {
      credentials: 'include',
      headers: {
        accept: 'application/json',
				pragma: 'no-cache',
				'cache-control': 'no-cache',
      },
  }).then(data => data.json())
}

const authConfig = config => {type: ACTIONS.AUTH_CONFIG, config}
const authUserMe = () => authTryCatch((dispatch, getState) => {
  return authFetch(dispatch, getState, '/auth/me').then(me => {
    dispatch({type: ACTIONS.AUTH_ME, me})
  })
})

const authLoginCancel = () => ({type: ACTIONS.AUTH_LOGIN_CANCEL})
const authLogin = () => authTryCatch((dispatch, getState) => {
  dispatch({type: ACTIONS.AUTH_LOGIN})
  return authFetch(dispatch, getState, '/auth/login?target=window').then(providers => {
    dispatch({type: ACTIONS.AUTH_LOGIN_PROVIDERS, providers})
  })
})

const authLogout = () => authTryCatch((dispatch, getState) => {
  return authFetch(dispatch, getState, '/auth/logout').then(() => {
    dispatch({type: ACTIONS.AUTH_LOGOUT})
    dispatch(authUserMe())
  })
})

const authLoginProvider = provider => (dispatch, getState) => {
  dispatch({type: ACTIONS.AUTH_LOGIN_PROVIDER, provider})
}

const authProviderDone = () => (dispatch, getState) => {
  dispatch({type: ACTIONS.AUTH_LOGIN_CANCEL})
  dispatch(authUserMe())
  dispatch(authIsSessionActive())
}

const authIsSessionActive = () => authTryCatch(async (dispatch, getState) => {
  const foo = getState().auth
  const isSessionActiveResult = await authFetch(dispatch, getState, `/auth/isSessionActive?foo=${foo.currentTime}&bar=${foo.timeLeft}`)
  const {isSessionActive} = isSessionActiveResult
  const {auth: {timerId}} = getState()
  if (timerId) {
    clearTimeout(timerId)
  }
  const currentTime = Date.now()
  let whenToCheck
  if (isSessionActive > 5*60*1000) {
    // more than 5m
    whenToCheck = isSessionActive - 5*60*1000
  } else if (isSessionActive > 1*60*1000) {
    // between 1m and 5m
    whenToCheck = isSessionActive - 1*60*1000
  } else if (isSessionActive > 5*1000) {
    // between 5s and 1m
    whenToCheck = isSessionActive - 5*1000
  } else if (isSessionActive) {
    whenToCheck = isSessionActive
  }
  const newTimerId = whenToCheck && whenToCheck >= 0 ? setTimeout(() => dispatch(authIsSessionActive()), whenToCheck) : null
  dispatch({type: ACTIONS.AUTH_SESSION_TIME, currentTime, timeLeft: isSessionActive, timerId: newTimerId})
  if (!whenToCheck || whenToCheck <= 0) {
    dispatch(authUserMe())
  }
})

const authTouchSession = () => authTryCatch(async (dispatch, getState) => {
  const touch = await authFetch(dispatch, getState, '/auth/isSessionActive?touch=true')
  dispatch(authIsSessionActive())
  dispatch(authUserMe())
})

const authPick = (...picked) => Component => {
  const mapDispatchToProps = {}
  for (const pick of picked) {
    switch (pick) {
      case 'extend-session':
        mapDispatchToProps.handleTouchSession = authTouchSession
        break
      case 'me':
        break
      case 'login':
        mapDispatchToProps.handleLoginRequest = authLogin
        break
      case 'logout':
        mapDispatchToProps.handleLogoutRequest = authLogout
        break
      case 'dialog':
        mapDispatchToProps.handleLoginCancel = authLoginCancel
        mapDispatchToProps.handleLoginProvider = authLoginProvider
        break
      case 'popup':
        mapDispatchToProps.handleAuthProviderDone = authProviderDone
        break
      case 'time':
        break
    }
  }
  function mapStateToProps(store, props) {
    const {auth} = store
    const result = {}
    for (const pick of picked) {
      switch (pick) {
        case 'me':
          result.me = auth.me
          break
        case 'ready':
          result.authReady = auth.ready
          break
        case 'login':
          break
        case 'logout':
          break
        case 'dialog':
          result.login = auth.login
          result.providers = auth.providers
          result.provider = auth.provider
          break
        case 'popup':
          result.provider = auth.provider
          result.authBase = auth.config.authBase
          break
        case 'time':
          result.currentTime = auth.currentTime
          result.timeLeft = auth.timeLeft
          break
      }
    }
    return result
  }
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps, null, {context: AuthContext})(Component)
  return props => <Provider context={AuthContext} store={store}><ConnectedComponent {...props}/></Provider>
}

class AuthAvatar extends React.Component {
  render() {
    const {me} = this.props
    console.log('Auth:AuthAvatar', me)
    if (me && me.profilePic) {
      return <Avatar src={me.profilePic}/>
    } else {
      return <PersonIcon/>
    }
  }
}

const loginStyles = {}
const LoginButton = withStyles(loginStyles)(class LoginButton extends React.Component {
  static defaultProps = {
    handleLoginRequest() {},
  }

  render() {
    const {classes, children, me, handleLoginRequest} = this.props
    console.log('Auth:LoginButton', me)
    if (me && me.userId !== undefined) {
      return <React.Fragment />
    }
    return <Button className={classes.loginIcon} color="inherit" onClick={handleLoginRequest}>
      {children}
    </Button>
  }
})

const logoutStyles = {}
const LogoutButton = withStyles(logoutStyles)(class LogoutButton extends React.Component {
  static defaultProps = {
    handleLogoutRequest() {},
  }

  render() {
    const {classes, children, me, handleLogoutRequest} = this.props
    console.log('Auth:LogoutButton', me)
    if (me && me.userId !== undefined) {
      return <Button className={classes.loginIcon} color="inherit" onClick={handleLogoutRequest}>
        {children}
      </Button>
    }
    return <React.Fragment />
  }
})

class AuthSecurityWrapper extends React.Component {
  static defaultProps = {
    authReady: false,
    me: null,
    handleLoginRequest() {},

    autoLogin: false,
    authDenied: <div><h1>Denied!</h1></div>,
  }

  state = {}

  static getDerivedStateFromProps(props, state) {
    const newState = {}
    const {authReady, me, autoLogin} = props
    if (authReady) {
      if (!me || me.userId === undefined) {
        if (autoLogin) {
          props.handleLoginRequest()
        }
      }
    }
    return newState
  }

  render() {
    const {me, autoLogin, authDenied, children} = this.props

    console.log('Auth:AuthSecurityWrapper', me, children)
    if (me && me.userId !== undefined) {
      return children
    }
    if (autoLogin) {
      return <div/>
    } else {
      return authDenied
    }
  }
}

class LoginHandlers extends React.Component {
  static defaultProps = {
    me: null,

    onLoggedIn(user) {}
  }

  state = {}

  static getDerivedStateFromProps(props, state) {
    // data
    const {me} = props
    // handlers
    const {onLoggedIn} = props
    onLoggedIn(me)
  }

  render() {
    return <div/>
  }
}

class LoginPopup extends React.Component {
  static defaultProps = {
    authBase: null,
    provider: null,
    handleAuthProviderDone() {},
    features: {
      width: 640,
      height: 480,
    },
  }

  handleOnMessage = event => {
    console.log('Auth:LoginPopup:handleOnMessage', event)
    if (event && event.data == 'authProviderDone') {
      this.props.handleAuthProviderDone()
    }
  }

  render() {
    const {authBase, provider, features} = this.props
    console.log('Auth:LoginPopup', provider)
    if (provider) {
      return <div>
        <EventListener target={window} onMessage={this.handleOnMessage}>
          <NewWindow url={`${authBase}${provider.href}`} features={features}/>
        </EventListener>
      </div>
    } else {
      return <div/>
    }
  }
}

class LoginProviders extends React.Component {
  static defaultProps = {
    handleLoginProvider(provider) {},
    providers: [],
  }

  render() {
    const {providers, handleLoginProvider} = this.props
    console.log('Auth:LoginProviders', providers)

    return <List>
      {providers.map(provider => {
        const {name, href, logo, title} = provider
        return <ListItem key={name} button onClick={() => handleLoginProvider(provider)}>
          <ListItemIcon><img width="64" height="64" src={logo}/></ListItemIcon>
          <ListItemText primary={title} secondary={name}/>
        </ListItem>
      })}
    </List>
  }
}

class LoginDialog extends React.Component {
  static defaultProps = {
    handleLoginCancel() {},
    handleLoginProvider(provider) {},
    login: false,
    providers: [],
    provider: null,
  }

  render() {
    const {login, providers, provider, handleLoginCancel, handleLoginProvider} = this.props
    console.log('Auth:LoginDialog', login, providers, provider)

    if (login) {
      if (provider) {
        // FIXME: don't use Dialog just to prevent global input
        return <Dialog open={true}>
        </Dialog>
      } else {
        return <Dialog open={true} onClose={handleLoginCancel}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <List>
              {providers.map(provider => {
                const {name, href, logo, title} = provider
                return <ListItem key={name} button onClick={() => handleLoginProvider(provider)}>
                  <ListItemIcon><img width="64" height="64" src={logo}/></ListItemIcon>
                  <ListItemText primary={title} secondary={name}/>
                </ListItem>
              })}
            </List>
          </DialogContent>
        </Dialog>
      }
    } else {
      return <React.Fragment/>
    }
  }
}

class AuthTimeoutDialog extends React.Component {
  static defaultProps = {
    me: null,
    currentTime: null,
    timeLeft: null,
    handleTouchSession() {
      debugger
    },

    title: 'Session is about to expire!',
  }

  render() {
    const {me, currentTime, timeLeft, handleTouchSession, title, children} = this.props

    console.log('AuthTimeoutDialog', timeLeft, handleTouchSession, children)
    if (!me || me.userId === undefined || !timeLeft || timeLeft === 0) {
      return <div />
    }
    return <Dialog open={true} onClose={handleTouchSession}>
      <DialogTitle>{title} (me:{JSON.stringify(me)})</DialogTitle>
      <DialogContent children={children}/>
    </Dialog>
  }
}

class AuthTimeRemaining extends React.Component {
  static defaultProps = {
    me: null,
    currentTime: null,
    timeLeft: null,
  }

  timerRef = React.createRef()

  componentDidUpdate() {
    const {timerRef: {current: timer}} = this
    console.log('componentDidUpdate', timer, this.props)
    if (timer) {
      //timer.reset()
      timer.setTime(this.props.timeLeft)
      console.log('======= STARTING A')
      timer.start()
    }
  }

  componentDidMount() {
    const {timerRef: {current: timer}} = this
    console.log('componentDidMount', timer, this.props)
    if (timer) {
      console.log('======= STARTING B')
      timer.start()
    }
  }

  render() {
    const {me, currentTime, timeLeft} = this.props

    if (!me || me.userId === undefined || !timeLeft || timeLeft === 0) {
      return <div/>
    }

    console.log('AuthTimeRemaining:render', currentTime, timeLeft)
    return <Timer ref={this.timerRef} startImmediately={true} initialTime={timeLeft} direction='backward'>{() => <React.Fragment>
      <Timer.Days/> days
      <Timer.Hours/> hours
      <Timer.Minutes/> minutes
      <Timer.Seconds/> seconds
      <Timer.Milliseconds/> milliseconds
    </React.Fragment>}
    </Timer>
    /*
      <Timer.Consumer>{timerProps => {
        const {d, m, h, s, ms, formatValue} = timerProps
        if (d > 1) {
          return <Typography>{formatValue(d)} days</Typography>
        } else if (d) {
          return <Typography>{formatValue(d)} day</Typography>
        } else if (h > 1) {
          return <Typography>{formatValue(h)} hours</Typography>
        } else if (h) {
          return <Typography>{formatValue(h)} hour</Typography>
        } else if (m > 1) {
          return <Typography>{formatValue(m)} minutes</Typography>
        } else if (m) {
          return <Typography>{formatValue(m)} minute</Typography>
        } else if (s > 1) {
          return <Typography>{formatValue(s)} seconds</Typography>
        } else if (s || ms) {
          return <Typography>{formatValue(s)} second</Typography>
        } else if (ms) {
          return <Typography>{formatValue(s)} seconds</Typography>
        } else {
          return null
        }
      }}</Timer.Consumer>

        {formatValue(d)} days
        {formatValue(h)} hours
        {formatValue(m)} minutes
        {formatValue(s)} seconds
        {formatValue(ms)} milliseconds
        <Typography>Click anywhere to continue</Typography>
      </DialogContent>
      */
  }
}

store.dispatch(async (dispatch, getState) => {
  await dispatch(authUserMe())
  await dispatch(authIsSessionActive())
  dispatch({type: ACTIONS.AUTH_READY})
})
export default {
  AuthAvatar: authPick('me')(AuthAvatar),
  AuthSecurityWrapper: authPick('login', 'logout', 'me')(AuthSecurityWrapper),
  LogoutButton: authPick('logout', 'me')(LogoutButton),
  LoginButton: authPick('login', 'me')(LoginButton),
  LoginDialog: authPick('dialog')(LoginDialog),
  LoginHandlers: authPick('me')(LoginHandlers),
  LoginPopup: authPick('popup')(LoginPopup),
  AuthTimeoutDialog: authPick('extend-session', 'me', 'time')(AuthTimeoutDialog),
  AuthTimeRemaining: authPick('extend-session', 'me', 'time')(AuthTimeRemaining),
}


