import React, { Component } from "react";
import cheerio from "cheerio";
import axios from 'axios'

import "./App.css";

class Bolacom extends Component {
  state = { databolacom: [] };

 async componentDidMount() {
    const html = await axios.get('https://cors-anywhere.herokuapp.com/https://www.bola.com/dunia');
    const $ = await cheerio.load(html.data);
    let databolacom = []
    $('.articles--iridescent-list > article').each((i, element) => {
      if (i < 10) {
        databolacom.push({
          title: $(element).find('aside > header > h4').text().trim(),
          image : $(element).find('figure > a > picture > img').attr('data-src'),
          date: $(element).find('span.labdate').text().replace("detikSport", "").replace("|", "").trim(),
          src : "bola.com"
        })
      }
    });
    this.setState({ databolacom });
    console.log(databolacom);
  }
  

  render() {
    return (
      <div>
        <ul>
          {this.state.databolacom.map((databolacom,i) => <li key={i}>{databolacom.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default Bolacom;