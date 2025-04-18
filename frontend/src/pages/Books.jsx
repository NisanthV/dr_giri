import React from "react";
import { useState } from "react";
import styles from "../styles/Books.module.css";
import one from "../assets/one.jpeg";
import two from "../assets/two.jpeg";
import three from "../assets/three.jpeg";

export default function Books() {
  const [active, setActive] = useState(0);
  const [books, setBooks] = useState([
    [
      { id: 1, img: one, name: "test1" },
      { id: 2, img: two, name: "test2" },
    ],
    [
      { id: 1, img: one, name: "test1" },
      { id: 2, img: two, name: "test2" },
      { id: 3, img: three, name: "test3" },
    ],
  ]);
  const fetchBook = async (id) => {
    setActive(id);
    console.log(books[id])
  };
  return (
    <div>
      <div>Books</div>
      <div className={styles.year}>
        <button
          onClick={() => {
            fetchBook(0);
          }}
          className={`${styles.button} ${active === 0 && styles.active}`}
        >
          1st Year
        </button>
        <button
          onClick={() => {
            fetchBook(1);
          }}
          className={`${styles.button} ${active === 1 && styles.active}`}
        >
          2nd Year
        </button>
        <button
          onClick={() => {
            fetchBook(2);
          }}
          className={`${styles.button} ${active === 2 && styles.active}`}
        >
          3rd Year
        </button>
        <button
          onClick={() => {
            fetchBook(3);
          }}
          className={`${styles.button} ${active === 3 && styles.active}`}
        >
          4rd Year
        </button>
      </div>
      <div className={styles.bookContainer}>
        {active != null ? (
          books[active].map((book) => (
            <div className={styles.book} key={book.id}>
              <img src={book.img} alt="" />
              <h2 className={styles.bookName}>{book.name}</h2>
            </div>
          ))
        ) : (
          <div className={styles.noBook}>
            <h1>Here the place to explore books</h1>
          </div>
        )}
      </div>
    </div>
  );
}
