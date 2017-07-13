'use strict';

const expect = require('expect');
const React = require('react');

/**
 * to run standalone
 * mocha test
 */

describe('boxed-injector', () => {
  describe('export', () => {
    let mod;

    beforeEach(() => {
      mod = require('../lib')(React);
    });

    it('should require react', () => expect(() => require('../lib')()).toThrow(Error));

    it('Injectable', () => {
      expect(mod.Injectable).toExist();
    });

    it('Inject', () => {
      expect(mod.Inject).toExist();
    });
  });
  describe('individual exports', () => {
    it('Injectable', () => {
      const mod = require('../lib/Injectable');
      expect(mod).toExist();
    });
    it('Inject', () => {
      const mod = require('../lib/Inject');
      expect(mod).toExist();
    });
  });
});
