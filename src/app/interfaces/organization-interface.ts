import { UserInterface } from "./user-interface"

export interface OrganizationInterface {
  id: string,
  name: string,
  userIds: string[],
  users: UserInterface[]
}