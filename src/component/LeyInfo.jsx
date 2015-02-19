"use strict";

var LeyInfo = React.createClass({
    render: function(){
        var ley = this.props.data;
        return(
            <div>
                <label>Nombre</label> <span></span>
            </div>
        );
    }
});

module.exports = LeyInfo;
