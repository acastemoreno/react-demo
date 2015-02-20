"use strict";

var LeyInfo = React.createClass({
    render: function(){
        var ley = this.props;
        var lower = ley.nombre.toLowerCase();
        var nombre = lower.charAt(0).toUpperCase() + lower.slice(1);
        return(
            <div>
                <p><label>Nombre:</label>
                    <span>{nombre}</span></p>
                <p><label>Legislatura:</label>
                    <span>{ley.legislatura}</span></p>
                <p><label>autografa:</label>
                    <span><a href={ley.pdf} target="_blank">link</a></span></p>
            </div>
        );
    }
});

module.exports = LeyInfo;
