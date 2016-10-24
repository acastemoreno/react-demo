"use strict";

var Button = require('./Button.jsx');

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var _ = require("lodash");

var ButtonContainer = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("YearStore")],
    getStateFromFlux: function(){
        var YearStore = this.getFlux().store("YearStore");
        return{
            filter: _.mapValues(YearStore.years, function(value){ return !value;})
        };
    },
    btnCallback: function(year){
        this.getFlux().actions.toggleYear(year);
    },
    render: function(){
        var callback = this.btnCallback;
        var filter = this.state.filter;
        var listaBotones = _.transform(filter, function(result, value, key){
            result[key] = (
                <Button key={key} text={key} value={value} btnCallback={callback}/>);
        });
        return(
            <div className="buttonContainer">
                {listaBotones}
            </div>
        );
    }
});

module.exports = ButtonContainer;
