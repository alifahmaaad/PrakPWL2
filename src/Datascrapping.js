import React, { Component } from "react";
import cheerio from "cheerio";
import axios from "axios";
import "./App.css";

const divStyle = {
  color: 'black',
  margin: 'auto'
};

class DataScrapping extends Component {
  state = { data: [] };

  async componentDidMount() {
    let data = [];

    const htmlPandit = await axios.get("https://cors-anywhere.herokuapp.com/https://panditfootball.com/");
    const $pandit = await cheerio.load(htmlPandit.data);
    $pandit("article.news-block.small-block").each((i, element) => {
      data.push({
        title: $pandit(element).find("h3.news-title > a").text().trim(),
        image: $pandit(element).find("a.overlay-link > figure.image-overlay > img").attr("src"),
        date: $pandit(element).find("p.simple-share").text().trim(),
        source: "https://panditfootball.com",
        link: $pandit(element).find("h3.news-title > a").attr("href"),
      });
    });
    this.setState({ data });

    const htmlGoalCom = await axios.get("https://cors-anywhere.herokuapp.com/https://www.goal.com/id");
    const $goalcom = await cheerio.load(htmlGoalCom.data);
    $goalcom("div.group.card-11-group-1 > article").each((i, element) => {
      data.push({
        title: $goalcom(element).find("a > div.title > h3").text().trim(),
        image: $goalcom(element).find("img").attr("srcset"),
        date: $goalcom(element).find("footer > time").attr("datetime").substr(0, 19).replace("T", " "),
        source: "https://goal.com",
        link: $goalcom(element).find("a").attr("href"),
      });
    });
    this.setState({ data });

    const htmlDetik = await axios.get("https://cors-anywhere.herokuapp.com/https://sport.detik.com/");
    const $detik = await cheerio.load(htmlDetik.data);
    let jDetikCom = 0;
    $detik("div.m_content > ul > li > article").each((i, element) => {
      let kategori = $detik(element).find("div.desc_nhl > a").attr("href").substr(24, 9);
      if (kategori == "sepakbola" && jDetikCom <= 15) {
        data.push({
          title: $detik(element).find("div.desc_nhl > a > h2").text().trim(),
          image: $detik(element).find("img").attr("src"),
          date: $detik(element).find("div.desc_nhl > span.labdate").text().replace("detikSport", "").replace("|", "").trim(),
          source: "https://sport.detik.com",
          link: $detik(element).find("div.desc_nhl > a").attr("href").trim(),
        });
        jDetikCom++;
      }
    });
    this.setState({ data });

    const htmlBolaCom = await axios.get("https://cors-anywhere.herokuapp.com/https://www.bola.com");
    const $bolacom = await cheerio.load(htmlBolaCom.data);
    let jBolaCom = 0;
    $bolacom("div.articles--iridescent-list > article").each((i, element) => {
      let kategori = $bolacom(element).find("aside > header > a.articles--iridescent-list--text-item__category").text().trim();
      let judulFoto = $bolacom(element).find("aside > header > h4").text().trim().substr(0, 5);
      let judulVideo = $bolacom(element).find("aside > header > h4").text().trim().substr(0, 6);
      if (jBolaCom <= 15 && kategori != "E-sports" && kategori != "MotoGP" && kategori != "NBA") {
        if (judulFoto != "FOTO:" && judulVideo != "VIDEO:") {
          data.push({
            title: $bolacom(element).find("aside > header > h4").text().trim(),
            image: $bolacom(element).find("figure > a > picture > img").attr("data-src"),
            date: $bolacom(element).find("aside > header > span.articles--iridescent-list--text-item__datetime > time").text(),
            source: "https://bola.com",
            link: $bolacom(element).find("aside > header > h4 > a").attr("href"),
          });
          jBolaCom++;
        }
      }
    });
    this.setState({ data });
  }
 
  render() {
    return (
      <div>
   
        <ul>
          {this.state.datas.map((data,i) => <div key={i}>
            <div className='Box' style={divStyle} >
              <img className='App-logo' src={data.image}/>
              <h2>{data.title}  </h2>
              <p>Upload Date : {data.date} <br/> sumber : {data.src}</p>
            </div>
          </div>
          )}
        </ul>
      </div>
    );
  }
}

export default DataScrapping;
