
/**********************************************************************************************************************
Setup

Global variables, configuration arrays, etc. (See also dataArrays.js for the larger array files).
**********************************************************************************************************************/

//adjust the size and position of the SVG to ensure that it has margins around the edge of the screen.
var svg = d3.select("#plot1"),
    margin = {top: 200, right: 20, bottom: 30, left: 175},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scalePoint().rangeRound([0, width]).padding(0.1), //use for categorical axis - divides axis into discrete steps of the right width to fill the axis length
    y = d3.scaleLinear().rangeRound([height, 0]); //continuous scaling of y axis.


var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top)+ ")"); //move the group to the right place

var numSteps = 21;
var numRows = 15;
var rectsArray = [];
var dataTest = 'tpi';
var insightTypeArray = [
    {insightType:"overview", chartTypes:['KPI'],prog:null, nom:null, time:['tpi'], implicitInput:['tpi'],input1:['m'], input2:['m'],input3:[]},
    {insightType:"overview", chartTypes:['profile'],prog:null, nom:true, time:['tpi'],implicitInput:['tpi'],input1:['nd'], input2:[],input3:[]},
    {insightType:'comparison',chartTypes:['donut','bar','multiset bar'], prog:false, nom:true, time:['tpi','tpn'],implicitInput:['tpi'],input1:['m'], input2:['nd'],input3:[]},
    {insightType:'trend',chartTypes:['line','area','bar'],prog:true, nom:null, time:['tpi','tpp'], implicitInput:['tpi'],input1:['m'], input2:['pd'],input3:[]},
];

/*Consider using for populating if statement in check 0: , array:['pd','tpp']*/
var filterSettings = {
    dimension:{pd: false, tpp:false},
    insightType:{overview:true,comparison:true,trend:true},
    time:{tpi:true, tpp:true, tpn:true}
};

var reducedArray = [];

//populate the rectsArray; combinatorial mix of elements from insightTypeArray and dataBasketArray, arranged as rows and columns for display
for (var i=0; i < insightTypeArray.length; i++){
    for (var j=0; j < dataBasketArray.length; j++){
        rectsArray.push({id:'r'+j+'c'+i, row:j, column:i, config:insightTypeArray[i], data:dataBasketArray[j] });
    }
}


drawColors();


/**********************************************************************************************************************
Filtering functions

This is where most of the logic happens. Apply successive filters to the possible insight/chart configurations,
based on filtering input collected from the user, as well as criteria stored internally (data types available per
insight type, etc). General approach is to push objects from the rectsArray into a reducedArray when they fit
the current filter criteria. Successive filtering steps reduce the initial array to the remaining viable options.
**********************************************************************************************************************/

//The check0() function looks for the existence of a progressional dimension (set in the Metadata) in the object data
//components array. Note that the structure of the check0 code is different than the functions that check insight
//type (check4) and time period usage (check2), because those are based on the filterSettings array (based on user selections
//in Design Mode). The filterSettings array stores binary global filter flags, and (at this point) does not require
//searching within a data subarray to find specific components.

function check0 () {
    resetData();

    //look at filterSettings to see if the "Show progression" checkbox is checked
    if (filterSettings.dimension.pd){

        //build up a string for filtering, using the array stored in the filterSettings object
        //(Note: returns any object that meets ONE of the criteria in the filterSettings array - does not require
        //specific combinations or check for interference with other filter settings)
        var filterString = "e.type == " + '\'' ;
        var orString = "|| e.type ==" + '\'';
        var filtersList = [];

        //go through each key item in the filterSettings object, and check whether it is set to true. If it is, add it to the filtersList array.
        Object.keys(filterSettings.dimension).forEach(function(d){

            if(filterSettings.dimension[d]){
                filtersList.push(d);
            }
        });

        //build an OR query string using the filters above
        filtersList.forEach(function(d,i){
           if (i == 0){
               filterString = filterString + d + '\'';
           }
           else{
               filterString = filterString + orString + d + '\'';
           }
        });

        var push = false;


        //check each component in rectsArray against the filters set above
        rectsArray.forEach(function(d){
            //eval required for filter to recognize string as code; find a way to replace this.
            var temp = d.data.components.filter(function(e){ return (eval(filterString)); });

            //if you find a progressional dimension in the components array, set the push flag to true
            if(temp) {
                temp.forEach(function(d){
                    if (d.prog == true) {
                        push = true;
                    }
                })
            }

            //if the push flag has been set, add the entire object to the reduced array
            if (push){
                reducedArray.push(d);
                push = false;
            }
        });

        //run other checks to ensure consistency with other results
        check2();
        check4();

        //re-draw the squares to reflect changes.
        updateColor(reducedArray);

    }
    else {
        //if the progression flag has been turned off, reset everything
        resetData();

    }

}





//Most of the data config checks have been pre-populated manually in this test code; this function should eventually be linked up
//to work with the initial object configuration in design mode (are metrics grouped, do data objects belong in the chart or filter, etc).
function check1() {

}

//Allow user to toggle time usage; set globally and stored in filterSettings array.
function check2 (){

    var tempArray;

    var filterString = "d.data.time == " + '\'' ;
    var orString = "|| d.data.time ==" + '\'';
    var filtersList = [];

    Object.keys(filterSettings.time).forEach(function(d){
        if(filterSettings.time[d]){
            filtersList.push(d);
        }
    });

    filtersList.forEach(function(d,i){
        if (i == 0){
            filterString = filterString + d + '\'';
        }
        else{
            filterString = filterString + orString + d + '\'';
        }
    });

    //if the reducedArray is already populated (occurs when check0 has been run first), use it.
    if (reducedArray.length > 0) {
        tempArray = reducedArray.filter(function(d){
            return (eval(filterString));
        });
    }

    //otherwise, use the original rectsArray
    else{
        tempArray = rectsArray.filter(function(d){
            return (eval(filterString));
        });
    }

    //overwrite the reducedArray with the additionally-filtered data
    reducedArray =[];
    reducedArray = tempArray;

    updateColor(reducedArray);

}

//set priority/chart sort order based on tasks
function check3 (){

}

//Choose an insight type. Highlights the entire column for a particular insight configuration; check5() looks for more
//detailed chart configuration compatibility.
function check4 () {

    var tempArray;

    var filterString = "d.config.insightType == " + '\'' ;
    var orString = "|| d.config.insightType ==" + '\'';
    var filtersList = [];

    //go through each key item in the filterSettings object, and check whether it is set to true. If it is, add it to the filtersList array.
    Object.keys(filterSettings.insightType).forEach(function(d){
        console.log(d);
        if(filterSettings.insightType[d]){
            filtersList.push(d);
        }
    });

    filtersList.forEach(function(d,i){
        if (i == 0){
            filterString = filterString + d + '\'';
        }
        else{
            filterString = filterString + orString + d + '\'';
        }
    });

    console.log(filterString);

    //if the reducedArray is populated, use it.
    if (reducedArray.length > 0) {
        tempArray = reducedArray.filter(function(d){
             return (eval(filterString));
        });
    }

    //otherwise, use the original rectsArray
    else{
        tempArray = rectsArray.filter(function(d){
            return (eval(filterString));
        });
    }

    reducedArray =[];
    reducedArray = tempArray;

    updateColor(reducedArray);
}

//Identifies chart types compatible with insight types selected in check4(). Should check actual data contents available,
//subgroups of data, etc.
function check5() {

}

//Checks input configuration restrictions imposed by the user (put d2 on input 3, etc.). Should throw errors for combinations
//that are not compatible with previous options.
function check6() {

}


/**********************************************************************************************************************
Utility functions

Collect input from the interface, update chart colors, reset data, etc.
**********************************************************************************************************************/

function drawColors() {

    g.selectAll('.insightLabels')
        .data(insightTypeArray)//colorArray)
        .enter()
        .append('text')
        .attr('transform','rotate(-90)')
        .attr('x',function(d,i){
            return 10;
        })
        .attr('y',function(d,i){
            return i*21 + 13;
        })
        .text(function(d){return d.insightType + ' (' + d.chartTypes + ')'});

    g.selectAll('.dataLabels')
        .data(dataBasketArray)//colorArray)
        .enter()
        .append('text')
        .attr('x',function(d,i){
            return -10;
        })
        .attr('y',function(d,i){
            return i*21 +15 ;
        })
        .attr('text-anchor','end')
        .text(function(d){
            var temp = '';
            d.components.forEach(function(e,i){
                if (i == 0){
                    temp = e.name;
                }
                else {
                    temp = temp + ',' + e.name;
                }

            });
            return d.class + ' (' + temp + ')'});

    g.selectAll('.elements')
        .data(rectsArray, function (d){return d.id})//colorArray)
        .enter()
        .append('rect')
        .attr('class','elements')
        .attr('x',function(d,i){
            return d.column*21;
        })
        .attr('y',function(d,i){
            return d.row*21;
        })
        .attr('width', 20)
        .attr('height',20)
        .attr('fill',function(d,i){
            if(d.data == d.config.input1[0]){
                return 'white';
            }
            else{
                return 'black'
            }

        })
        .on('mouseover',function(d){console.log(d)});


}

function resetData(){

    reducedArray = [];

    g.selectAll('.elements')
        .attr('fill','black');
}


function updateColor (currentArray){
   g.selectAll('.elements')
        .attr('fill', function(d){
            if (currentArray.find(function(e){
                    return d.id == e.id;
                })){
                return 'black';
            }
            else{
                if(d3.select(this).attr('fill')=="black"){
                     return '#f2f2f2';
                }
                else{
                    return 'white';
                }
            }

        });

}

function progressionChecked() {
    if (document.getElementById("progression").checked){
        filterSettings.dimension.pd = true;
        check0();
    }
    else if (!document.getElementById("progression").checked){
        filterSettings.dimension.pd = false;
        check0();
        check4();
    }
}

function overviewChecked() {
    if (document.getElementById("overview").checked){
        //if null, values have not been set before - should have all values of insightType in reducedArray
        /*if(filterSettings.insightType.overview === null){
            filterSettings.insightType.overview = true;
        }*/
        //otherwise, need to re-filter the original array using all previous steps, and then apply the insight filter
        if(filterSettings.insightType.overview === false){
            filterSettings.insightType.overview = true;
            reducedArray = [];
            check0();
            check2();
        }
    }
    else if (!document.getElementById("overview").checked){
        filterSettings.insightType.overview = false;
    }

    check4();
}

function comparisonChecked() {
    //if null, values have not been set before - should have all values of insightType in reducedArray
    /*if(filterSettings.insightType.comparison === null){
        filterSettings.insightType.comparison = true;
    }*/
    //otherwise, need to re-filter the original array using all previous steps, and then apply the insight filter
    if(filterSettings.insightType.comparison === false){
        filterSettings.insightType.comparison = true;
        reducedArray = [];
        check0();
        check2();
    }
    else if (!document.getElementById("comparison").checked){
        filterSettings.insightType.comparison = false;
    }

    check4();
}

function trendChecked() {
    //if null, values have not been set before - should have all values of insightType in reducedArray
    /*if(filterSettings.insightType.trend === null){
        filterSettings.insightType.trend = true;
    }*/
    //otherwise, need to re-filter the original array using all previous steps, and then apply the insight filter
    if(filterSettings.insightType.trend === false){
        filterSettings.insightType.trend = true;
        reducedArray = [];
        check0();
        check2();
    }
    else if (!document.getElementById("trend").checked){
        filterSettings.insightType.trend = false;
    }

    check4();
}





function tpiChecked() {

    if (document.getElementById("tpi").checked){
        if(filterSettings.time.tpi === false){
            filterSettings.time.tpi = true;
            //reducedArray = [];
            check0();
        }
    }
    else if (!document.getElementById("tpi").checked){
        filterSettings.time.tpi = false;
    }

    check2();
}

function tppChecked() {
    if (document.getElementById("tpp").checked){
        if(filterSettings.time.tpp === false){
            filterSettings.time.tpp = true;
            reducedArray = [];
            check0();
        }
    }
    else if (!document.getElementById("tpp").checked){
        filterSettings.time.tpp = false;
    }

    check2();
}

function tpnChecked() {
    if (document.getElementById("tpn").checked){
        if(filterSettings.time.tpn === false){
            filterSettings.time.tpn = true;
            reducedArray = [];
            check0();
        }
    }
    else if (!document.getElementById("tpn").checked){
        filterSettings.time.tpn = false;
    }

    check2();
}