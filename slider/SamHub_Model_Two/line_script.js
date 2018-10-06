var model = [['Sep',8.87],['Oct',5.25],['Nov',5.81],['Dec',9.29],['Jan',5.34],['Feb',6.19],['Mar',10.17],['Apr',7.89],['May',8.00],['Jun',7.98],['Jul',10.14],['Aug',8.87]]
var base=30000
function str_cash(x) {
    var str = x.toString()
    var len = str.slice().length
    var c = len-3
    var one_arr = str.slice(0,c)
    var two_arr = str.slice(c)
    return '$'+one_arr+','+two_arr
}

var cash=base;

function chng_cash(cash) {
  var cash_div = document.querySelector('.cash');
  cash_div.innerHTML = str_cash(cash)
}

chng_cash(cash)

function exc_model(arr,value) {

  new_arr = [];
  for (var i=0;i<arr.length;i++) {
    new_arr.push(Math.round(value*arr[i][1]))
  }

  return new_arr
}



this.output = exc_model(model,cash);

var slider = document.querySelector('.slider');
slider.addEventListener('mouseup', (c) => {

    var slider_val = slider.value;
    cash=slider_val*base;
    this.output = exc_model(model,cash);
    chng_cash(cash)

 });

var n = 1, // The number of series.
    m = 12; // The number of values per series.



// The xz array has m elements, representing the x-values shared by all series.
// The yz array has n elements, representing the y-values of each of the n series.
// Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
// The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
var xz = d3.range(m),
    yz = d3.range(n).map(function() { return this.output; }),
    y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
    yMax = d3.max(yz, function(y) { return d3.max(y); }),
    y1Max = d3.max(y01z, function(y) { return d3.max(y, function(d) { return d[1]; }); });

console.log('### axis values ###')
console.log('xz => '+xz)
console.log('yz =// ')
console.log(yz)
console.log('y01z =// ')
console.log(y01z)


// Actual graph image in svg format.
var svg = d3.select("svg"),
    margin = {top: 40, right: 10, bottom: 20, left: 10},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .domain(xz)
    .rangeRound([0, width])
    .padding(0.08);

var y = d3.scaleLinear()
    .domain([0, y1Max])
    .range([height, 0]);

var color = d3.scaleOrdinal()
    .domain(d3.range(n))
    .range(d3.schemeCategory20c);

var series = g.selectAll(".series")
  .data(y01z)
  .enter().append("g")
    .attr("fill", function(d, i) { return color(i); });

var rect = series.selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("x", function(d, i) { return x(i); })
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("height", 0);

// renders graph
rect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); });

// Plots x-axis
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
        .tickSize(0)
        .tickPadding(6));

d3.selectAll("input")
    .on("mouseup", console.log('listener for change confirmed'));

// var timeout = d3.timeout(function() {
//   d3.select("input[value=\"grouped\"]")
//       .property("checked", true)
//       .dispatch("change");
// }, 2000);

// function changed() {
//   timeout.stop();
//   if (this.value === "grouped") transitionGrouped();
//   else transitionStacked();
// }

// function transitionGrouped() {
//   y.domain([0, yMax]);

//   rect.transition()
//       .duration(500)
//       .delay(function(d, i) { return i * 10; })
//       .attr("x", function(d, i) { return x(i) + x.bandwidth() / n * this.parentNode.__data__.key; })
//       .attr("width", x.bandwidth() / n)
//     .transition()
//       .attr("y", function(d) { return y(d[1] - d[0]); })
//       .attr("height", function(d) { return y(0) - y(d[1] - d[0]); });
// }

// function transitionStacked() {
//   y.domain([0, y1Max]);

//   rect.transition()
//       .duration(500)
//       .delay(function(d, i) { return i * 10; })
//       .attr("y", function(d) { return y(d[1]); })
//       .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//     .transition()
//       .attr("x", function(d, i) { return x(i); })
//       .attr("width", x.bandwidth());
// }

// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
// function bumps(m) {
//   var values = [], i, j, w, x, y, z;

//   // Initialize with uniform random values in [0.1, 0.2).
//   for (i = 0; i < m; ++i) {
//     values[i] = 0.1 + 0.1 * Math.random();
//   }

//   // Add five random bumps.
//   for (j = 0; j < 5; ++j) {
//     x = 1 / (0.1 + Math.random());
//     y = 2 * Math.random() - 0.5;
//     z = 10 / (0.1 + Math.random());
//     for (i = 0; i < m; i++) {
//       w = (i / m - y) * z;
//       values[i] += x * Math.exp(-w * w);
//     }
//   }

//   // Ensure all values are positive.
//   for (i = 0; i < m; ++i) {
//     values[i] = Math.max(0, values[i]);
//   }

//   return values;
// }