import { describe, it, expect } from 'vitest';
import { User } from './user.entity.js';
import { UserRole } from '../../enums/user/user-role.enum.js';
import { UserStatus } from '../../enums/user/user-status.enum.js';
import { InvalidUserDataException } from '../../exceptions/user/invalid-user-data.exception.js';

describe('User Domain Entity', () => {
  const validProps = {
    email: 'chef.viet@example.com',
    username: 'chefviet',
    passwordHash: 'hashed_secret_password',
    displayName: 'Chef Việt',
    avatarUrl: 'https://example.com/avatars/chef.jpg',
    bio: 'Đầu bếp yêu thích món Việt truyền thống',
  };

  it('should create a valid user with default role and status', () => {
    const user = new User(validProps);

    expect(user.id).toBeDefined();
    expect(user.email).toBe('chef.viet@example.com');
    expect(user.username).toBe('chefviet');
    expect(user.displayName).toBe('Chef Việt');
    expect(user.avatarUrl).toBe('https://example.com/avatars/chef.jpg');
    expect(user.bio).toBe('Đầu bếp yêu thích món Việt truyền thống');
    expect(user.role).toBe(UserRole.USER);
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.deletedAt).toBeNull();
    expect(user.isDeleted()).toBe(false);
    expect(user.isActive()).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should throw InvalidUserDataException for invalid email format', () => {
    expect(
      () =>
        new User({
          ...validProps,
          email: 'invalid-email-address',
        }),
    ).toThrow(InvalidUserDataException);
  });

  it('should throw InvalidUserDataException for short username', () => {
    expect(
      () =>
        new User({
          ...validProps,
          username: 'ab',
        }),
    ).toThrow(InvalidUserDataException);
  });

  it('should support soft delete and restore', () => {
    const user = new User(validProps);
    expect(user.isDeleted()).toBe(false);

    // Soft delete
    user.softDelete();
    expect(user.status).toBe(UserStatus.DELETED);
    expect(user.deletedAt).toBeInstanceOf(Date);
    expect(user.isDeleted()).toBe(true);
    expect(user.isActive()).toBe(false);

    // Restore
    user.restore();
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.deletedAt).toBeNull();
    expect(user.isDeleted()).toBe(false);
    expect(user.isActive()).toBe(true);
  });

  it('should update profile and avatar', () => {
    const user = new User(validProps);

    user.updateProfile({
      displayName: 'Master Chef Việt',
      bio: 'Bếp trưởng món ăn ba miền',
      avatarUrl: 'https://example.com/avatars/new.jpg',
      phoneNumber: '0901234567',
    });

    expect(user.displayName).toBe('Master Chef Việt');
    expect(user.bio).toBe('Bếp trưởng món ăn ba miền');
    expect(user.avatarUrl).toBe('https://example.com/avatars/new.jpg');
    expect(user.phoneNumber).toBe('0901234567');
  });

  it('should prevent updating profile of a deleted user', () => {
    const user = new User(validProps);
    user.softDelete();

    expect(() =>
      user.updateProfile({
        displayName: 'New Name',
      }),
    ).toThrow(InvalidUserDataException);
  });

  it('should change role successfully', () => {
    const user = new User(validProps);
    user.changeRole(UserRole.CHEF);
    expect(user.role).toBe(UserRole.CHEF);

    user.changeRole(UserRole.ADMIN);
    expect(user.role).toBe(UserRole.ADMIN);
  });
});
