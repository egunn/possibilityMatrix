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
    {insightType:'table',chartTypes:['table'],prog:null, nom:null, time:['tpi','tpp','tpn'], implicitInput:[],input1:['m','nd'], input2:['m'],input3:[]}
];

/*Consider using for populating if statement in check 0: , array:['pd','tpp']*/
var filterSettings = {
    dimension:{pd: false, tpp:false}
};


var reducedArray = [];

drawColors();


function drawColors() {
  for (var i=0; i < insightTypeArray.length; i++){
    for (var j=0; j < dataBasketArray.length; j++){
        rectsArray.push({id:'r'+j+'c'+i, row:j, column:i, config:insightTypeArray[i], data:dataBasketArray[j] });
    }
  }

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
                  return 'black';
              }
              else{
                  return 'white'
              }

      })
      .on('mouseover',function(d){console.log(d)});


    }

function resetData(){

    reducedArray = [];

    g.selectAll('.elements')
        .attr('fill','white');
}

//checks things set at the metadata level (right now, only whether a dimension is a progression)
function check0 () {

    if (filterSettings.dimension.pd){

        //build up a string for filtering, using the array stored in the filterSettings object
        //(Note: returns any object that meets ONE of the criteria in the filterSettings array)
        var filterString = "e.type == " + '\'' ;
        orString = "|| e.type ==";
        filtersList = [];

        //go through each key item in the filterSettings object, and check whether it is set to true. If it is, add it to the filtersList array.
        Object.keys(filterSettings.dimension).forEach(function(d){

            if(filterSettings.dimension[d]){
                filtersList.push(d);
            }
        });

        console.log(filtersList);

        filtersList.forEach(function(d,i){
           if (i == 0){
               filterString = filterString + d + '\'';
           }
           else{
               filterString = filterString + orString + d + '\'';
           }
        });

        console.log(filterString);
        var push = false;

        //check each element in rectsArray for the filters set in the filterSettings array
        rectsArray.forEach(function(d){
            var temp = d.data.components.filter(function(e){ return (filterString); });

            console.log(temp);

            //if you find a progressional dimension, set the push flag to true
            if(temp) {
                temp.forEach(function(d){
                    if (d.prog == true) {
                        push = true;
                    }
                })
            }

            //if the push flag has been set, add the entire array element to the reduced array
            if (push){
                reducedArray.push(d);
                push = false;
            }
        });

        updateColor(reducedArray);
        push = false;

    }
    else {
        resetData();

    }


}

//Ignore for now this is part of the data config (are metrics linked, are time periods broken, etc.) and is done
//manually in the file above. Here, want to check the current basket o' data
//against the options listed in the rectsArray (should contain all combinations possible for data in collection; tpi, tpp, tpn, etc).
//As long as the rectsArray uses some mixture of subcomponents from the basket o' data, include it in the reducedArray.
function check1() {
    if (filterSettings.time.value){

        var push = false;

        //if the reducedArray is populated, use it.
        if (reducedArray.length > 0){

            //look at each array element
            reducedArray.forEach(function(d){
                //check for progressional dimensions or time components in the components array
                var temp = d.data.components.filter(function(e){ return (e.type == 'tpp'); });

                //if you find a progressional dimension, set the push flag to true
                if(temp) {
                    temp.forEach(function(d){
                        if (d.prog == true) {
                            push = true;
                        }
                    })
                }

                //if the push flag has been set, add the entire array element to the reduced array
                if (push){
                    reducedArray.push(d);
                    push = false;
                }
            });

        }
        //otherwise, use the original rectsArray
        else{

            //look at each array element
            rectsArray.forEach(function(d){
                //check for progressional dimensions or time components in the components array
                var temp = d.data.components.filter(function(e){ return (e.type == 'tpp'); });

                //if you find a progressional dimension, set the push flag to true
                if(temp) {
                    temp.forEach(function(d){
                        if (d.prog == true) {
                            push = true;
                        }
                    })
                }

                //if the push flag has been set, add the entire array element to the reduced array
                if (push){
                    reducedArray.push(d);
                    push = false;
                }
            });

        }


        updateColor(reducedArray);
        push = false;

    }
    else if (!filterSettings.progression.value){
        resetData();

    }
}

function check2 (){
    //if the reducedArray is populated, use it.
    if (reducedArray.length > 0){

    }
    //otherwise, use the original rectsArray
    else{

    }

}

function check3 (){

}

function check4 () {

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
                return 'white';
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
    }
}