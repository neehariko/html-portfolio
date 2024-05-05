// Set up dimensions and margins
const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

// Define data
const data = [
  { tenure: 0, performance: 0.7, assets: 1234 },
  { tenure: 1, performance: -0.3, assets: 1155 },
  { tenure: 2, performance: -0.5, assets: 1100 },
  { tenure: 3, performance: 0.8, assets: 1221 },
  { tenure: 4, performance: -1.1, assets: 1000 },
  { tenure: 5, performance: -1.4, assets: 950 },
  { tenure: 6, performance: -0.9, assets: 1050 },
  { tenure: 7, performance: -1.2, assets: 1000 },
  { tenure: 8, performance: -1.5, assets: 900 },
  { tenure: 9, performance: -1.8, assets: 800 },
  { tenure: 10, performance: -1.6, assets: 850 },
  { tenure: 11, performance: 3.8, assets: 5000 },
  { tenure: 12, performance: 4.5, assets: 7000 },
  { tenure: 13, performance: 6.2, assets: 9000 },
  { tenure: 14, performance: 7.1, assets: 11000 },
  { tenure: 15, performance: 8.3, assets: 13000 },
  { tenure: 16, performance: 10.5, assets: 15000 },
  { tenure: 17, performance: 12.1, assets: 17000 },
  { tenure: 18, performance: 13.8, assets: 19000 },
  { tenure: 19, performance: 15.2, assets: 21000 },
  { tenure: 20, performance: 16.7, assets: 23000 },
  { tenure: 21, performance: 18.1, assets: 25000 },
  { tenure: 22, performance: 19.5, assets: 27000 },
  { tenure: 23, performance: 20.8, assets: 29000 },
  { tenure: 24, performance: 22.1, assets: 31000 },
  { tenure: 25, performance: 23.4, assets: 33000 },
  { tenure: 26, performance: 24.7, assets: 35000 },
  { tenure: 27, performance: 26, assets: 37000 },
  { tenure: 28, performance: 27.3, assets: 39000 },
  { tenure: 29, performance: 28.6, assets: 41000 },
  { tenure: 30, performance: 29.9, assets: 43000 }
];

// Create scales
const x = d3.scaleLinear()
  .range([margin.left, width - margin.right]);

const yPerformance = d3.scaleLinear()
  .range([height - margin.bottom, margin.top]);

const yAssets = d3.scaleLinear()
  .range([height - margin.bottom, margin.top]);

// Create SVG and set dimensions
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Set scales' domains
x.domain(d3.extent(data, d => d.tenure));
yPerformance.domain(d3.extent(data, d => d.performance));
yAssets.domain(d3.extent(data, d => d.assets));

// Create X and Y axes
const xAxis = d3.axisBottom(x);
const yPerformanceAxis = d3.axisLeft(yPerformance);
const yAssetsAxis = d3.axisRight(yAssets);

// Append axes to the SVG
svg.append("g")
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(yPerformanceAxis);

svg.append("g")
  .attr("transform", `translate(${width - margin.right}, 0)`)
  .call(yAssetsAxis);

// Create lines
const performanceLine = d3.line()
  .x(d => x(d.tenure))
  .y(d => yPerformance(d.performance));

const assetsLine = d3.line()
  .x(d => x(d.tenure))
  .y(d => yAssets(d.assets));

// Append lines to the SVG
svg.append("path")
  .datum(data)
  .attr("class", "performance-line")
  .attr("d", performanceLine);

svg.append("path")
  .datum(data)
  .attr("class", "assets-line")
  .attr("d", assetsLine);