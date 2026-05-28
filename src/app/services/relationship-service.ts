import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  AddRelationshipInterface,
  RelationshipInterface
} from '../interfaces';
import { API_ADDRESS, OPTIONS } from './services.constants';

@Injectable({
  providedIn: 'root',
})
export class RelationshipService {
  private http = inject(HttpClient);
  relationships: RelationshipInterface[] = [];

  public async getAllRelationships() {
    const data = await fetch(API_ADDRESS + '/relationships');
    const json = await data.json();
    for (let result of json) {
      this.relationships.push(result);
    }
    return this.relationships;
  }

  public addRelationship(addRelationshipInterface: AddRelationshipInterface): Observable<RelationshipInterface> {
    return this.http.post(
      API_ADDRESS + '/relationships/', addRelationshipInterface, OPTIONS
    ) as Observable<RelationshipInterface>;
  }

  public deleteRelationship(relationshipId: string): Observable<RelationshipInterface> {
    return this.http.delete(
      API_ADDRESS + `/relationships/${relationshipId}`
    ) as Observable<RelationshipInterface>;
  }
}