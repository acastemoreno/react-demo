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
        console.log("OrientationChange");
        var self = this;
        var prevWidth = this.previousWindowSize[0];
        var prevHeight = this.previousWindowSize[1];
        var prevPortrait = prevWidth/prevHeight <= 1;
        var count = 0;
        var update = function(){
            count++;
            var width = window.outerWidth;
            var height = window.outerHeight;
            var portrait = width/height <=1;
            if (count>1000)
                return;
            console.log("Portrait?:", portrait);
            if (prevPortrait != portrait) {
                self.previousWindowSize = [width, height];
                self.forceUpdate();
            }
            else
                setTimeout(update, 50);
        };
        update();
    },
    componentDidMount: function() {
        var node = this.refs.svgNode.getDOMNode();
        this.previousWindowSize = [window.outerWidth, window.outerHeight];
        window.addEventListener("orientationchange", this.onOrientationChangeHandler);
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
            data: this.props.data
        };
    },
    componentWillUnmount: function() {
        var el = this.getDOMNode();
        window.removeListener("orientationchange", this.onOrientationChangeHandler);
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
