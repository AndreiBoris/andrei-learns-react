// class ExtendableError extends Error {
//   constructor(message) {
//     super();
//     this.message = message;
//     const errorWithMessage = new Error(message);
//     this.stack = errorWithMessage.stack;
//     this.name = this.constructor.name;
//   }
// }

// Allows extending of built in Error type. Thanks to Stack Overflow user JBE, https://stackoverflow.com/a/43595019
function ExtendableError(...args) {
  const instance = Reflect.construct(Error, args);
  Reflect.setPrototypeOf(instance, Reflect.getPrototypeOf(this));
  return instance;
}
ExtendableError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
Reflect.setPrototypeOf(ExtendableError, Error);

export default ExtendableError;
