"use strict";

var Button = React.createClass({
    onClickCallback: function(event){
        this.props.btnCallback(this.props.text);
    },
    render: function(){
        var value = this.props.value;
        return (
            <div className={value?"btnCloud disabledCloud":"btnCloud activeCloud"}
                 onClick = {this.onClickCallback}>
                {this.props.text}
            </div>
        );
    }
});

module.exports = Button;
