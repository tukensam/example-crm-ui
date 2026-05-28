import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {
  HouseholdInterface,
  OrganizationInterface,
  RelationshipInterface,
  UserInterface
} from '../../interfaces';
import {
  HouseholdService,
  OrganizationService,
  RelationshipService,
  UserService
} from '../../services';

@Component({
  selector: 'app-crm-layout',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSelectModule
  ],
  templateUrl: './crm-layout.html',
  styleUrl: './crm-layout.css',
})
export class CrmLayout {
  HouseholdService = inject(HouseholdService);
  OrganizationService = inject(OrganizationService);
  RelationshipService = inject(RelationshipService);
  UserService = inject(UserService);
  
  households = signal<HouseholdInterface[]>([]);
  organizations = signal<OrganizationInterface[]>([]);
  relationships = signal<RelationshipInterface[]>([]);
  users = signal<UserInterface[]>([]);

  constructor() {
    this.getAllHouseholds();
    this.getAllOrganizations();
    this.getAllRelationships();
    this.getAllUsers();
  }

  /* HOUSEHOLD SERVICE */
  getAllHouseholds() {
    this.HouseholdService.getAllHouseholds().then((households) =>
      this.households.set(households)
    );
  }

  addHousehold(e: Event) {
    e.preventDefault();
    this.HouseholdService.addHousehold(
      {
        name: this.getInputValue("new-household-name")
      }
    ).subscribe((newHousehold) =>
      this.households.set([...this.households(), newHousehold])
    );
  }

  deleteHousehold(e: Event, id: string) {
    e.preventDefault();
    this.HouseholdService.deleteHousehold(id).subscribe(() =>
      this.households.set(
        this.households().filter((household) => id != household.id)
      )
    );
  }

  makePrimaryUser(e: Event, userId: string, householdId: string) {
    e.preventDefault();
    this.HouseholdService.makePrimaryUser(userId, householdId).
    subscribe((updatedHousehold) => {
      const index = this.households().findIndex((household) => householdId == household.id);
      this.households.set([
        ...this.households().slice(0, index),
        updatedHousehold,
        ...this.households().slice(index+1)
      ]);
    });
  }

  /* ORGANIZATION SERVICE */
  getAllOrganizations() {
    this.OrganizationService.getAllOrganizations().then((organizations) =>
      this.organizations.set(organizations)
    );
  }

  addOrganization(e: Event) {
    e.preventDefault();
    this.OrganizationService.addOrganization(
      {
        name: this.getInputValue("new-organization-name")
      }
    ).subscribe((newOrg) =>
      this.organizations.set([...this.organizations(), newOrg])
    )
  }

  deleteOrganization(e: Event, id: string) {
    e.preventDefault();
    this.OrganizationService.deleteOrganization(id)
    .subscribe(() =>
      this.organizations.set(
        this.organizations().filter(org => id != org.id)
      )
    );
  }

  /* RELATIONSHIP SERVICE */
  getAllRelationships() {
    this.RelationshipService.getAllRelationships().then((relationships) =>
      this.relationships.set(relationships)
    );
  }

  addRelationship(e: Event, id: string) {
    e.preventDefault();
    this.RelationshipService.addRelationship(
      {
        sourceUserId: this.getSelectValue(`new-source-user-${id}`),
        type: this.getSelectValue(`new-type-${id}`),
        targetUserId: this.getSelectValue(`new-target-user-${id}`),
        householdId: id
      }
    ).subscribe((newRelationshiop) =>
      this.relationships.set(
        [...this.relationships(), newRelationshiop]
      )
    );
  }

  deleteRelationship(e: Event, id: string) {
    e.preventDefault();
    this.RelationshipService.deleteRelationship(id).
    subscribe(() =>
      this.relationships.set(
        this.relationships().filter(
          relationship => id != relationship.id
        )
      )
    );
  }

  /* USER SERVICE */
  getAllUsers() {
    this.UserService.getAllUsers().then((users) =>
      this.users.set(users)
    );
  }

  addUser(e: Event, id: string) {
    e.preventDefault();
    this.UserService.addUser(
      {
        name: this.getInputValue(`new-user-name-${id}`),
        organizationId: id
      }
    ).subscribe((newUser) => 
      this.users.set([...this.users(), newUser])
    );
  }

  deleteUser(e: Event, id: string) {
    e.preventDefault();
    this.UserService.deleteUser(id)
    .subscribe(() => {
      this.users.set(
        this.users().filter((user) => id != user.id)
      );
      this.relationships.set(
        this.relationships().filter((relationship) =>
          id != relationship.sourceUserId && id != relationship.targetUserId
        )
      );
    });
  }

  addUserToHousehold(e: Event, householdId: string) {
    e.preventDefault();
    const userId = this.getSelectValue(`new-household-member-name-${householdId}`);
    this.UserService.addUserToHousehold(
      userId,
      householdId
    ).subscribe((updatedUser) => {
      const index = this.users().findIndex((user) => userId == user.id);
      this.users.set([
        ...this.users().slice(0, index),
        updatedUser,
        ...this.users().slice(index+1)
      ]);
    });
  }

  deleteUserFromHousehold(e: Event, userId: string) {
    e.preventDefault();
    this.UserService.deleteUserFromHousehold(userId).
    subscribe((updatedUser) => {
      const index = this.users().findIndex((user) => userId == user.id);
      this.users.set([
        ...this.users().slice(0, index),
        updatedUser,
        ...this.users().slice(index+1)
      ]);
    });
  }

  /* HELPERS */
  getInputValue(id: string): string {
    const value = (document.getElementById(id) as HTMLInputElement).value;
    (document.getElementById(id) as HTMLInputElement).value = "";
    return value;
  }

  getSelectValue(id: string): string {
    const value = (document.getElementById(id) as HTMLSelectElement).value;
    (document.getElementById(id) as HTMLSelectElement).value = "";
    return value;
  }
}
