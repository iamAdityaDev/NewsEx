import "./news.css";
import React, { useEffect, useState } from "react";
import NewsUpdate from "./news_update";
import InfiniteScroll from "react-infinite-scroll-component";

// ... (imports remain the same)

const News = (props) => {
  const [articles, setArticles] = useState({});
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${page}&pageSize=10&category=${props.category}`;
    let data = await fetch(url);
    let parsed_data = await data.json();

    // Merge the new articles with the existing ones using the 'url' property as the key
    setArticles((prevArticles) => {
      return { ...prevArticles, ...parsed_data.articles.reduce((obj, article) => {
        obj[article.url] = article;
        return obj;
      }, {}) };
    });

    setTotalResults(parsed_data.totalResults);
  };

  useEffect(() => {
    document.title = `NewsEx - ${props.category}`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${nextPage}&pageSize=10&category=${props.category}`;
    let data = await fetch(url);
    let parsed_data = await data.json();

    // Merge the new articles with the existing ones using the 'url' property as the key
    setArticles((prevArticles) => {
      return { ...prevArticles, ...parsed_data.articles.reduce((obj, article) => {
        obj[article.url] = article;
        return obj;
      }, {}) };
    });

    setTotalResults(parsed_data.totalResults);
    setPage(nextPage);
  };

  const uniqueArticles = Object.values(articles);

  return (
    <>
      <p className="headlines">NewsEx - Top Headlines</p>
      <InfiniteScroll
        dataLength={uniqueArticles.length}
        next={fetchMoreData}
        hasMore={uniqueArticles.length !== totalResults}
      >
        <div className="container">
          {uniqueArticles.map((element, index) => (
            <NewsUpdate
              key={index}
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
              }
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
