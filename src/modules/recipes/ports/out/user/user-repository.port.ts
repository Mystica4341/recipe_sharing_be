import { User } from '../../../domain/entities/user/user.entity.js';

export const USER_REPOSITORY_PORT = Symbol('USER_REPOSITORY_PORT');

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  findById(id: string, includeDeleted?: boolean): Promise<User | null>;
  findByEmail(email: string, includeDeleted?: boolean): Promise<User | null>;
  findByUsername(username: string, includeDeleted?: boolean): Promise<User | null>;
  findAll(includeDeleted?: boolean): Promise<User[]>;
  softDelete(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
