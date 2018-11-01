var speciesIcons = require("cttv.speciesIcons");

var legend = function () {

    var update = function () {};

    var species = { // model
        "Homo_sapiens" : true, // Human
        "Mus_musculus" : true, // Mouse
        "Cavia_porcellus" : true, // Guinea pig
        "Macaca_mulatta" : true,  // Macaque
        "Canis_lupus_familiaris" : true, // Dog
        "Oryctolagus_cuniculus" : true, // Rabbit
        "Rattus_norvegicus" : true, // Rat
        "Sus_scrofa" : true, // Pig
        "Xenopus_tropicalis" : true, // Frog
        "Danio_rerio" : true, // Zebrafish
        "Pan_troglodytes": true, // Chimp
        "Drosophila_melanogaster": true, // Fly
        "Caenorhabditis_elegans": true // Worm
    };

    var speciesSort = [
        "Homo_sapiens",
        "Pan_troglodytes",
        "Macaca_mulatta",
        "Mus_musculus",
        "Rattus_norvegicus",
        "Oryctolagus_cuniculus",
        "Cavia_porcellus",
        "Canis_lupus_familiaris",
        "Sus_scrofa",
        "Xenopus_tropicalis",
        "Danio_rerio",
        "Drosophila_melanogaster",
        "Caenorhabditis_elegans"
    ];

    var scientific2common = {
        "Homo_sapiens" : "Human",
        "Mus_musculus_reference" : "Mouse",
        "Mus_musculus": "Mouse",
        "Cavia_porcellus" : "Guinea pig",
        "Macaca_mulatta" : "Macaque",
        "Canis_lupus_familiaris" : "Dog",
        "Oryctolagus_cuniculus" : "Rabbit",
        "Rattus_norvegicus" : "Rat",
        "Sus_scrofa" : "Pig",
        "Xenopus_tropicalis" : "Frog",
        "Danio_rerio" : "Zebrafish",
        "Drosophila_melanogaster": "Fly",
        "Caenorhabditis_elegans": "Worm",
        "Pan_troglodytes": "Chimpanzee",
        "Mus_musculus_reference_(CL57BL6)": "Mouse",
        "Caenorhabditis_elegans_N2": "Worm"
    };

    var complexScientific2scientific = {
        "Homo sapiens": "Homo sapiens",
        "Mus musculus": "Mus musculus",
        "Mus musculus reference": "Mus musculus",
        "Mus musculus reference (CL57BL6)": "Mus musculus",
        "Mus musculus strain reference (CL57BL6)": "Mus musculus",
        "Cavia porcellus": "Cavia porcellus",
        "Macaca mulatta": "Macaca mulatta",
        "Canis lupus": "Canis lupus familiaris",
        "Canis lupus familiaris": "Canis lupus familiaris",
        "Oryctolagus cuniculus": "Oryctolagus cuniculus",
        "Rattus norvegicus": "Rattus norvegicus",
        "Sus scrofa": "Sus scrofa",
        "Xenopus tropicalis": "Xenopus tropicalis",
        "Danio rerio": "Danio rerio",
        "Drosophila melanogaster": "Drosophila melanogaster",
        "Caenorhabditis elegans": "Caenorhabditis elegans",
        "Caenorhabditis elegans N2": "Caenorhabditis elegans",
        "Pan troglodytes": "Pan troglodytes",
    };

    var speciesTaxonIds = {
        "Homo_sapiens" : 9606,
        "Mus_musculus" : 10090,
        "Cavia_porcellus" : 10141,
        "Macaca_mulatta" : 9544,
        "Canis_lupus_familiaris" : 9615,
        "Oryctolagus_cuniculus" : 9986,
        "Rattus_norvegicus" : 10116,
        "Sus_scrofa" : 9823,
        "Xenopus_tropicalis" : 8364,
        "Danio_rerio" : 7955,
        "Drosophila_melanogaster": 7227,
        "Caenorhabditis_elegans": 6239,
        "Pan_troglodytes": 9598
    };

    var currSpecies = Object.keys(species);
    var currScale = false;

    var speciesArr = [];
    for (var i=0; i<speciesSort.length; i++) {
        var sp = speciesSort[i];
        if (species.hasOwnProperty(sp)) {
            speciesArr.push({
                "name": sp,
                "checked": species[sp]
            });
        }
    }

    var l = function (container) {

        d3.select(container)
            .append("div")
            .attr("class", "hamburger-frame")
            .on("click", function () {
                if (div.style("height") === "0px") {
                    div
                        .transition()
                        .duration(1000)
                        .style("height", "550px");
                } else {
                    div
                        .transition()
                        .duration(1000)
                        .style("height", "0px");
                }
            });


        var burger = d3.select(container)
            .append("div")
            .attr("class", "hamburger-menu");

        var div = d3.select(container)
            .append("div")
            .attr("class", "cttv_targetTree_legend");

        var scaleBranches = div.append("div");
        scaleBranches
            .append("h6")
            .style("font-size", "14px")
            .text("Tree branches");

        var branchesSpan = scaleBranches
            .append("span");
        branchesSpan
            .append("input")
            .attr("type", "checkbox")
            .attr("name", "sclcheck")
            .attr("value", "scale branches")
            .on("change", function () {
                currScale = this.checked;
                var currentSps = getCurrentSps();
                update(currentSps, currScale);
            })
            .each(function () {
                if (currScale) {
                d3.select(this)
                    .attr("checked", currScale)
                }
            });

        branchesSpan
            .append("text")
            .style('margin-left', "15px")
            .text("scale branches");

        div.append("h6")
            .style({
                "font-size": "14px",
                "margin-top": "30px"
            })
            .text("Species");

        var checkbox = div.selectAll("input")
            .data(speciesArr)
            .enter()
            .append("span")
            .style("display", "block");

        checkbox
            .append("input")
            .attr("type", "checkbox")
            .attr("name", "spcheck")
            .attr("value", function (d) {
                return d.name;
            })
            .style("margin-top", "15px")
            .on("change", function () {
                species[this.value] = this.checked;
                var currentSps = getCurrentSps();
                update(currentSps, currScale);
            })
            .each (function (d) {
                if (d.checked && currSpecies[d.name]) {
                    d3.select(this)
                        .attr("checked", true);
                }
                if (!currSpecies[d.name]) {
                    d3.select(this).attr("disabled", true);
                }
            });

        var icons = speciesIcons()
            .size(30);

        checkbox
            .each(function (d) {
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                var g = d3.select(svg)
                    .attr("width", 32)
                    .attr("height", 32)
                    .style({
                        "margin-left": "10px",
                        "vertical-align": "middle"
                    })
                    .append("g")
                    .node();
                var spName = scientific2common[d.name];
                spName = spName.charAt(0).toLowerCase() + spName.slice(1);
                icons.species(spName);
                if (!currSpecies[d.name]) {
                    icons.color("#BDBDBD"); // gray
                } else {
                    icons.color("#377bb5");
                }
                icons(g);
                this.appendChild(svg);
            });

        checkbox
            .append("text")
            .style({
                "margin-left" : "10px"
            })
            .style("color", function (d) {
                if (currSpecies[d.name]) {
                    return "#377bb5";
                }
                return "#BDBDBD";
            })
            .text(function (d) {
                return scientific2common[d.name];
            });


        function getCurrentSps() {
            var currentSps = [];
            var allSps = [];
            for (var sp in species) {
                if (species.hasOwnProperty(sp)) {
                    allSps.push(speciesTaxonIds[sp]);
                    if (species[sp]) {
                        currentSps.push(speciesTaxonIds[sp]);
                    }
                }
            }
            if (!currentSps.length) {
                currentSps = allSps;
            }
            return currentSps;
        }

    };

    l.update = function (cbak) {
        if (!arguments.length) {
            return update;
        }
        update = cbak;
        return this;
    };

    l.scale = function (sc) {
        if (!arguments.length) {
            return currScale;
        }
        currScale = sc;
        return this;
    };

    l.currSpecies = function (sps) {
        if (!arguments.length) {
            return currSpecies;
        }
        currSpecies = sps;
        return this;
    };

    l.selectedSpecies = function () {
        var selected = [];
        for (var sp in species) {
            if (species.hasOwnProperty(sp) && species[sp]) {
                selected.push(speciesTaxonIds[sp]);
            }
        }
        return selected;
    };

    l.allSpecies = function () {
        return Object.keys(species);
    };

    l.scientific2common = function (name) {
        return scientific2common[name];
    };

    l.complexScientific2scientific = function (name) {
        return complexScientific2scientific[name];
    };

    l.id2species = function (id){
        var s = '';
        for (var i in speciesTaxonIds) {
            if (speciesTaxonIds[i] === id) {
                s = i;
            }
        }
        return s;
    }
    
    l.species2id = function (species){
        return speciesTaxonIds[species];
    }
    
    return l;
};
module.exports = exports = legend;
