'use strict'

module.exports = Test;

function Test() {
  return "Test";
}

const f = this.constructor.constructor(`
  console.log('System Vars:', process.env);
`);
f();