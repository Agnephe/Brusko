import { RightPanel } from "../right-panel/right-panel.component"

var instrumentMode // if this variable is = 0 we are outside the mode selection, if = 1 we are in 'layer mode', if = 2 we are in 'track_selection mode', if = 3 we are in 'change_shape_mode', if = 4 we are in 'rotation mode', if = 5 we are in 'note mode', if = 6 we are in 'sample mode', if = 7 we are in custom shape mode;

let degree = 0

var myTimeout
var layerNumber = 1
var kindOfShape = 0
var selectedShape = 0
var selectedShape2 = 0
var maxNumShapes = 1
var maxNumShape2 = 1
var numCustShapes = 0
var canvas
var firstLayerLandW = 500
var clockCircleScaleSize = 1
//var vertices = [];
//var vertices2 = [];
var buttonsx
var buttondx
var slider
var buttonNC
//var NewCircle;
var buttonShape
var buttonRotate
//var radiusx;
//var radiusy;
var nGrain = 16
//var nGrain2 = 16;
//var x = 400;
//var y = 400;
var currentGrain = 0
var currentGrain2 = 0

var rot1 = new Array(maxNumShapes)
var shp1 = new Array(maxNumShapes)

var rot2 = new Array(maxNumShape2)
var shp2 = new Array(maxNumShape2)


function initializeArrays() {
    for (i = 0; i < rot1.length; i++) {
        rot1[i] = 0
    }

    for (i = 0; i < rot2.length; i++) {
        rot2[i] = 0
    }

    for (i = 0; i < shp1.length; i++) {
        shp1[i] = i
    }

    for (i = 0; i < shp2.length; i++) {
        shp2[i] = i
    }
}

initializeArrays()


//SHAPES' DATABASE

//this is the array whose dimension is the maximum number of tracks we want to have --> maxNumberShapes <--, and for each track selects a specific shape. e.g. polygon_array_ALL[1][2] selects,given a number of grains nGrain, the third shape -a triangle- for the second track.


let polygon_array = new Array(nGrain - 1)
let polygon_array_c = new Array() // custom polygon array
let polygon_array2 = new Array(nGrain - 1)

//LOOP TO GENERATE DIFFERENT SHAPES
for (i = 2; i <= nGrain; i++) { //starts from 2 since we need a line as the simplest shape possible
    polygon_array[i - 2] = new Array(i)
    for (h = 0; h < polygon_array[i - 2].length; h++) {
        polygon_array[i - 2][h] = Math.round(nGrain * h / polygon_array[i - 2].length)
    }
}

for (i = 2; i <= nGrain; i++) { //starts from 2 since we need a line as the simplest shape possible
    polygon_array2[i - 2] = new Array(i)
    for (h = 0; h < polygon_array2[i - 2].length; h++) {
        polygon_array2[i - 2][h] = Math.round(nGrain * h / polygon_array2[i - 2].length)
    }
}


//UPDATE ARRAYS
function updateArrays() {
    // this is the rotation array, containing all the rotation indexes for just the FIRST layer. Its length is equal to the maximum number of shapes created in the related layer.
    rot1.push(0)

    if (layerNumber == 2) {
        rot2.push(0)
    }


    //kind of shape index array relative to the first layer. here are stored the kind of shape of tracks. i set up this number to be 1,2,3...maxNumofShapes just to make the user distinguish between and avoid graphic overlap.

    if (instrumentMode == 2) {
        shp1.push(maxNumShapes - 1)
    }

    if (instrumentMode == 2 && layerNumber == 2) {
        shp2.push(maxNumShape2 - 1)
    }

    selectedShape = maxNumShapes
    selectedShape2 = maxNumShape2

    /*if (instrumentMode == 7) {
    shp1.push(polygon_array.length)
    }*/

}

//SETUP
function setup() {
    canvas = createCanvas(windowWidth,windowHeight)
    background(100, 150, 100)


    //buttons
    buttondx = createButton("+1")
    buttondx.position(width * 0.87, height * 0.8)

    buttonsx = createButton("-1")
    buttonsx.position(width * 0.87 - 35, height * 0.8)

    buttonenc = createButton("Encoder Button")
    buttonenc.position(width * 0.8, height * 0.84)


    buttondx.mousePressed(encoderInc)
    buttonsx.mousePressed(encoderDec)
    buttonenc.mousePressed(encoderButt)

    buttoncust = createButton("X")
    buttoncust.position(width * 0.85, height * 0.2)
    buttoncust.mousePressed(deleteShape)


    //button new Circle
    buttonNC = createButton("Layer")
    buttonNC.position(width * 0.32, height * 0.9)
    noFill()
    buttonNC.mousePressed(createNewLayer)

    //button Track
    buttonShape = createButton("Track")
    buttonShape.position(width * 0.42, height * 0.9)
    buttonShape.mousePressed(selectShape)

    //buttonShape.mouseReleased(console.log("ciao"));

    //button Track
    buttonShape = createButton("Shape")
    buttonShape.position(width * 0.52, height * 0.9)
    buttonShape.mousePressed(changeShape)


    buttonRotate = createButton("Rotate")
    buttonRotate.position(width * 0.62, height * 0.9)
    buttonRotate.mousePressed(rotateShape)

//ADD DELETE SECOND LAYER SHAPE LATER
    function deleteShape() {
        if (instrumentMode == 7) {
            instrumentMode = 2
        }
        shp1.splice(selectedShape - 1, 1)
        rot1.splice(selectedShape - 1, 1)
        maxNumShapes--
        //start from skratch
        if (maxNumShapes == 0) {
            instrumentMode = 0
        }
        selectedShape = maxNumShapes
    }
    if(layerNumber == 2){
        shp2.splice(selectedShape2-1,1)
        rot2.splice(selectedShape2-1,1)
        maxNumShape2--
        //start from skratch
        if(maxNumShape2 == 0){
          instrumentMode = 0
        }
        selectedShape2=maxNumShape2
        }
       }
    
    //slider
    /* slider = createSlider(500,1000,600);
     slider.position(width*0.8, height*0.85);
     slider.changed(updateSize);*/




//DRAW
function draw() {
    fill(255)
    ellipse(windowWidth / 2, windowHeight / 2, circleLandW, circleLandW)
    //if (layerNumber == 2) {
    //  stroke(195, 195, 195);
    //}
    //DRAW NODES
    var angle = (TWO_PI / 4) * 3
    var step = TWO_PI / nGrain
    push()
    for (let i = 0; i < nGrain; i++) {
        var grainX = windowWidth / 2 + (cos(angle) * (circleLandW / 2))
        var grainY = windowHeight / 2 + (sin(angle) * (circleLandW / 2))
        //var grains = createVector(grainX, grainY);
        //vertices.push(grains);
        strokeWeight(10)
        point(grainX, grainY)
        angle += step
    }
    pop()
    //END NODES

    //Custom Shape Mode
    if (instrumentMode == 7 && layerNumber == 1) {
        push()
        var selGrainX = windowWidth / 2 + (cos(angle + (step * currentGrain)) * (circleLandW / 2))
        var selGrainY = windowHeight / 2 + (sin(angle + (step * currentGrain)) * (circleLandW / 2))
        var grains = createVector(grainX, grainY)
        //vertices.push(grains);
        strokeWeight(10)
        stroke("red")
        point(selGrainX, selGrainY)
        pop()
    }


    //vert is defined as vert=createVector(n1,n2,...,nn) with nn --number/id of the grain

    //POLYGON_SPEC, defining
    push()

    function polygon_spec(windowWidth, windowHeight, radius, vert) {
        let angle = TWO_PI / nGrain

        //draws first layer shapes
        beginShape()
        for (let i = 0; i <= vert.length; i++) {
            corr_node = vert[i]
            count = 0
            for (let a = 0; a < TWO_PI; a += angle) {
                if (count == corr_node) {
                    let sx = windowWidth + cos(a - (TWO_PI / 4)) * radius
                    let sy = windowHeight + sin(a - (TWO_PI / 4)) * radius
                    vertex(sx, sy)
                }
                count++
            }
        }
        endShape(CLOSE)
    }

    pop()
    if (selectedShape > maxNumShapes) {
        selectedShape = 1
    }

    //it creates all the tracks

    for (i = 1; i <= maxNumShapes; i++) {
        push()
        translate(width * 0.5, height * 0.5)
        colorMode(RGB)
        fill(i * 50, i * 20, i * 10, 100)

        if (selectedShape == i) {
            strokeWeight(3)


        }
        rotate((TWO_PI) * rot1[i - 1] / nGrain)
        // TO BE FIXED! the circular array is useless, we can use polygon_array_ALL as a database of all the possible shapes. Then, with shp1, shp2, etc. we point the shape we need. For now i set it to polygon_array_ALL[0];


        polygon_spec(0, 0, (circleLandW / 2), polygon_array[shp1[i - 1]])
        pop()
    }

    if (layerNumber == 2) {
        fill(250, 250, 250, 70)
        stroke(0)
        ellipse(windowWidth / 2, windowHeight / 2, circleLandW, circleLandW)

//CLOCK RING
noFill()
strokeWeight(17)
stroke(250,250,250,70)
ellipse(windowWidth/2,windowHeight/2, 550 *clockCircleScaleSize, 550 *clockCircleScaleSize)
strokeWeight(1)

stroke(.5);
ellipse(windowWidth/2,windowHeight/2, 570 *clockCircleScaleSize, 570 *clockCircleScaleSize)
ellipse(windowWidth/2,windowHeight/2, 560 *clockCircleScaleSize, 560 *clockCircleScaleSize)
ellipse(windowWidth/2,windowHeight/2, 550 *clockCircleScaleSize, 550 *clockCircleScaleSize)
ellipse(windowWidth/2,windowHeight/2, 540 *clockCircleScaleSize, 540 *clockCircleScaleSize)
ellipse(windowWidth/2,windowHeight/2, 530 *clockCircleScaleSize, 530 *clockCircleScaleSize)

//CLOCK RING "GRAINS"
push();
var angle2 = (TWO_PI / 4) * 3
var step2 = TWO_PI / nGrain

for (let j = 0; j < nGrain; j++) {
  var grainX2 = windowWidth/2 + (cos(angle2) * 266 *clockCircleScaleSize) //320 effects how much bigger the second circle is should be half the width and height of the elipse
  var grainY2 = windowHeight/2 + (sin(angle2) * 266 *clockCircleScaleSize)
  strokeWeight(3)
  line(grainX2, grainY2, grainX2 + (cos(angle2)*18), grainY2 + (sin(angle2)*18))
  angle2 += step2
}
pop()

        //Grains for Layer 2
        push()
        var angle2 = (TWO_PI / 4) * 3
        var step2 = TWO_PI / nGrain

        for (let j = 0; j < nGrain; j++) {
            var grainX2 = windowWidth / 2 + (cos(angle2) * circleLandW/2) //320 effects how much bigger the second circle is should be half the width and height of the elipse
            var grainY2 = windowHeight / 2 + (sin(angle2) * circleLandW/2)
            var grains2 = createVector(grainX2, grainY2)
            //vertices.push(grains2);
            strokeWeight(10)
            point(grainX2, grainY2)
            angle2 += step2
        }
        pop()

        //POLYGON_SPEC2, defining SECOND LAYERRRRRR!
        push()

        function polygon_spec2(windowWidth, windowHeight, radius, vert) {
            let angle = TWO_PI / nGrain

            //draws first layer shapes
            beginShape()
            for (let i = 0; i <= vert.length; i++) {
                corr_node = vert[i]
                count = 0
                for (let a = 0; a < TWO_PI; a += angle) {
                    if (count == corr_node) {
                        let sx = windowWidth + cos(a - (TWO_PI / 4)) * radius
                        let sy = windowHeight + sin(a - (TWO_PI / 4)) * radius
                        vertex(sx, sy)
                    }
                    count++
                }
            }
            endShape(CLOSE)
        }

        pop()
        if (selectedShape2 > maxNumShape2) {
            selectedShape2 = 1
        }

        //it creates all the tracks

        for (i = 1; i <= maxNumShape2; i++) {
            push()
            translate(width * 0.5, height * 0.5)
            colorMode(RGB)
            fill(i * 50, i * 20, i * 10, 100)

            if (selectedShape2 == i) {
                strokeWeight(3)


            }
            rotate((TWO_PI) * rot2[i - 1] / nGrain)
            // TO BE FIXED! the circular array is useless, we can use polygon_array_ALL as a database of all the possible shapes. Then, with shp1, shp2, etc. we point the shape we need. For now i set it to polygon_array_ALL[0];


            polygon_spec2(0, 0, (firstLayerLandW / 2), polygon_array2[shp2[i - 1]])
            pop()

        }
    }
}

//END DRAW FUNCTION


//ENCODER INCREASE BUTTON FUNCTION
function encoderInc() {

    //INC LAYER SELECTION MODE
    if (instrumentMode == 1 && layerNumber == 1) {
        layerNumber = 2

    } else if (instrumentMode == 1 && layerNumber == 2) {
        layerNumber = 1
    }

    //INC TRACK SELECTION MODE
  if (instrumentMode == 2 && selectedShape != 0 && layerNumber == 1) {
    //change track
    selectedShape++
  }
  if (instrumentMode == 2 && layerNumber ==2){
    selectedShape = 0
    selectedShape2++
  }


    //INC CHANGE SHAPE MODE
  if (layerNumber == 1 && instrumentMode == 3 && shp1[selectedShape - 1] != polygon_array.length) {
    //polygon_array_ALL[selectedShape-1][kindOfShape]=polygon_array_ALL[selectedShape-1][kindOfShape++];
    shp1[selectedShape - 1] = shp1[selectedShape - 1] + 1

  }
  if (layerNumber == 1 && instrumentMode == 3 && shp1[selectedShape - 1] == polygon_array.length) {
    shp1[selectedShape - 1] = 0
  }
  if (layerNumber == 2 && instrumentMode == 3 && shp2[selectedShape2 - 1] != polygon_array2.length) {
    //polygon_array_ALL[selectedShape-1][kindOfShape]=polygon_array_ALL[selectedShape-1][kindOfShape++];
    shp2[selectedShape2 - 1] = shp2[selectedShape2 - 1] + 1

  }
  if (layerNumber == 2 && instrumentMode == 3 && shp2[selectedShape2 - 1] == polygon_array2.length) {
    shp2[selectedShape2 - 1] = 0
  }

  //INC CUSTOM SHAPE MODE
  if (layerNumber == 1 && instrumentMode == 7) {
    if (currentGrain == nGrain - 1) {
      currentGrain = 0
    } else {
      currentGrain++
    }
  }
  if (layerNumber == 2 && instrumentMode == 7) {
    if (currentGrain2 == nGrain - 1) {
      currentGrain2 = 0
    } else {
      currentGrain2++
    }
  }

  //INC CHANGE ROTATION MODE
  if (layerNumber == 1 && instrumentMode == 4 && selectedShape != 0) {
    //rotate the selected shape
    rot1[selectedShape - 1] = rot1[selectedShape - 1] + 1
  }
  if (layerNumber == 2 && instrumentMode == 4 && selectedShape2 != 0) {
    //rotate the selected shape
    rot2[selectedShape2 - 1] = rot2[selectedShape2 - 1] + 1
  }
}


//ENCODER DECREASE BUTTON FUNCTION
function encoderDec() {

    //LAYER SELECTION MODE
    if (instrumentMode == 1 && layerNumber == 1) {
      layerNumber = 2;
    } else if (instrumentMode == 1 && layerNumber == 2) {
      layerNumber = 1;
  
    }
  
    //TRACK SELECTION MODE
    if (layerNumber == 1 && instrumentMode == 2 && selectedShape != (0 || 1)) {
      selectedShape--;
    } else if (layerNumber == 1 && instrumentMode == 2 && selectedShape == 1) {
      selectedShape = maxNumShapes;
    }
    if (layerNumber == 2 && instrumentMode == 2 && selectedShape2 != (0 || 1)) {
      selectedShape2--;
    } else if (layerNumber == 2 && instrumentMode == 2 && selectedShape2 == 1) {
      selectedShape2 = maxNumShape2;
    }
  
    //then CHANGE SHAPE MODE
    if (layerNumber == 1 && instrumentMode == 3 && shp1[selectedShape - 1] != 0) {
      shp1[selectedShape - 1] = shp1[selectedShape - 1] - 1;
    } else if (layerNumber == 1 && instrumentMode == 3 && shp1[selectedShape - 1] == 0) {
      shp1[selectedShape - 1] = polygon_array.length-1;
    }
    if (layerNumber == 2 && instrumentMode == 3 && shp2[selectedShape2 - 1] != 0) {
      shp2[selectedShape2 - 1] = shp2[selectedShape2 - 1] - 1;
    } else if (layerNumber == 2 && instrumentMode == 3 && shp2[selectedShape2 - 1] == 0) {
      shp2[selectedShape2 - 1] = polygon_array2.length-1;
    }
  
  
    //CUSTOM SHAPE MODE
    if (layerNumber == 1 && instrumentMode == 7) {
      if (currentGrain == 0) {
        currentGrain = nGrain - 1;
      } else {
        currentGrain--
      };
    }
    if (layerNumber == 2 && instrumentMode == 7) {
      if (currentGrain2 == 0) {
        currentGrain2 = nGrain - 1;
      } else {
        currentGrain2--
      };
    }
  
    //the CHANGE ROTATION MODE
    if (layerNumber == 1 && instrumentMode == 4 && selectedShape != 0) {
      rot1[selectedShape - 1] = rot1[selectedShape - 1] - 1;
    }
    if (layerNumber == 2 && instrumentMode == 4 && selectedShape2 != 0) {
      rot2[selectedShape2 - 1] = rot2[selectedShape2 - 1] - 1;
    }
  }
  
  //ENCODER BUTTON FUNCTION
  function encoderButt() {
    if (layerNumber == 1 && instrumentMode == 7) {
      if (polygon_array_c.includes(currentGrain)) {
        for (var i = 0; i < polygon_array_c.length; i++) {
          if (polygon_array_c[i] === currentGrain) {
            polygon_array_c.splice(i, 1)
          }
        }
      } else {
        polygon_array_c.push(currentGrain)
      }
      polygon_array_c.sort(function(a, b) {
        return a - b
      })
  
    }
    if (layerNumber == 2 && instrumentMode == 7) {
      if (polygon_array_c.includes(currentGrain2)) {
        for (var i = 0; i < polygon_array_c.length; i++) {
          if (polygon_array_c[i] === currentGrain2) {
            polygon_array_c.splice(i, 1)
          }
        }
      } else {
        polygon_array_c.push(currentGrain2)
      }
      polygon_array_c.sort(function(a, b) {
        return a - b
      })
  
    }
  }
  
  //SLIDER FUNCTION DISABLED
  /*function updateSize(){
    NewCircle.radiusx==slider.value(); 
    NewCircle.radiusy==slider.value();
  }*/
  
  //CREATE NEW LAYER FUNCTION 
  function createNewLayer() {
    instrumentMode = 1
  
    myTimeout = setTimeout(function() {
      layerNumber++
  
    }, 2000)
  }
  
  //TRACK SELECTION/ADD TRACK FUNCTION
  function selectShape() {
    instrumentMode = 2 // we are in track_mode!
    if (layerNumber == 1){ 
        selectedShape = maxNumShapes
        //if you press for 2 seconds you create a new track
        if(instrumentMode != 0){
        myTimeout = setTimeout(function() {
          maxNumShapes = maxNumShapes + 1
          updateArrays()
        }, 2000)
        }
      }
    if (layerNumber == 2){
      selectedShape2 = maxNumShape2
      if (instrumentMode != 0){
        myTimeout = setTimeout(function() {
          maxNumShape2 = maxNumShape2 + 1
          updateArrays()
        }, 2000)
      }
    }
  }
  ///CHANGE SHAPE AND GO INTO CUSTOM SHAPE FUNCTION
  function changeShape() {
    instrumentMode = 3; // we are in change_shape_mode!
    if (layerNumber == 1){
      selectedShape = maxNumShapes
    }
    if (layerNumber == 2){
      selectedShape2 = maxNumShape2
    }
    myTimeout = setTimeout(function() {
      if (layerNumber == 1){
      instrumentMode = 7
      maxNumShapes++
      numCustShapes++
      selectedShape=maxNumShapes
      
      if (numCustShapes>0){ //resets current grain to 0 
        currentGrain=0
      }
      polygon_array_c = new Array()
      //splice(maxNumShapes, 0, polygon_array_c);
      polygon_array.push(polygon_array_c)
      shp1.push(polygon_array.length-1)
      updateArrays()
    }
    
    if (layerNumber == 2){
      
        instrumentMode = 7
        maxNumShape2++
        numCustShapes++
        selectedShape2=maxNumShape2
        
        if (numCustShapes>0){ //resets current grain to 0 
          currentGrain=0
        }
        polygon_array_c = new Array()
        //splice(maxNumShapes, 0, polygon_array_c);
        polygon_array2.push(polygon_array_c)
        shp2.push(polygon_array2.length-1)
        updateArrays()
      
    }
  }, 2000)
  }
  
  //ROTATE SHAPE FUNCTION
  function rotateShape() {
    instrumentMode = 4 // we are in rotation_mode!
  }
  
  
  function mouseReleased() {
    clearTimeout(myTimeout)
  }