"use strict";

window.React = require('react');
var Cloud = require("../component/Cloud.jsx");

var Process_data = function(data){
    var cadena_tags = data.map(function(ley){
        return ley["tags"].join(" ");
    }).join(" ").split(" ");

    var wordCount = {};
    for(var i = 0, len=cadena_tags.length; i < len; i++) {
        if(!wordCount[cadena_tags[i]])
            wordCount[cadena_tags[i]] = 0;
        wordCount[cadena_tags[i]]++; // {'hi': 12, 'foo': 2 ...}
    }
    //console.log(wordCount);
    var wordCountArr = [];
    for(var prop in wordCount) {
        wordCountArr.push({text: prop, size: wordCount[prop]});
    }
    return wordCountArr;
};

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

d3.json("/data/leyes_aprobadas.json", function(json) {
	var data = Process_data(json);
	React.renderComponent(<App  data={data}/>, document.body);
});
