d3.json("samples.json").then((item) => {

    var dropdownMenu = d3.select("#selDataset");

    var dropdownNames = item.names;
    console.log(dropdownNames);

    dropdownNames.forEach((item) => {
      dropdownMenu
        .append("option")
        .text(item)
        .property("value", item);
    });

});


function displaygraph() {

    d3.json("samples.json").then((data) => {

        var otu = data.samples[0].otu_ids;
        console.log(otu);

        var values = data.samples[0].sample_values;
        console.log(values);

        var trace1 = {
            x: otu,
            y: values,
            type: "bar",
            orientation: 'h',
            name: "Test"
        };

        var data = [trace1];

        var layout = {
            xaxis: { title: "ID" },
            yaxis: { title: "Value" }
        };

        Plotly.newPlot("bar", data, layout);

    });
};

displaygraph();