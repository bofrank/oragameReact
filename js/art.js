function load() {

  document.getElementById("grid").innerHTML = "";

  function checkComplete(imageCount,recipeCount){
    if(imageCount==recipeCount){
      resizeAllGridItems();
    }
  }

  var ingredient = document.getElementById("ingredient").value;

  console.log("ingredient="+ingredient);

  //var appid = 'c49914ba91b0f76fad96';
  //var appkey = 'b96777ca87adb9827455cb688c6e9f0f';
  //var recipeUrl = `https://api.artsy.net/api/tokens/xapp_token?client_id=${appid}&client_secret=${appkey}`;
 
  fetch("https://api.artsy.net/api/artworks?artist_id=4d8b92b34eb68a1b2c0003f4&published=true", {
    headers: {
      "X-Xapp-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMDg5NjA1NSwiaWF0IjoxNTMwMjkxMjU1LCJhdWQiOiI1YjM1YTAyNGE2Y2E2ZDE3NTkxZjczOTQiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWIzNjY0Mzc3NjIyZGQzOGM2YWU0NWFiIn0.LDj6ARIKIA5i5nUsqu90Uqzs43uIGBR1L2ZD8-xR8yI"
    }
  }).then(function(response) {
    return response.json();
  });
  /*
  .then(function(artsyJSON) {
    
    let ingredient;
    let node;
    let element;
    let recipeHTML;
    let ingredientsHTML = "";

    for(k = 0; k < artsyJSON.hits.length; k++){

      for(i = 0; i < artsyJSON.hits[k].recipe.ingredients.length; i++){
        ingredientsHTML += '<div itemprop="recipeIngredient">'+artsyJSON.hits[k].recipe.ingredients[i].text+'</div>';
      }

      recipeHTML = '<a itemscope itemtype="http://schema.org/Recipe" id="recipe"'+k+' class="item photo" href="'+artsyJSON.hits[k].recipe.url+'" target="_blank"><div class="content"><img itemprop="image" id="image0"'+k+' class="grid-item-image" src="'+artsyJSON.hits[k].recipe.image+'" onload="resizeAllGridItems()" /><div itemprop="name" id="title0"'+k+' class="grid-item-title">'+artsyJSON.name+'</div><div class="grid-text">'+ingredientsHTML+'</div></div></a>';

      document.getElementById("grid").innerHTML +=  recipeHTML;

      ingredientsHTML = "";
      
    }

  });*/
  return false;
}

//https://codepen.io/andybarefoot/pen/QMeZda

function resizeGridItem(item){
  grid = document.getElementsByClassName("grid")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  allItems = document.getElementsByClassName("item");
  for(x=0;x<allItems.length;x++){
    resizeGridItem(allItems[x]);
  }
}