console.log('test')

var data = [30, 86, 168, 281, 303, 365]

function graph(data_par,value) {
    this.new_data = [];
    // if (lst_value<value) {
    //     var chng = this.lst_value*-.01 || 1;
    // } else {
    //     var chng = this.lst_value*.01 || 1;
    // }
    var chng = value*.01 || 1;
    console.log('slider value => '+chng)
    if (chng!==1) {
        for (var i=0;i<data.length;i++) {
            this.new_data.push(Math.round((data_par[i]*chng)+data_par[i]));
        }
    } else {
        this.new_data = data_par;
    }

    console.log(this.new_data)
    d3.select('.chart')
        .selectAll('div')
        .data(this.new_data)
        .enter()
        .append('div')
        .style('width', function(d) { return d + 'px'; })
        .text(function(d) { return d; });
};

graph(data)

var slider = document.querySelector('.slider');
slider.addEventListener('mouseup', (c) => {
    var parent = document.querySelector('.parent')
    var chart = document.querySelector('.chart')
    var slider_val = slider.value;
    parent.removeChild(chart)
    var node = document.createElement('div')
    node.className = 'chart'
    parent.appendChild(node)
    graph(data,slider_val)
 });