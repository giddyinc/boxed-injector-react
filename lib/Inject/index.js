'use strict';

const Inject = React => function (injector) {
  this.injector = injector;
  return dependencies => target => {
    const props = {};
    for (const i in dependencies) {
      props[i] = this.injector.get(dependencies[i]);
    }
    return class InjectComponent extends React.Component {
      render() {
        return React.createElement(target, Object.assign({}, this.props, props));
      }
    };
  };
};

module.exports = Inject;
