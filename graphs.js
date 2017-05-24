queue()
    .defer(d3.json,'http://128.119.243.147:11000/marvel')
    .defer(d3.json,'http://128.119.243.147:11000/dc')
    .await(makeGraphs);

var rowchart= dc.rowChart("#row")
var groupchart = dc.barChart("#group1");
var piechart   = dc.pieChart("#pie1");
var chart1  = dc.barChart("#bar1");
var chart2  = dc.barChart("#bar2");
var series1  = dc.seriesChart("#series1");
var heatmap1 = dc.heatMap("#heat1");
var heatmap2 = dc.heatMap("#heat2");
var heatmap3 = dc.heatMap("#heat3");
var heatmap4 = dc.heatMap("#heat4");



function makeGraphs(error, marvelJson, dcJson){
    dcJson.forEach(function(d) {console.log(d['APPEARANCES_R']);});
    var ndx = crossfilter();
        ndx.add(marvelJson);
        ndx.add(dcJson);

   
    var pieDimension = ndx.dimension(function(d) {return d.ComicType}),
        pieGroup     = pieDimension.group().reduceCount(function(d) {return d.ComicType;});
     
    var barDim1   = ndx.dimension(function(d) {return +d['Year'];}),
        barGroup1 = barDim1.group().reduce(
        function (p, v) {
            if( v.ComicType in p.Comics)
                p.Comics[v.ComicType]++;
            else {
                 p.Comics[v.ComicType] = 1;
                 p.ComicCount++;
            }
            //console.log(p.Comics['marvel'])
            return p;
          },

          function (p, v) {
            p.Comics[v.ComicType]--;
            if(p.Comics[v.ComicType] === 0){
                delete p.Comics[v.ComicType];
                p.ComicCount--;
            }
            return p;
          },

          function () {
            return {
                    ComicCount: 0,
                    Comics: {}};
          });

    var barDim2   = ndx.dimension(function(d) {return +d['Year'];}),
        barGroup2 = barDim2.group().reduce(
        function (p, v) {
            if( v.ComicType in p.ComicsDC)
                p.ComicsDC[v.ComicType]++;
            else {
                 p.ComicsDC[v.ComicType] = 1;
                 p.ComicDCCount++;
            }
            //console.log(p.Comics['marvel'])
            return p;
          },

          function (p, v) {
            p.ComicsDC[v.ComicType]--;
            if(p.ComicsDC[v.ComicType] === 0){
                delete p.ComicsDC[v.ComicType];
                p.ComicDCCount--;
            }
            return p;
          },

          function () {
            return {
                    ComicDCCount: 0,
                    ComicsDC: {}};
          });


    var rowDim    = ndx.dimension(function(d) {return d['ALIGN'];}),
        rowGroup  = rowDim.group().reduceCount(function(d) {return d['ALIGN'];});

    var   groupbarDim     = ndx.dimension(function(d) {return Math.floor(+d['page_id']/50000);}),
          groupbarGroup   = groupbarDim.group().reduce(
          function (p, v) {
            if(v.ALIGN in p.ALIGNS)
                p.ALIGNS[v.ALIGN]++;
            else {
                 p.ALIGNS[v.ALIGN] = 1;
                 p.ALIGNCount++;
            }
            //console.log(p.ALIGNS['Bad Characters'])
          return p;  
          },

          function (p, v) {
            p.ALIGNS[v.ALIGN]--;
            if(p.ALIGNS[v.ALIGN] === 0){
                delete p.ALIGNS[v.ALIGN];
                p.ALIGNCount--;   
            }
           return p; 
          },

          function () {
            return {
                    ALIGNCount: 0,
                    ALIGNS: {}};
          });

     

          function sel_stack(i) {
              return function(p) {
                  //console.log(i, p.value.ALIGNS[i])
                  return p.value.ALIGNS[i]
              };
          }

     var seriesDim1 = ndx.dimension(function(d){return [d.SEX, +d['Year']];});    
     var seriesGrp1 = seriesDim1.group().reduceCount(function(d){return d['SEX'];});

     var def_value = document.querySelector('input[name="operation"]:checked').value;

     var heatDim1 = ndx.dimension(function(d){ return [d.EYE, d.ComicType]; }),
         heatGrp1 = heatDim1.group().reduceSum(function(d){ return +d[def_value]; });

     var heatDim2 = ndx.dimension(function(d){ return [d.HAIR, d.ComicType]; }),
         heatGrp2 = heatDim2.group().reduceSum(function(d){ return +d[def_value]; });

     var heatDim3 = ndx.dimension(function(d){ return [d.GSM, d.ComicType]; }),
         heatGrp3 = heatDim3.group().reduceSum(function(d){ return +d[def_value]; });

     var heatDim4 = ndx.dimension(function(d){ return [d.ID, d.ComicType]; }),
         heatGrp4 = heatDim4.group().reduceSum(function(d){ return +d[def_value]; });




          piechart
              .width(330)
              .height(300)
              .slicesCap(5)
              .innerRadius(60)
              .cx([150])
              .cy([140])
              .externalLabels(20)
              .externalRadiusPadding(20)
              .drawPaths(true)
              .dimension(pieDimension)
              .group(pieGroup)
              .colors(d3.scale.category10())
              .legend(dc.legend().x(140).y(130))
              .title(function(d){
                return "Comic ID: " + d.key + "\n" + "Characters: " + d.value;
              });
          
          //piechart.margins().left = 75;
          piechart.render();


    chart1
        .width(450)
        .height(280)
        .x(d3.scale.linear().domain([1939,2013]))
        .y(d3.scale.linear().domain([0,160]))
        .brushOn(true)
        .yAxisLabel("Number of chars added per year")
        .xAxisLabel("Year")
        .dimension(barDim1)
        .group(barGroup1,'Marvel',function(d){return d.value.Comics['marvel'];})
        .elasticY(true)
        .elasticX(false)
        .controlsUseVisibility(true)
        .title(function(d) {
            return "Year" + ":   " + d.key + "\n" +
               "Value: " + (+d.value.Comics['marvel']);});
      chart1.margins().left = 60;
      chart1.xAxis().tickValues([0,1950,1970,1990,2013]);  
           
      chart1.render();

      chart2
        .width(450)
        .height(280)
        .x(d3.scale.linear().domain([1935,2012]))
        .y(d3.scale.linear().domain([0,160]))
        .brushOn(true)
        .yAxisLabel("Number of chars added per year")
        .xAxisLabel("Year")
        .dimension(barDim2)
        .group(barGroup2,'DC',function(d){return d.value.ComicsDC['dc'];})
        .elasticY(false)
        .elasticX(false)
        .controlsUseVisibility(true)
        .title(function(d) {
            return "Year" + ":   " + d.key + "\n" +
               "Value: " + (+d.value.ComicsDC['dc']);});
      	chart2.margins().left = 60;
      chart2.xAxis().tickValues([0,1950,1970,1990,2013]);  
           
      chart2.render();


    rowchart
        .width(500)
        .height(200)
        .x(d3.scale.ordinal())
        .elasticX(true)
        .dimension(rowDim)
        .group(rowGroup)
        .colors(d3.scale.category10());
    rowchart.margins().left = 20;


         groupchart
              .width(700)
              .height(300)
              .x(d3.scale.linear().domain([0,16]))
              .margins({left: 40, top: 20, right: 10, bottom: 40})
              .brushOn(false)
              .elasticY(true)
              .xAxisLabel('Page Range')
              .yAxisLabel('Number of Characters')
              //.elasticX(true)
              .clipPadding(10)
              .renderType('group')
              .dimension(groupbarDim)
              .group(groupbarGroup,'Bad Characters',sel_stack('Bad Characters'))
              .title(function(d) {
                 return "Page Range: " + d.key * 50000 + "-" + (d.key + 1) * 50000 + "\n" +
                        "Type" + ":   " + this.layer + "\n" +
                        "Value: " + (+d.value.ALIGNS[this.layer]);});
              //.renderLabel('group');
          groupchart.legend(dc.legend().x(400));
          groupchart.xAxis().tickFormat(function(d) {return d3.format(',d')(d * 50000)})
          //for(var i = 2; i<6; ++i)
          groupchart.stack(groupbarGroup, 'Good Characters', sel_stack('Good Characters'));
          groupchart.stack(groupbarGroup, 'Neutral Characters', sel_stack('Neutral Characters'));
          groupchart.stack(groupbarGroup, 'Reformed Criminals', sel_stack('Reformed Criminals'))
          groupchart.xAxis().tickValues([0,2,4,6,8,10,12,14]);
      	  groupchart.margins().left = 60;
          groupchart.render();

function series(dimension, group, colors){
   series1
    .width(600)
    .height(400)
    .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
    .x(d3.scale.linear().domain([1939,2013]))
    .brushOn(false)
    .yAxisLabel("Number of Characters per year")
    .xAxisLabel("Year")
    .clipPadding(10)
    .elasticY(true)
    .colors(d3.scale.ordinal().range(colors))
    .dimension(dimension)
    .group(group)
    .mouseZoomable(false)
    .shareTitle(false) // allow default scatter title to work
    .seriesAccessor(function(d) {return d.key[0];})
    .keyAccessor(function(d) {return +d.key[1];})
    .valueAccessor(function(d) {return +d.value;})
    .legend(dc.legend().x(80).y(10).itemHeight(13).gap(10).horizontal(10).legendWidth(160).itemWidth(140));
  //chart.yAxis().tickFormat(function(d) {return d;});
  series1.margins().left = 70;
    series1.render();
}

series(seriesDim1, seriesGrp1, ['red','orange','green','purple','pink','royalblue','gold'])
  // Render the Charts


var filter = document.getElementById("filter");

marvelcolors = {'MARVEL':['red','orange','green','pink','royalblue'], 'DC':['orange','purple','pink','royalblue','gold'], 'BOTH':['red','orange','green','purple','pink','royalblue','gold']}

filter.onchange = function(){

    yvalue = filter.options[filter.selectedIndex].value; 
 
    if( yvalue == 'BOTH'){
        //console.log(yvalue)
        ndx1 = crossfilter()
        ndx1.add(marvelJson)
        ndx1.add(dcJson)

        var seriesDim1 = ndx1.dimension(function(d){return [d['SEX'], +d['Year']];});    
        var seriesGrp1 = seriesDim1.group().reduceCount(function(d){return d['SEX'];});
        series(seriesDim1, seriesGrp1, marvelcolors[yvalue])
        dc.redrawAll();
    }
    if( yvalue == 'MARVEL'){
        //console.log(yvalue)
        ndx1 = crossfilter(marvelJson)
        var seriesDim1 = ndx1.dimension(function(d){return [d['SEX'], +d['Year']];});    
        var seriesGrp1 = seriesDim1.group().reduceCount(function(d){return d['SEX'];});
        series(seriesDim1, seriesGrp1, marvelcolors[yvalue])
        dc.redrawAll();
    }

    if( yvalue == 'DC'){
        //console.log(yvalue)
        ndx1 = crossfilter(dcJson)
        var seriesDim1 = ndx1.dimension(function(d){return [d['SEX'], +d['Year']];});    
        var seriesGrp1 = seriesDim1.group().reduceCount(function(d){return d['SEX'];});
        series(seriesDim1, seriesGrp1, marvelcolors[yvalue])
        dc.redrawAll();  
    }


}


function heat(heatmap, dimension, group, heatColorMapping, value, n){

    heatmap
    .width(45 * 21)
    .height(45 * 4)
    .dimension(dimension)
    .group(group)
    .keyAccessor(function(d) { return d.key[0]; })
    .valueAccessor(function(d) { return d.key[1]; })
    .colorAccessor(function(d) { return +d.value; })
    .title(function(d) {
        return value + ":   " + d.key[0] + "\n" +
               "Comic Franchise:  " + d.key[1] + "\n" +
               "Number of Appearances: " + (d.value * n); })
    .colors(heatColorMapping)
    .calculateColorDomain();
    heatmap.margins().left = 50;
    heatmap.margins().bottom = 100;

    return heatmap;
 }

    var heatColorMapping = d3.scale.linear().range(['skyblue','red']);

    heat1 = heat(heatmap1, heatDim1, heatGrp1, heatColorMapping, 'Eye Color', 1);
    heat2 = heat(heatmap2, heatDim2, heatGrp2, heatColorMapping, 'Hair Color', 1);   
    heat3 = heat(heatmap3, heatDim3, heatGrp3, heatColorMapping, 'Sexual Orientation', 1);
    heat4 = heat(heatmap4, heatDim4, heatGrp4, heatColorMapping, 'ID', 1);

    dc.renderAll();

        heat1
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");


        heat2
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");


/*        heat3
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");
*/

d3.selectAll("#select-operation input")
  .on('click', function() {
           
           value = document.querySelector('input[name="operation"]:checked').value;
           console.log(value)

           heatDimn1    = ndx.dimension(function(d) { return [d['EYE'], d['ComicType']]; });
           heatGrpn1    = heatDimn1.group().reduceSum(function(d) { return +d[value]; });

           heatDimn2    = ndx.dimension(function(d) { return [d['HAIR'], d['ComicType']]; });
           heatGrpn2    = heatDimn2.group().reduceSum(function(d) { return +d[value]; });
 
           heatDimn3    = ndx.dimension(function(d) { return [d['GSM'], d['ComicType']]; });
           heatGrpn3    = heatDimn3.group().reduceSum(function(d) { return +d[value]; });

           heatDimn4    = ndx.dimension(function(d) { return [d['ID'], d['ComicType']]; });
           heatGrpn4    = heatDimn4.group().reduceSum(function(d) { return +d[value]; });

           if( value == 'APPEARANCES')
               n = 1
           if( value == 'APPEARANCES_R')
               n = 100
           heat1 = heat(heatmap1, heatDimn1, heatGrpn1, heatColorMapping, 'Eye Color', n);
           heat2 = heat(heatmap2, heatDimn2, heatGrpn2, heatColorMapping, 'Hair Color', n);   
           heat3 = heat(heatmap3, heatDimn3, heatGrpn3, heatColorMapping, 'Sexual Orientation', n);
           heat4 = heat(heatmap4, heatDimn4, heatGrpn4, heatColorMapping, 'ID', n);

           dc.renderAll();

        heat1
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");


        heat2
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");


/*        heat3
          .selectAll("g.cols.axis > text")
          .style("text-anchor", "middle")
          .attr("transform", function () {
            var coord = this.getBBox();
            var x = coord.x + (coord.width/2),
                y = coord.y + (coord.height/2);
            return "rotate(40 " + x + " " + y + ")"
             })
          .style("fill", "black").style("text-anchor", "unset");
*/           
          });

dc.redrawAll();

var svg2 = d3.select("#legend").append("svg")
              .attr("width",500)
              .attr("height",50);
var defs = svg.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

linearGradient.append("stop") 
    .attr("offset", "0%")   
    .attr("stop-color", "skyblue"); //light blue

//Set the color for the end (100%)
linearGradient.append("stop") 
    .attr("offset", "100%")   
    .attr("stop-color", "red"); //dark blue

svg2.append("rect")
	.attr("width", 300)
	.attr("height", 20)
	.style("fill", "url(#linear-gradient)");

svg2.append("text")
        .attr("x",0)
        .attr("y",40)
        .text("Low")
        .attr("font-size",20);

svg2.append("text")
        .attr("x",260)
        .attr("y",40)
        .text("High")
        .attr("font-size",20);

}



