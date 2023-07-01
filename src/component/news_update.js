import "./news_update.css";
import React from "react";

const NewsUpdate = (props) => {
  let { image, title, description, news_url, name, author, date } = props;

  return (
    <>
      <div className="news_container">
        <div class="image_back">
          <div className="source_news">{name ? name : "Unknown"}</div>
          <img src={image} alt="" className="news_img" />
        </div>
        <div className="outer_layer">
          <div className="news_title">{title}...</div>
        </div>
        <p className="news_desc">{description}...</p>
        <p className="source">
          By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
        </p>
        <a href={news_url} target="_blank" rel="noopener noreferrer" className="read_more">
          Read More
        </a>
      </div>
    </>
  );
};

export default NewsUpdate;