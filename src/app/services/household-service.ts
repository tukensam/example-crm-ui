import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddHouseholdInterface,
  HouseholdInterface
} from '../interfaces';
import { API_ADDRESS, OPTIONS } from './services.constants';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private http = inject(HttpClient);
  households: HouseholdInterface[] = [];

  public async getAllHouseholds() {
    const data = await fetch(API_ADDRESS + '/households');
    const json = await data.json();
    for (let result of json) {
      this.households.push(result);
    }
    return this.households;
  }

  public addHousehold(newHousehold: AddHouseholdInterface): Observable<HouseholdInterface> {
    return this.http.post(
      API_ADDRESS + '/households', newHousehold, OPTIONS
    ) as Observable<HouseholdInterface>;
  }

  public deleteHousehold(id: string): Observable<HouseholdInterface> {
    return this.http.delete(
      API_ADDRESS + `/households/${id}`
    ) as Observable<HouseholdInterface>;
  }

  public makePrimaryUser(userId: string, householdId: string): Observable<HouseholdInterface> {
    return this.http.put(
      API_ADDRESS + `/households/${householdId}/addPrimaryUser/${userId}`,
      OPTIONS
    ) as Observable<HouseholdInterface>;
  }
}