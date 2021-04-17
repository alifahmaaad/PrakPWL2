import React, { Component } from "react";
import cheerio from "cheerio";
import axios from 'axios';
import "./App.css";


const divStyle = {
  color: 'black',
  margin: 'auto'
};
class DataScrapping extends Component {
  state = { datas: [] };

  async componentDidMount() {
   
    const html3 = await axios.get('https://cors-anywhere.herokuapp.com/https://sport.detik.com/');
    const $2 = await cheerio.load(html3.data);
    let datas = []
    $2('.m_content > ul > li > article').each((i, element) => {
      if (i < 10) {
        datas.push({
          title: $2(element).find('.desc_nhl > a > h2').text().trim(),
          image : $2(element).find('img').attr('src'),
          date: $2(element).find('span.labdate').text().replace("detikSport", "").replace("|", "").trim(),
          src : "sport.detik.com"
        })
      }
    });
    this.setState({ datas });
    const html = await axios.get('https://cors-anywhere.herokuapp.com/https://www.bola.com/dunia');
    const $ = await cheerio.load(html.data);
 
    $('.articles--iridescent-list > article').each((i, element) => {
      if (i < 10) {
        datas.push({
          title: $(element).find('aside > header > h4').text().trim(),
          image : $(element).find('figure > a > picture > img').attr('data-src'),
          date: $(element).find('span.labdate').text().replace("detikSport","").replace("|", "").trim(),
          src : "bola.com"
        })
      }
    });
    this.setState({ datas });
    const html4 = await axios.get('https://cors-anywhere.herokuapp.com/https://www.panditfootball.com/');
    const $3 = await cheerio.load(html4.data);

    $3('.main-content > .row >.col-md-4').each((i, element) => {
      if (i < 10) {
        datas.push({
          title: $3(element).find('.news-title').text().trim(),
          image : $3(element).find('.image-overlay > img').attr('src'),
          date: $3(element).find('.news-details > p').text().trim(),
          src : "panditfootball.com"
        })
      }
    });
    this.setState({ datas });
    const html2 = await axios.get('https://cors-anywhere.herokuapp.com/https://www.goal.com/id/berita/4');
    const $4 = await cheerio.load(html2.data);
    
    $4('.main-content > section >').each((i, element) => {
      if (i> 1 && i < 12) {
        datas.push({
          title: $4(element).find('.title > h3').text().trim(),
          image : $4(element).find('.picture > img').prop('srcset'),
          date: $4(element).find('footer > time').attr('datetime'),
          src : "goal.com"
        })
      }
    });
    this.setState({ datas });
    console.log(datas)
  }
 
  render() {
    return (
      <div>
   
        <ul>
          {this.state.datas.map((datas,i) => <div key={i}>
            <div className='Box' style={divStyle} >
              <img className='App-logo' src={datas.image}/>
              <h2>{datas.title}  </h2>
              <p>Upload Date : {datas.date} <br/> sumber : {datas.src}</p>
            </div>
          </div>
          )}
        </ul>
      </div>
    );
  }
}

export default DataScrapping;