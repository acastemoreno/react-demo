"use strict";
// Requires d3
//var tresdCloud = require("./tresdCloud.jsx");
var fill = d3.scale.category20();
var Cloud = React.createClass({
    propTypes: {
        data: React.PropTypes.array
    },
    getDefaultProps: function(){
        return{
            width: "auto",
            height: "auto",
            animate: true
        };
    },
    getInitialState: function(){
        return{
            width: 0,
            height: 0
        };
    },
    calculateWidth: function(){
        if (this.props.width !="auto"){
            return this.props.width;
        };
        if (!this.isMounted()){
            return 0;
        }
        else{
            var node = this.refs.svgNode.getDOMNode();
            var rect = node.getBoundingClientRect();
            return rect.width;
        }
    },
    calculateHeight: function(){
        if (this.props.height !="auto"){
            return this.props.height;
        };
        if (!this.isMounted()){
            return 0;
        }
        else{
            var node = this.refs.svgNode.getDOMNode();
            var rect = node.getBoundingClientRect();
            return rect.height;
        }
    },
    // Cuenta los tags y devuelve la estructura con la cual
    // construir la nube de tags
    processData: function(data){
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
    },
    calculateWords: function(data){
        var width = this.calculateWidth();
        var height = this.calculateHeight();
        var tags = this.processData(data).sort(function(x,y){return y.value - x.value;})
                       .slice(0,200); // Limita la cantidad de palabras a mostrar
        var cloud = d3.layout.cloud()
                             .timeInterval(10)
                             .size([width, height])
                             .words(tags)
                             .padding(3)
                             .rotate(function(){return 0;})
                             .font("Impact")
                             .fontSize(function(d) {
                                 return 10*Math.sqrt(d.value);
                             })
                             .on("end", this.calculateCallback)
                             .start();
    },
    calculateCallback: function(words){
        console.log("calculateCallback");
        this.setState({
            width: this.calculateWidth(),
            height: this.calculateWidth(),
            words: words
        });
        this.forceUpdate();
    },
    createReactWords: function(words){
        words = words.sort(function(x,y){return y.value - x.value;});
        var self = this;
        var listaElems = words.map(function(props, i){
            var animate = self.props.animate;
            return <Text key={"tag-"+props.text}
                         color={fill(i)}
                         animate={animate}
                         {...props} />;
        });
        return listaElems;
    },
    onResizeCallback: function(event){
        this.calculateWords(this.props.data);
    },

    componentDidMount: function() {
        window.addEventListener('resize', this.onResizeCallback);
        this.calculateWords(this.props.data);
    },
    componentWillUnmount: function(){
        window.removeEventListener('resize', this.onResizeCallback);
    },
    componentWillReceiveProps: function(nextProps){
        this.calculateWords(nextProps.data);
    },
    shouldComponentUpdate: function(nextProps, nextState){
        /*
        if (this.state.width != nextState.width ||
            this.state.height != nextState.height)
            return true;
        if (this.props.data.length == nextProps.data.length)
            return false;
         */
        //No dejamos que se actualize por cambio de propiedades
        //Antes debemos calcular las nuevas posiciones

        //return true;
        //this.calculateWords(nextProps.data);
        return false;
    },
    render: function() {
        var initialWidth = this.props.width;
        var height = this.calculateHeight();
        if (! this.isMounted()){
            return (
                <svg ref="svgNode"
                     width={initialWidth=="auto" ? "100%":initialWidth}></svg>
            );
        }
        var elems = this.createReactWords(this.state.words);
        var width =  this.calculateWidth();
        return(
            <svg ref="svgNode"
                 width={initialWidth=="auto" ? "100%":initialWidth}>
                
                <g ref="cloudgroup"
                   transform={"translate("+[width/2,height/2]+")"}>
                    {elems}
                </g>
            </svg>
        );
    }
});

var Text = React.createClass({
    getDefaultProps: function(){
        return {
            animate: false
        };
    },
    componentWillReceiveProps: function(nextProps){
        if(this.props.animate) {
            var node = this.refs.text.getDOMNode();
            var text = d3.select(node);
            text.transition()
                .duration(1000)
                .attr("x", nextProps.x)
                .attr("y", nextProps.y)
                .style("font-size", nextProps.size + "px")
                .attr("fill", nextProps.color);
        }
    },
    shouldComponentUpdate: function(){
        if (this.props.animate){
            return false;
        }
        else{
            return true;
        }
    },
    componentDidMount: function(){
        var node = this.refs.text.getDOMNode();
        node.style.opacity = 0;
        setTimeout(function(){node.style.opacity = 1;}, 100);
    },
    render: function(){
        var props = this.props;
        var styleProps ={
            fontFamily: props.font,
            fill: props.color
        };
        return(
            <text
                ref="text"
                className="cloudTag"
                textAnchor="middle"
                x={props.x}
                y={props.y}
                fontSize={props.size +"px"}
                {...styleProps}>
                {props.text}
            </text>
        );
    }
});

module.exports = Cloud;
