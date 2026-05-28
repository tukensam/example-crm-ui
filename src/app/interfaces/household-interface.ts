import { UserInterface } from "./user-interface";
import { RelationshipInterface } from "./relationship-interface";

export interface HouseholdInterface {
  id: string,
  name: string,
  primaryUserId: string,
  users: UserInterface[],
  relationships: RelationshipInterface[]
}
