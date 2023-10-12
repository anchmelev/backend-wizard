export class MappingError extends Error {
  private failedObject: object;

  constructor(message: string, failedObject: object) {
    super(`${message}. Failed object class: ${failedObject.constructor.name}`);
    this.name = 'MappingError';
    this.failedObject = failedObject;
  }

  getFailedObject(): object {
    return this.failedObject;
  }
}
