"use strict";

var ReactDate = React.createClass({
    render: function(){
        var fecha = this.props.date.split("/");
        var date = new Date(fecha.reverse());
        var listaFecha = [date.getUTCDate(),
                          date.getUTCMonth(),
                          date.getUTCFullYear()];
        return(
            <time dateTime={date.toString()}>{this.props.date}</time>
        );
    }
});

var LeyInfo = React.createClass({
    render: function(){
        var ley = this.props;
        var lower = ley.nombre.toLowerCase();
        var nombre = lower.charAt(0).toUpperCase() + lower.slice(1);
        var fecha = this.props["fecha promulga"];
        return(
            <dl className="leyInfo">
                <dt>Nombre</dt>
                <dd>{nombre}</dd>
                <dt>Fecha</dt>
                <dd><ReactDate date={fecha}/></dd>
                <dt>Legislatura</dt>
                <dd>{ley.legislatura}</dd>
                <dt>autografa</dt>
                <dd><a href={ley.pdf} target="_blank">link</a></dd>
            </dl>
        );
    }
});

module.exports = LeyInfo;
