import React, { Component } from "react";
import NewsItem from "./newsItem";
import Loading from "./loading";
import InfiniteScroll from "react-infinite-scroll-component";

export class NewsContainer extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 11,
      totalResults: 0,
    };
  }

  activeclass = () => {
    const dropDownMenu = document.getElementById("catagory-Selector");
    const dropDownItems = Array.from(dropDownMenu.getElementsByClassName("dropdown-item"));
    dropDownItems.forEach((element) => {
      if (element.textContent === this.props.catagory) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  fetchMoreData = async () => {
    const { page, pageSize } = this.state;
    const { catagory } = this.props;

    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${catagory}&apiKey=5aacd7c809874e2ca2b465c212db5b5a&page=${page}&pageSize=${pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();

    // 2. Efficient State Update
    const newArticles = parsedData.articles.filter(
      (newArticle) => !this.state.articles.some((article) => article.url === newArticle.url)
    );

    this.setState((prevState) => ({
      articles: [...prevState.articles, ...newArticles],
      totalResults: parsedData.totalResults,
      loading: false,
      page: prevState.page + 1,
    }));
  };

  async updatePage() {
    this.props.setProgress(10);
    const { catagory } = this.props;

    this.setState({ loading: true });

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${catagory}&apiKey=5aacd7c809874e2ca2b465c212db5b5a&page=1&pageSize=${this.state.pageSize}`;
    const data = await fetch(url);
    this.props.setProgress(30);
    const parsedData = await data.json();
    this.props.setProgress(50);

    this.activeclass();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: 2,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatePage();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.catagory !== this.props.catagory) {
      this.setState({ page: 1, articles: [] }, this.updatePage);
    }
  }

  render() {
    return (
      <>
        <h1 className="h1 text-center" style={{ textTransform: "capitalize" }}>
          Burger Bulletin - {this.props.catagory} news
        </h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<h4 className="text-center">Loading...</h4>}>
          <div className="container justify-content-evenly d-flex flex-wrap">
            {this.state.articles
              .filter((element) => element.title && element.description && element.url && element.urlToImage)
              .map((element) => (
                <NewsItem
                  key={element.url}
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  url={element.url}
                  dayNDate={element.publishedAt}
                  source={element.source.name}
                  author={element.author}
                />
              ))}
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default NewsContainer;
