var fill = d3.scale.category20();

var tresdCloud = {};

var getCloudCallback = function(svgNode, dims){
    var w = dims[0]; //width
    var h = dims[1]; //height
    var callback = function draw (words, bounds) {
        // Bounds contiene las coordenadas del rectangulo envolvente
        // de la nube de palabras (tomando en cuenta que el centro es
        // [w/2,h/2] )
        if (words.length){
            d3.select(svgNode)
              .transition()
              .delay(1200)
              .duration(1000)
              .attr("viewBox", [bounds[0].x - w/2,
                                bounds[0].y - h/2,
                                Math.abs(bounds[1].x - bounds[0].x),
                                Math.abs(bounds[1].y - bounds[0].y)].join(" "));
        }
        window.words = words;
        var text = d3.select(svgNode)
                     .selectAll("g")
                     .data(words, function(d){return d.text.toLowerCase();});

        //Actualizados (despues de .data() )
        text .attr("class", "cloudTagWrapper")
             .style("transform", function(d) {
                 return ("translate(" +
                         [d.x + "px",
                          d.y + "px"]
                         + ")rotate(" + d.rotate + ")");
             })
             .select("text")
             .style("font-size", function(d) { return d.size + "px"; })
             .style("fill", function(d, i) { return fill(i); });
        // Nuevos (con .enter() )
        var enter = text.enter()
                        .append("g")
                        .attr("class", "cloudTagWrapper")
                        .style("transform", function(d) {
                            return ("translate(" +
                                    [d.x + "px",
                                     d.y + "px"]
                                    + ")rotate(" + d.rotate + ")");
                        })
                        .append("text")
                        .text(function(d){return d.text;})
                        .attr("class", "cloudTag")
                        .attr("text-anchor", "middle")
                        .style("font-size", function(d) { return d.size + "px"; })
                        .style("font-family", "Impact")
                        .style("fill", function(d, i) { return fill(i); })
                        .style("opacity", 0)
                        .transition()
                        .delay(100)
                        .duration(700)
                        .style("opacity", 1);


        // Eliminados (con .exit() )
        var exit = text.exit()
                       .transition()
                       .duration(500)
                       .style("opacity", 0)
                       .delay(500)
                       .remove();
    };

    return callback;
}

tresdCloud.create = function(svgNode, state) {
    var cloud = d3.layout.cloud()
                         .timeInterval(10)
                         .size([state.width, state.height])
                         .words(state.data)
                         .wordLimit(100)
                         .padding(1)
                         .rotate(function() { return 0; })
                         .font("Impact")
                  .fontSize(function(d) { return 20*Math.sqrt(d.value/d.text.length); })
                         .text(function(d){ return d.text;})
                         .on("end", getCloudCallback(svgNode, [state.width, state.height]))
                         .start();
    return cloud;
};

tresdCloud.update = function(svgNode, cloud, state) {
    cloud.stop()
         .size([state.width, state.height])
         .words(state.data)
         .on("end", getCloudCallback(svgNode, [state.width,state.height]))
         .start();
};

tresdCloud.destroy = function(svgNode){
    svgNode.selectAll("g").remove();
};

module.exports = tresdCloud;
