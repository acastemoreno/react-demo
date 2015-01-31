var fill = d3.scale.category20();

var tresdCloud = {};

function draw(words) {
    d3.select(".Cloud").append("svg")
        .attr("width", 300)
        .attr("height", 300)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { 
          console.log(d.text);
          return d.text; });
  }

tresdCloud.create = function(el, props, state) {
  d3.layout.cloud().size([300, 300])
      .words(state.data)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
 this.update(el, state);
};

tresdCloud.update = function(el, state) {
};

  module.exports = tresdCloud;