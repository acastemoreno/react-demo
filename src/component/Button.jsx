"use strict";

var Button = React.createClass({
    onClickCallback: function(event){
        this.props.btnCallback(this.props.text);
        console.log("click");
    },
    render: function(){
        var value = this.props.value;
        return (
            <div className={value?"btnCloud activeCloud":"btnCloud disabledCloud"}
                 onClick = {this.onClickCallback}>
                {this.props.text}
            </div>
        );
    }
});

module.exports = Button;
