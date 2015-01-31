var tresdCloud = require("./tresdCloud.jsx");

var Cloud = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = this.getDOMNode();
    tresdCloud.create(el, {
      width: '100%',
      height: '300px'
    }, this.getCloudState());
  },

  componentDidUpdate: function() {
    var el = this.getDOMNode();
    tresdCloud.update(el, this.getCloudState());
  },

  getCloudState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    var el = this.getDOMNode();
    tresdCloud.destroy(el);
  },

  render: function() {
    return (
      <div className="Cloud"></div>
    );
  }
});

module.exports = Cloud;