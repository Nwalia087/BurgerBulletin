import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, url, dayNDate, source, author } = this.props;
    const parsedDate = new Date(dayNDate);

    return (
      <div className="position-relative">
        <span
          className="position-absolute bg-success z-2 rounded-pill px-3 text-light"
          style={{ top: "3%", left: "1%" }}>
          {source}
        </span>
        <div className="card mx-2 my-4" style={{ width: "24rem" }}>
          <div className="news-img-container">
            <div
              className="news-img"
              style={{
                backgroundImage: `url(${
                  imgUrl
                    ? imgUrl
                    : "https://media.wired.com/photos/665f49ceced1e1bec36c45a1/191:100/w_1280,c_limit/respec3.jpg"
                })`,
              }}></div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div className="">
              <small>{parsedDate.toUTCString()}</small>
            </div>
            <p className="card-text">{description} </p>
            {author && (
              <figcaption className="blockquote-footer mb-1">
                By <cite title="Source Title">{author}</cite>
              </figcaption>
            )}
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
