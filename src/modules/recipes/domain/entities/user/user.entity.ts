import { UserRole } from '../../enums/user/user-role.enum.js';
import { UserStatus } from '../../enums/user/user-status.enum.js';
import { InvalidUserDataException } from '../../exceptions/user/invalid-user-data.exception.js';

export interface UserProperties {
  id?: string;
  email: string;
  username: string;
  passwordHash: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  phoneNumber?: string | null;
  role?: UserRole;
  status?: UserStatus;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private readonly _id: string;
  private _email: string;
  private _username: string;
  private _passwordHash: string;
  private _displayName: string;
  private _avatarUrl: string | null;
  private _bio: string | null;
  private _phoneNumber: string | null;
  private _role: UserRole;
  private _status: UserStatus;
  private _deletedAt: Date | null;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: UserProperties) {
    this.validate(props);

    this._id = props.id ?? crypto.randomUUID();
    this._email = props.email.toLowerCase().trim();
    this._username = props.username.trim();
    this._passwordHash = props.passwordHash;
    this._displayName = props.displayName.trim();
    this._avatarUrl = props.avatarUrl ?? null;
    this._bio = props.bio?.trim() ?? null;
    this._phoneNumber = props.phoneNumber?.trim() ?? null;
    this._role = props.role ?? UserRole.USER;
    this._status = props.status ?? UserStatus.ACTIVE;
    this._deletedAt = props.deletedAt ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  private validate(props: UserProperties): void {
    if (!props.email || !this.isValidEmail(props.email)) {
      throw new InvalidUserDataException('Invalid email format');
    }
    if (!props.username || props.username.trim().length < 3) {
      throw new InvalidUserDataException('Username must be at least 3 characters long');
    }
    if (!props.passwordHash || props.passwordHash.length === 0) {
      throw new InvalidUserDataException('Password hash cannot be empty');
    }
    if (!props.displayName || props.displayName.trim().length === 0) {
      throw new InvalidUserDataException('Display name cannot be empty');
    }
    if (props.role && !Object.values(UserRole).includes(props.role)) {
      throw new InvalidUserDataException(`Invalid user role: ${props.role}`);
    }
    if (props.status && !Object.values(UserStatus).includes(props.status)) {
      throw new InvalidUserDataException(`Invalid user status: ${props.status}`);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  get displayName(): string {
    return this._displayName;
  }

  get avatarUrl(): string | null {
    return this._avatarUrl;
  }

  get bio(): string | null {
    return this._bio;
  }

  get phoneNumber(): string | null {
    return this._phoneNumber;
  }

  get role(): UserRole {
    return this._role;
  }

  get status(): UserStatus {
    return this._status;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  // Domain Behaviors
  updateProfile(params: {
    displayName?: string;
    bio?: string | null;
    avatarUrl?: string | null;
    phoneNumber?: string | null;
  }): void {
    if (this.isDeleted()) {
      throw new InvalidUserDataException('Cannot update profile of a deleted user');
    }

    if (params.displayName !== undefined) {
      if (params.displayName.trim().length === 0) {
        throw new InvalidUserDataException('Display name cannot be empty');
      }
      this._displayName = params.displayName.trim();
    }

    if (params.bio !== undefined) {
      this._bio = params.bio ? params.bio.trim() : null;
    }

    if (params.avatarUrl !== undefined) {
      this._avatarUrl = params.avatarUrl ? params.avatarUrl.trim() : null;
    }

    if (params.phoneNumber !== undefined) {
      this._phoneNumber = params.phoneNumber ? params.phoneNumber.trim() : null;
    }

    this._updatedAt = new Date();
  }

  updateAvatar(avatarUrl: string | null): void {
    if (this.isDeleted()) {
      throw new InvalidUserDataException('Cannot update avatar of a deleted user');
    }
    this._avatarUrl = avatarUrl ? avatarUrl.trim() : null;
    this._updatedAt = new Date();
  }

  changeRole(newRole: UserRole): void {
    if (this.isDeleted()) {
      throw new InvalidUserDataException('Cannot change role of a deleted user');
    }
    if (!Object.values(UserRole).includes(newRole)) {
      throw new InvalidUserDataException(`Invalid role: ${newRole}`);
    }
    this._role = newRole;
    this._updatedAt = new Date();
  }

  updatePassword(newPasswordHash: string): void {
    if (this.isDeleted()) {
      throw new InvalidUserDataException('Cannot change password of a deleted user');
    }
    if (!newPasswordHash || newPasswordHash.trim().length === 0) {
      throw new InvalidUserDataException('New password hash cannot be empty');
    }
    this._passwordHash = newPasswordHash;
    this._updatedAt = new Date();
  }

  // Soft Delete Logic
  softDelete(): void {
    if (this.isDeleted()) {
      return; // Already deleted
    }
    this._status = UserStatus.DELETED;
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  restore(): void {
    if (!this.isDeleted()) {
      return; // Already active
    }
    this._status = UserStatus.ACTIVE;
    this._deletedAt = null;
    this._updatedAt = new Date();
  }

  isDeleted(): boolean {
    return this._status === UserStatus.DELETED || this._deletedAt !== null;
  }

  isActive(): boolean {
    return this._status === UserStatus.ACTIVE && !this.isDeleted();
  }

  ban(): void {
    if (this.isDeleted()) {
      throw new InvalidUserDataException('Cannot ban a deleted user');
    }
    this._status = UserStatus.BANNED;
    this._updatedAt = new Date();
  }

  unban(): void {
    if (this._status === UserStatus.BANNED) {
      this._status = UserStatus.ACTIVE;
      this._updatedAt = new Date();
    }
  }
}
