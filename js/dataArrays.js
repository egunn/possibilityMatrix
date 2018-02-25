
//this array contains the general data configurations used in all charts (m/d level only, no limitations)
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

//contains the actual data types that the user entered (d should be flagged as progressional at this point, from the metadata)
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

//contains the configured data types, based on user selections in Data Restrictions step
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
//wrap another for loop around this if there are multiple time periods to consider
dataBasketPopulated.forEach(function(d){

    var timeOptions = ['tpi','tpp','tpn'];
    timeOptions.forEach(function(e){
        if (e=='tpi'){
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
    //console.log(dataBasketArray )
});

console.log(dataBasketArray);
/*
var fullDataOptionsArray = [];
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
    */