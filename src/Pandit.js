import React, { Component } from "react";
import cheerio from "cheerio";
import axios from 'axios'

import "./App.css";

class Pandit extends Component {
  state = { datapandit: [] };

 async componentDidMount() {
    const html = await axios.get('https://cors-anywhere.herokuapp.com/https://www.panditfootball.com/');
    const $ = await cheerio.load(html.data);
    let datapandit = []
    $('.main-content > .row >.col-md-4').each((i, element) => {
      if (i < 10) {
        datapandit.push({
          title: $(element).find('.news-title').text().trim(),
          image : $(element).find('.image-overlay > img').attr('src'),
          date: $(element).find('.news-details > p').text().trim(),
          src : "panditfootball.com"
        })
      }
    });
    this.setState({ datapandit });
    console.log(datapandit);
  }
  

  render() {
    return (
      <div>
        <ul>
          {this.state.datapandit.map((datapandit,i) => <li key={i}>{datapandit.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default Pandit;