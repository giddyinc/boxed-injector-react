
'use strict';

const Injectable = React => function (Component, props) {
  return class InjectableComponent extends React.Component {
    render() {
      return React.createElement(Component, Object.assign({}, this.props, props));
    }
  };
};

module.exports = Injectable;
