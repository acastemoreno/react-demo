"use strict";

var TagListItem = require("./TagListItem.jsx");
var TagDescription = require("./TagDescription.jsx");

var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var _ = require("lodash-node");

var TagBrowser = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("LeyStore", "YearStore")],
    getInitialState: function(){
        return{
            search: "",
            selected: undefined
        };
    },
    getStateFromFlux: function(){
        return{};
    },
    onInputChangeHandler: function(event){
        this.setState({search: event.target.value});
    },
    onListItemClickCallback: function(tag){
        this.setState({selected: tag});
    },
    render: function(){
        var hidden = this.props.hidden;
        var style = {
            display: hidden?"none":""
        };
        var search = this.state.search;
        var tagsFiltrados;
        if (search)
            tagsFiltrados = _.filter(this.props.data, function(tag){
            return tag.text.toUpperCase().indexOf(search.toUpperCase()) == 0;
        });
        else
            tagsFiltrados = this.props.data;
        var listaTags = _.map(tagsFiltrados, function(tag){
            return (<TagListItem data={tag}
                                 onClickCallback={this.onListItemClickCallback} />);
        }, this);

        var selected = this.state.selected;
        if (! selected && tagsFiltrados)
            selected = tagsFiltrados[0];

        return (
            <div className="overlay" style={style}>
                <div className="shadow" />
                <div id="tagBrowser" className="overlay">
                    <nav>
                        <input type="text"
                               placeholder="Buscar tag"
                               onChange={this.onInputChangeHandler}/>
                        <ul>{listaTags}</ul>
                    </nav>
                    <section>
                        <TagDescription data={selected}/>                        
                    </section>
                </div>
            </div>
        );
    }
});

module.exports = TagBrowser;
