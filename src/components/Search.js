import React, { useState } from "react";

function Search() {

  const [recipe, setRecipe] = useState({ ingredient: "" });

  function handleChange(event) {
    recipe.ingredient = { ...recipe.ingredient, ingredient: event.target.value };
    setRecipe({ recipe });
  }

  function handleSubmit(event) {
    event.preventDefault();
    load();
  }

  function load() {
    document.getElementById("grid").innerHTML = "";
    document.getElementById("loading").style.display = "block";

    let ingredient = document.getElementById("ingredient").value;
    var appid = "5fb37b30";
    var recipeUrl = `https://api.edamam.com/search?app_id=${appid}&app_key=f3060af875eda52baf4d68b1fdbdbf43&q=${ingredient}`;

    fetch(recipeUrl)
      .then(response => {
        return response.json();
      })
      .then(edamamJSON => {
        let recipeHTML;
        let ingredientsHTML = "";
        let promoHTML;

        if (ingredient == "lemon") {
          promoHTML = '<a itemscope itemtype="http://schema.org/Recipe" id="promo" class="item photo" href="https://www.dpbolvw.net/click-100122465-13566323" target="_blank"><div class="content"><img itemprop="image" id="imagePromo" class="grid-item-image" src="https://www.botanicchoice.com/_productimages/liquid%20extracts/243x440/p000006126-x.jpg" onload="resizeAllGridItems()" /><div itemprop="name" id="titlePromo" class="grid-item-title">Lemon Balm Liquid Extract</div><div class="grid-text"><div itemprop="recipeIngredient">Having a delicate lemon scent, this perennial plant belongs to the mint family and is native to parts of Europe and the Mediterranean. Lemon balm grows in clumps up to nearly 60 inches in height. Herbalists have prized lemon balm for its calming effect and potential to promote restful sleep the healthy, natural way. </div></div></div></a>'
        } else if (ingredient == "coffee") {
          promoHTML = '<a itemscope itemtype="http://schema.org/Recipe" id="promo" class="item photo" href="https://www.tkqlhce.com/click-100122465-13491331" target="_blank"><div class="content"><img itemprop="image" id="imagePromo" class="grid-item-image" src="https://www.illy.com/on/demandware.static/-/Library-Sites-illySharedLibrary/default/dwc9d994a9/images/subscription/coffee-subscription/coffee-auto-delivery4-1920x789.jpg" onload="resizeAllGridItems()" /><div itemprop="name" id="titlePromo" class="grid-item-title">20% off + FREE Shipping</div><div class="grid-text"><div itemprop="recipeIngredient">Sign up for illy a casa recurring coffee deliveries and enjoy 20% off, free shipping, and a welcome gift.</div></div></div></a>'
        } else if ((ingredient == "fish") || (ingredient == "salmon")) {
          promoHTML = '<a itemscope itemtype="http://schema.org/Recipe" id="promo" class="item photo" href="https://www.tkqlhce.com/click-100122465-11848684" target="_blank"><div class="content"><img itemprop="image" id="imagePromo" class="grid-item-image" src="https://www.ftjcfx.com/image-7903156-14026812" onload="resizeAllGridItems()" /><div itemprop="name" id="titlePromo" class="grid-item-title">FREE Shipping</div><div class="grid-text"><div itemprop="recipeIngredient">Free Shipping On Wild Seafood & Organic Fare!</div></div></div></a>'
        } else {
          promoHTML =
            '<a itemscope itemtype="http://schema.org/Recipe" id="promo" class="item photo" href="https://www.dpbolvw.net/click-100122465-14041151" target="_blank"><div class="content"><img itemprop="image" id="imagePromo" class="grid-item-image" src="https://www.lduhtrp.net/image-7903156-14041151" onload="resizeAllGridItems()" /><div itemprop="name" id="titlePromo" class="grid-item-title">Up to 25% off</div><div class="grid-text"><div itemprop="recipeIngredient">Serious deals on kitchen, baking, cooking, appliances, kitchenaid, countertop appliances, stand mixers, blenders, coffee makers, food processors attachments, accessories, toasters, slow cookers here!</div></div></div></a>'
        }

        document.getElementById("grid").innerHTML += promoHTML;

        if (edamamJSON.hits.length > 0) {
          for (var k = 0; k < edamamJSON.hits.length; k++) {
            for (
              var i = 0;
              i < edamamJSON.hits[k].recipe.ingredients.length;
              i++
            ) {
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
      .then(function () {
        document.getElementById("loading").style.display = "none";
        var allItems = document.getElementsByClassName("item");
        for (var x = 0; x < allItems.length; x++) {
          resizeGridItem(allItems[x]);
        }
      })
      .catch(function () {
        console.log("fetch failed");
      });

    return false;
  }

  function resizeGridItem(item) {
    var grid = document.getElementsByClassName("grid")[0];
    var rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    var rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    var rowSpan = Math.ceil(
      (item.querySelector(".content").getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  var bgImage = require("../../images/cabinet-contemporary-counter-1080721.jpg");
  return (
    <div className="section-header">
      <div id="hero" className="section-home">
        <div id="hero-bg">
          <div
            className="bg"
            style={{ backgroundImage: "url(" + bgImage + ")" }}
            alt="Photo by Mark McCammon from Pexels"
          />
        </div>
        <div id="hero-gradient" />
        <div id="hero-search">
          <h2>Discover the best recipes</h2>
          <div id="search" className="container-fluid container-constrain">
            <div
              onKeyPress={() => {
                if (event.keyCode == 13) handleSubmit(event);
              }}
            >
              <div className="row row-condensed">
                <div className="col-sm-12">
                  <div className="form-element">
                    <input
                      name="query"
                      id="ingredient"
                      className="form-control input-lg form-control-icon icon-location"
                      type="text"
                      placeholder="What ingredient do you want to use?"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
