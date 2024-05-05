document.addEventListener("DOMContentLoaded", function() {
    const data = [
        {timeFrame: 'YTD', performance: 14.5},
        {timeFrame: '1YR', performance: 15.0},
        {timeFrame: '3YR', performance: 16.5},
        {timeFrame: '5YR', performance: 17.0},
        {timeFrame: '10YR', performance: 14.7}
    ];

    const margin = {top: 20, right: 30, bottom: 40, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scalePoint()
        .range([0, width])
        .domain(data.map(d => d.timeFrame));

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([14, 18]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);

    svg.append("g")
       .attr("class", "axis")
       .call(yAxis);

    const line = d3.line()
        .x(d => x(d.timeFrame))
        .y(d => y(d.performance));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // Add title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Average Performance of Mutual Funds Over Time");
});
