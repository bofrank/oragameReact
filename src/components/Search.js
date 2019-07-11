import React from "react";

class Search extends React.Component {
  state = {
    recipe: {
      ingredient: ""
    }
  };
  handleChange = event => {
    const recipe = { ...this.state.recipe, ingredient: event.target.value };
    this.setState({ recipe });
  };

  handleSubmit = event => {
    event.preventDefault();
    //this.props.actions.createCourse(this.state.course);
    console.log(this.state.recipe.ingredient);
    this.load();
  };

  load = () => {
    document.getElementById("grid").innerHTML = "";
    document.getElementById("loading").style.display = "block";

    function checkComplete(imageCount, recipeCount) {
      if (imageCount == recipeCount) {
        this.resizeAllGridItems();
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
      .then(function(edamamJSON) {
        document.getElementById("loading").style.display = "none";
      })
      .catch(function() {
        console.log("fetch failed");
      });

    return false;
  };

  resizeGridItem = item => {
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
  };

  resizeAllGridItems = () => {
    var allItems = document.getElementsByClassName("item");
    for (var x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  };

  render() {
    return (
      <div className="section-header">
        <div id="hero" className="section-home">
          <div id="hero-bg">
            <div className="bg" alt="Photo by Mark McCammon from Pexels" />
          </div>
          <div id="hero-gradient" />
          <div id="hero-search">
            <h2>Discover the best recipes</h2>
            <div id="search" className="container-fluid container-constrain">
              <div
                onKeyPress={() => {
                  if (event.keyCode == 13) this.handleSubmit(event);
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
                        onChange={this.handleChange}
                        value={this.state.recipe.ingredient}
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
}

export default Search;
