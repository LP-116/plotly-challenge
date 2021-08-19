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

var filterDropdown = d3.select("#selDataset");

filterDropdown.on("change", displaygraph);


function displaygraph() {

    d3.json("samples.json").then((data) => {

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);

        var idInfo = data.samples;

        var idMatch = idInfo.find(element => element.id === idSelect);

        console.log(idMatch);

        var otu = idMatch.otu_ids;
        console.log(otu);

        var values = idMatch.sample_values;
        console.log(values);

        var top10_otu = otu.slice(0,10).reverse();
        console.log(top10_otu);

        var reformat_top10_otu = []
        top10_otu.forEach((label) => {
            reformat_top10_otu.push("OTU " + label);
        });

        var top10_values = values.slice(0,10).reverse();
        console.log(top10_values);

        var trace1 = {
            x: top10_values,
            y: reformat_top10_otu,
            text: top10_otu,
            type: "bar",
            orientation: 'h',
            name: "Test"
        };

        var data = [trace1];

        var layout = {
            xaxis: { title: "Value" },
            yaxis: { title: "ID"},
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", data, layout);

    });
};

displaygraph();