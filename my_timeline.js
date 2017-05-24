
outerwidth  = 780;
outerheight = 220;

var linedata = [
  { "name" : "mainline", "x1" : 10, "x2" : 800, "y1" : 100, "y2" : 100, "text" : '', "x" : 30, "y" : 90},
  { "name" : "BATMAN", "x1" : 70, "x2" : 70, "y1" : 100, "y2" : 60, "text" : '1939', "x" : 50, "y" : 120, "r" : 10, "img" : 'batman_n.png', "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Batman_(Bruce_Wayne)"},
  { "name" : "NIGHTWING", "x1" : 130, "x2" : 130, "y1" : 100, "y2" : 140, "text" : '1940', "x" : 110, "y" : 90 , "r" : 10, "img" : 'nightwing.jpg', "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Nightwing_(New_Earth)"},
  { "name" : "WONDER WOMAN", "x1" : 190, "x2" : 190, "y1" : 100, "y2" : 60, "text" : '1941', "x" : 170, "y" : 120, "r" : 10, "img" : "wonder_woman_n.jpg", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Wonder_Woman_(Diana_Prince)"},
  { "name" : "AQUAMAN", "x1" : 190, "x2" : 190, "y1" : 100, "y2" : 140, "text" : '1941', "x" : 170, "y" : 120, "r" : 10, "img" : "aquaman_n.jpg", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Aquaman_(Arthur_Curry)"},
  { "name" : "CAPTAIN AMERICA", "x1" : 190, "x2" : 190, "y1" : 100, "y2" : 180, "text" : '1941', "x" : 170, "y" : 120, "r" : 10, "img" : "captain_america.jpg", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Captain_America_(Steven_Rogers)"},
  { "name" : "THOR", "x1" : 250, "x2" : 250, "y1" : 100, "y2" : 140, "text" : '1950', "x" : 230, "y" : 90, "r" : 10, "img" : "thor.jpg", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Thor_(Thor_Odinson)"},
  { "name" : "FLASH", "x1" : 310, "x2" : 310, "y1" : 100, "y2" : 60, "text" : '1956', "x" : 290, "y" : 120, "r" : 10, "img" : "flash_n.jpg", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Flash_(Barry_Allen)"},
  { "name" : "GREEN LANTERN", "x1" : 370, "x2" : 370, "y1" : 100, "y2" : 140, "text" : '1959', "x" : 350, "y" : 90, "r" : 10, "img" : "green_lantern.png", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Green_Lantern_(Hal_Jordan)"},
  { "name" : "BENJAMIN GRIMM", "x1" : 430, "x2" : 430, "y1" : 100, "y2" : 60, "text" : '1961', "x" : 410, "y" : 120, "r" : 10, "img" : "thing.png", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Benjamin_Grimm_(Earth-616)"},
  { "name" : "REED RICHARDS", "x1" : 430, "x2" : 430, "y1" : 100, "y2" : 140, "text" : '1961', "x" : 410, "y" : 120, "r" : 10, "img" : "reed.jpg", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Reed_Richards_(Earth-616)"},
  { "name" : "SPIDERMAN", "x1" : 490, "x2" : 490, "y1" : 100, "y2" : 140, "text" : '1962', "x" : 470, "y" : 90, "r" : 10, "img" : "spiderman.png", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Spider-Man_(Peter_Parker)"},
  { "name" : "HULK", "x1" : 490, "x2" : 490, "y1" : 100, "y2" : 60, "text" : '1962', "x" : 470, "y" : 90, "r" : 10, "img" : "hulk.png", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Hulk_(Robert_Bruce_Banner)"},
  { "name" : "IRON MAN", "x1" : 550, "x2" : 550, "y1" : 100, "y2" : 60, "text" : '1963', "x" : 530, "y" : 120, "r" : 10, "img" : "iron_man.png", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Iron_Man_(Anthony_%22Tony%22_Stark)"},
  {  "name" : "BLACK CANARY", "x1" : 610, "x2" : 610, "y1" : 100, "y2" : 140, "text" : '1969', "x" : 590, "y" : 90, "r" : 10, "img" : "black_canary.png", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Dinah_Laurel_Lance_(New_Earth)"},
  { "name" : "WOLVERINE", "x1" : 670, "x2" : 670, "y1" : 100, "y2" : 60, "text" : '1974', "x" : 650, "y" : 120, "r" : 10, "img" : "wolverine.jpg", "fill" : "red", "url" : "http://marvel.wikia.com/wiki/Wolverine_(James_%22Logan%22_Howlett)"},
  {  "name" : "SUPERMAN", "x1" : 730, "x2" : 730, "y1" : 100, "y2" : 140, "text" : '1986', "x" : 710, "y" : 90, "r" : 10, "img" : "superman_n.jpg", "fill" : "blue", "url" : "http://dc.wikia.com/wiki/Superman_(Clark_Kent)"}
]


var svg = d3.select("#timeline").append("svg")
        .attr("width",  outerwidth)
        .attr("height", outerheight);


var lines = svg.selectAll('line')
                  .data(linedata)
                  .enter()
                 .append('line')
                  .attr('x1', function(d){ return d.x1 + 20})
                  .attr('y1', function(d){ return d.y1 })
                  .attr('x2', function(d){ return d.x2 + 20})
                  .attr('y2', function(d){ return d.y2 })
                  .attr('stroke-width',2)
                  .attr('stroke','black');

                      
var texts = svg.selectAll('text')
                  .data(linedata)
                  .enter()
                 .append('text')
                  .attr('x',function(d){ return d.x + 20})
                  .attr('y',function(d){ return d.y })
                  .text(function(d){ return d.text });


var div = d3.select("#tooltip").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1e-6);

var circles = svg.selectAll('circle')
    .data(linedata)
    .enter()
  .append('circle')
    .attr('cx', function (d) { return d.x2 + 20})
    .attr('cy', function (d) { return d.y2 })
    .attr('r', function (d) { return d.r })
    .attr('fill', function(d) { return d.fill })
    .attr('stroke','black')
    .attr('stroke-width',0)
      .on('mouseover',function() {
        d3.select(this)
      	  .transition()
      	  .duration(1000)
      	  .attr('r',20)
          .attr('opacity', 0.8);
        div.transition()
          .duration(500)
          .style("opacity", 1)
          .attr('r',20);
      })
      .on('mousemove', function(d){
        div
          .html("<h3>" + d.name + "</h3><img src=" + d.img + ">")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
      })
      .on('mouseout',function () {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr('stroke-width',0)
          .attr('r',10)
          .attr('opacity', 1.0);
        div.transition()
          .duration(500)
          .style("opacity", 1e-6);
      })
      .on('click', function(d){
          window.open(d.url, '_blank');
      })
  

var svg2 = d3.select("#legend_timeline").append("svg")
             .attr("width",600)
             .attr("height","40");

svg2.append('circle')
        .attr("cx",130)
        .attr("cy",10)
        .attr("r",10)
        .style("fill","blue");

svg2.append('text')
        .attr("x",155)
        .attr("y",16)
        .text("DC");

svg2.append('circle')
        .attr("cx",280)
        .attr("cy",10)
        .attr("r",10)
        .style("fill","red");

svg2.append('text')
        .attr("x",295)
        .attr("y",16)
        .text("MARVEL");

svg2.append('text')
        .attr("x",30)
        .attr("y",35)
        .text("*Click on any point in timeline to be redirected to the character's page")
        .attr('font-size',14);






