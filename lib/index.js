
'use strict';

module.exports = react => {
  if (!react) {
    throw new Error('React is required.');
  }
  return {
    Injectable: require('./Injectable')(react),
    Inject: require('./Inject')(react)
  };
};
