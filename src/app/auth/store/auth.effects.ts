import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';

import * as fromAuthActions from './auth.actions';
import * as firebase from 'firebase';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$
  .pipe(
      ofType(fromAuthActions.TRY_SIGN_UP),
      map((action: fromAuthActions.TrySignUp) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        return [
          { type: fromAuthActions.SIGN_UP },
          { type: fromAuthActions.SET_TOKEN, payload: token }
        ];
      })
  );
  @Effect()
  authSignIn = this.actions$
  .pipe(
      ofType(fromAuthActions.TRY_SIGN_IN),
      map((action: fromAuthActions.TrySignIn) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          { type: fromAuthActions.SIGN_IN },
          { type: fromAuthActions.SET_TOKEN, payload: token }
        ];
      })
  );
  @Effect({ dispatch: false })
  authLogout = this.actions$
  .pipe(
      ofType(fromAuthActions.LOGOUT),
      tap(() => {
        this.router.navigate(['/']);
      })
  );

  constructor(private actions$: Actions, private router: Router) {
  }
}
