// var for Custome image fetching div
imgDiv = document.getElementById("imgDiv");

// var for loading screen
loadingScreen = document.getElementById("loadingScreen");
progressBar = document.getElementById('progressBar');

// var for previewing image
preview = document.getElementById("preview");
previewImg = document.getElementById("previewImg");


imgSrcArr = [];
currentImg = "";

function dimensions(data) { // function to make random dimension for image
    data = Math.floor(Math.random() * data);
    return data<=500?data+=500:data;
}

function generateImages(n){ // to create img elemnt with custom src
    imgSrcArr = [];
    c = 0;
    imgLoaded = 0;
    imgError = 0;
    loadingScreen.classList.remove("hidden"); // hide loading screen
    imgDiv.innerHTML = "";
    progressBar.max = n;
    for(let i=0; i<n; i++){
        w = dimensions(1400);
        h = dimensions(1400);
        let img = document.createElement("img");
        img.src = `https://picsum.photos/id/${Math.floor(Math.random()*1084)}/${w}/${h}`;
        img.alt = `img ${w}-${h}`;
        img.title = `img ${w}-${h}`;
        img.classList.add("rounded");
        img.onload = ()=>{
            c++;
            imgLoaded++;
            loadScreen(c, imgLoaded, imgError, n);
            imgSrcArr.push(img.src);
            imgDiv.appendChild(img);
        }
        img.onerror = ()=>{
            c++;
            imgError++;
            loadScreen(c, imgLoaded, imgError, n);
        }
    }
    imgInteraction();
}
generateImages(30);

function loadScreen(c, imgLoaded, imgError, n) { // function to hide loading screen
    progressBar.value = c;
    loadingScreen.querySelector("span").innerHTML = `<table>
                <tr>
                    <th colspan='2'>Loading...</th>
                </tr>
                <tr class="text-green-300">
                    <td>Loaded Image:</td>
                    <td class="pl-5">${imgLoaded}</td>
                </tr>
                <tr class="text-red-300">
                    <td>Error Image:</td>
                    <td class="pl-5">${imgError}</td>
                </tr>
            </table>`;
    if(c == n) {
        setTimeout(() => {
            loadingScreen.classList.add("hidden");
            imgInteraction();
            setTimeout(() => {
                loadingScreen.querySelector("span").innerHTML = `Loading...`;
                progressBar.value = 0;
                progressBar.max = 50;
            }, 100);
        }, 1500);
        loadSlider();
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