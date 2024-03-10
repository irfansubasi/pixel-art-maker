const gridContainer = document.querySelector("#grid-container");
const slider = document.querySelector("#slider-range");
const output = document.querySelector("#sliderValue");
const buttons = document.querySelectorAll(".buttons");
const colorPicker = document.querySelector("#color-picker");
const colorBtn = document.querySelector("#colorbtn");
const rainbowBtn = document.querySelector("#rainbowbtn");
const eraserBtn = document.querySelector("#eraserbtn");
const clearBtn = document.querySelector("#clearbtn");
const gridBtn = document.querySelector("#gridbtn");

let currentColor = "#000";
let currentMode = "color";
let currentSize = 16;
let gridActive = true;
let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Function to adjust the grid size
function adjustGrid(size){
    const fragment = document.createDocumentFragment();
    for(i = 0; i < size * size; i++){
        const gridElement = document.createElement("div");
        if(gridActive){
            gridElement.classList.add("grid-element");
        }else{
            gridElement.classList.remove("grid-element");
        }
        
        gridElement.addEventListener("click", changeColor)
        gridElement.addEventListener("mouseover", changeColor)
        fragment.appendChild(gridElement);
        gridElement.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });
    }

    gridContainer.appendChild(fragment);

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

// Event listeners for mode buttons
colorBtn.addEventListener("click", () => {
    currentMode = "color"
    activateBtn(currentMode);
})

rainbowBtn.addEventListener("click", () => {
    currentMode = "rainbow"
    activateBtn(currentMode);
})

eraserBtn.addEventListener("click", () => {
    currentMode = "eraser"
    activateBtn(currentMode);
})

clearBtn.addEventListener("click", () => {
    adjustSize(currentSize);
})

gridBtn.addEventListener("click", () => {
    gridCheck()    
});

// Function to toggle grid display
function gridCheck(){
    const childDivs = gridContainer.querySelectorAll("div");

    if (gridActive) {
        childDivs.forEach((childDiv) => {
            childDiv.classList.remove("grid-element");
            gridBtn.textContent = "Show Grid";
        });
    } else {
        childDivs.forEach((childDiv) => {
            childDiv.classList.add("grid-element");
            gridBtn.textContent = "Hide Grid";
        });
    }
    gridActive = !gridActive;
}

// Function to activate selected mode button
function activateBtn(mode){
    colorBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.remove("active");

    if(mode === "color"){
        colorBtn.classList.add("active");
    }else if(mode === "rainbow"){
        rainbowBtn.classList.add("active");
    }else if(mode === "eraser"){
        eraserBtn.classList.add("active");
    }
}

// Event listeners for slider
slider.onmousemove = (e) => changeOutput(e.target.value);
slider.onchange = (e) => adjustSize(e.target.value);

// Function to change output value of slider
function changeOutput(value){
    output.innerHTML = `${value} X ${value}`;
}

// Function to adjust grid size
function adjustSize(value){
    gridContainer.innerHTML = ``;
    currentSize = value;
    adjustGrid(value);
}

// Event listener for color picker
colorPicker.addEventListener("change", (e) => {
    currentColor = e.target.value;
})

// Function to change grid cell color based on mode
function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === "color"){
        e.target.style.background = currentColor;
    }else if(currentMode === "rainbow"){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }else if(currentMode === "eraser"){
        e.target.style.background = "#fff"
    }
}

// Function to initialize grid on window load
window.onload = () => {
    adjustGrid(16);
    activateBtn("color")
}
