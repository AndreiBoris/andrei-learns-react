class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    const errorWithMessage = new Error(message);
    this.stack = errorWithMessage.stack;
    this.name = this.constructor.name;
  }
}

export default ExtendableError;
