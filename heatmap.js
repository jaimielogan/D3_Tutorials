// http://www.verisi.com/resources/diversity-and-2010census.htm

var map_data={};
var minimax=[];
var map_color_obj={};
var color_set="Reds";
var asian_array={}, black_array={}, white_array={}, hisp_array={}, nat_array={}, roc_array={}, pop_array={};

var stepsize=1,steps=18;
d3.csv("./data/2010census.csv",function(d){var g=0,c="";
sampsize=d.length;
for(var e=0;
  e<sampsize;
  e++){c=d[e].fips;
    asian_array[c]=100*parseFloat(d[e].asian);
    black_array[c]=100*parseFloat(d[e].black);
    hisp_array[c]=100*parseFloat(d[e].hispanic);
    white_array[c]=100*parseFloat(d[e].white);
    nat_array[c]=100*parseFloat(d[e].nat_amer);
    roc_array[c]=100*parseFloat(d[e].pct_change);
    pop_array[c]=2*Math.log(1+parseFloat(d[e].popsqmi))}var m=d3.geo.path();
    var f=d3.select("#census-map").append("svg:svg");
    var b=f.append("svg:g").attr("id","counties").attr("class",color_set);
    var k=f.append("svg:g").attr("id","states");
    d3.json("us-counties.json",function(i){b.selectAll("path").data(i.features).enter().append("svg:path").attr("class",d?a:null).attr("d",m)});
    d3.json("us-states.json",function(i){k.selectAll("path").data(i.features).enter().append("svg:path").attr("d",m)});
    map_data=pop_array;
    minimax=new Array();
    minimax=h(map_data);
    stepsize=(minimax[1]-minimax[0])/steps;
    b.selectAll("path").attr("data",map_data).attr("class",l);
    d3.select("select").on("change",function(){var i=this.value;
      steps=18;
      color_set="Reds";
      if(i=="sel-asian"){map_data=asian_array}else{if(i=="sel-black"){map_data=black_array}else{if(i=="sel-hispanic"){map_data=hisp_array}else{if(i=="sel-nat-amer"){map_data=nat_array}else{if(i=="sel-white"){map_data=white_array;
        steps=9}else{map_data=pop_array}}}}}minimax=h(map_data);
        stepsize=(minimax[1]-minimax[0])/steps;
        if(i=="sel-roc"){map_data=roc_array;
          stepsize=2*Math.max(minimax[1],-minimax[0])/steps;
          color_set="RedBlackGreen"}b.attr("class",color_set);
          if(i=="sel-roc"){b.selectAll("path").attr("data",map_data).attr("class",j)}else{b.selectAll("path").attr("data",map_data).attr("class",l)}});
          function a(i){return"q"+Math.min(8,~~(map_data[i.id]*9/12))+"-9"}function l(i)
          {if(!map_data[i.id]){return"q0-9"}else{return"q"+Math.min(8,Math.round(map_data[i.id]/stepsize))+"-9";
        }}
          function j(i)
          {if(!map_data[i.id])
            {return"q9-9";
          }
            else
            {if(map_data[i.id]===0)
              {return"q4-9";}
              else
              {if(map_data[i.id]>0)
                {return"q"+Math.min(8,4+Math.round(map_data[i.id]/stepsize))+"-9";
              }
                else
                {return"q"+Math.min(4,Math.round(-map_data[i.id]/stepsize))+"-9";
              }}}}
                function h(p){var o=new Array(),i=new Array();
            for(var n in p)
            {o.push(p[n]);
            }i[1]=Math.max.apply(Math,o);

            i[0]=Math.min.apply(Math,o);

            return i;}});
