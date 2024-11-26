import React, { useState, useEffect } from "react";
import "./quotes.css";
import { FaHeart, FaTrash } from "react-icons/fa";

const Quotes = () => {
  const [quote, setQuote] = useState({
    text: "Most great people have attained their greatest success just one step beyond their greatest failure.",
    author: "Napolean Hill",
  });

  const [favourites, setFavourites] = useState(false);
  const [favList, setFavList] = useState([]);
  const [isClicked, setClicked] = useState(false);

  const fetchNewQuote = async () => {
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    const data = await response.json();
    setQuote({
      text: data.content,
      author: data.author,
    });
  };

  const addFav = () => {
    if (!favList.some(fav => fav.text === quote.text)) {
      setFavList([...favList, quote]);
    }
  };

  const handleDelete = (index) => {
    const updatedFavList = favList.filter((_, i) => i !== index);
    setFavList(updatedFavList);
  };

  const toggleFavourite = () => {
    setFavourites((prev) => !prev);
  };

  useEffect(() => {
    setClicked(favList.some(fav => fav.text === quote.text));
  }, [favList, quote]);

  return (
    <div className="container">
      {favourites ? (
        <div className="favorites">
          <h2>Favorites</h2>
          <div className="allq">
            {favList.map((fav, index) => (
              <div className="content" key={index}>
                <p>{fav.text}</p>
                <span>{fav.author}</span>
                <FaTrash
                  className="delete"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
          <button className="return" onClick={toggleFavourite}>
            Return
          </button>
        </div>
      ) : (
        <>
          <div className="heading">
            <h2>Quote</h2>
            <FaHeart
              onClick={() => {
                addFav();
                setClicked((prev) => !prev);
              }}
              className="icon"
              style={{ color: isClicked ? "rgb(36, 63, 109)" : "grey" }}
            />
          </div>
          <div className="content">
            <p>"{quote.text}"</p>
            <span>{quote.author}</span>
          </div>
          <div className="buttons">
            <button onClick={fetchNewQuote}>New Quote</button>
            <button onClick={toggleFavourite}>Favorites</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quotes;
