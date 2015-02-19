"use strict";

var TagListItem = React.createClass({
    onClickHandler: function(event){
        this.props.onClickCallback(this.props.data);
    },
    render: function(){
        return(
            <li onClick={this.onClickHandler}>
                {this.props.data.text}
            </li>
        );
    }
});

module.exports = TagListItem;
