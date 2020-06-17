import {createStore} from 'redux';
const defaultStateLogin = {
  username: null,
  password: null,
  token: null,
  err: false,
};

const reducer = (state = defaultStateLogin, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return {...state};
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.username,
        password: action.password,
        token: action.token,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        err: true,
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
export default store;
