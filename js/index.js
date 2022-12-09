$(document).ready(function(){
  var t1 = new Date().getTime();

    var svg   = document.querySelector("#mapSvg");

    $('path').click(function(){
        //$(this).css('fill','red');
        //console.log( $(this) instanceof SVGElement );
    });

    


    var svgPathArea = document.querySelector("#path39");
    var d = svgPathArea.getAttribute("d");
    const properties = new svgPathProperties.svgPathProperties(d);
    const length = properties.getTotalLength();
    const point = properties.getPointAtLength(1100);
    
    //console.log("tangent=");
    //console.log(tangent);
    //$(svgPathArea).css('fill', 'blue');

    for(var i=0; i<10/*length*/; i++){
      const point = properties.getPointAtLength(i);
      const tangent = properties.getTangentAtLength(i);
      //p(Math.floor(point.x)+", "+Math.floor(point.y)+"      "+tangent.x.toFixed(3)+", "+tangent.y.toFixed(3));
    }

    var point1 = properties.getPointAtLength(0);
    var point2 = properties.getPointAtLength( Math.round(length/4) );
    var point3 = properties.getPointAtLength( Math.round(length/2) );
    var point4 = properties.getPointAtLength( Math.round(length*3/4) );
    
    var x1 = Math.floor(point1.x);
    var y1 = Math.floor(point1.y);

    var x2 = Math.floor(point3.x);
    var y2 = Math.floor(point3.y);

    var x3 = Math.floor(point2.x);
    var y3 = Math.floor(point2.y);

    var x4 = Math.floor(point4.x);
    var y4 = Math.floor(point4.y);

    // p("point 1 : "+Math.floor(point1.x)+", "+Math.floor(point1.y));
    // p("point 2 : "+Math.floor(point2.x)+", "+Math.floor(point2.y));
    // p("point 3 : "+Math.floor(point3.x)+", "+Math.floor(point3.y));
    // p("point 4 : "+Math.floor(point4.x)+", "+Math.floor(point4.y));

    //find assumed intersection point of line1 (point1, point3) and line2 (point2, point4)
    var Px = ((x1*y2-y1*x2)*(x3-x4) - (x1-x2)*(x3*y4-y3*x4)) / ( (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4) ) ;
    var Py = ((x1*y2-y1*x2)*(y3-y4) - (y1-y2)*(x3*y4-y3*x4)) / ( (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4) ) ;
    Px = Math.round(Px);
    Py = Math.round(Py);



    // draw red circle
    
    var svgns = "http://www.w3.org/2000/svg";

     // get the center
     var bbox = svgPathArea.getBBox();
     var tmpPoint = [533, 1380];
     var center = {
        x: tmpPoint[0],//point.x,//bbox.x,//(bbox.x + bbox.width)/2,
        y: tmpPoint[1]//bbox.y//  + bbox.height/2
     };

     // create the dot
     var dot = document.createElementNS(svgns, 'circle');
     dot.setAttribute("cx", center.x);
     dot.setAttribute("cy", center.y);
     dot.setAttribute("r", 15);
     dot.setAttribute("fill", "#ffffff00");
     dot.setAttribute("text", "#ff0000");
     dot.setAttribute("stroke", "#00f");
     dot.setAttribute("stroke-width", "3px");
     //svg.appendChild(dot);



     // for(var y=0; y<= 15; y++){
     //    createDot(20, y*100);
     // }

     // for(var x=0; x<= 15; x++){
     //    createDot(x*100, 20);
     // }

     // createDot( Math.floor(point1.x), Math.floor(point1.y) );
     // createDot( Math.floor(point2.x), Math.floor(point2.y) );
     // createDot( Math.floor(point3.x), Math.floor(point3.y) );
     // createDot( Math.floor(point4.x), Math.floor(point4.y) );

     //p( Px+", "+Py );
     //createDot(Px, Py);

    // console.log( $(path).parent().attr('title') );

    //check if a point is inside a path area
    let svgPoint =  svg.createSVGPoint();
    svgPoint.x = tmpPoint[0];
    svgPoint.y = tmpPoint[1];
    //p(svgPathArea.isPointInFill(svgPoint));




    //========================= main code starts here ======================================

    var testVisitors = { "Nilphamari": 1840, "Panchagar": 645, "Thakurgao": 377, "Lalmonirhut": 1867, "Dinajpur": 550, "Rangpur": 399, "Kurigram": 61, "Gaibandha": 1692, "Pabna": 43, "ChapaiNababgang": 1033, "Bagura": 564, "Natore": 354, "Rajshahi": 1155, "Sirajgang": 1923, "Naoga": 821, "Jaypurhut": 1682, "Zinaidah": 556, "Magura": 1267, "Zessore": 596, "Narail": 1417, "Satkhira": 1402, "Khulna": 742, "Kushtia": 438, "Meherpur": 11, "Chuadanga": 42, "Bagerhat": 1943, "Pirojpur": 538, "Jhalkati": 429, "Barisal": 1119, "Borguna": 596, "Potuakhali": 1342, "Bhola": 789, "B-baria": 988, "cumilla": 1426, "Chadpur": 453, "Lakhsmipur": 1626, "Noakhali": 1388, "Feni": 623, "Chittagong": 223, "Khagrachari": 141, "Bandarban": 426, "Rangamati": 1262, "CoxsBazar": 515, "Sunamganj": 194, "Sylhet": 1341, "Habiganj": 371, "Moulovibazar": 1051, "Jamalpur": 1268, "Sherpur": 93, "Mymensingh": 174, "Netrokona": 730, "Rajbari": 1879, "Faridpur": 54, "Gopalganj": 1858, "Manikganj": 1221, "Dhaka": 1, "Shariatpur": 759, "Madaripur": 462, "Gazupur": 441, "Narsingdi": 838, "Narayanganj": 514, "Munshiganj": 938, "Kisurganj": 157, "Tangail": 517 };

    var maxVisitor = 0;
    var maxVisitorDist = "";
    for(let key in testVisitors){
      if(maxVisitor < testVisitors[key]){
        maxVisitor = testVisitors[key];
        maxVisitorDist = key;
      }
    }
    $('.max-visitor').text(maxVisitorDist+" ("+maxVisitor+")" );

    // click on individual district
    var prevPathId = "";
    $('a').click(function(e){
        var districtName = $(this).attr('title');
        var pathId = $(this).find('path').attr('id');

        $("#"+prevPathId).css('fill', '#000');
        $("#"+prevPathId).css('fill', "");//blank color code will just remove overridden color and thus restore to original(previous) color
        $("#"+pathId).css('fill', '#f00');
        prevPathId = pathId;

        pathId = pathId.substring(4);
        if(districtName != undefined){
          var numOfVisitor = testVisitors[districtName];
          p("Dist="+districtName+" "+pathId+" > numOfVisitor"+numOfVisitor+" max="+maxVisitor);
          $('.selected-dist-name').text(districtName).hide().fadeToggle(300);
          $('.selected-dist-visitor').text(numOfVisitor).hide().fadeToggle(300);
          e.stopPropagation();//select only innermost element (the only element which get clicked)
        }
    });



    //zoom map
    var defaultWidth = null;
    var defaultHeight = null;

    $('.zoom-buttons .icon').click(function(){
      if(defaultWidth==null && defaultHeight==null){
        // store default values for restore default feature
        defaultWidth = $("#mapSvg").css('width');
        defaultHeight = $("#mapSvg").css('height');
      }

      var width = $("#mapSvg").css('width');
      var height = $("#mapSvg").css('height');
      var zoomStepPercent = 5;
      var zoomPlusOrMinus;

      if($(this).hasClass('minus-icon')){
        zoomPlusOrMinus = -1;
      } 
      else if($(this).hasClass('plus-icon')){
        zoomPlusOrMinus = 1;
      } 
      else if($(this).hasClass('restore-icon')){
        $("#mapSvg").css('width', defaultWidth);
        $("#mapSvg").css('height', defaultHeight);
      }
      
      width = parseInt(width);
      height = parseInt(height);
      //p(width+" vs "+height);
      var deltaW = width*zoomStepPercent/100;
      var deltaH = width*zoomStepPercent/100;
      if(deltaW>0 && deltaH>0){
        //in case of many consecutive minus, it may be reduced to zero. Then it cannt be enlarged further
        width = width + zoomPlusOrMinus*deltaW;
        height = height + zoomPlusOrMinus*deltaH;
        if(width>100 && height>100){
          //width, height is not allowed go be smaller than 100px, though upper limit for zoom plus
          $("#mapSvg").css('width', width);
          $("#mapSvg").css('height', height);
        }
      }
      //p("DELTA "+deltaW+" vs "+deltaH);
    });

    var i=0;

    $('a.district').each(function(){
      var districtName = $(this).attr('title');
      var pathId = $(this).find('path').attr('id');
      var svgPathArea = document.querySelector("#"+pathId);
      var d = svgPathArea.getAttribute("d");
      var properties = new svgPathProperties.svgPathProperties(d);
      var lineLength = properties.getTotalLength();
      lineLength = Math.floor(lineLength);

      //mark 4 points on the path line
      var point1 = properties.getPointAtLength(0);
      var point2 = properties.getPointAtLength( Math.round(lineLength/4) ); //at 25% length
      var point3 = properties.getPointAtLength( Math.round(lineLength/2) ); //at 50% length
      var point4 = properties.getPointAtLength( Math.round(lineLength*3/4) ); //at 75% length
      
      //find assumed intersection point of line1 (point1, point3) and line2 (point2, point4). This is assumed midpoint of this path area
      var P = findIntersectionPoint(point1, point3, point2, point4); //NOTICE >> point sequence: 1,3,2,4

      if(! pathAreaContainsPoint(svgPathArea, P.x, P.y)){
        //assumed point is out of area. Need to manually set a point coordinate which resides inside the path area

        // p(districtName+" assumed point is ouside");
        // $(svgPathArea).css('fill', 'red');
        if(districtName == 'Lalmonirhut'){
          //Lalmonirhut assumed midpoint is out of area. Manually set point
          P.x = 400;
          P.y = 210;
        }
        if(districtName == 'Barisal'){
          //Barisal assumed midpoint is out of area. Manually set point
          P.x = 790;
          P.y = 1360;
        }
      }else{
        //though assumed mid point is inside path area, it was needed to manually set point
        if(districtName == 'Chittagong'){
          //Barisal assumed midpoint is out of area. Manually set point
          P.x = 1290;
          P.y = 1500;
        }
      }

        // var dv = { "key":districtName, "value": randomNum(0,2000) }
        // testVisitors.push(dv);


      var dotC = 0, rC=0, numOfCreatedDots = 0;
      setTimeout(function(){
        //as it generatres and updates a huge amount of data. do those in individual threads :D !
        for(var r=0; r < lineLength; r+=10){
          ++rC;
          var isAnyPointOnCircumference = false;
          var prevX=0, prevY=0;
          for(var t=0; t < 340; t+=5){
            //p("rC="+rC+" : "+"r="+r+" - t="+t);
            var x = r*Math.cos(t*Math.PI/180);
            var y = r*Math.sin(t*Math.PI/180);
            if(x>0){
              x = Math.round(P.x - x);
            }else{
              x = Math.round(P.x + x);
            }
            y = Math.round(P.y + y);
            //p(x+", "+y);
            if(pathAreaContainsPoint(svgPathArea,x,y)){
              isAnyPointOnCircumference = true;
              if(getDistance(x,y, prevX,prevY) >= 10){
                createDot(x,y);
                prevX = x; 
                prevY = y;
                //p(x+", "+y+"  r="+r+"  t="+t);
              }
              ++dotC;
            }
          }
          if(! isAnyPointOnCircumference){
            break;
          }

          var dotLimit = testVisitors[districtName] / 100;
          if(++numOfCreatedDots >= dotLimit){
            //p(districtName+" : "+numOfCreatedDots+" >= "+dotLimit)
            break;
          }
        }
      }, i*10 );

      //createDotWithLabel(P.x, P.y, districtName);



      //p(districtName+" >> "+dotC+" dots"+" -- rows="+rC);
      //p(testVisitors[districtName]);

      if(++i > 64){
        return false;
      }
    }); // END $('a.district').each



    //https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
    // var object = testVisitors.reduce(
    //   (obj, item) => Object.assign(obj, { [[item.key]]: item.value }), {}
    //   );
    // var x = object;
    // p(x)




    var t2 = new Date().getTime();
    var t = ((t2-t1)/1000).toFixed(1);
    p("execution time="+t+" sec");
    

    function getDistance(x1, y1, x2, y2){
        let y = x2 - x1;
        let x = y2 - y1;
        return Math.sqrt(x*x + y*y);
    }


    function pathAreaContainsPoint(svgPathArea, x, y){
      let svgPoint =  svg.createSVGPoint();
      svgPoint.x = x;
      svgPoint.y = y;
      return svgPathArea.isPointInFill(svgPoint); 
    }


    function findIntersectionPoint(point1, point2, point3, point4){
      var x1 = Math.floor(point1.x);
      var y1 = Math.floor(point1.y);

      var x2 = Math.floor(point2.x);
      var y2 = Math.floor(point2.y);

      var x3 = Math.floor(point3.x);
      var y3 = Math.floor(point3.y);

      var x4 = Math.floor(point4.x);
      var y4 = Math.floor(point4.y);

      var Px = ((x1*y2-y1*x2)*(x3-x4) - (x1-x2)*(x3*y4-y3*x4)) / ( (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4) ) ;
      var Py = ((x1*y2-y1*x2)*(y3-y4) - (y1-y2)*(x3*y4-y3*x4)) / ( (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4) ) ;
      Px = Math.round(Px);
      Py = Math.round(Py);
      //p("Px="+Px+", Py="+Py);
      var P = {x:Px, y:Py};

      return P;
    }


    function randomNum(min, max) {
      return Math.floor( Math.random()*(max-min)+min ); 
    }


     function createDot(x, y){
        var svgns = "http://www.w3.org/2000/svg";
        var dot = document.createElementNS(svgns, 'circle');
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", 3);
        dot.setAttribute("fill", "#22ff99");//22ff99
        dot.setAttribute("stroke", "#f00");
        dot.setAttribute("stroke-width", "1px");
        
        //add Label
        // var label = "("+x+","+y+")";
        // var svgNS = "http://www.w3.org/2000/svg";
        // var newText = document.createElementNS(svgNS,"text");
        // newText.setAttributeNS(null,"x",x+20);     
        // newText.setAttributeNS(null,"y",y+10); 
        // newText.setAttributeNS(null,"font-size","20");

        // var textNode = document.createTextNode(label);
        // newText.appendChild(textNode);
        // svg.appendChild(newText);


        svg.appendChild(dot);
     }


     function createDotWithLabel(x, y, label){
        var svgns = "http://www.w3.org/2000/svg";
        var dot = document.createElementNS(svgns, 'circle');
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", 5);
        dot.setAttribute("fill", "#22ff99");//
        dot.setAttribute("stroke", "#f00");
        dot.setAttribute("stroke-width", "2px");
        
        //add Label
        var svgNS = "http://www.w3.org/2000/svg";
        var newText = document.createElementNS(svgNS,"text");
        newText.setAttributeNS(null,"x",x+20);     
        newText.setAttributeNS(null,"y",y+10); 
        newText.setAttributeNS(null,"font-size","20");

        var textNode = document.createTextNode(label);
        newText.appendChild(textNode);
        svg.appendChild(newText);


        svg.appendChild(dot);
     }


     function p(data) {
       console.log(data);
     }




});