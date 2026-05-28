import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  AddOrganizationInterface,
  OrganizationInterface
} from '../interfaces';
import { API_ADDRESS, OPTIONS } from './services.constants';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private http = inject(HttpClient);
  orgs: OrganizationInterface[] = [];
  // households: HouseholdInterface[] = [];
  // users: UserInterface[] = [];
  // relationships: RelationshipInterface[] = [];

  public async getAllOrganizations() {
    const data = await fetch(API_ADDRESS + '/organizations');
    const json = await data.json();
    for (let result of json) {
      this.orgs.push(result);
    }
    return this.orgs;
  }

  // public async getAllRelationships() {
  //   const data = await fetch(API_ADDRESS + '/relationships');
  //   const json = await data.json();
  //   for (let result of json) {
  //     this.relationships.push(result);
  //   }
  //   return this.relationships;
  // }

  // public deleteUserFromOrganization(orgId: string, userId: string): Observable<UserInterface> {
  //   return this.http.delete(
  //     API_ADDRESS + `/organizations/${orgId}/deleteUser/${userId}`
  //   ) as Observable<UserInterface>;
  // }

  // public async getAllUsers() {
  //   const data = await fetch(API_ADDRESS + '/users');
  //   const json = await data.json();
  //   for (let result of json) {
  //     this.users.push(result);
  //   }
  //   return this.users;
  // }

  // public addUser(newUser: AddUserInterface): Observable<UserInterface> {
  //   return this.http.post(
  //     API_ADDRESS + `/users`, newUser, OPTIONS
  //   ) as Observable<UserInterface>;
  // }

  // public deleteUser(userId: string): Observable<UserInterface> {
  //   return this.http.delete(
  //     API_ADDRESS + `/users/${userId}`
  //   ) as Observable<UserInterface>;
  // }

  // public addUserToHousehold(userId: string, householdId: string): Observable<UserInterface> {
  //   return this.http.put(
  //     API_ADDRESS + `/users/${userId}/addToHousehold/${householdId}`,
  //     OPTIONS
  //   ) as Observable<UserInterface>;
  // }

  // public deleteUserFromHousehold(userId: string): Observable<UserInterface> {
  //   return this.http.put(
  //     API_ADDRESS + `/users/${userId}/removeFromHousehold`,
  //     OPTIONS
  //   ) as Observable<UserInterface>;
  // }

  public addOrganization(newOrganization: AddOrganizationInterface): Observable<OrganizationInterface> {
    return this.http.post(
      API_ADDRESS + '/organizations', newOrganization, OPTIONS
    ) as Observable<OrganizationInterface>;
  }

  public deleteOrganization(id: string): Observable<OrganizationInterface> {
    return this.http.delete(
      API_ADDRESS + `/organizations/${id}`
    ) as Observable<OrganizationInterface>;
  }

  // public async getAllHouseholds() {
  //   const data = await fetch(API_ADDRESS + '/households');
  //   const json = await data.json();
  //   for (let result of json) {
  //     this.households.push(result);
  //   }
  //   return this.households;
  // }

  // public addHousehold(newHousehold: AddHouseholdInterface): Observable<HouseholdInterface> {
  //   return this.http.post(
  //     API_ADDRESS + '/households', newHousehold, OPTIONS
  //   ) as Observable<HouseholdInterface>;
  // }

  // public deleteHousehold(id: string): Observable<HouseholdInterface> {
  //   return this.http.delete(
  //     API_ADDRESS + `/households/${id}`
  //   ) as Observable<HouseholdInterface>;
  // }

  // public addRelationship(addRelationshipInterface: AddRelationshipInterface): Observable<RelationshipInterface> {
  //   return this.http.post(
  //     API_ADDRESS + '/relationships/', addRelationshipInterface, OPTIONS
  //   ) as Observable<RelationshipInterface>;
  // }

  // public deleteRelationship(relationshipId: string): Observable<RelationshipInterface> {
  //   return this.http.delete(
  //     API_ADDRESS + `/relationships/${relationshipId}`
  //   ) as Observable<RelationshipInterface>;
  // }

  // public makePrimaryUser(userId: string, householdId: string): Observable<HouseholdInterface> {
  //   return this.http.put(
  //     API_ADDRESS + `/households/${householdId}/addPrimaryUser/${userId}`,
  //     OPTIONS
  //   ) as Observable<HouseholdInterface>;
  // }
}
