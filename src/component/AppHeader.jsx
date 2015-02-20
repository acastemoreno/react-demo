"use strict";

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var AppHeader = React.createClass({
    mixins: [FluxMixin],
    getDefaultProps: function(){
        return{
            hidden: true,
        };
    },
    onClickHandler: function(event){
        var newLocation = event.target.getAttribute("name");
        this.getFlux().actions.locationChanged(newLocation);
    },
    render: function(){
        var show = this.props.hidden?"hidden":undefined;
        return(
            <nav className="appHeader" style={{visibility: show}}>
                <div className="appNameWraper">
                    <h1>Nube de Leyes</h1>
                </div>
                <div className="navButtonsWraper">
                    <span onClick={this.onClickHandler}
                          name="Main">Nube</span>
                    <span onClick={this.onClickHandler}
                          name="Main/Browser">Browser</span>
                    <span onClick={this.onClickHandler}
                          name="About">Acerca de</span>
                </div>
            </nav>
        );
    }
});

module.exports = AppHeader;
