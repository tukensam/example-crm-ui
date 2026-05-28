import { UserInterface } from "./user-interface";

export interface RelationshipInterface {
  id: string,
  type: string,
  sourceUserId: string,
  targetUserId: string,
  householdId: string
}