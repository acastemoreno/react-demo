"use strict";

var ButtonContainer = require('./ButtonContainer.jsx');
var Cloud = require("./Cloud.jsx");
var InfoBox = require("./InfoBox.jsx");
var AppHeader = require("./AppHeader.jsx");
var TagBrowser = require("./TagBrowser.jsx");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var _ = require("lodash");

var Main = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LeyStore",
                                        "YearStore",
                                        "TagStore",
                                        "LocationStore")],
    getStateFromFlux: function(){
        var YearStore = this.getFlux().store("YearStore");
        var LeyStore = this.getFlux().store("LeyStore");
        var TagStore = this.getFlux().store("TagStore");
        var LocationStore = this.getFlux().store("LocationStore");

        return{
            showBrowser: (LocationStore.currentLocation == "Main/Browser"),
            selected: TagStore.tag,
            loading: LeyStore.loading,
            error: LeyStore.loading,
            data: LeyStore.leyes,
            filter: _.mapValues(YearStore.years, function(value){ return !value;})
        };
    },
    cuentaTags: function(data){
        var tagsDict = _.transform(data, function(result, ley){
            _.forEach(ley.tags, function(tag){
                var tagDict = result[tag];
                if(tagDict){
                    tagDict.value ++;
                    tagDict.leyes.push(ley);
                }
                else{
                    result[tag] = {
                        value: 1,
                        text: tag,
                        leyes: [ley]
                    };
                }});}, {});
        return tagsDict;
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
        var listaTags = this.cuentaTags(leyesFiltradas);
        return(
            <main id="AppContainer" style={{height:"100%"}}>
                <AppHeader/>
                <ButtonContainer/>
                <div className="appContent">
                    <Cloud data={_.values(listaTags)}
                           tagCallback={this.cloudCallback}/>
                    <TagBrowser data={listaTags}
                                hidden={!this.state.showBrowser} />
                </div>
                <InfoBox data={this.state.selected} />
            </main>
        );
    }
});

module.exports = Main;
