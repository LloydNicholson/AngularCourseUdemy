import { Action } from '@ngrx/store';

export const TRY_SIGN_UP = '[AUTH] TRY_SIGN_UP';
export const TRY_SIGN_IN = '[AUTH] TRY_SIGN_IN';
export const SIGN_UP = '[AUTH] SIGN_UP';
export const SIGN_IN = '[AUTH] SIGN_UP';
export const LOGOUT = '[AUTH] LOG_OUT';
export const SET_TOKEN = '[AUTH] SET_TOKEN';

export class TrySignUp implements Action {
  readonly type = TRY_SIGN_UP;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGN_IN;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {
  }
}


export type AuthActions = SignUp | SignIn | Logout | SetToken | TrySignUp | TrySignIn;
