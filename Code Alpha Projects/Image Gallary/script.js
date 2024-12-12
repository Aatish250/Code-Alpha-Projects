imgDiv = document.getElementById("imgDiv");
count = document.getElementById("count");
showCount = document.getElementById("showCount");
widthInput = document.getElementById("widthInput");
showWidthInput = document.getElementById("showWidthInput");
heightInput = document.getElementById("heightInput");
showHeightInput = document.getElementById("showHeightInput");

responsiveSize = document.getElementById("responsiveSize");
showResponsiveSize = document.getElementById("showResponsiveSize");

loadingScreen = document.getElementById("loadingScreen");

count.addEventListener("input", ()=>{
    showCount.value = count.value
})
widthInput.addEventListener("input", ()=>{
    showWidthInput.value = widthInput.value
})
heightInput.addEventListener("input", ()=>{
    showHeightInput.value = heightInput.value
})
responsiveSize.addEventListener("input", ()=>{
    showResponsiveSize.value = responsiveSize.value;
    setCSSVariable('--maxResponsiveSize', `${responsiveSize.value}px`)
})

function dimensions(data) {
    data = Math.floor(Math.random() * data);
    return data<=300?data+=300:data;
}

function generateImages(){
    c = 1;
    loadingScreen.classList.remove("hidden");
    imgDiv.innerHTML = "";
    for(let i=0; i<count.value; i++){
        w = dimensions(widthInput.value);
        h = dimensions(heightInput.value);
        let img = document.createElement("img");
        img.src = `https://picsum.photos/${w}/${h}`;
        img.alt = `img ${w}-${h}`;
        img.title = `img ${w}-${h}`;
        
        imgDiv.appendChild(img);
        img.onload = ()=>{
            c++;
            if(c == count.value){
                loadingScreen.querySelector("span").innerHTML = `Loaded ${count.value} images`;
                setTimeout(() => {
                    loadingScreen.classList.add("hidden");
                    setTimeout(() => {
                        loadingScreen.querySelector("span").innerHTML = `Loading...`;
                    }, 100);
                }, 500);
            }
        }
    }
}

generateImages();

// Function to change a CSS variable
function setCSSVariable(variableName, value) {
    document.documentElement.style.setProperty(variableName, value);
}