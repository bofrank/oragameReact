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

function resizeAllGridItems() {
  var allItems = document.getElementsByClassName("item");
  for (var x = 0; x < allItems.length; x++) {
    resizeGridItem(allItems[x]);
  }
}
