import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => (
  {
    type: actionTypes.AUTH_START
  }
);

export const authSuccess = (idToken, userId) => (
  {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
);

export const authFail = (error) => (
  {
    type: actionTypes.AUTH_FAIL,
    error
  }
);

export const logout = () => (
  {
    type: actionTypes.AUTH_LOGOUT
  }
)

export const checkAuthTimeout = (expirationTime) => (
  dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }
);

export const auth = (email, password, isSignup) => (
  dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFULtievqpoWAxtt7NZ2Ja1cfjKoE03_s';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFULtievqpoWAxtt7NZ2Ja1cfjKoE03_s'
    }
    axios.post(url, authData)
      .then(response => {
        const { idToken, localId, expiresIn } = response.data;
        console.log(response);
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  }
);