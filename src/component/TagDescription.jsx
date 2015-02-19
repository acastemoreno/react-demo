"use strict";

var LeyInfo = require("./LeyInfo.jsx");

var _ = require("lodash-node");

var TagDescription = React.createClass({
    render: function(){
        var tag = this.props.data;
        if (! tag)
            return <article></article>;
        var listaLeyes = _.map(tag.leyes, function(ley){
            return <LeyInfo data={ley} />;
        });
        return(
            <article className="tagDescription">
                <h2>{tag.text}</h2>
                <label>{"Leyes relacionadas:"}</label>
                <div>
                    {listaLeyes}
                </div>
            </article>
        );
    }
});

module.exports = TagDescription;
