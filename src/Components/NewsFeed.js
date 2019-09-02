import React from 'react';

class NewsFeed extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          newsData: []};
    }

    componentDidMount() {
      this.getNews(this.props.category)
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.category !== this.props.category) {
        this.getNews(this.props.category)
      }
    }
 
    getNews(category) {
      console.log("test")
      const self = this
      var xhttp = new XMLHttpRequest();
      const url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newsfeed?category=" + category + "&region=US";
      xhttp.open("GET", url, true);
      xhttp.setRequestHeader("X-RapidAPI-Host", "apidojo-yahoo-finance-v1.p.rapidapi.com");
      xhttp.setRequestHeader("X-RapidAPI-Key", "179a5f1cc4msh944e7e33a8ffef8p1c41eajsn6134a9507ef9");
      xhttp.send();

      xhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
               var res = JSON.parse(this.responseText)
            if (res['items']['result'] != false) {
                  var dataNews = res['items']['result']
                  self.setState({newsData: dataNews});
            } else {
               alert("Something went wrong, make sure you enter a stock SYMBOL")
            }
         }
      };
    }

    getImage(newsItem) {
      if (newsItem.main_image) {
        return <div>
        <img src={newsItem.main_image.original_url}/>
        <h1>{newsItem.title}</h1>
        </div>
      } else {
        return <div>
        <h1>{newsItem.title}</h1>
        <p>{newsItem.summary}</p>
        </div>
      }

    }
    
    renderGrid() {
      const self = this
        return this.state.newsData.map(function(newsItem) {
          return(
            <a href={newsItem.link} target="_blank">
            <div className="grid-item">
            {self.getImage(newsItem)}
            </div>
            </a>
            )
        })
    }


    render() {
    return (
      <div className="grid-container">
      {this.renderGrid()}
      </div>
    );
    }
}
export default NewsFeed