// Th init() function runs when the page is initialised.
// The function builds up the drop down selection box with the names (ID's) from the json file.
// Once the dropdown list is populated, the functions that build the graphs are run.

function init() {

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

        displaygraph();
        displayMetadata();
        washingGauge();

    });
};

// This function controls what happens when the dropdown selection is completed.
// Once the selection is changed, all graph building functions and the metadata function are run.

function optionChanged() {
    displaygraph(),
    displayMetadata()
    washingGauge();
}


// This function contains the code to build the bar chart and the bubble graph.

function displaygraph() {

    d3.json("samples.json").then((data) => {

        // First the value of the drop down box is determined.
        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);

        // Next the info we need to build the graph is extracted.
        // The dropdown selection is matched to the ID in the samples section of the json data.
        // Once the data is filtered down to the ID match, the otu_ids, values and labels are extracted.

        var idInfo = data.samples;

        var idMatch = idInfo.find(element => element.id === idSelect);
        console.log(idMatch);

        var otu = idMatch.otu_ids;
        console.log(otu);

        var values = idMatch.sample_values;
        console.log(values);

        var textLabels = idMatch.otu_labels;
        
        // Here the top 10 ID's and values are extracted and the data is reversed for formatting purposes.
        var top10_otu = otu.slice(0,10).reverse();
        console.log(top10_otu);

        var top10_values = values.slice(0,10).reverse();
        console.log(top10_values);

        // The labels are then reformatted and added to a new list to add the OTU prefix.
        var reformat_top10_otu = []
        top10_otu.forEach((label) => {
            reformat_top10_otu.push("OTU " + label);
        });


        // Now the bar graph is generated.
        var trace1 = {
            x: top10_values,
            y: reformat_top10_otu,
            text: textLabels,
            type: "bar",
            orientation: 'h',
            marker: {
                color: "CornflowerBlue"
              }
        };

        var data = [trace1];

        var layout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 },
            height: 650,
        };

        Plotly.newPlot("bar", data, layout);


        // Now the bubble graph is generated.
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
            title: "Bacteria Cultures Per Sample",
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', data2, layout2)


    });
};



// This function turns the first letter in a string to a capital letter. This is used in the formatting of the metadata.
function capitalLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


// Similarly to how the data was extracted above, the below extracts the metadata.
function displayMetadata() {

    d3.json("samples.json").then((data) => {

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);
        
        var meta_idInfo = data.metadata;

        var meta_idMatch = meta_idInfo.find(element => element.id === parseInt(idSelect, 10));
        console.log(meta_idMatch);

        // Once values are extracted, we select the metadata ID section from the html.
        var infoBox = d3.select("#sample-metadata");

        // Next the current contents of the metadata info box is cleared.
        infoBox.html("");

        // Now the metadata details are added into the box.
        Object.entries(meta_idMatch).forEach(([key, value]) => {
        infoBox
            .append("h4")
            .text(capitalLetter(key) + ": " + value);

        });
    });
};


// This function generated the washing frequency gauge.
// As per above, it starts by extracting the data required to generate the gauge.

function washingGauge() {

    d3.json("samples.json").then((data) => {

        var idSelect =  d3.select("#selDataset").property("value");
        console.log(idSelect);
        
        var meta_idInfo = data.metadata;

        var meta_idMatch = meta_idInfo.find(element => element.id === parseInt(idSelect, 10));
        console.log(meta_idMatch);

        var washFreq = meta_idMatch.wfreq
        console.log(washFreq);


        // Here the gauge is generated with 9 pointers and a color scheme.
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

// Upon loading the page, the init() function is deployed to extract the drop down ID's, generate the graphs and populate the metadata.
init();
