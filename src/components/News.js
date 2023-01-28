import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Spinner from './Spinner';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static deafaultProps = {
    country: "in",
    pageSize: 8,
    category: "General",
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };

    document.title = `${this.props.category} - NewsMonkey`;
  }

  async componentDidMount() {
   this.updateNews();
  }

  async updateNews(){
      this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca527ad79f4344efbfc7409eb25ccc9d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      
      this.setState({
        totalResults:parsedData.totalResults,
        articles: parsedData.articles,
      });

      this.props.setProgress(100);
  }
  
    fetchMoreData = async() => {
        this.setState({page: this.state.page +1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ca527ad79f4344efbfc7409eb25ccc9d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
          totalResults:parsedData.totalResults,
          articles: this.state.articles.concat(parsedData.articles)
        });
    }
 

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>
          NewsMonkey - Top Headlines on {this.props.category}
        </h1>
        {/* <Spinner /> */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
            <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    );
};
}

export default News;
