
    fetchNews = async (category, page = 1) => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=5aacd7c809874e2ca2b465c212db5b5a&page=${page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, page });
  };

  componentDidMount() {
    this.fetchNews(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchNews(this.props.category);
    }
  }

  handlePrev = async () => {
    if (this.state.page > 1) {
      this.fetchNews(this.props.category, this.state.page - 1);
    }
  };

  handleNext = async () => {
    if (this.state.page < Math.ceil(this.state.totalResults / this.state.pageSize)) {
      this.fetchNews(this.props.category, this.state.page + 1);
    }
  };

  render() {
    return (
      <>
        <h1 className="h1 text-center">NewsMonkey</h1>
        {this.state.loading && <Loading />}
        <div className="container justify-content-evenly d-flex flex-wrap">
          {this.state.articles
            .filter((element) => element.title && element.description && element.url && element.urlToImage)
            .map((element) => {
              return (
                !this.state.loading && (
                  <NewsItem
                    key={element.url}
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    url={element.url}
                  />
                )
              );
            })}
          <div
            className="container d-flex justify-content-between position-fixed start-50 translate-middle"
            style={{ top: "90px" }}>
            <button
              type="button"
              className="btn btn-dark position-absolute"
              onClick={this.handlePrev}
              disabled={this.state.page <= 1}
              style={{ left: "-25px" }}>
              Prev
            </button>
            <button
              type="button"
              className="btn btn-dark position-absolute"
              onClick={this.handleNext}
              disabled={this.state.page >= Math.ceil(this.state.totalResults / this.state.pageSize)}
              style={{ left: "1290px" }}>
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
