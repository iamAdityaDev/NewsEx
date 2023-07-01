import "./news.css";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsUpdate from "./news_update";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = `NewsEx - ${props.category}`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  const updateNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${page}&pageSize=10&category=${props.category}`;
      const data = await fetch(url);
      const parsed_data = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsed_data.articles]);
      setError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    }
  };

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=969db4cd0c684fdc9b4fac646850d457&page=${nextPage}&pageSize=10&category=${props.category}`;
      const data = await fetch(url);
      const parsed_data = await data.json();
      setArticles((prevArticles) => [...prevArticles, ...parsed_data.articles]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
      setError(true);
    }
  };

  return (
    <>
      <p className="headlines">NewsEx - Top Headlines</p>
      {error ? (
        <div className="error-message">Error fetching news data. Please try again later.</div>
      ) : (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== 0} // Adjusted the condition here
        >
          <div className="container">
            {articles.map((element, index) => (
              <NewsUpdate
                key={index}
                news_url={element.url}
                name={element.source.name}
                author={element.author}
                date={element.publishedAt}
                image={element.urlToImage}
                title={element.title ? element.title.slice(0, 75) : ""}
                description={
                  element.description ? element.description : element.title.slice(0, 90)
                }
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default News;
