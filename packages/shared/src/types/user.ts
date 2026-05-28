import { UserStatus } from './enums';

export interface User {
  id: string;
  email: string;
  phone: string | null;
  name: string;
  avatarUrl: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
}

export interface UserRole {
  id: string;
  userId: string;
  roleId: string;
}
