var tresdCloud = require("./tresdCloud.jsx");

var Process_data = function(data){
    var cadena_tags = data.map(function(ley){
        return ley["tags"].join(" ");
    }).join(" ").split(" ");

    var wordCount = {};
    for(var i = 0, len=cadena_tags.length; i < len; i++) {
        if(!wordCount[cadena_tags[i]])
            wordCount[cadena_tags[i]] = 0;
        wordCount[cadena_tags[i]]++; // {'hi': 12, 'foo': 2 ...}
    }

    var wordCountArr = [];
    for(var prop in wordCount) {
        wordCountArr.push({text: prop, value: wordCount[prop]});
    }
    return wordCountArr;
};


var Cloud = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },
    getDefaultProps: function(){
        return{
            height: 600,
        };
    },
    componentDidMount: function() {
        var node = this.refs.svgNode.getDOMNode();
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
        tresdCloud.destroy(el);
    },

    render: function() {
        return (
            <div className="Cloud">
                <svg ref="svgNode"
                     width={"100%"}></svg>
            </div>
        );
    }
});

module.exports = Cloud;
