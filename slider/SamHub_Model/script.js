var model = [['September',8.87],['October',5.25],['November',5.81],['December',9.29],['January',5.34],['February',6.19],['March',10.17],['April',7.89],['May',8.00],['June',7.98],['July',10.14],['August',8.87]]
var base=30000
function str_cash (x) {
    var str = x.toString()
    var len = str.slice().length
    var c = len-3
    var one_arr = str.slice(0,c)
    var two_arr = str.slice(c)
    return '$'+one_arr+','+two_arr
}

this.cash=base;

function revenue (forcast,spend) {
    return forcast*spend
}



function graph(data_par,location,value) {
    var new_data = [];    
    var chng = value*.01 || 1;
    var new_cash = chng===1?this.cash:(base*chng)+base
    var cash = str_cash(new_cash)

    var parent = document.querySelector(location).parentNode;
    var chart = document.querySelector(location);
    parent.removeChild(chart);
    var node = document.createElement('div');
    node.className = location.slice(1);
    parent.appendChild(node);
    
    for (var i=0;i<model.length;i++) {

        var rev = new_cash*model[i][1]
        new_data.push(Math.round(rev));

    }

    d3.select(location)
        .selectAll('div')
        .data(new_data)
        .enter()
        .append('div')
        .style('width', function(d) { return (d*.001) + 'px'; })
        .text(function(d) { return str_cash(d); });
};

graph(model,'.chart')

function chng_cash() {
    var cash_div = document.querySelector('.cash');
    cash_div.innerHTML = this.cash
}

chng_cash()

var slider = document.querySelector('.slider');
slider.addEventListener('mouseup', (c) => {

    var slider_val = slider.value;
    graph(model,'.chart',slider_val);
    chng_cash()

 });