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
   let datas = [];
   const htmlDetik = await axios.get("https://cors-anywhere.herokuapp.com/https://sport.detik.com/");
    const $detik = await cheerio.load(htmlDetik.data);
    let jDetikCom = 0;
    $detik("div.m_content > ul > li > article").each((i, element) => {
      let kategori = $detik(element).find("div.desc_nhl > a").attr("href").substr(24, 9);
      if (kategori == "sepakbola" && jDetikCom <= 15) {
        datas.push({
          title: $detik(element).find("div.desc_nhl > a > h2").text().trim(),
          image: $detik(element).find("img").attr("src"),
          date: $detik(element).find("div.desc_nhl > span.labdate").text().replace("detikSport", "").replace("|", "").trim(),
          source: "https://sport.detik.com",
          link: $detik(element).find("div.desc_nhl > a").attr("href").trim(),
        });
        jDetikCom++;
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

    $3("article.news-block.small-block").each((i, element) => {
      if (i < 10) {
        datas.push({
          title: $3(element).find('h3.news-title > a').text().trim(),
          image : $3(element).find('a.overlay-link > figure.image-overlay > img').attr('src'),
          date: $3(element).find('p.simple-share').text().trim(),
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
