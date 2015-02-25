"use strict";

var TagListItem = React.createClass({
    onClickHandler: function(event){
        this.props.onClickCallback(this.props.data);
    },
    onKeyPressHandler: function(event){
        if(event.key == "Enter"){
            this.props.onClickCallback(this.props.data);
            event.stopPropagation();
        }
    },
    render: function(){
        return(
            <li onClick={this.onClickHandler} >
                <span tabIndex={2}
                      onKeyPress={this.onKeyPressHandler}>
                    {this.props.data.text}
                </span>
            </li>
        );
    }
});

module.exports = TagListItem;
