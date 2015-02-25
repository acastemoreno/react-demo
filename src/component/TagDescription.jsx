"use strict";

var LeyInfo = require("./LeyInfo.jsx");

var _ = require("lodash-node");

var TagDescription = React.createClass({
    componentDidUpdate: function(){
        var node = this.refs.wrapper.getDOMNode();
        node.scrollTop = 0;
    },
    render: function(){
        var tag = this.props.data;
        if (! tag)
            return (
                <section ref="wrapper">
                    <article></article>
                </section>);

        var listaLeyes = _.map(tag.leyes, function(ley){
            return (<LeyInfo {...ley} />);
        });
        return(
            <section ref="wrapper">
                <article className="tagDescription">
                    <h2>{tag.text}</h2>
                    <label>{"Leyes relacionadas:"}</label>
                    <span>{tag.leyes.length}</span>
                    <div>
                        {listaLeyes}
                    </div>
                </article>
            </section>
        );
    }
});

module.exports = TagDescription;
