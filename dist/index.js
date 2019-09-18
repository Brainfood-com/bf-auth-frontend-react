import "core-js/modules/es.array.iterator";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js/object/keys";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js/instance/map";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/assertThisInitialized";
import _classCallCheck from "@babel/runtime-corejs3/helpers/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/inherits";
import _getIterator from "@babel/runtime-corejs3/core-js/get-iterator";
import _setTimeout from "@babel/runtime-corejs3/core-js/set-timeout";
import _Date$now from "@babel/runtime-corejs3/core-js/date/now";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js/instance/for-each";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js/instance/concat";
import _Promise from "@babel/runtime-corejs3/core-js/promise";
import _JSON$stringify from "@babel/runtime-corejs3/core-js/json/stringify";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _Object$entries from "@babel/runtime-corejs3/core-js/object/entries";
import _reduceInstanceProperty from "@babel/runtime-corejs3/core-js/instance/reduce";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

var _class, _temp, _class2, _temp2;

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context10; _forEachInstanceProperty(_context10 = ownKeys(source, true)).call(_context10, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context11; _forEachInstanceProperty(_context11 = ownKeys(source)).call(_context11, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Enum from 'es6-enum';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventListener from 'react-event-listener';
import NewWindow from 'react-new-window';
import Timer from 'react-compound-timer';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
var AuthContext = React.createContext();
var ACTIONS = Enum('AUTH_CONFIG', 'AUTH_READY', 'AUTH_ME', 'AUTH_ERROR', 'AUTH_LOGIN', 'AUTH_LOGIN_CANCEL', 'AUTH_LOGOUT', 'AUTH_LOGIN_PROVIDER', 'AUTH_LOGIN_PROVIDERS', 'AUTH_SESSION_TIME', 'AUTH_PROVIDER_ROLES', 'AUTH_TOKEN');
var defaultState = {
  config: {
    authBase: process.env.AUTH_BASE
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
  tokens: {}
};
export function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ACTIONS.AUTH_READY:
      state = _objectSpread({}, state, {
        ready: true
      });
      break;

    case ACTIONS.AUTH_CONFIG:
      state = _objectSpread({}, state, {
        config: _objectSpread({}, state.config, {}, action.config)
      });
      break;

    case ACTIONS.AUTH_ME:
      state = _objectSpread({}, state, {
        me: action.me
      });
      break;

    case ACTIONS.AUTH_ERROR:
      state = _objectSpread({}, state, {
        e: action.e
      });
      break;

    case ACTIONS.AUTH_LOGIN:
      state = _objectSpread({}, state, {
        login: true,
        providers: []
      });
      break;

    case ACTIONS.AUTH_LOGIN_CANCEL:
      state = _objectSpread({}, state, {
        login: false,
        providers: [],
        provider: null
      });
      break;

    case ACTIONS.AUTH_LOGIN_PROVIDERS:
      state = _objectSpread({}, state, {
        providers: action.providers
      });
      break;

    case ACTIONS.AUTH_LOGIN_PROVIDER:
      state = _objectSpread({}, state, {
        provider: action.provider
      });
      break;

    case ACTIONS.AUTH_LOGIN_PROVIDER:
      state = _objectSpread({}, state, {
        provider: action.provider
      });
      break;

    case ACTIONS.AUTH_SESSION_TIME:
      state = _objectSpread({}, state, {
        timerId: action.timerId,
        timeLeft: action.timeLeft,
        currentTime: action.currentTime
      });
      break;

    case ACTIONS.AUTH_PROVIDER_ROLES:
      {
        var _context;

        state = _objectSpread({}, state, {
          providerRoles: _reduceInstanceProperty(_context = _Object$entries(action.providerRoles)).call(_context, function (result, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                name = _ref2[0],
                roles = _ref2[1];

            if (roles === null) {
              if (result[name]) {
                result = _objectSpread({}, result);
                delete result[name];
              }
            } else if (_JSON$stringify(result[name]) !== _JSON$stringify(roles)) {
              result = _objectSpread({}, result, _defineProperty({}, name, roles));
            }

            return result;
          }, state.providerRoles)
        });
        break;
      }

    case ACTIONS.AUTH_TOKEN:
      {
        var _state = state,
            tokens = _state.tokens;
        var name = action.name,
            token = action.token;

        if (tokens[name] !== token) {
          var newTokens = _objectSpread({}, tokens);

          if (token === undefined) {
            delete newTokens[name];
          } else {
            newTokens[name] = token;
          }

          state = _objectSpread({}, state, {
            tokens: newTokens
          });
        }

        break;
      }

    default:
      return state;
  }

  console.log('Auth:reducer', action, state);
  return state;
}
var enhancer = compose(applyMiddleware(thunk));
var store = createStore(combineReducers({
  auth: reducer
}), compose(applyMiddleware(thunk)));

var authTryCatch = function authTryCatch(handler) {
  return function (dispatch, getState) {
    return new _Promise(function (resolve, reject) {
      var onCatch = function onCatch(e) {
        console.error(e);
        dispatch({
          type: ACTIONS.AUTH_ERROR,
          e: e
        });
        reject(e);
      };

      try {
        handler(dispatch, getState).then(resolve, onCatch);
      } catch (e) {
        onCatch(e);
      }
    });
  };
};

var authFetch = function authFetch(dispatch, getState, path) {
  var _context2;

  var _getState = getState(),
      authBase = _getState.auth.config.authBase;

  return fetch(_concatInstanceProperty(_context2 = "".concat(authBase)).call(_context2, path), {
    credentials: 'include',
    headers: {
      accept: 'application/json',
      pragma: 'no-cache',
      'cache-control': 'no-cache'
    }
  }).then(function (data) {
    return data.json();
  });
};

var authConfig = function authConfig(config) {
  type: ACTIONS.AUTH_CONFIG, config;
};

var authUserMe = function authUserMe() {
  return authTryCatch(function (dispatch, getState) {
    return authFetch(dispatch, getState, '/auth/me').then(function (me) {
      dispatch({
        type: ACTIONS.AUTH_ME,
        me: me
      });
    });
  });
};

var authLoginCancel = function authLoginCancel() {
  return {
    type: ACTIONS.AUTH_LOGIN_CANCEL
  };
};

var authLogin = function authLogin() {
  return authTryCatch(function (dispatch, getState) {
    dispatch({
      type: ACTIONS.AUTH_LOGIN
    });
    return authFetch(dispatch, getState, '/auth/providers').then(function (providers) {
      dispatch({
        type: ACTIONS.AUTH_LOGIN_PROVIDERS,
        providers: providers
      });
    });
  });
};

var authLogout = function authLogout() {
  return authTryCatch(function (dispatch, getState) {
    return authFetch(dispatch, getState, '/auth/logout').then(function () {
      dispatch({
        type: ACTIONS.AUTH_LOGOUT
      });
      return dispatch(authUserMe());
    });
  });
};

var authLoginProvider = function authLoginProvider(provider) {
  return function (dispatch, getState) {
    dispatch({
      type: ACTIONS.AUTH_LOGIN_PROVIDER,
      provider: provider
    });
  };
};

var authProviderDone = function authProviderDone(redirectTo) {
  return function (dispatch, getState) {
    var _context3;

    dispatch({
      type: ACTIONS.AUTH_LOGIN_CANCEL
    });

    var _getState2 = getState(),
        tokens = _getState2.auth.tokens;

    _forEachInstanceProperty(_context3 = _Object$entries(tokens)).call(_context3, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          name = _ref4[0],
          token = _ref4[1];

      return dispatch({
        type: ACTIONS.AUTH_TOKEN,
        name: name,
        token: token
      });
    });

    if (redirectTo) {
      window.location = redirectTo;
      return;
    }

    return _Promise.all([dispatch(authUserMe()), dispatch(authIsSessionActive())]);
  };
};

var authIsSessionActive = function authIsSessionActive() {
  return authTryCatch(function (dispatch, getState) {
    var _context4;

    var foo = getState().auth;
    return authFetch(dispatch, getState, _concatInstanceProperty(_context4 = "/auth/isSessionActive?foo=".concat(foo.currentTime, "&bar=")).call(_context4, foo.timeLeft)).then(function (isSessionActiveResult) {
      var isSessionActive = isSessionActiveResult.isSessionActive;

      var _getState3 = getState(),
          timerId = _getState3.auth.timerId;

      if (timerId) {
        clearTimeout(timerId);
      }

      var currentTime = _Date$now();

      var whenToCheck;

      if (isSessionActive > 5 * 60 * 1000) {
        // more than 5m
        whenToCheck = isSessionActive - 5 * 60 * 1000;
      } else if (isSessionActive > 1 * 60 * 1000) {
        // between 1m and 5m
        whenToCheck = isSessionActive - 1 * 60 * 1000;
      } else if (isSessionActive > 5 * 1000) {
        // between 5s and 1m
        whenToCheck = isSessionActive - 5 * 1000;
      } else if (isSessionActive) {
        whenToCheck = isSessionActive;
      }

      var newTimerId = whenToCheck && whenToCheck >= 0 ? _setTimeout(function () {
        return dispatch(authIsSessionActive());
      }, whenToCheck) : null;
      dispatch({
        type: ACTIONS.AUTH_SESSION_TIME,
        currentTime: currentTime,
        timeLeft: isSessionActive,
        timerId: newTimerId
      });

      if (!whenToCheck || whenToCheck <= 0) {
        return dispatch(authUserMe());
      }
    });
  });
};

var authTouchSession = function authTouchSession() {
  return authTryCatch(function (dispatch, getState) {
    return authFetch(dispatch, getState, '/auth/isSessionActive?touch=true').then(function () {
      return _Promise.all([dispatch(authIsSessionActive()), dispatch(authUserMe())]);
    });
  });
};

var authPick = function authPick() {
  for (var _len = arguments.length, picked = new Array(_len), _key = 0; _key < _len; _key++) {
    picked[_key] = arguments[_key];
  }

  return function (Component) {
    var mapDispatchToProps = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(picked), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pick = _step.value;

        switch (pick) {
          case 'extend-session':
            mapDispatchToProps.handleTouchSession = authTouchSession;
            break;

          case 'me':
            break;

          case 'login':
            mapDispatchToProps.handleLoginRequest = authLogin;
            break;

          case 'logout':
            mapDispatchToProps.handleLogoutRequest = authLogout;
            break;

          case 'dialog':
            mapDispatchToProps.handleLoginCancel = authLoginCancel;
            mapDispatchToProps.handleLoginProvider = authLoginProvider;
            break;

          case 'popup':
            mapDispatchToProps.handleAuthProviderDone = authProviderDone;
            break;

          case 'time':
            break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    function mapStateToProps(store, props) {
      var auth = store.auth;
      var result = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(picked), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pick = _step2.value;

          switch (pick) {
            case 'me':
              result.me = auth.me;
              break;

            case 'ready':
              result.authReady = auth.ready;
              break;

            case 'login':
              break;

            case 'logout':
              break;

            case 'dialog':
              result.login = auth.login;
              result.providers = auth.providers;
              result.provider = auth.provider;
              break;

            case 'popup':
              result.provider = auth.provider;
              result.authBase = auth.config.authBase;
              break;

            case 'time':
              result.currentTime = auth.currentTime;
              result.timeLeft = auth.timeLeft;
              break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    }

    var ConnectedComponent = connect(mapStateToProps, mapDispatchToProps, null, {
      context: AuthContext
    })(Component);
    return function (props) {
      return React.createElement(Provider, {
        context: AuthContext,
        store: store
      }, React.createElement(ConnectedComponent, props));
    };
  };
};

var AuthAvatar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AuthAvatar, _React$Component);

  function AuthAvatar() {
    _classCallCheck(this, AuthAvatar);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthAvatar).apply(this, arguments));
  }

  _createClass(AuthAvatar, [{
    key: "render",
    value: function render() {
      var me = this.props.me;
      console.log('Auth:AuthAvatar', me);

      if (me && me.profilePic) {
        return React.createElement(Avatar, {
          src: me.profilePic
        });
      } else {
        return React.createElement(PersonIcon, null);
      }
    }
  }]);

  return AuthAvatar;
}(React.Component);

var loginStyles = {};
var LoginButton = withStyles(loginStyles)((_temp = _class =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(LoginButton, _React$Component2);

  function LoginButton() {
    _classCallCheck(this, LoginButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginButton).apply(this, arguments));
  }

  _createClass(LoginButton, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          classes = _this$props.classes,
          children = _this$props.children,
          me = _this$props.me,
          handleLoginRequest = _this$props.handleLoginRequest;
      console.log('Auth:LoginButton', me);

      if (me && me.userId !== undefined) {
        return React.createElement(React.Fragment, null);
      }

      return React.createElement(Button, {
        className: classes.loginIcon,
        color: "inherit",
        onClick: handleLoginRequest
      }, children);
    }
  }]);

  return LoginButton;
}(React.Component), _defineProperty(_class, "defaultProps", {
  handleLoginRequest: function handleLoginRequest() {}
}), _temp));
var logoutStyles = {};
var LogoutButton = withStyles(logoutStyles)((_temp2 = _class2 =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(LogoutButton, _React$Component3);

  function LogoutButton() {
    _classCallCheck(this, LogoutButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(LogoutButton).apply(this, arguments));
  }

  _createClass(LogoutButton, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          children = _this$props2.children,
          me = _this$props2.me,
          handleLogoutRequest = _this$props2.handleLogoutRequest;
      console.log('Auth:LogoutButton', me);

      if (me && me.userId !== undefined) {
        return React.createElement(Button, {
          className: classes.loginIcon,
          color: "inherit",
          onClick: handleLogoutRequest
        }, children);
      }

      return React.createElement(React.Fragment, null);
    }
  }]);

  return LogoutButton;
}(React.Component), _defineProperty(_class2, "defaultProps", {
  handleLogoutRequest: function handleLogoutRequest() {}
}), _temp2));

var AuthSecurityWrapper =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(AuthSecurityWrapper, _React$Component4);

  function AuthSecurityWrapper() {
    var _getPrototypeOf2, _context5;

    var _this;

    _classCallCheck(this, AuthSecurityWrapper);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AuthSecurityWrapper)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context5 = [this]).call(_context5, args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    return _this;
  }

  _createClass(AuthSecurityWrapper, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          me = _this$props3.me,
          autoLogin = _this$props3.autoLogin,
          authDenied = _this$props3.authDenied,
          children = _this$props3.children;
      console.log('Auth:AuthSecurityWrapper', me, children);

      if (me && me.userId !== undefined) {
        return children;
      }

      if (autoLogin) {
        return React.createElement("div", null);
      } else {
        return authDenied;
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newState = {};
      var authReady = props.authReady,
          me = props.me,
          autoLogin = props.autoLogin;

      if (authReady) {
        if (!me || me.userId === undefined) {
          if (autoLogin) {
            props.handleLoginRequest();
          }
        }
      }

      return newState;
    }
  }]);

  return AuthSecurityWrapper;
}(React.Component);

_defineProperty(AuthSecurityWrapper, "defaultProps", {
  authReady: false,
  me: null,
  handleLoginRequest: function handleLoginRequest() {},
  autoLogin: false,
  authDenied: React.createElement("div", null, React.createElement("h1", null, "Denied!"))
});

var LoginHandlers =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(LoginHandlers, _React$Component5);

  function LoginHandlers() {
    var _getPrototypeOf3, _context6;

    var _this2;

    _classCallCheck(this, LoginHandlers);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(LoginHandlers)).call.apply(_getPrototypeOf3, _concatInstanceProperty(_context6 = [this]).call(_context6, args)));

    _defineProperty(_assertThisInitialized(_this2), "state", {});

    return _this2;
  }

  _createClass(LoginHandlers, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // data
      var me = props.me; // handlers

      var onLoggedIn = props.onLoggedIn;
      onLoggedIn(me);
    }
  }]);

  return LoginHandlers;
}(React.Component);

_defineProperty(LoginHandlers, "defaultProps", {
  me: null,
  onLoggedIn: function onLoggedIn(user) {}
});

var LoginPopup =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(LoginPopup, _React$Component6);

  function LoginPopup() {
    var _getPrototypeOf4, _context7;

    var _this3;

    _classCallCheck(this, LoginPopup);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(LoginPopup)).call.apply(_getPrototypeOf4, _concatInstanceProperty(_context7 = [this]).call(_context7, args)));

    _defineProperty(_assertThisInitialized(_this3), "handleOnMessage", function (event) {
      console.log('Auth:LoginPopup:handleOnMessage', event);

      var _ref5 = event || {},
          data = _ref5.data;

      if (!data) {
        return;
      }

      var type = data.type,
          redirectTo = data.redirectTo;

      if (type === 'authProviderDone') {
        _this3.props.handleAuthProviderDone(redirectTo);
      }
    });

    return _this3;
  }

  _createClass(LoginPopup, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          authBase = _this$props4.authBase,
          provider = _this$props4.provider,
          features = _this$props4.features,
          redirectTo = _this$props4.redirectTo;
      console.log('Auth:LoginPopup', provider);

      if (provider) {
        var _context8;

        return React.createElement("div", null, React.createElement(EventListener, {
          target: window,
          onMessage: this.handleOnMessage
        }, React.createElement(NewWindow, {
          url: _concatInstanceProperty(_context8 = "".concat(authBase)).call(_context8, provider.href, "?authView=window"),
          features: features
        })));
      } else if (redirectTo) {
        window.location = redirectTo;
      } else {
        return React.createElement("div", null);
      }
    }
  }]);

  return LoginPopup;
}(React.Component);

_defineProperty(LoginPopup, "defaultProps", {
  authBase: null,
  provider: null,
  redirectTo: null,
  handleAuthProviderDone: function handleAuthProviderDone() {},
  features: {
    width: 640,
    height: 480
  }
});

var LoginProviders =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(LoginProviders, _React$Component7);

  function LoginProviders() {
    _classCallCheck(this, LoginProviders);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginProviders).apply(this, arguments));
  }

  _createClass(LoginProviders, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          providers = _this$props5.providers,
          handleLoginProvider = _this$props5.handleLoginProvider;
      console.log('Auth:LoginProviders', providers);
      return React.createElement(List, null, _mapInstanceProperty(providers).call(providers, function (provider) {
        var name = provider.name,
            href = provider.href,
            logo = provider.logo,
            title = provider.title;
        return React.createElement(ListItem, {
          key: name,
          button: true,
          onClick: function onClick() {
            return handleLoginProvider(provider);
          }
        }, React.createElement(ListItemIcon, null, React.createElement("img", {
          width: "64",
          height: "64",
          src: logo
        })), React.createElement(ListItemText, {
          primary: title,
          secondary: name
        }));
      }));
    }
  }]);

  return LoginProviders;
}(React.Component);

_defineProperty(LoginProviders, "defaultProps", {
  handleLoginProvider: function handleLoginProvider(provider) {},
  providers: []
});

var LoginDialog =
/*#__PURE__*/
function (_React$Component8) {
  _inherits(LoginDialog, _React$Component8);

  function LoginDialog() {
    _classCallCheck(this, LoginDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginDialog).apply(this, arguments));
  }

  _createClass(LoginDialog, [{
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          login = _this$props6.login,
          providers = _this$props6.providers,
          provider = _this$props6.provider,
          handleLoginCancel = _this$props6.handleLoginCancel,
          handleLoginProvider = _this$props6.handleLoginProvider;
      console.log('Auth:LoginDialog', login, providers, provider);

      if (login) {
        if (provider) {
          // FIXME: don't use Dialog just to prevent global input
          return React.createElement(Dialog, {
            open: true
          });
        } else {
          return React.createElement(Dialog, {
            open: true,
            onClose: handleLoginCancel
          }, React.createElement(DialogTitle, null, "Login"), React.createElement(DialogContent, null, React.createElement(List, null, _mapInstanceProperty(providers).call(providers, function (provider) {
            var name = provider.name,
                href = provider.href,
                logo = provider.logo,
                title = provider.title;
            return React.createElement(ListItem, {
              key: name,
              button: true,
              onClick: function onClick() {
                return handleLoginProvider(provider);
              }
            }, React.createElement(ListItemIcon, null, React.createElement("img", {
              width: "64",
              height: "64",
              src: logo
            })), React.createElement(ListItemText, {
              primary: title,
              secondary: name
            }));
          }))));
        }
      } else {
        return React.createElement(React.Fragment, null);
      }
    }
  }]);

  return LoginDialog;
}(React.Component);

_defineProperty(LoginDialog, "defaultProps", {
  handleLoginCancel: function handleLoginCancel() {},
  handleLoginProvider: function handleLoginProvider(provider) {},
  login: false,
  providers: [],
  provider: null
});

var AuthTimeoutDialog =
/*#__PURE__*/
function (_React$Component9) {
  _inherits(AuthTimeoutDialog, _React$Component9);

  function AuthTimeoutDialog() {
    _classCallCheck(this, AuthTimeoutDialog);

    return _possibleConstructorReturn(this, _getPrototypeOf(AuthTimeoutDialog).apply(this, arguments));
  }

  _createClass(AuthTimeoutDialog, [{
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          me = _this$props7.me,
          currentTime = _this$props7.currentTime,
          timeLeft = _this$props7.timeLeft,
          handleTouchSession = _this$props7.handleTouchSession,
          title = _this$props7.title,
          warnThreshold = _this$props7.warnThreshold,
          children = _this$props7.children;
      console.log('AuthTimeoutDialog', timeLeft, handleTouchSession, children);

      if (!me || me.userId === undefined || !timeLeft || timeLeft === 0 || timeLeft >= warnThreshold) {
        return React.createElement("div", null);
      }

      return React.createElement(Dialog, {
        open: true,
        onClose: handleTouchSession
      }, React.createElement(DialogTitle, null, title, " (me:", _JSON$stringify(me), ")"), React.createElement(DialogContent, {
        children: children
      }));
    }
  }]);

  return AuthTimeoutDialog;
}(React.Component);

_defineProperty(AuthTimeoutDialog, "defaultProps", {
  me: null,
  currentTime: null,
  timeLeft: null,
  handleTouchSession: function handleTouchSession() {
    debugger;
  },
  title: 'Session is about to expire!',
  warnThreshold: 5 * 60 * 1000
});

var AuthTimeRemaining =
/*#__PURE__*/
function (_React$Component10) {
  _inherits(AuthTimeRemaining, _React$Component10);

  function AuthTimeRemaining() {
    var _getPrototypeOf5, _context9;

    var _this4;

    _classCallCheck(this, AuthTimeRemaining);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this4 = _possibleConstructorReturn(this, (_getPrototypeOf5 = _getPrototypeOf(AuthTimeRemaining)).call.apply(_getPrototypeOf5, _concatInstanceProperty(_context9 = [this]).call(_context9, args)));

    _defineProperty(_assertThisInitialized(_this4), "timerRef", React.createRef());

    return _this4;
  }

  _createClass(AuthTimeRemaining, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var timer = this.timerRef.current;
      console.log('componentDidUpdate', timer, this.props);

      if (timer) {
        //timer.reset()
        timer.setTime(this.props.timeLeft);
        console.log('======= STARTING A');
        timer.start();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var timer = this.timerRef.current;
      console.log('componentDidMount', timer, this.props);

      if (timer) {
        console.log('======= STARTING B');
        timer.start();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          me = _this$props8.me,
          currentTime = _this$props8.currentTime,
          timeLeft = _this$props8.timeLeft;

      if (!me || me.userId === undefined || !timeLeft || timeLeft === 0) {
        return React.createElement("div", null);
      }

      console.log('AuthTimeRemaining:render', currentTime, timeLeft);
      return React.createElement(Timer, {
        ref: this.timerRef,
        startImmediately: true,
        initialTime: timeLeft,
        direction: "backward"
      }, function () {
        return React.createElement(React.Fragment, null, React.createElement(Timer.Days, null), " days", React.createElement(Timer.Hours, null), " hours", React.createElement(Timer.Minutes, null), " minutes", React.createElement(Timer.Seconds, null), " seconds", React.createElement(Timer.Milliseconds, null), " milliseconds");
      });
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
  }]);

  return AuthTimeRemaining;
}(React.Component);

_defineProperty(AuthTimeRemaining, "defaultProps", {
  me: null,
  currentTime: null,
  timeLeft: null
});

var authReady = store.dispatch(function (dispatch, getState) {
  return _Promise.all([dispatch(authUserMe()), dispatch(authIsSessionActive())]).then(function () {
    dispatch({
      type: ACTIONS.AUTH_READY
    });
  });
});

function authGetToken(name) {
  return store.dispatch(authTryCatch(function (dispatch, getState) {
    return authReady.then(function () {
      var _getState4 = getState(),
          token = _getState4.auth.tokens[name];

      if (token !== undefined) {
        return token;
      }

      return authFetch(dispatch, getState, '/auth/token/' + name).then(function (result) {
        var token = result.token;
        dispatch({
          type: ACTIONS.AUTH_TOKEN,
          name: name,
          token: token
        });
        return token;
      });
    });
  }));
}

export default {
  getToken: authGetToken,
  authReady: authReady,
  AuthAvatar: authPick('me')(AuthAvatar),
  AuthSecurityWrapper: authPick('ready', 'login', 'logout', 'me')(AuthSecurityWrapper),
  LogoutButton: authPick('logout', 'me')(LogoutButton),
  LoginButton: authPick('login', 'me')(LoginButton),
  LoginDialog: authPick('dialog')(LoginDialog),
  LoginHandlers: authPick('me')(LoginHandlers),
  LoginPopup: authPick('popup')(LoginPopup),
  AuthTimeoutDialog: authPick('extend-session', 'me', 'time')(AuthTimeoutDialog),
  AuthTimeRemaining: authPick('extend-session', 'me', 'time')(AuthTimeRemaining)
};
//# sourceMappingURL=index.js.map