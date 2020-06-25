import React, { Component } from 'react'
import axios from 'axios';
import '../css fils/News.css';


class News extends Component {
  state = { news: [], news2: [] };

  componentDidMount() {
    axios
      .get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e006693c56e54ef0b96f211c6325a803')
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          console.log(res.data.articles);
          this.setState({ news: res.data.articles })
        }
        else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));

    axios
      .get('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=e006693c56e54ef0b96f211c6325a803')
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          console.log('2', res.data.articles);
          this.setState({ news2: res.data.articles })
        }
        else {
          console.log(`error status code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.user)

    const TheNews = this.state.news.map((news, i) => {
      return <div className='news' key={i}>
        <h3>{news.title}<br /></h3>
        <img src={news.urlToImage} alt={'imag'} /><br />
        <p>{news.description}{<br />}{<br />}{news.publishedAt}</p>
        <button><a href={news.url} target="_blank">{'Keep Reading'}</a></button>
      </div>
    })

    const TheNews2 = this.state.news2.map((news2, i) => {
      return <div className='news' key={i}>
        <h3>{news2.title}<br /></h3>
        <img src={news2.urlToImage} alt={'imag'} /><br />
        <p>{news2.description}{<br />}{<br />}{news2.publishedAt}</p>
        <button><a href={news2.url} target="_blank">{'Keep Reading'} </a></button>
      </div>
    })

    return (
      <div className="newsContainer">
        <h1>LET'S NEWS</h1>
        <div className={'news1'}>
          <p> {TheNews} {TheNews2}</p>
        </div>
      </div>

    )
  }
}
export default News;