    var input = prompt("Enter Filename", "saccadous_data.csv");

    var points = d3.text(input, function(text){
    
        var data = d3.csv.parseRows(text).map(function(row){
            return row.map(function(value) { return +value;});
        });

        var coords = [];
        for ( i = 0; i<data.length; i++){
          coords.push( [ data[i][5], data[i][6] ] );
        }

        console.log( "coords contains " + coords.length +" points.");
    
        var margin = {top: 20, right: 15, bottom: 60, left: 60}, 
            width = 960 - margin.left - margin.right
            height = 500 - margin.top - margin.bottom;
        
        var x = d3.scale.linear()
            .domain([d3.min(coords, function(d) { return d[0]; }), 200/*d3.max(coords, function(d) { return d[0]; })*/])
            .range( [ 0, width ] );
        
        var y = d3.scale.linear()
            .domain([d3.min(coords, function(d){return d[1];}) , d3.max(coords, function(d) { return d[1]; })])
            .range([height, 0 ]);
     
        var chart = d3.select('body')
        	.append('svg:svg')
        	.attr('width', width + margin.right + margin.left)
        	.attr('height', height + margin.top + margin.bottom)
        	.attr('class', 'chart')

        var main = chart.append('g')
        	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        	.attr('width', width)
        	.attr('height', height)
        	.attr('class', 'main')   
                
        // draw the x axis
        var xAxis = d3.svg.axis()
        	.scale(x)
        	.orient('bottom');

        main.append('g')
        	.attr('transform', 'translate(0,' + height + ')')
        	.attr('class', 'main axis date')
        	.call(xAxis);

        // draw the y axis
        var yAxis = d3.svg.axis()
    	   .scale(y)
    	   .orient('left');

        main.append('g')
    	   .attr('transform', 'translate(0,0)')
    	   .attr('class', 'main axis date')
    	   .call(yAxis);

        var g = main.append("svg:g"); 

        g.selectAll("scatter-dots")             
            .data(coords)
            .enter()      
            .append("circle")
            .attr("cx", function (d,i) { return x(d[0]); } )
            .attr("cy", function (d) { return y(d[1]); } )
            .attr("stroke", "black")
            .attr("fill", "blue")
            .attr("r", 0)
            .transition().duration(0)
            .delay(function(d, i) { return i * 4.99; })
            .attr("r", 0)
            .transition().duration(0)
            .delay(function(d, i) { return i * 5; })
            .attr("r", 3)
            .transition().duration(0)
            .delay(function(d, i) {return i * 5.01;})
            .attr("r", 1)
            .attr("fill", "rgb(255,128,0)")
            .transition().duration(0)
            .delay(function(d, i) {return i * 5.1;})
            .attr("r", 0);
});