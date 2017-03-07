//Goals: Create a visible SVG graphic with an inner rectangle using properly formatted D3 code blocks in the main.js script of your d3-demo site.

//SVG dimension variables
var w = 900, h = 500;

//Example 1.3 line 4...container block
var container = d3.select("body") //get the <body> element from the DOM
    .append("svg") //put a new svg in the body
    .attr("width", w) //assign the width
    .attr("height", h) //assign the height
    .attr("class", "container") //assign a class name
    .style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!
