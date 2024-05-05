document.addEventListener("DOMContentLoaded", function () {
    const data = [
        { category: 'International Stocks', value: 250 },
        { category: 'Large Growth', value: 800 },
        { category: 'Large Value', value: 950 },
        { category: 'Small Growth', value: 300 },
        { category: 'Small Value', value: 150 }
    ];

    const margin = {top: 20, right: 30, bottom: 70, left: 40},
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.category))
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([height, 0]);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.category))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
});
