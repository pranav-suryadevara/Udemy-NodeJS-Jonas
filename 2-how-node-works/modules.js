console.log(arguments); // outputs the 5 arguments that are part of the wrapper function.
console.log(require('module').wrapper); // outputs the wrapper function.

// module.exports
const c1 = require('./test-module-1');
const calc1 = new c1();
console.log(calc1.add(1, 2));

// exports
// const calc2 = require('./test-module-2');
// console.log(calc2.multiply(4, 2));

const { add, multiply, divide } = require('./test-module-2');
console.log(multiply(4, 2));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
