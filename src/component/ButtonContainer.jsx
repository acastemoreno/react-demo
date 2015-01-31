"use strict";

var Button = require('./Button.jsx');

var ButtonContainer = React.createClass({
    getInitialState: function(){
        return{
            filter: {
                "2011": true,
                "2012": true,
                "2013": true,
                "2014": true
            }
        };
    },
    btnCallback: function(name){
        var query = {};
        query[name] = {$apply: function(x){ return !x;}};
        var newFilter = React.addons.update(this.state.filter, query);
        this.setState({filter: newFilter});
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
    render: function(){
        var callback = this.btnCallback;
        var filter = this.state.filter;
        return(
            <div className="buttonContainer">
                <Button text ={"2011"}  value={filter["2011"]} btnCallback={callback} />
                <Button text ={"2012"}  value={filter["2012"]} btnCallback={callback} />
                <Button text ={"2013"}  value={filter["2013"]} btnCallback={callback} />
                <Button text ={"2014"}  value={filter["2014"]} btnCallback={callback} />
            </div>
        );
    }
});

module.exports = ButtonContainer;
