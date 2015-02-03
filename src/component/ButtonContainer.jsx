"use strict";

var Button = require('./Button.jsx');
var Cloud = require("./Cloud.jsx");
var InfoBox = require("./InfoBox.jsx");
var AppHeader = require("./AppHeader.jsx");

var ButtonContainer = React.createClass({
    getInitialState: function(){
        return{
            filter: {
                "2011": false,
                "2012": false,
                "2013": false,
                "2014": false
            },
            selected: undefined
        };
    },
    btnCallback: function(name){
        var query = {};
        query[name] = {$apply: function(x){ return !x;}};
        var newFilter = React.addons.update(this.state.filter, query);
        this.setState({filter: newFilter, selected:false});
    },
    filterData: function(){
        var data = this.props.data;
        var filtro = this.state.filter;

        return data.filter(function(ley){
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
    render: function(){
        var callback = this.btnCallback;
        var filter = this.state.filter;
        var leyesFiltradas = this.filterData();
        return(
            <div id="appContainer">
                <div id="topContainer">
                    <AppHeader/>
                    <div className="buttonContainer">
                        <Button text ={"2011"}  value={filter["2011"]} btnCallback={callback} />
                        <Button text ={"2012"}  value={filter["2012"]} btnCallback={callback} />
                        <Button text ={"2013"}  value={filter["2013"]} btnCallback={callback} />
                        <Button text ={"2014"}  value={filter["2014"]} btnCallback={callback} />
                    </div>
                </div>
                {/* <InfoBox data={this.state.selected}  leyes={leyesFiltradas}/> */}
                <Cloud data={leyesFiltradas} tagCallback={this.cloudCallback}/>
            </div>
        );
    }
});

module.exports = ButtonContainer;
