"use strict";

var Button = require('./Button.jsx');
var Cloud = require("./Cloud.jsx");
var InfoBox = require("./InfoBox.jsx");
var AppHeader = require("./AppHeader.jsx");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var _ = require("lodash-node");

var ButtonContainer = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LeyStore", "YearStore")],
    getInitialState: function(){
        return{
            selected: undefined
        };
    },
    getStateFromFlux: function(){
        var YearStore = this.getFlux().store("YearStore");
        var LeyStore = this.getFlux().store("LeyStore");

        return{
            loading: LeyStore.loading,
            error: LeyStore.loading,
            data: LeyStore.leyes,
            filter: _.mapValues(YearStore.years, function(value){ return !value;})
        };
    },
    btnCallback: function(year){
        this.getFlux().actions.toggleYear(year);
        this.setState({selected:false});
    },
    filterData: function(){
        var data = this.state.data;
        var filtro = this.state.filter;

        return _.filter(data, function(ley){
            for (var property in filtro) {
                if (filtro.hasOwnProperty(property)) {
                    var value = filtro[property];
                    if (value && ley["legislatura"].substr(0,4) == property){
                        return false;
                    }
                }
            }
            return true;
        });
    },
    cloudCallback: function(dot){
        console.log(dot);
        this.setState({"selected": dot});
    },
    componentDidMount: function(){
        this.getFlux().actions.loadLeyes();
    },

    render: function(){
        var callback = this.btnCallback;
        var filter = this.state.filter;
        var leyesFiltradas = this.filterData();
        var listaBotones = _.transform(filter, function(result, value, key){
            result[key] = (
                <Button key={key} text={key} value={value} btnCallback={callback}/>);
        });
        return(
            <div style={{height:"100%"}}>
                <AppHeader/>
                <div className="buttonContainer">
                    {listaBotones}
                </div>
                <Cloud data={leyesFiltradas}
                       show={this.state.showCloud}
                       tagCallback={this.cloudCallback}/>
                <InfoBox data={this.state.selected} endCallback={this.infoCloseHandler}/>
            </div>
        );
    }
});

module.exports = ButtonContainer;
