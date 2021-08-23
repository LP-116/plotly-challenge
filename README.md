# Plotly Challenge
## Plot.ly Homework - Belly Button Biodiversity
## To view the Bellybutton Biodiversity dashboard click [here](https://lp-116.github.io/plotly-challenge/)

---
### Task

For this assignment we were required to build an interactive dashboard to explore a Belly Button Diversity dataset which is in json format.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

---
### Method

To complete the dashboard the D3 library was used to read in the samples.json file.
After an initial investigation of the data, the first step was determining where the data needed to generated the graphs was located.

Data extracted from the json file includes:
* The names (ID's) to populate the dropdown menu.
* From the samples section:
      * the otu_ids (used as the y axis in the horizontal bar graph and used as the x axis and markers in the bubble graphs)
      * the sample_values (used in the bar and bubble graphs)
      * the otu_labels (used as the hover over lable in the bar and bubble graphs)
      * Note: for the bar graph, the data was sliced to get the top 10 results and then the data was reversed for plotting purposes.
 
* The metadata to populate the panel card.
* The washing frequency from the metadata section.

Populating the dropdownmenu and the panel card was done by using forEach and appending the elements to the area required.

All graphs were generated by using Plotly and defining the parameters (i.e. x and y axis details, marker details and layout details).

The gauge was also generated using Plotly and by defining the parameters. Specific parameters to note include:
* The delta was defined as 9 (as there are 9 options possible)
* The gauge had tick placement defined - i.e. the tick0 starts at 0 the dtick is set as 1, meaning that the ticks appear in intervals of 1.
* The guage has had colors applied to different steps in the gauge to give it a scaling look. The lower the number, the lighter the color. The higher the number, the darker the color.

6 functions were defined:

* A displayGraph function that builds the bar and bubble graphs.
* A displayMetadata function that builds the metadata panel.
* A wahsingGauge function that builds the washing frequency gauge.
* A init function that builds the dropdown menu and runs the graphs and metadata function.
* Note: the init function is run upon page initialisation.
* An optionChanged function that controls the dropdown menu change. Each time the dropdown changes, the graph/metadata function are run.
* A function to change the first letter in a string to a capital letter. This is simply used for formatting purposes and is used on the key when building the metadata.


---
### Results

The metadata panel, graphs and washing gauge were successfully generated and can be changed by using the dropdown selection.

<img src="https://user-images.githubusercontent.com/82348616/130385110-a318fcf3-9759-48cd-88f6-314566220dfa.PNG" width="700">
<img src="https://user-images.githubusercontent.com/82348616/130385128-ca9de3bc-c6ed-49e6-ade7-6e4688de550a.PNG" width="700">

The dashboard has been published on github and can be accessed [here](https://lp-116.github.io/plotly-challenge/).


---
### Files
Contained in this repository are the below folders/files:

* An index.html file which is used for Github publishing purposes.
* A data folder which contains the samples.json file which used in the assignment.
* A static folder which contains 3 additional folders - a css folder (used for formatting), an image folder (contains the images used in the dashboard) and a js folder (contains the app.js file which is the code for generating the dashboard). The samples.json file is also included in the js file for code reading convenience.


---
### References

* The glowing text feature in the heading:

https://www.w3schools.com/howto/howto_css_glowing_text.asp

* The background bacteria image:
https://www.nutraingredients.com/Article/2019/10/04/Gut-health-affected-by-teams-of-bacteria-not-individual-species

* The magnifying glass image:

https://www.vectorstock.com/royalty-free-vector/bacteria-and-virus-under-magnifying-glass-vector-11181296


