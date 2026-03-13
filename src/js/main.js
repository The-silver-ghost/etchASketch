const MIN_COUNT = 16, MAX_COUNT = 100;
count = MIN_COUNT;

//functions
function inputPrompt(event){
    
    if (event.target.id === "gridCountButton"){
        count = 16;
        count = prompt("Choose the number of squares in the grid [16-100]",16);
        count = parseInt(count);
        if (isNaN(count)){
            count = 16;
            alert("Invalid input. Grid count set to 16.");
        }
        else if (count < MIN_COUNT || count > MAX_COUNT){
            count = 16;
            alert("Invalid grid number. Grid count set to 16.");
        }
    }
    addGridToCanvas(count);
}

function addGridToCanvas(count){
    canvas = document.getElementById("canvas");
    gridCountLabel = document.getElementById("grid-count-label");
    canvasHeight = canvas.clientHeight;
    canvasHeight = parseFloat(canvasHeight);
    gridWidth = (canvasHeight/count)/canvasHeight*100;
    console.log(gridWidth);
    canvas.replaceChildren();
    for (i = 0; i < count; i ++){
        for(j = 0; j < count; j++){
            gridSquare = document.createElement("div");
            gridSquare.className = "grid";
            gridSquare.style.backgroundColor = "rgba(255,255,255,1.0)";
            gridSquare.style.minWidth = `${gridWidth}%`;
            canvas.appendChild(gridSquare);
        }
    }
    gridCountLabel.textContent = `Grid Count: ${count}`;
}

function colorCanvas(event){
    const MAX_RGB = 255,ALPHA_INCR_RATE = 0.1,MAX_ALPHA = 1.0;
    a = 0.1;r=g=b=0;
    if (event.target.id === "canvas"){
        const MAX_RGB = 255,ALPHA_INCR_RATE = 0.1,MAX_ALPHA = 1.0;
        a = 0.1;
        r = Math.floor(Math.random()*MAX_RGB+1);
        g = Math.floor(Math.random()*MAX_RGB+1);
        b = Math.floor(Math.random()*MAX_RGB+1);
    }
    else if (event.target.className === "grid"){
        bg = event.target.style.backgroundColor;
        bg = bg.substring(bg.indexOf("(")+1,bg.indexOf(")"));
        bg = bg.split(",");
        gridR = bg[0]; gridG = bg[1]; gridB = bg[2]; gridA = bg[3];
        if (r == gridR && g == gridG && b == gridB){
            if (gridA != MAX_ALPHA){
                gridA = parseFloat(gridA);
                gridA += ALPHA_INCR_RATE;
                event.target.style.backgroundColor = `rgba(${r},${g},${b},${gridA})`;
            }
        }
        else{
            event.target.style.backgroundColor = `rgba(${r},${g},${b},${a})`;
        }
    }
}

//main
addGridToCanvas(count);
addEventListener("click",(e)=>{inputPrompt(e);});
addEventListener("mouseover",(e)=>{colorCanvas(e);});
console.log(document.getElementById("canvas"))
