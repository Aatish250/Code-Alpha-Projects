// var for Custome image fetching div
imgDiv = document.getElementById("imgDiv");
count = document.getElementById("count");
showCount = document.getElementById("showCount");
widthInput = document.getElementById("widthInput");
showWidthInput = document.getElementById("showWidthInput");
heightInput = document.getElementById("heightInput");
showHeightInput = document.getElementById("showHeightInput");

responsiveSize = document.getElementById("responsiveSize");
showResponsiveSize = document.getElementById("showResponsiveSize");

// var for loading screen
loadingScreen = document.getElementById("loadingScreen");
progressBar = document.getElementById('progressBar');

// var for previewing image
preview = document.getElementById("preview");
previewImg = document.getElementById("previewImg");


imgSrcArr = [];
currentImg = "";

// These are for Range Editing
count.addEventListener("input", ()=>{
    showCount.value = count.value
})
widthInput.addEventListener("input", ()=>{
    showWidthInput.value = widthInput.value
})
heightInput.addEventListener("input", ()=>{
    showHeightInput.value = heightInput.value
})
responsiveSize.addEventListener("input", ()=>{ // change the soze of responsiveness for each column of images
    showResponsiveSize.value = responsiveSize.value;
    setCSSVariable('--maxResponsiveSize', `${responsiveSize.value}px`)
})


function dimensions(data) { // function to make random dimension for image
    data = Math.floor(Math.random() * data);
    return data<=300?data+=300:data;
}

function generateImages(){ // to create img elemnt with custom src
    imgSrcArr = [];
    c = 0;
    imgLoaded = 0;
    imgError = 0;
    loadingScreen.classList.remove("hidden"); // hide loading screen
    imgDiv.innerHTML = "";
    progressBar.max = count.value;
    for(let i=0; i<count.value; i++){
        w = dimensions(widthInput.value);
        h = dimensions(heightInput.value);
        let img = document.createElement("img");
        img.src = `https://picsum.photos/id/${Math.floor(Math.random()*1084)}/${w}/${h}`;
        img.alt = `img ${w}-${h}`;
        img.title = `img ${w}-${h}`;
        img.onload = ()=>{
            c++;
            imgLoaded++;
            loadScreen(c, imgLoaded, imgError);
            imgSrcArr.push(img.src);
            imgDiv.appendChild(img);
        }
        img.onerror = ()=>{
            c++;
            imgError++;
            loadScreen(c, imgLoaded, imgError);
        }
    }
}
generateImages();


function setCSSVariable(variableName, value) { // Function to change a CSS variable
    document.documentElement.style.setProperty(variableName, value);
    // console.log(document.documentElement.style.getPropertyValue(variableName));
}

function loadScreen(c, imgLoaded, imgError) { // function to hide loading screen
    progressBar.value = c;
    loadingScreen.querySelector("span").innerHTML = `<table>
                <tr class="text-green-300">
                    <td>Loaded Image:</td>
                    <td class="pl-5">${imgLoaded}</td>
                </tr>
                <tr class="text-red-300">
                    <td>Error Image:</td>
                    <td class="pl-5">${imgError}</td>
                </tr>
            </table>`;
    if(c == count.value) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
            imgInteraction();
            setTimeout(() => {
                loadingScreen.querySelector("span").innerHTML = `Loading...`;
                progressBar.value = 0;
                progressBar.max = 50;
            }, 100);
        }, 1500);
    }
}

function imgInteraction(){
    imgs = imgDiv.querySelectorAll("img");
    imgs.forEach(img => {
        img.addEventListener("click", ()=>{
            console.log(img.src)
            currentImg = img;
            previewImage(currentImg);
        })
    })
}

// Preview Image (swho, next and previous)
function previewImage(currentImg) {
    preview.classList.remove("hidden");
    previewImg.src = currentImg.src;
    previewImg.onload = () => {
        nextButton = document.getElementById("nextButton");
        prevButton = document.getElementById("prevButton");
        let currentIndex = imgSrcArr.indexOf(currentImg.src);
        nextButton.addEventListener("click", ()=>{
            if(currentIndex+1 < imgSrcArr.length)
                previewImage(imgs[currentIndex+1]);
        })
        prevButton.addEventListener("click", ()=>{
            if(currentIndex-1 >= 0)
                previewImage(imgs[currentIndex-1]);
        })
    }
}

function closePreview(){
    preview.classList.add("hidden");
}