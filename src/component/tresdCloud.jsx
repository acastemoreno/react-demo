var fill = d3.scale.category20();

var tresdCloud = {};

var getCloudCallback = function(svgNode, state){
    var callback = function draw (words) {
        console.log("Draw");
        var text = d3.select(svgNode)
                     .selectAll("g")
                     .data(words, function(d){return d.text.toLowerCase();});
        //Actualizados (despues de .data() )
        text .attr("class", "cloudTagWrapper")
             .style("transform", function(d) {
                 return ("translate(" +
                         [(d.x + state.width/2)+"px",
                          (d.y+state.height/2)+"px"]
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
                                    [(d.x + state.width/2)+"px",
                                     (d.y+state.height/2)+"px"]
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
                         .padding(3)
                         .rotate(function() { return 0; })
                         .font("Impact")
                         .fontSize(function(d) { return 10*Math.sqrt(d.value); })
                         .text(function(d){ return d.text;})
                         .on("end", getCloudCallback(svgNode, state))
                         .start();
    window.palabras = state.data;
    return cloud;
};

tresdCloud.update = function(svgNode, cloud, state) {
    cloud.stop()
         .size([state.width, state.height])
         .words(state.data)
         .on("end", getCloudCallback(svgNode, state))
         .start();
};

tresdCloud.destroy = function(svgNode){
    svgNode.selectAll("g").remove();
};

module.exports = tresdCloud;
