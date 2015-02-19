"use strict";

var InfoBox = React.createClass({
    getDefaultProps: function(){
        return{
            data: {
                text: "",
                value: "",
            }
        };
    },
    render: function(){
        var data = this.props.data;
        return(
            <div id="infoBox">
                <ol>
                    <li><label>Etiqueta:</label> <span>{data.text}</span></li>
                    <li><label>Cantidad:</label> <span>{data.value}</span></li>
                </ol>
            </div>
        );

    }
});

module.exports = InfoBox;
