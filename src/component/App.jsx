"use strict";

var Main = require("./Main.jsx");
var AppHeader = require("./AppHeader.jsx");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LocationStore")],
    getStateFromFlux: function(){
        var LocationStore = this.getFlux().store("LocationStore");
        return{
            location: LocationStore.currentLocation
        };
    },
    componentDidUpdate: function(){
        var location = this.state.location.split("/")[0];
        console.log(location);
        var mainNode = this.refs.main.getDOMNode();
        var aboutNode = this.refs.about.getDOMNode();
        mainNode.style.position = "fixed";
        aboutNode.style.position = "fixed";
        switch(location){
            case "Main":
                setTimeout(function(){
                    mainNode.style.top = "0%";
                    aboutNode.style.top = "100%";
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function(){
                        mainNode.style.position = "relative"; },1000);
                }.bind(this), 50);
                break;
            case "About":
                setTimeout(function(){
                    mainNode.style.top = "-100%";
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function(){
                        aboutNode.style.position = "relative"; },1000);
                    aboutNode.style.top = "0%";
                }.bind(this), 50);
                break;
        }
    },
    componentDidMount: function(){
        var aboutNode = this.refs.about.getDOMNode();
        var mainNode = this.refs.main.getDOMNode();
        mainNode.style.top = "0%";
        aboutNode.style.top="100%";
    },
    render: function(){
        var wrapperStyle = {
            position: "fixed",
            width: "100%",
            height: "100%",
            transition: "top 1s ease-in-out"
        };

        var location = this.state.location.split("/")[0];

        return (
            <div style={{position: "fixed", width:"100%", height:"100%"}} ref="wrapper">
                <div ref="main" style={wrapperStyle}>
                    <Main />
                </div>
                <div ref="about" style={wrapperStyle}>
                    <div style={{height: "100%",backgroundColor:"gray" }}/>
                </div>
                <div style={{width:"100%", position:"fixed", top: "0"}}>
                    <AppHeader hidden={false}/>
                </div>
            </div>
        );
    }
});

module.exports = App;
