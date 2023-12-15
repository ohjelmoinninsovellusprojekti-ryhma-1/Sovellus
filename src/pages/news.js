
import React, { useEffect, useState } from 'react';
import '../App.css';

const FinnkinoNewsComponent = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const baseUrl = 'https://www.finnkino.fi/xml/News/';
    const areaId = '1018';
    const url = `${baseUrl}?area=${areaId}`;

    fetch(url)
      .then((response) => response.text())
      .then((xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

        const items = Array.from(xmlDoc.querySelectorAll('NewsArticle')).map((newsArticle) => {
          return {
            title: newsArticle.querySelector('Title').textContent,
            publishDate: newsArticle.querySelector('PublishDate').textContent,
            leadContent: newsArticle.querySelector('HTMLLead').textContent,
            articleURL: newsArticle.querySelector('ArticleURL').textContent,
            imageURL: newsArticle.querySelector('ImageURL').textContent,
            thumbnailURL: newsArticle.querySelector('ThumbnailURL').textContent,
            categories: newsArticle.querySelector('Categories').textContent,
          };
        });

        setNewsItems(items);
      })
      .catch((error) => {
        console.error('Error fetching Finnkino News XML:', error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNewsItems = newsItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="FinnkinoNewsComponent">
      <h1>News</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="FinnkinoNewsList">
        {filteredNewsItems.map((item, index) => (
          <li key={index} className="FinnkinoNewsItem">
            <h3>{item.title}</h3>
            <p>{item.leadContent}</p>
            <p>Published on: {item.publishDate}</p>

            <a href={item.articleURL} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
            <img src={item.imageURL} alt="News Image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinnkinoNewsComponent;






