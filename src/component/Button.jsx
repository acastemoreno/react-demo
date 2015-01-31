"use strict";

var Button = React.createClass({
    onClickCallback: function(event){
        this.props.btnCallback(this.props.text);
    },
    render: function(){
        var value = this.props.value;
        return (
            <div className={value?"btn active":"btn disabled"}
                 onClick = {this.onClickCallback}>
                {this.props.text}
            </div>
        );
    }
});

module.exports = Button;
