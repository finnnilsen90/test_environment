console.log('test')

var index = [.30, .80, 1, 1, .90, .80]
var cash = 5000;
var cr = .003;
var ctr =.015;
var cpm = 10;
var avg_ord = 80;

function revenue(cr,ctr,cpm,avg_ord,cash) {
    var imp = cash/(cpm/1000);
    var site = imp*ctr;
    var conv = site*cr;
    var revenue = conv*avg_ord;
    return revenue
}

console.log(revenue(cr,ctr,cpm,avg_ord,cash));

function graph(data_par,value,cr,cash) {
    this.new_data = [];
    var chng = value*.01 || 1;
    if (chng!==1) {
        for (var i=0;i<data_par.length;i++) {
            var ind_chng = data_par[i];
            var cr_f = (ind_chng*cr)+ind_chng
            var new_cash = (cash*value)/+value
            var rev = revenue(cr,ctr,cpm,avg_ord,new_cash);
            console.log(cr_f)
            console.log(rev)
            this.new_data.push(Math.round(rev));
        }
    } else {
        this.new_data = data_par;
    }

    d3.select('.chart')
        .selectAll('div')
        .data(this.new_data)
        .enter()
        .append('div')
        .style('width', function(d) { return d + 'px'; })
        .text(function(d) { return d; });
};

graph(index)

var slider = document.querySelector('.slider');
slider.addEventListener('mouseup', (c) => {
    var parent = document.querySelector('.parent')
    var chart = document.querySelector('.chart')
    var slider_val = slider.value;
    parent.removeChild(chart)
    var node = document.createElement('div')
    node.className = 'chart'
    parent.appendChild(node)
    graph(index,slider_val,cr,cash)
 });