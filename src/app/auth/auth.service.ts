import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      'https://api.angular-email.com/auth/username', { username }
    );
  }
}



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