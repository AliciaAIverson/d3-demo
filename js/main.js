//This is: MODULE 7 for Geography 575, Spring 2017 by AAIverson.
//Due: Tue March 14, 2017

//Goals: 
//1. Lesson 1 (Chapter 5 in Murray, 2013): D3 SELECTIONS AND BLOCKS - Create a visible SVG graphic with an inner rectangle using properly formatted D3 code blocks in the main.js script of your d3-demo site (lines 8-34).
//2. Lession 2 (Chapters 5 and 6): DATA - Find population data for at least four cities of your choice (other than those used in the example), and create an array containing an object for each city similar to the cityPop array in Example 2.7. Using properly formatted D3 code blocks, create a bubble chart with circles named according to city name and sized according to city population.
//3. Lesson 3 (Chapters 7 and 8): SCALES, AXES AND TEXT - Add properly formatted vertical axis, title, and labels to your chart. 

///////////////////////////////LESSON 1 code follows...
//Rules: 
//A. (Shaking Hands with D3) Place each operator applied to a selection on its own line, indented one tab (four spaces) from the first line of the code block.
//B. (Selections) In any method chain or block, only chain together methods belonging to the library referenced at the start of the chain.
//C. (Operands) Only place a semicolon after the last line of a block. If your code results in errors, look for a wayward semicolon.
//D. (Operands) Give each block a name by assigning it to a variable named for the operand it holds.
//E. (Operands) Assign each newly created element a class name identical to the name of the block.
//F. (Operands) Create only one new element per block.

//SVG dimension variables
var w = 900, h = 500;

//container block
var container = d3.select("body") //get the <body> element from the DOM
    //svg = operand, follows
    .append("svg") //put a new svg in the body
    //operators that manipulates the svg/operand element follow
    .attr("width", w) //assign the width
    .attr("height", h) //assign the heightelement
    .attr("class", "container") //always assign a class (as the block name) for styling and future selection
    .style("background-color", "rgba(0,0,0,0.05)"); //only put a semicolon at the end of the block! Could also style in CSS stylesheet, but this indicates "higher-priority inline style"

//rect dimension variables
var width, height;

//innerRect block
var innerRect = container.append("rect")
    .datum(400) //a single value is a DATUM (singular for data) created to draw and manipulate graphics
    .attr("width", function(d){ //rectangle width
        return d * 2; //400 * 2 = 800
    })
    .attr("height", function(d){ //rectangle height
        return d; //400
    })
    .attr("class", "innerRect") //class name
    .attr("x", 50) //position from left on the x (horizontal) axis
    .attr("y", 50) //position from top on the y (vertical) axis
    .style("fill", "#FFFFFF"); //fill color



/////////////////////////////LESSON 2 code follows...
//Rule: 
//A. (Magical Data) All data passed to the .data() operator must be formatted as an array.
//B. (Joining Data) Always pass the block's name as a class selector to the .selectAll() method when creating an empty selection.


//Defining array for proportional symbols
//d will now be an object with two values from the array: city and population
var cityPop = [
        {
            city: 'Madison, Wisconsin',
            population: 233209
        },
        {
            city: 'Arcata, California',
            population: 17231
        },
        { 
            city: 'Sacramento, California',
            population: 466488
        },
        {
            city: 'Magna, Utah',
            population: 26505
        },
        {
            city: 'South Lake Tahoe, California',
            population: 21403
        }
    ];

///////////////////////////LESSON 3 code follows...

//determining max and min population values
//find the minimum value of the array
var minPop = d3.min(cityPop, function(d){
    return d.population;
});

//find the maximum value of the array
var maxPop = d3.max(cityPop, function(d){
    return d.population;
});

//vertical axis/scale for circles center y coordinate/y coordinate linear scale
var y = d3.scaleLinear()
    .range([450, 50])
    .domain([0, 550000]);

//x coordinate linear scale
//the operand of x is not a single value, object or array, but the d3.scaleLinear() method creates a generator = custom function used to decide where in the range each output value lies based on each input datum sent to it.
var x = d3.scaleLinear() //create the scale
    .range([90, 525]) //output min and max
    .domain([0, 3]); //input min and max

//implementing a color scale
//color scale generator 
var color = d3.scaleLinear()
    .range([
        "#FDBE85",
        "#D94701"
    ])
    .domain([
        minPop, 
        maxPop
    ]);

/////////////////////////////LESSON 2 code follows...

//Creating proportional symbols
var circles = container.selectAll(".circles") //create an empty selection
    .data(cityPop) //here we feed in an array
    .enter() //one of the great mysteries of the universe/where the magic really happens--joins the data to the selection, creating an array of placeholders for 1 markup element per data value in the array. Here it is making a circle for each value in the array
    .append("circle") //inspect the HTML--holy crap, there's some circles there
    .attr("class", "circles")
    .attr("id", function(d){
        return d.city;
    })
    .attr("r", function(d){
        //calculate the radius based on population value as circle area
        var area = d.population * 0.01;
        return Math.sqrt(area/Math.PI);
    })
    .attr("cx", function(d, i){
        //use the scale generator with the index to place each circle horizontally
        return x(i);
    })
    .attr("cy", function(d){
        //applying the y scale to return the circles' center y coordinates
        return y(d.population);
    })
    //all following is from Lesson 3 code Ex3.5
    .style("fill", function(d, i){ //add a fill based on the color scale generator
        return color(d.population);
    })
    .style("stroke", "#000"); //black circle stroke

/////////////////////////////LESSON 3 code follows...
//Rule: (Axes) Assign static or default styles in *style.css.*

//create y axis generator
var yAxis = d3.axisLeft(y); //the argument y = scale generator. the axis generator references this function to do its work

//create new svg element to hold the axis g (group--axis draws several new child elements) element and add axis
var axis = container.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(50, 0)") //add a "transform" attribute to the <g> element that translates (moves) it to the right of its 0,0 coordinate (which is far off to the left originally)
    .call(yAxis); //we use the .call() method to invert the order of the code, feeding the axis selection to the yAxis. This is a useful shorthand for generator that doesn't return anything

//Create a text element and add the title
var title = container.append("text")
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .attr("x", 450)
    .attr("y", 30)
    .text("My Lived Cities and the People Within Them");

//Example 3.14 line 1...create circle labels
var labels = container.selectAll(".labels")
    .data(cityPop)
    .enter()
    .append("text")
    .attr("class", "labels")
    .attr("text-anchor", "left")
    .attr("y", function(d){
        //vertical position centered on each circle
        return y(d.population) - 25; //-20 refers to adjusting the "y" attribute in the labels block to vertically postition the entire label relative to each circle;
    });

//first line of label
var nameLine = labels.append("tspan")
    .attr("class", "nameLine")
    .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .text(function(d){
        return d.city;
    });

//create format generator to format population numbers
var format = d3.format(",");

//second line of label offset
var popLine = labels.append("tspan")
    .attr("class", "popLine")
    .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
    })
    .attr("dy", "14") //vertical offset
    .text(function(d){
        return "Pop. " + format(d.population); //use format generator to format numbers
    });
