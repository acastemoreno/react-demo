"use strict";

window.React = require('react');
var flux = require("../component/Flux.jsx");

var App = require("../component/App.jsx");

React.render(<App  flux={flux}/>, document.body);
