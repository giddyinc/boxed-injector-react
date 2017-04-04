
const expect = require('expect');
const React = require('react');
const Inject = require('.')(React);
const shallow = require('enzyme').shallow;
const sinon = require('sinon');

const injector = {
  get() {}
};

/**
 * to run standalone:
 * mocha --require babel-register lib/Inject/Inject.test.js --watch
 */

class Bar extends React.Component {
  render() {
    return React.createElement('div', null);
  }
}

describe('Inject', () => {
  let wrapper;
  let sandbox;
  let inject;
  let Baz;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(injector);
    inject = new Inject(injector);
    injector.get.returns('bar123');
    @inject({
      dep: 'foo'
    })
    class Foo extends React.Component {
      render() {
        return React.createElement('div', null);
      }
    }

    Baz = Foo;
  });

  afterEach(() => sandbox.restore());

  it('should be a constructor', () => {
    expect(typeof Inject).toEqual('function', 'was expecting a function.');
  });

  it('should be able to inject dependencies directly into decorated components', () => {
    wrapper = shallow(React.createElement(Baz, null));
    expect(wrapper.props().dep).toEqual('bar123');
  });

  it('should be able to be used as a higher order function', () => {
    const HigherFoo = inject({dep: 'foo'})(Bar);
    wrapper = shallow(React.createElement(HigherFoo, null));
    expect(wrapper.props().dep).toEqual('bar123');
  });
});
