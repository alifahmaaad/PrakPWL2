import React, { Component } from "react";
import cheerio from "cheerio";
import axios from 'axios'

import "./App.css";

class Appgoal extends Component {
  state = { dataappgoal: [] };

 async componentDidMount() {
    const html = await axios.get('https://cors-anywhere.herokuapp.com/https://www.goal.com/id/berita/4');
    const $ = await cheerio.load(html.data);
    let dataappgoal = []
    $('.main-content > section >').each((i, element) => {
      if (i> 1 && i < 12) {
        dataappgoal.push({
          title: $(element).find('.title > h3').text().trim(),
          image : $(element).find('.picture > img').prop('srcset'),
          date: $(element).find('footer > time').attr('datetime'),
          src : "goal.com"
        })
      }
    });
    this.setState({ dataappgoal });
    console.log(dataappgoal);
  }
  

  render() {
    return (
      <div>
        <ul>
          {this.state.dataappgoal.map((dataappgoal,i) => <li key={i}>{dataappgoal.title}</li>)}
        </ul>
      </div>
    );
  }
}

export default Appgoal;