var fill = d3.scale.category20();

var tresdCloud = {};

tresdCloud.create = function(el, props, state) {
    var draw = function (words) {
        var text = d3.select(el)
          .append("g")
          .attr("transform", "translate("+props.width/2+","+props.height/2+")" )
          .selectAll("text")
          .data(words)
          .enter().append("text")
          .attr("class", "cloudTag")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; })
          .on("click", function(d){
              if (state.callback)
                  state.callback(d);
          });
    };
    
    var cloud = d3.layout.cloud()
                          .size([props.width, props.height])
                          .words(state.data)
                          .padding(3)
                          .rotate(function() { return 0; })
                          .font("Impact")
                          .fontSize(function(d) { return 10*Math.sqrt(d.size); })
                          .on("end", draw)
                          .start();
    window.palabras = state.data;
};

tresdCloud.update = function(el, props, state) {
    this.destroy(el);
    this.create(el, props, state);

};

tresdCloud.destroy = function(el){
    d3.select(el).selectAll("g").remove();
};

module.exports = tresdCloud;
