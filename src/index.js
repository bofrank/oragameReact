function load() {
  document.getElementById("grid").innerHTML = "";
  document.getElementById("loading").style.display = "block";

  function checkComplete(imageCount, recipeCount) {
    if (imageCount == recipeCount) {
      resizeAllGridItems();
    }
  }

  var ingredient = document.getElementById("ingredient").value;
  var appkey = "f3060af875eda52baf4d68b1fdbdbf43";
  var appid = "5fb37b30";
  var recipeUrl = `https://api.edamam.com/search?app_id=${appid}&app_key=f3060af875eda52baf4d68b1fdbdbf43&q=${ingredient}`;

  fetch(recipeUrl)
    .then(response => {
      return response.json();
    })
    .then(edamamJSON => {
      let node;
      let element;
      let recipeHTML;
      let ingredientsHTML = "";

      if (edamamJSON.hits.length > 0) {
        for (k = 0; k < edamamJSON.hits.length; k++) {
          for (i = 0; i < edamamJSON.hits[k].recipe.ingredients.length; i++) {
            ingredientsHTML +=
              '<div itemprop="recipeIngredient">' +
              edamamJSON.hits[k].recipe.ingredients[i].text +
              "</div>";
          }

          recipeHTML =
            '<a itemscope itemtype="http://schema.org/Recipe" id="recipe"' +
            k +
            ' class="item photo" href="' +
            edamamJSON.hits[k].recipe.url +
            '" target="_blank"><div class="content"><img itemprop="image" id="image0"' +
            k +
            ' class="grid-item-image" src="' +
            edamamJSON.hits[k].recipe.image +
            '" onload="resizeAllGridItems()" /><div itemprop="name" id="title0"' +
            k +
            ' class="grid-item-title">' +
            edamamJSON.hits[k].recipe.label +
            '</div><div class="grid-text">' +
            ingredientsHTML +
            "</div></div></a>";

          document.getElementById("grid").innerHTML += recipeHTML;

          ingredientsHTML = "";
        }
      } else {
        document.getElementById("grid").innerHTML +=
          " " + ingredient + " is not found in our recipe library :(";
      }
    })
    .then(function(edamamJSON) {
      document.getElementById("loading").style.display = "none";
    })
    .catch(function() {
      console.log("fetch failed");
    });

  return false;
}

//https://codepen.io/andybarefoot/pen/QMeZda

function resizeGridItem(item) {
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  rowSpan = Math.ceil(
    (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
  allItems = document.getElementsByClassName("item");
  for (x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}
