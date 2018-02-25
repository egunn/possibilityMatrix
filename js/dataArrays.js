
//this array contains the general data configurations used in all charts (m/d level only, no limitations). Needs expansion
//to accommodate large data collections (2 grouped metrics, 6 dimensions, and 12 time periods, etc.), but otherwise
//should be valid across all insights.
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

//contains the actual data types and name of the specific data objects that the user entered (d should be flagged as
//progressional at this point, from the metadata, but its usage has not yet been set; a pd here means that the user
//should have the option to set nd/pd filter requirements in the interface.)
var dataBasket = [
        {name:'tp2',type:'t'},
        {name:'m1',type:'m'},
        {name:'m2',type:'m'},
        {name:'d1',type:'pd'},
        {name:'d2',type:'d'},
        {name:'d3',type:'d'},
        {name:'d4',type:'d'},
        {name:'tp1',type:'t'}
];

//contains the configured data types, based on user selections in Data Restrictions step. Filter and chart objects separated
//based on user selection. Metric group handling is currently undetermined; I separated it here because I expect that there
//will be an additional lookup step associated with metric groups, since they function as both m and d in a chart.
var dataBasketConfig = {
    filter:[
        {name:'d4',type:'d'},
        {name:'tp2',type:'t'}],
    visualization:{
        metricgroups:[
            /*{groupname:'mg1',
                 metrics:[
                     {name:'m1',type:'m',units:'test'},
                     {name:'m2',type:'m',units:'test'}
                 ],
                 stack:true
            }*/
        ],
        metrics:[
            {name:'m1',type:'m',units:'test'},
            {name:'m2',type:'m',units:'test'}],
        dimensions:[
            {name:'d1',type:'pd',prog:true, nom:true},
            {name:'d2',type:'d',prog:false, nom:true},
            {name:'d3',type:'d',prog:false, nom:true}
        ],
        timeperiods:[
            {name:'t1',type:'t',prog:true, nom:true}
        ]
    }
};

//this array populates the dataOptions array with the data in the dataBasket that is assigned to visualizations.
//Multiple combinations are allowed, if the data can be mixed and matched in different ways, and there is one object for each combination
//(i.e. if there are two dimensions, then m/d1/d2 and m/d2/d1 get different entries).
var dataBasketPopulated = [
    {class:'m',
        components:[
            {name:'m1',type:'m',units:'test'}
        ]},
    {class:'m',
        components:[
            {name:'m2',type:'m',units:'test'}
        ]},


    {class:'d',
        components:[
            {name:'d1',type:'pd',prog:true, nom:true}
        ]},
    {class:'d',
        components:[
            {name:'d2',type:'d',prog:false, nom:true}
        ]},
    {class:'d',
        components:[
            {name:'d3',type:'d',prog:false, nom:true}
        ]},

    /*
    {class:'d', mg:true,
        components:[
            {name:'mgm',type:'m'},
            {name:'mgd',type:'d'}
        ]},
    */

    {class:'m/m',
        components:[
            {name:'m1',type:'m',units:'test'},
            {name:'m2',type:'m',units:'test'}
        ]},


    {class:'m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true}
    ]},
    {class:'m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true}
    ]},
    {class:'m/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},


    {class:'d/d', components:[
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'d/d', components:[
        {name:'d2',type:'d',prog:false, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    {class:'d/d', components:[
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},

    /*
    {class:'d/d', mg:true, components:[
        {name:'mgm',type:'m'},
        {name:'mgd',type:'d'},
        {name:'d1',type:'pd',prog:true, nom:true}
    ]},
    {class:'d/d', mg:true, components:[
        {name:'mgm',type:'m'},
        {name:'mgd',type:'d'},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'d/d', mg:true, components:[
        {name:'mgm',type:'m'},
        {name:'mgd',type:'d'},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    */

    {class:'m/m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'m2',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true}
    ]},
    {class:'m/m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'m2',type:'m',units:'test'},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'m/m/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'m2',type:'m',units:'test'},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},


    {class:'m/d/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m1',type:'m',units:'test'},
        {name:'d2',type:'d',prog:false, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d2',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},
    {class:'m/d/d', components:[
        {name:'m2',type:'m',units:'test'},
        {name:'d2',type:'d',prog:false, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]},


    {class:'d/d/d', components:[
        {name:'d1',type:'pd',prog:true, nom:true},
        {name:'d2',type:'d',prog:false, nom:true},
        {name:'d3',type:'d',prog:false, nom:true}
    ]}

];

dataBasketArray = [];
//Generate a separate option for each time handling allowed (currently assuming that all options are available for all data);
//this just expands the previous array threefold, and is a basic mockup of how we could build the original options array above).
//Wrap another for loop around this if there are multiple time periods to consider.
dataBasketPopulated.forEach(function(d){

    var timeOptions = ['tpi','tpp','tpn'];

    timeOptions.forEach(function(e){
        if (e=='tpi'){
            //avoid object reference passing, which causes all kinds of trouble here.
            var temp = JSON.parse(JSON.stringify(d));
            temp.time = e;
            temp.components.push({name:'tp1i',type:e, int: true, prog:false, nom:false});
            dataBasketArray.push(temp);
        }
        else if (e=='tpp'){
            var temp = JSON.parse(JSON.stringify(d));
            temp.time = e;
            temp.components.push({name:'tp1p',type:e, int: false, prog:true, nom:false});
            dataBasketArray.push(temp);
        }
        else{
            var temp = JSON.parse(JSON.stringify(d));
            temp.time = e;
            temp.components.push({name:'tp1n',type:e, int: false, prog:false, nom:true});
            dataBasketArray.push(temp);
        }

    });
});

console.log(dataBasketArray);
