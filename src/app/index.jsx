"use strict";

window.React = require('react');
var App = require("../component/ButtonContainer.jsx");

/*
var App = React.createClass({
  getInitialState: function() {
    return {
      domain: {x: [0, 30], y: [0, 100]}
    };
  },

  render: function() {
    return (
      <div className="App">
        <Cloud
          data={this.props.data}
          domain={this.state.domain} />
      </div>
    );
  }
});
*/
d3.json("/data/leyes_aprobadas.json", function(json) {
	React.render(<App  data={json}/>, document.body);
});
