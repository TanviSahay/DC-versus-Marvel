
d3.csv('table1.csv',function(error,data){
  var table1     = dc.dataTable("#table1");

  var facts = crossfilter(data);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d['First Appearance'];
  });

  // Setup the charts
  
  // Table of comic-characters data
  table1.width(700).height(500)
    .dimension(timeDimension)
    .group(function(d) { return "A Subset of data used showing the most frequently appearing DC and Marvel Characters"
     })
    .size(10)
    .columns([
      function(d) { return d['Comic']; },
      function(d) { return d['Character']; },
      function(d) { return d['No of Appearances']; },
      function(d) { return d['First Appearance']; },
      function(d) { return d['ID']; },
      function(d) { return d['Align']; },
      function(d) { return d['Sex']; },
      function(d) { return d['Hair Color']; },
      function(d) { return d['Eye Color']; }
    ])
    .sortBy(function(d){ return d['No of Appearances']; })
    .order(d3.descending);
    table1.render();

});
