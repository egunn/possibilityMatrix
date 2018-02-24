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
    {insightType:"overview", chartTypes:['KPI'],implicitInput:['tpi'],input1:['m'], input2:['m'],input3:[]},
    {insightType:"overview", chartTypes:['profile'],implicitInput:['tpi'],input1:['nd'], input2:[],input3:[]},
    {insightType:'comparison',chartTypes:['donut','bar','multiset bar'],implicitInput:['tpi'],input1:['m','nd'], input2:['m'],input3:[]},
    {insightType:'trend',chartTypes:['line','area','bar'],implicitInput:[],input1:['m'], input2:['pd'],input3:[]},
    {insightType:'trend',chartTypes:['line','area','bar'],implicitInput:['tpi'],input1:['m'], input2:['pd'],input3:[]},
    {insightType:'table',chartTypes:['table'],implicitInput:[],input1:['m','nd'], input2:['m'],input3:[]}
];

/*
 {class:'mg', components:[
 {name:'mgm',type:'m'},
 {name:'mgd',type:'d'}
 ]},
 {class:'mg/d', components:[
 {name:'mgm',type:'m'},
 {name:'mgd',type:'d'},
 {name:'d2',type:'d'}
 ]},
*/

//this array contains the general data configurations used in the chart
var dataOptionsArray = [
    {class:'m',
        components:[
            {name:'m1',type:'m'}
        ]},
    {class:'d',
        components:[
            {name:'d1',type:'d'}
        ]},
    {class:'m/m',
        components:[
            {name:'m1',type:'m'},
            {name:'m2',type:'m'}
        ]},
    {class:'m/d', components:[
        {name:'m1',type:'m'},
        {name:'d1',type:'d'}
    ]},
    {class:'d/d', components:[
        {name:'d1',type:'d'},
        {name:'d2',type:'d'}
    ]},
    {class:'m/m/d', components:[
        {name:'m1',type:'m'},
        {name:'m2',type:'m'},
        {name:'d1',type:'d'}
    ]},
    {class:'m/d/d', components:[
        {name:'m1',type:'m'},
        {name:'d1',type:'d'},
        {name:'d2',type:'d'}
    ]},
    {class:'d/d/d', components:[
        {name:'d1',type:'d'},
        {name:'d2',type:'d'},
        {name:'d3',type:'d'}
    ]}
];

//this array populates the dataOptions array with the data available in my basket 'o data. Multiple combinations are allowed,
//if the data can be mixed and matched in different ways, and there is one object for each combination
//(i.e. if there are two dimensions, then m/d1/d2 and m/d2/d1 get different entries).

//For this example, data available is m1, m2, d1, d2, d3
var expandedDataOptionsArray = [
    {class:'m',
        components:[
            {name:'m1',type:'m'}
        ]},
    {class:'d',
        components:[
            {name:'d1',type:'d'}
        ]},
    {class:'m/m',
        components:[
            {name:'m1',type:'m'},
            {name:'m2',type:'m'}
        ]},
    {class:'m/d', components:[
        {name:'m1',type:'m'},
        {name:'d1',type:'d'}
    ]},
    {class:'d/d', components:[
        {name:'d1',type:'d'},
        {name:'d2',type:'d'}
    ]},
    {class:'m/m/d', components:[
        {name:'m1',type:'m'},
        {name:'m2',type:'m'},
        {name:'d1',type:'d'}
    ]},
    {class:'m/d/d', components:[
        {name:'m1',type:'m'},
        {name:'d1',type:'d'},
        {name:'d2',type:'d'}
    ]},
    {class:'d/d/d', components:[
        {name:'d1',type:'d'},
        {name:'d2',type:'d'},
        {name:'d3',type:'d'}
    ]}

];


var dataBasketArray = [
    {class:'m',
     components:[
        {name:'m1',type:'m',unit:'test'}
     ]},
    {class:'m/m',
        components:[
            {name:'m1',type:'m', unit:'test'},
            {name:'m2',type:'m',unit:'test'}
        ]},
    {class:'m/d', components:[
        {name:'m1',type:'m', unit:'test'},
        {name:'d1',type:'d',prog:true, nom:true, vis:true}
    ]},
    {class:'m/d', components:[
        {name:'m1',type:'m', unit:'test'},
        {name:'d1',type:'d',prog:false, nom:true, vis:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m1',type:'m', unit:'test'},
        {name:'d1',type:'d',prog:false, nom:true, vis:true},
        {name:'d2',type:'d',prog:true, nom:false, vis:true}
    ]}
    //'nd','m/m','m/d','d/d','m/m/m','m/m/d','m/d/d','d/d/d'
];
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
    var push = false;

    //look at each array element
    rectsArray.forEach(function(d){
        //pull out all the dimension components
        var temp = d.data.components.filter(function(e){return e.type == "d"});

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

//Ignore for now this is part of the data config (are metrics linked, are time periods broken, etc.) and is done
//manually in the file above. Here, want to check the current basket o' data
//against the options listed in the rectsArray (should contain all combinations possible for data in collection; tpi, tpp, tpn, etc).
//As long as the rectsArray uses some mixture of subcomponents from the basket o' data, include it in the reducedArray.
function check1() {

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