import React from "react";
import axios from "axios";
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";
import Navbar from "./Navbar.js";
import ContentCategories from "./ContentCategories.js";
import MainNewsItems from "./MainNewsItems.js";
import SideNewsItems from "./SideNewsItems.js";
import Footer from "./Footer.js";

const GlobalStyle = createGlobalStyle`
* {
  --font-color-primary: #3d3d3d;
  --font-color-secondary: #f0f0f0;
  --font-color-tertiary: #ff9900;
  --body-color-primary: #f3f3f3;
  --body-color-secondary: #1d1d1d;
  --body-color-tertiary: #00af43;
  font-family: "Roboto", sans-serif;
  font-size: 62.5%;
  line-height: 1.5;
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
 box-sizing: border-box;
}

html,
body {
  color: var(--font-color-primary);
  background-color: var(--body-color-primary);
}
`;

const GridMainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 2em;
  row-gap: 2rem;
  grid-template-areas: 
  "grid-header grid-header"
  "grid-categories grid-categories"
  "grid-content-main grid-content-side"
  "grid-footer grid-footer";
`;

class App extends React.Component {

  state = { data: [], country: "" };

  switchLanguage = async (event) => {
    const countryOptions = ["BG", "DE", "FR", "GB", "HU", "IT", "JP", "KR", "SE"];
    const countryLinkValue = event.target.innerText;

    this.setState({ country: countryLinkValue });

    try {
      for (let i = 0; i < countryOptions.length; i++) {
        if (countryLinkValue === countryOptions[i]) {
          const response = await axios.get(`/country/${countryOptions[i]}/category/general`);
  
          this.setState({ data: response.data });
        }
      }
    } catch (error) {
      return console.log("Something is not good!");
    }
  };

  switchCategory = async (event) => {
    const categoryOptions = ["GENERAL", "BUSINESS", "TECHNOLOGY", "SCIENCE", "HEALTH", "ENTERTAINMENT"];
    const categoryLinkValue = event.target.innerText;

    try {
      for (let i = 0; i < categoryOptions.length; i++) {
        if (categoryLinkValue === categoryOptions[i]) {
          const response = await axios.get(`/country/${this.state.country}/category/${categoryOptions[i]}`);
  
          this.setState({ data: response.data });
        }
      }
    } catch (error) {
      return console.log("Something is not good!");
    }
  }
    
  render() {
    return (
      <div>
        <GlobalStyle />
        <GridMainContainer>
          <Navbar switchLanguage={this.switchLanguage} />
          <ContentCategories switchCategory={this.switchCategory} />
          <MainNewsItems data={this.state.data} />
          <SideNewsItems data={this.state.data} />
          <Footer />
        </GridMainContainer>
      </div>
    );
  }
};

export default App;