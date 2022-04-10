function isMobile() { // This does its detection based on aspect ratio
    let windowWidth = document.documentElement.clientWidth;
    if (windowWidth < 700) {
        return true;
    } else {
        return false;
    }
}

function swapStyleSheet() { // Change the website stylesheet
    let documentStyle = document.getElementById("stylesheet");
    let currentStylesheet = documentStyle.getAttribute("href");
    if (currentStylesheet === "style.css" && isMobile()) {
        console.log(isMobile);
        documentStyle.setAttribute("href", "mobile.css");
    } else if ((currentStylesheet === "mobile.css") && (!isMobile()) ) {
        console.log(isMobile);
        documentStyle.setAttribute('href', "style.css");
    }
}

function fitDimensions(oldWidth, oldHeight) { // Fits the image to the screen
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;
    let sizing_factor = 0.60; // Smaller this is, smaller the image
    
    if (oldWidth > oldHeight) { // If the picture is landscape
        let ratio = windowWidth/oldWidth;
        return {
            width: (oldWidth * (ratio * sizing_factor)),
            height: (oldHeight * (ratio * sizing_factor))
        };
    } else if (oldWidth < oldHeight) { // If the picture is portrait
        let ratio = windowHeight/oldHeight;
        return {
            width: (oldWidth * (ratio * sizing_factor)),
            height: (oldHeight * (ratio * sizing_factor))
        };
    }else if (oldWidth = oldHeight) { // If the picture is square
        let ratio = windowHeight/oldHeight;
        return {
            width: (oldWidth * (ratio * sizing_factor)),
            height: (oldHeight * (ratio * sizing_factor))
        };
    } else {
        let ratio = (windowHeight/oldHeight) * (windowWidth/oldWidth);
        return {
            width: (oldWidth * (ratio * sizing_factor)),
            height: (oldHeight * (ratio * sizing_factor))
        };
    }
}

function displayImage(pathToImage, name) { // Displays image on screen
    // Retrieve all the elements
    let modal = document.getElementById("modal");
    let title = document.getElementById("piece-title");
    let image = document.getElementById("piece");

    // Get the image and fit it to the screen
    image.src = pathToImage;
    image.alt = name;
    imageDimensions = fitDimensions(image.naturalWidth, image.naturalHeight);
    image.width = imageDimensions.width;
    image.height = imageDimensions.height;
    modal.style.display = "block";
    title.innerHTML = name;

    // Apply modal styling now that everything is set
    modal.style.display = "flex"
    modal.style.justifyContent = "center"
    modal.style.flexDirection = "column"
    modal.style.alignItems = "center"
    document.body.classList.add("scrolling-stop");
    
    // Handle closing the dialog
    window.onclick = function(event) {
        // The modal div itself, not containing the elements inside it
        if (event.target == modal) {
          modal.style.display = "none";
          document.body.classList.remove("scrolling-stop");
        }
      }
}

function loadImage(pathToImage, name) { // Decides if the browser is viewed on mobile or not
    if (!isMobile()) {
        displayImage(pathToImage, name);
    }
}

window.onresize = () => { // when the image is resized
    console.log(isMobile());
    swapStyleSheet();
}

window.onload = () => {
    console.log(isMobile());
    swapStyleSheet();
}