"use strict";

var InfoBox = React.createClass({
    render: function(){
        var data = this.props.data;
        
        if (data)
            return(
                <div id="infoBox">
                    <ol>
                        <li><label>Etiqueta:</label> <span>{data.text}</span></li>
                        <li><label>Cantidad:</label> <span>{data.value}</span></li>
                    </ol>
                </div>
            );
        else
            return(
                <div id="infoBox">
                    <p>Seleccione una etiqueta</p>
                </div>
            );
    }
});

module.exports = InfoBox;
