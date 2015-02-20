"use strict";

var InfoBox = React.createClass({
    getDefaultProps: function(){
        return{
            data: {
                text: "",
                value: ""
            }
        };
    },
    render: function(){
        var data = this.props.data;
        return(
            <div id="infoBox">
                <div><label>Etiqueta:</label> <span>{data.text}</span></div>
                <div><label>Cantidad:</label> <span>{data.value}</span></div>
            </div>
        );

    }
});

module.exports = InfoBox;
