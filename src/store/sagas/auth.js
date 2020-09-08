import { put, delay } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFULtievqpoWAxtt7NZ2Ja1cfjKoE03_s";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFULtievqpoWAxtt7NZ2Ja1cfjKoE03_s";
  }
  
  try {
    const response = yield axios.post(url, authData);

    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", localId);
    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.checkAuthTimeout(expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
  
}
