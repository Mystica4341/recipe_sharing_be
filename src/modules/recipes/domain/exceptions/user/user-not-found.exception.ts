export class UserNotFoundException extends Error {
  constructor(identifier: string) {
    super(`User '${identifier}' was not found.`);
    this.name = 'UserNotFoundException';
  }
}
