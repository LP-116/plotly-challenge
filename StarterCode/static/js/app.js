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

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);

        var idInfo = data.samples;

        var idMatch = idInfo.find(element => element.id === idSelect);

        console.log(idMatch);

        var otu = idMatch.otu_ids;
        console.log(otu);

        var values = idMatch.sample_values;
        console.log(values);

        var textLabels = idMatch.otu_labels;
        // console.log(textLabels);

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
            text: textLabels,
            type: "bar",
            orientation: 'h',
            name: "Test"
        };

        var data = [trace1];

        var layout = {
            xaxis: { title: "Value" },
            yaxis: { title: "ID"},
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 },
            height: 600,
        };

        Plotly.newPlot("bar", data, layout);



        var trace2 = {
            x: otu,
            y: values,
            mode: "markers",
            marker: {
                size: values,
                color: otu,
                colorscale: 'Portland'
              },
            text: textLabels
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Samples Bubble Graph",
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', data2, layout2)

    });
};

displaygraph();

function displayMetadata() {

    d3.json("samples.json").then((data) => {

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);
        
        var meta_idInfo = data.metadata;

        var meta_idMatch = meta_idInfo.find(element => element.id === parseInt(idSelect, 10));
        console.log(meta_idMatch);

        var infoBox = d3.select("#sample-metadata");

        infoBox.html("");

        Object.entries(meta_idMatch).forEach((item) => {
        infoBox
            .append("h5")
            .text(item[0] + ": " + item[1]);

        });
    });
};

displayMetadata(); 

function washingGuage() {

    d3.json("samples.json").then((data) => {

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);
        
        var meta_idInfo = data.metadata;

        var meta_idMatch = meta_idInfo.find(element => element.id === parseInt(idSelect, 10));
        console.log(meta_idMatch);

        var washFreq = meta_idMatch.wfreq
        console.log(washFreq);


        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: washFreq,
              title: { text: "Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 9 },
              gauge: {
                axis: { range: [null, 9], tick0: 0, dtick: 1 },
                bar: { color: "#007acc" },
                steps: [
                  { range: [0, 1], color: "#f2e6ff" },
                  { range: [1, 2], color: "#d9b3ff" },
                  { range: [2, 3], color: "#cc99ff" },
                  { range: [3, 4], color: "#bf80ff" },
                  { range: [4, 5], color: "#a64dff" },
                  { range: [5, 6], color: "#8c1aff" },
                  { range: [6, 7], color: "#7300e6" },
                  { range: [7, 8], color: "#5900b3" },
                  { range: [8, 9], color: "#26004d" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: washFreq
                }
              }
            }
          ];
          
          var layout = { width: 275, height: 250, margin: { t: 20, r: 25, l: 25, b: 25 } };
          Plotly.newPlot("gauge", data, layout);



    });
};

washingGuage();

function optionChanged() {
    displaygraph(),
    displayMetadata()
    washingGuage();
}
