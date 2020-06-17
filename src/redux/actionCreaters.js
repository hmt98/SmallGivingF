export function startGetToken() {
  return {type: 'GET_TOKEN'};
}
export function startSetToken() {
  return {type: 'SET_TOKEN'};
}

export function loginSuccess(username, password, token) {
  return {type: 'LOGIN_SUCCESS', username, password, token};
}

export function loginError() {
  return {type: 'LOGIN_ERROR'};
}
