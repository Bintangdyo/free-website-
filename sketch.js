let dataset;
let x = 60;
let y = 450;
let setWidth = 600;
let setHeight = 300;
let years, ukco2, usco2;
// Placeholders gonna use later 

function preload() {
    // Everything within this bracket is part of a block
    dataset = loadTable("co2-US-UK.csv", "header");
    // Your loading this data file and it got a header, the first line is a header, telling the code to ignore the first line 
}

function setup(){
    // Console open to check for errors 
    createCanvas(700, 500);
    // Creating the space that were going to do the graphing
    colorMode(HSB)
    // Hue Satiration Brightness 
    // PREPARE DATA 
    years = cleanData (dataset.getColumn(0));
    ukco2 = cleanData (dataset.getColumn(1));
    usco2 = cleanData (dataset.getColumn(2));
    // Cleaning data mean making the data in a predictable format, the code needs to know that the data is numbers, 
    // Get the first column of data 
    let ukco2MaxMin = getMaxMin(ukco2)
    console.log(ukco2MaxMin);
}

// Make sure the datapoints are numbers and not strings! 
function cleanData(data){
    // Loop through all numbers in the array
    for(let i=0; i<data.length; i++){
      data[i] = Number(data[i]);
      console.log(i + ':' +data [i])
    }
    // Making sure that all the data is a number
    // create a variable so we can go trough every single item in the array, 
    // refrence item, get me number ? on the list 

    return data; 
  }

function draw(){
    background(210);
    drawHeader(); 
    // console.log ('s')

    // Draw the X and Y Axis
    //drawXAxis(x,y,);
    let xScale = [1800, 2020, "20"];
    drawXAxis(x, y, xScale, setWidth);
    let yScale = [0, 24, "2.0"];
    // incriments 
    drawYAxis(x, y, yScale, setHeight);

    // Draw lie 
    drawLine(x, y, xScale, yScale, setWidth, setHeight, years, ukco2, [200, 100, 100]);
    drawLine(x, y, xScale, yScale, setWidth, setHeight, years, usco2, [50, 100, 100]);

// Draw data as a line
function drawLine(x, y, xScale, yScale, setWidth, setHeight, Xdata, Ydata, hsb){
    push();       // Save existing fill+stroke colours
    beginShape(); // Start the vector shape
    noFill();     // Its a line & not a solid
    stroke(hsb);  // Colour of the line
    // Loop through the array of numbers
    for(let i=0; i<Xdata.length; i++){
      let xValue = Xdata[i]; 
      let yValue = Ydata[i]; 
      // Convert max/min value to x/y cordinates
      xPos = map(xValue, xScale[0], xScale[1], x, x+setWidth); 
      yPos = map(yValue, yScale[0], yScale[1], y, y-setHeight); 
      ellipse(xPos, yPos, 3);
      vertex(xPos, yPos);
    }
    endShape(OPEN);// End the vector shape
    pop();         // Back to old fill+stroke colours
  }
  

}

function drawHeader(){
    push();
    fill(17);
    // the color of the next thing I will write 
    rect(0,0, width,100);
    fill(98, 200, 200)
    textSize(25)
    text("Co2 Emissions Per Capita, in Tonnes (1800-2020)",100,50) 
    fill(200, 100, 100)
    text("UK", 50, 80)
    fill(50, 100, 100)
    text("US", 100, 80)
    // the location of the text, xy coordinate   
    pop() 

}

// Grab the maximum and minimum values of an array
// and make sure its an array of Integers NOT strings 
function getMaxMin(data){
    let min = null; 
    let max = null;
    // Loop through all numbers in the array
    data.map(function(item){
      let num = Number(item); // Make sure its a number not a string
      if(item>max || max==null){max=num} // Save max
      if(item<min || min==null){min=num} // Save min
      return num;
    })
    // Return the data in a key-value array
    return {
      "min":min,
      "max":max
    }
  }

// Draw the graph Y axis. 
function drawYAxis(x, y, yScale, myheight){
    let min = yScale[0]; //min(numbers); 
    let max = yScale[1];    //numbers.max;  
    let interval = Number(yScale[2]); // Convert thr string to a number
    let decimals = countDecimals(yScale[2]); 
    push();
    // Draw the line 
    stroke(18); // Set colour of the line
    line(x, y, x, y-myheight); //draw line 
    // Draw ticks and labels
    for(let i=min; i<=max; i+=interval){
      // Calculate the y position of the ticks / labels
      yPos = map(i, min, max, y, y-myheight); 
        stroke(18);
        line(x, yPos, x-5, yPos); //draw a tick
        // Draw the label
        noStroke(); //turn off stroke for text
        fill(18); //fill colour of text
        textAlign(RIGHT);
        label = i.toFixed(decimals);
        text(label, x-7, yPos+4); //write the value for the current tick 
    }
    pop();
  }
  
  // Draw the graph X axis. 
  function drawXAxis(x, y, xScale, myWidth){
    let min = xScale[0]; //min(numbers); 
    let max = xScale[1];    //numbers.max;  
    let interval = Number(xScale[2]);
    let decimals = countDecimals(xScale[2]); 
    push();
    // Draw the line 
    stroke(18); // Set colour of the line
    line(x, y, x+myWidth, y); //draw line 
    // Generate the ticks
    for(let i=min; i<=max; i+=interval){
      // Calculate the x position of the ticks / labels
      xPos = map(i, min, max, x, x+myWidth); 
        stroke(18);
        line(xPos, y, xPos, y+5); //draw a tick
        // Draw the label
        noStroke(); //turn off stroke for text
        fill(18); //fill colour of text
        label = i.toFixed(decimals);
        text(label, xPos-5, y+15); //write the value for the current tick 
    }
    pop();
  }

// Check if the string represents a decimal and return decimal places
function countDecimals(value) { 
    if(value.includes(".")){
      return value.split(".")[1].length;  
    }else{
      return 0; 
    }
  };
  

  
  