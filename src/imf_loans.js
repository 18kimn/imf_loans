var width = window.innerWidth * 0.7,
	height = window.innerHeight,
  svg = d3.select("#mapcontainer")
	.append("svg")
  .attr("id", "map");

var slider = document.getElementById("slider");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
const config = {
              speed: 0.005,
              verticalTilt: -15,
              horizontalTilt: -15
        }

var zoom = d3.zoom()
  .scaleExtent([0.1, 8])
	.on('zoom', zoomed);

var projection = d3.geoOrthographic()
	.translate([width / 2, height / 2])
  .scale(width / 3);

const path = d3.geoPath()
	.projection(projection);
// Create and configure the graticule generator (one line every 20 degrees)
var graticule = d3.geoGraticule()
  .step([10, 10]);

var g = svg.append("g").style("cursor", "pointer");
//inertia/drag stuff taken from https://bl.ocks.org/Fil/f48de8e9207799017093a169031adb02 and https://codepen.io/jorin/pen/YNajXZ
var inertia = d3.geoInertiaDrag(svg, rotateGlobe, projection,
	{
		time: 1500,
    start: function(){
      timer.stop()
    },
    end: restartTimer,
		stop: restartTimer,
		finish: restartTimer,
  }
);

function restartTimer(){
	globalElapsed = elapsedVar;
	config.verticalTilt = projection.rotate()[1];
	config.horizontalTilt = projection.rotate()[2];
	timer.restart(autorotate);
}

svg.call(zoom);

var dta, datasets, outline, countryShapes, centroid, lastCountry,
 countryLabel = svg.selectAll(".countryLabel"), gratLines, yr, tradeLines, traders,
	globalElapsed = 0, elapsedVar, pt, lastTransform,
	v0, r0, q0,x, t=1, lastTime = d3.now(), timer;

var filenames = ["data/imf.geojson", "data/export.json"],
  promises = [];

filenames.forEach(function(url) {
	promises.push(d3.json(url))
});

const mapWidth = d3.select('#mapcontainer').style('width')
d3.select('#closeButton')
  .on('click', () => {
    d3.select('#story')
      .style('display', 'none')
    d3.select('#mapcontainer')
      .style('width', '100%')
    d3.select('#openButton').style('display', 'block')
  })
d3.select('#openButton')
  .on('click', () => {
    d3.select('#openButton').style('display', 'none')
    d3.select('#story').style('display', 'block')
    d3.select('#mapcontainer')
      .style('width', mapWidth)
  })

Promise.all(promises).then(function(dataProd){
  datasets = dataProd;

	datasets[1].forEach(function(d){
    d.interp = d3.geoInterpolate(d.centroids.coordinates, d.partner_centroids.coordinates)
	}); // creates interpolation functions between the exporter and the export receiver

  outline = g.append("path")
    .datum({type: "Sphere"})
    .attr("id", "outline")
    .attr("fill", "#ffffff")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("d", path);
  // Graticule lines (behind the land)
  gratLines = g.selectAll('path.graticule')
    .data([graticule()])
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "black")
    .style("stroke-opacity", "0.5")
    .attr("stroke-width", "0.3")
    .attr("d", path);

  countryShapes =	g.selectAll("path.nation")
    .data(datasets[0].features)
    .enter()
    .append("path")
    .attr("class", "nation")
    .attr("d", path)
    .style("fill", "#7AB199")
    .style("stroke-width", "1")
    .style("fill-opacity", 1)
		.on('mousemove', function(event, d) {
			lastCountry = d;
			centroid = path.centroid(d);
			svg.selectAll(".countryLabel").remove()
      if(isNaN(centroid[0])) return
			countryLabel = svg.append("text")
					.text(lastCountry.properties.name)
					.attr("transform", lastTransform)
					.attr("class", "countryLabel")
					.attr("font-color", "black")
					.attr("opacity", 1)
					.attr("x", centroid[0])
					.attr("y", centroid[1])
					.attr("font-size", 12);
		}).on("mouseout", function(event, d){
			countryLabel.remove();
		});

	drawTradeLines();
	highlightCountries();
  //handle slider input
	d3.select("input")
    .on("change", function(){
			drawTradeLines();
			highlightCountries();
		});


  timer = d3.timer(autorotate);
});



function autorotate(elapsed) {
	elapsedVar = elapsed;
  now = d3.now();
  diff = now - lastTime;
  if (diff < elapsed) {
    rotation = projection.rotate()[0];
    rotation += diff * (6/1000);
    projection.rotate([rotation, config.verticalTilt, config.horizontalTilt]);
    rotateGlobe()
  }
	t = (elapsed + globalElapsed) / 10000;
  lastTime = now;
}


function rotateGlobe(){
  outline.attr("d", path);
	gratLines.attr("d", path);
	countryShapes.attr("d", path);
	if(countryLabel.size()){
		//for some reason this is modifying path()????path = d3.geoPath()
		centroid = d3.geoPath().projection(projection).centroid(lastCountry);
    if(!isNaN(centroid[0])){
      countryLabel.attr("x", centroid[0]).attr("y", centroid[1]);
    }
		
	}

	tradeLines.attr("d", function(d){
			//return projection(d.interp(t));
			return path({type: "LineString", coordinates: [ d.interp(Math.min(t, 1)), d.centroids["coordinates"]]})
	}).attr("stroke-dashoffset", 250*Math.max(t, 1));
}

function drawTradeLines(){
	yr = +d3.select("#slider").node().value;
	data = datasets[1].filter(function(d){return d.year === yr});
	traders = data.map(function(d){return d.partner_code}); //to be used in highlightcountries
	tradeLines = g.selectAll("path.tradeLines").data(data)
		.join(
			enter => enter.append("path")
				.attr("d", function(d){
					//return path({type: "LineString", coordinates: [d.centroids["coordinates"], d.centroids["coordinates"]]})
			    return d3.line()([projection(d.centroids["coordinates"]), projection(d.interp(0))])
			}).attr("stroke-width", function(d){return 3*d.export_value})
				.attr("stroke-opacity", function(d){return Math.max(d.export_value/7.2 + .4, 1)})
				.attr("stroke", "black")
				.attr("stroke-dasharray", "20 20")
				.attr("fill", "none")
				.attr("class", "tradeLines"),
			update => update.attr("d", function(d){
				return d3.line()([projection(d.centroids["coordinates"]), projection(d.partner_centroids["coordinates"])])
			}),
			exit => exit.transition().duration(100).attr("stroke-opacity", 0).remove()
		);
}

function highlightCountries() {
	yr = +d3.select("#slider").node().value;
	countryShapes.transition().duration(250)
		.style("fill", function(d){
			//if the shapefile exists with no loan data (e.g. the country has not received any loans from the IMF at all) color it green
			//need nested case because of the undefined thing ://
			if(typeof(d.properties.info[0][0]) != "undefined"){
				//if there's a loan for this country that was given in the year matching the slider input, highlight it red
				if (d.properties.info[0].some(function(feature, i){
					return yr == feature.date.substring(0,4)
				})) return "#C93135"
			}
			//if it's a trade partner (i.e. one of the top export-receiving/importing countries) color it blue
			if (traders.includes(d.properties.imf_code)) return "#1375B7"
			//otherwise, color it green
			return "#7AB199"
	});
}



function zoomed(event, d) {
	lastTransform = event.transform;
	g
		.selectAll('path') // To prevent stroke width from scaling
		.transition().duration(50)
		.attr('transform', event.transform);

	countryLabel.transition().duration(50).attr("transform", event.transform);

}
