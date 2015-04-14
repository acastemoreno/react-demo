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
        var LeyStore = this.getFlux().store("LeyStore");
        return{
            loading: LeyStore.loading
        };
    },
    onInputChangeHandler: function(event){
        this.setState({search: event.target.value});
    },
    filtraTags: function(search){
        var tagsFiltrados;
        if (search)
            tagsFiltrados = _.filter(this.props.data, function(tag){
                return tag.text.toUpperCase().indexOf(search.toUpperCase()) == 0;
            });
        else
            tagsFiltrados = this.props.data;

        return tagsFiltrados;
    },
    onListItemClickCallback: function(tag){
        this.setState({selected: tag});
    },
    componentWillReceiveProps: function(nextProps){
        var selected = this.state.selected;
        if (!selected)
            return;
        var tagName = selected.text;
        this.setState({selected: _.find(nextProps.data, function(tag){
            return tag.text == tagName;
        })});
        if (!nextProps.hidden){
            this.setState({hidden: false});
        }
    },
    componentDidMount: function(){
        var node = this.refs.wrapper.getDOMNode();
        node.style.display = this.props.hidden?"none":"";
    },
    componentDidUpdate: function(){
        var node = this.refs.wrapper.getDOMNode();
        clearTimeout(this.timer);
        var style = document.defaultView.getComputedStyle(node, "");
        var duration = parseFloat(style.transitionDuration)*1000 || 50;
        if (this.props.hidden){
            node.style.opacity = 1;
            this.timer = setTimeout(function(){
                node.style.opacity = 0;
                this.timer = setTimeout(function(){
                    node.style.display = "none";}.bind(this), duration);
            }.bind(this), 50);
        }
        else{
            node.style.display = "";
            this.timer = setTimeout(function(){node.style.opacity = 1;}, 50);
        }
    },
    render: function(){
        var hidden = this.props.hidden;
        var style = {
            opacity: 0
        };
        var search = this.state.search;
        var tagsFiltrados = this.filtraTags(search);
        var selected = this.state.selected;

        var listaTags = _.sortBy(_.map(tagsFiltrados, function(tag){
            return (<TagListItem data={tag} key={tag.text}
                                 onClickCallback={this.onListItemClickCallback} />);
        }, this), function(n){return -n.props.data.value;});
        return (
            <div className="overlay opacityTransition"
                 ref="wrapper"
                 style={style}>
                <div className="shadow" />
                <div id="tagBrowser" className="overlay">
                    <aside>
                        <input type="text"
                               tabIndex={1}
                               placeholder="Buscar tag"
                               onChange={this.onInputChangeHandler}/>
                        <ul>{listaTags}</ul>
                    </aside>
                    <TagDescription data={selected}/>
                </div>
            </div>
        );
    }
});

module.exports = TagBrowser;
