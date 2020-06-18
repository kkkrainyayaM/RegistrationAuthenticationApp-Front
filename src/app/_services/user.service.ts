import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LogIn} from '../_entities/log-in';
import {SignUp} from '../_entities/sign-up';
import {StatusUpdate} from '../_entities/status-update';

const API_URL = 'http://localhost:8080/api/v1';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(login: LogIn): Observable<any> {
    console.log(login);
    return this.http.post(API_URL + '/authentication', JSON.stringify(login), httpOptions);
  }

  register(user: SignUp): Observable<any> {
    return this.http.post(API_URL + '/users', JSON.stringify(user), httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/users', httpOptions);
  }

  updateStatus(statusUpdate: StatusUpdate): Observable<any> {
    console.log('ids = ' + statusUpdate.ids);
    return this.http.put(API_URL + '/users/status', JSON.stringify(statusUpdate), httpOptions);
  }

  delete(ids): Observable<any> {
    const options = {
      headers: httpOptions.headers,
      body: JSON.stringify(ids),
    };
    console.log('ids delete = ' + ids);
    return this.http.delete(API_URL + '/users', options);
  }
}
