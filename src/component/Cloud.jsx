var tresdCloud = require("./tresdCloud.jsx");
var Cloud = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },
    onClickHandler: function(event){
        var node = event.target;
        var data =d3.select(node).data()[0];
        this.props.tagCallback(data);
        event.stopPropagation();
    },
    onOrientationChangeHandler: function(event){
        this.forceUpdate();
    },
    componentDidMount: function() {
        var node = this.refs.svgNode.getDOMNode();
         document.addEventListener("orientationchange", this.onOrientationChangeHandler);
        this.cloud = tresdCloud.create(node, this.getCloudState());
    },
    shouldComponentUpdate: function(nextProps){
        if (this.props.data.length == nextProps.data.length){
            return false;
        }
        return true;
    },
    componentDidUpdate: function() {
        var node = this.refs.svgNode.getDOMNode();
        tresdCloud.update(node, this.cloud, this.getCloudState());
    },
    getCloudState: function() {
        var node = this.refs.svgNode.getDOMNode();
        var rect = node.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            data: Process_data(this.props.data)
        };
    },
    componentWillUnmount: function() {
        var el = this.getDOMNode();
        document.removeListener("orientationchange", this.onOrientationChangeHandler);
        tresdCloud.destroy(el);
    },

    render: function() {
        return (
            <svg className="cloudSvg"
                 ref="svgNode"
                 onClick={this.onClickHandler}></svg>
        );
    }
});

module.exports = Cloud;
