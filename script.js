const imageContainers = document.querySelectorAll(".project");
const audioDisappear = new Audio("SOUND/disappear.mp3");
const audioAppear = new Audio("SOUND/appear.mp3");

imageContainers.forEach((container) => {
  container.addEventListener("click", () => {
    const image = container.querySelector(".project-image");
    image.style.transform = "scale(0)";
    image.style.opacity = "0";

    setTimeout(() => {
      // with this ocde I am checking whether the image was already clicked
      // if it is not clicked yet (does not have class "hidden"), then hide & show components
      if (image.className.split(" ")[2] != "hidden") {
        image.classList.add("hidden");
        const classes = image.className.split(" ");
        const currentClass = classes[0];
        audioDisappear.play();
        console.log(`Clicked image: ${currentClass}`);
        if (currentClass == "harp") {
          console.log(harpList);
          addImages(harpList, currentClass);
        } else if (currentClass == "lyre") {
          console.log(lyreList);
          addImages(lyreList, currentClass);
        } else if (currentClass == "dick") {
          console.log(dickList, currentClass);
          addImages(dickList, currentClass);
        } else if (currentClass == "house") {
          console.log(houseList);
          addImages(houseList, currentClass);
        } else if (currentClass == "ted") {
          console.log(tedList);
          addImages(tedList, currentClass);
        }
      }
    }, 300);
  });
});

function addImages(list, project) {
  console.log(project);
  productIds = [];
  quantity = [];
  images = [];
  for (i = 0; i < list.length; i++) {
    productIds.push(list[i]["product id"]);
    quantity.push(list[i].quantity);
    images.push(`IMAGES/${project}/${productIds[i]}-00.jpg`);
  }
  console.log(quantity);

  for (let i = 0; i < images.length; i++) {
    (function (index) {
      // access the amount of the same item that was purchased, then add the image of the component that many times.
      for (j = 0; j <= quantity[i]; j++) {
        setTimeout(function () {
          var link = document.createElement("a");
          link.href = `https://www.adafruit.com/product/${productIds[i]}`;
          link.target = "_blank";
          var imageElement = document.createElement("img");
          console.log(images[i]);
          imageElement.src = images[i];
          imageElement.style.position = "fixed";
          imageElement.style.display = "block";
          // sized according the the price - scale according to volume/quantity
          imageElement.style.width = 180 + "px";
          //responsive sizing
          imageElement.style.top = randInt(1, 100) + "%";
          imageElement.style.left = randInt(0, 93) + "%";
          link.appendChild(imageElement);
          var container = document.getElementById("container");
          components_div.appendChild(link);
          //changing the price title
          var priceIndicator = document.getElementById("priceIndicator");
          var currentPrice = priceIndicator.innerText;
          var newPrice = parseInt(currentPrice) + parseInt(list[i].price) + "$";
          priceIndicator.innerText = newPrice;
          audioAppear.play();
        }, 50 * index);
      }
    })(i);
  }
}

function changeTitle() {
  var titleElement = document.getElementById("priceIndicator");
  var newTitle = prompt("Enter a new title:");
  titleElement.innerText = newTitle;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}
