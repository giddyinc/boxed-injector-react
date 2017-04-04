
'use strict';

const Injectable = React => function (Component, props) {
  return React.createClass({
    render: function () {
      return React.createElement(Component, Object.assign({}, this.props, props));
    }
  });
};

module.exports = Injectable;
