import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';

  //signedin$ = new BehaviorSubject(false);
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
}


/* move to intercepor credentials, {
withCredentials: true
}) */

/* checkAuth() {
  return this.http
    .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap(res => {
        console.log('authenticated : ', res);
      })
    );
}
*/
/* pipe(
  //tap(res => console.log(res)
  map(value => {
    if (value.available) {
      return null
    }
  }),
  catchError(err => {
    console.log(err);
    if (err.error.username) {
      return of({ nonUniqueUsername: true })
    } else {
      return of({ noConnection: true })
    }
  })

) */