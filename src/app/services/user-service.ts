import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddUserInterface,
  UserInterface
} from '../interfaces';
import { API_ADDRESS, OPTIONS } from './services.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  users: UserInterface[] = [];
  
  public async getAllUsers() {
    const data = await fetch(API_ADDRESS + '/users');
    const json = await data.json();
    for (let result of json) {
      this.users.push(result);
    }
    return this.users;
  }

  public addUser(newUser: AddUserInterface): Observable<UserInterface> {
    return this.http.post(
      API_ADDRESS + `/users`, newUser, OPTIONS
    ) as Observable<UserInterface>;
  }

  public deleteUser(userId: string): Observable<UserInterface> {
    return this.http.delete(
      API_ADDRESS + `/users/${userId}`
    ) as Observable<UserInterface>;
  }

  public addUserToHousehold(userId: string, householdId: string): Observable<UserInterface> {
    return this.http.put(
      API_ADDRESS + `/users/${userId}/addToHousehold/${householdId}`,
      OPTIONS
    ) as Observable<UserInterface>;
  }

  public deleteUserFromHousehold(userId: string): Observable<UserInterface> {
    return this.http.put(
      API_ADDRESS + `/users/${userId}/removeFromHousehold`,
      OPTIONS
    ) as Observable<UserInterface>;
  }
}