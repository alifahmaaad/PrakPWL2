import React, { Component } from "react";
import cheerio from "cheerio";
import axios from 'axios'

import "./App.css";

class Appdetik extends Component {
  state = { dataappdetik: [] };

 async componentDidMount() {
    const html = await axios.get('https://cors-anywhere.herokuapp.com/https://sport.detik.com/');
    const $ = await cheerio.load(html.data);
    let dataappdetik = []
    $('.m_content > ul > li > article').each((i, element) => {
      if (i < 10) {
        dataappdetik.push({
          title: $(element).find('.desc_nhl > a > h2').text().trim(),
          image : $(element).find('img').attr('src'),
          date: $(element).find('span.labdate').text().replace("detikSport", "").replace("|", "").trim(),
          src : "sport.detik.com"
        })
      }
    });
    this.setState({ dataappdetik });
    console.log(dataappdetik);
  }
  

  render() {
    return (
      <div>
        <ul>
          {this.state.dataappdetik.map((dataappdetik,i) => <li key={i}>{dataappdetik.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default Appdetik;