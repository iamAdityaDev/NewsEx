import "./news.css";
import React, { useEffect } from "react";
import NewsUpdate from "./news_update";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const News = (props) => {
  const [articles, setatrticles] = useState([]);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const UpdateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${page}&pageSize=10&category=${props.category}`;
    let data = await fetch(url);
    let parsed_data = await data.json();
    setatrticles(parsed_data.articles);
    settotalResults(parsed_data.totalResults);
  };
  useEffect(() => {
    document.title=`NewsEx - ${props.category}`
    UpdateNews(); 
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${page + 1}&pageSize=10&category=${props.category}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsed_data = await data.json();
    setatrticles(articles.concat(parsed_data.articles));
    settotalResults(parsed_data.totalResults);
  };
  return (
    <>
      <p className="headlines">NewsEx - Top Headlines</p>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
      >
        <div className="container">
          {articles.map((element, index) => {
            return (
              <NewsUpdate key={index}
                news_url={element.url}
                name={element.source.name}
                author={element.author}
                date={element.publishedAt}
                image={element.urlToImage}
                title={element.title ? element.title.slice(0, 75) : ""}
                description={
                  element.description
                    ? element.description
                    : element.title.slice(0, 90)
                }/>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};
export default News;
