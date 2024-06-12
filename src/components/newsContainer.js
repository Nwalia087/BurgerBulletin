import React, { useEffect, useState } from "react";
import NewsItem from "./newsItem";
import Loading from "./loading";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsContainer = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(11);
  const [totalResults, setTotalResults] = useState(0);

  const activeclass = () => {
    const dropDownMenu = document.getElementById("catagory-Selector");
    const dropDownItems = Array.from(dropDownMenu.getElementsByClassName("dropdown-item"));
    dropDownItems.forEach((element) => {
      if (element.textContent === props.catagory) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  };

  const fetchMoreData = async () => {
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.catagory}&apiKey=${props.ApiKey}&page=${page}&pageSize=${pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();

    const newArticles = parsedData.articles.filter(
      (newArticle) => !articles.some((article) => article.url === newArticle.url)
    );

    setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  const updatePage = async () => {
    props.setProgress(10);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.catagory}&apiKey=${props.ApiKey}&page=1&pageSize=${pageSize}`;
    const data = await fetch(url);
    props.setProgress(30);
    const parsedData = await data.json();
    props.setProgress(50);

    activeclass();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(2);
    props.setProgress(100);
  };

  useEffect(() => {
    updatePage();
  }, [props.catagory]);

  const componentDidUpdate = async (prevProps) => {
    if (prevProps.catagory !== props.catagory) {
      setPage(1);
      setArticles([]);
      updatePage();
    }
  };

  return (
    <>
      <h1 className="h1 text-center" style={{ textTransform: "capitalize" }}>
        Burger Bulletin - {props.catagory} news
      </h1>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4 className="text-center">Loading...</h4>}>
        <div className="container justify-content-center justify-content-lg-evenly d-flex flex-wrap">
          {articles
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
};

export default NewsContainer;
