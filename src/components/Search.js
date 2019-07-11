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
              <div>
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
