var index = [.00030, .00080, .0009, .0009, .00090, .00080]
this.input = {'cash': 1250, 'cr': .003, 'ctr': .015, 'cpm': 10, 'avg_ord': 80};
this.cash;

function revenue(cr,ctr,cpm,avg_ord,cash) {
    var imp = cash/(cpm/1000);
    var site = imp*ctr;
    var conv = site*cr;
    var revenue = conv*avg_ord;
    return revenue
}

function graph(data_par,value) {
    this.new_data = [];
    var chng = value*.01 || 1;
   
    for (var i=0;i<data_par.length;i++) {
        var ind_chng = data_par[i];
        var cr = this.input.cr;
        var cash = this.input.cash;
        var avg_ord = this.input.avg_ord;
        var ctr = this.input.ctr;
        var cpm = this.input.cpm;

        var cr_f = (ind_chng*cr)+ind_chng
        var new_cash = chng===1?cash:(cash*chng)+cash
        this.cash = new_cash;
        var rev = revenue(cr_f,ctr,cpm,avg_ord,new_cash);
        this.new_data.push(Math.round(rev));
    }

    d3.select('.chart')
        .selectAll('div')
        .data(this.new_data)
        .enter()
        .append('div')
        .style('width', function(d) { return d + 'px'; })
        .text(function(d) { return '$'+d; });
};

graph(index)

function chng_cash() {
    var cash_div = document.querySelector('.cash');
    cash_div.innerHTML = this.cash?'$'+this.cash:'$'+this.input.cash;
}

chng_cash()

var slider = document.querySelector('.slider');
slider.addEventListener('mouseup', (c) => {
    var parent = document.querySelector('.parent');
    var chart = document.querySelector('.chart');
    var slider_val = slider.value;
    parent.removeChild(chart);
    var node = document.createElement('div');
    node.className = 'chart';
    parent.appendChild(node);
    graph(index,slider_val);
    chng_cash()
 });