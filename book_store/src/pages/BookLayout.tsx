import { Link, Outlet } from "react-router-dom";
import { useBookStore } from "../store";
import { useState } from "react";
import { TPhotos } from "../App";

interface IPhoto {
  photos: TPhotos[];
}
export interface BookList {
  bookList: [];
  book: string;
  cartItems: number[];
  bookId: number;
  bookTitle: string;
}

export interface Book {
  bookId: number;
  bookTitle: string;
}

export interface CartProps {
  addedBooks: Book[];
  bookId: number;
  bookTitle: string;
}

export function BookLayout({ photos }: IPhoto) {
  const booksList = useBookStore((state) => state.booksList);
  const checkoutItems = useBookStore((state) => state.checkoutItems);
  const [search, setSearch] = useState("");
  const [, setAddedBooks] = useState<Book[]>([]);

  const handleAddToCart = (bookId: number, bookTitle: string) => {
    useBookStore.getState().addToCart({ bookId, bookTitle });
    setAddedBooks((prevBooks) => [...prevBooks, { bookId, bookTitle }]);
  };

  return (
    <article>
      <br></br>
      <div className="input">
        <input
          placeholder="Find book"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br></br>
      {booksList
        .filter((book) => book.bookTitle.includes(search))
        .map((book) => {
          const photo = photos.find((photo) => photo.id === book.bookId);
          const isAddedToCart = checkoutItems.includes(book);
          return (
            <div key={book.bookId}>
              <h2>
                <Link to={`/books/${book.bookId}`}>{book.bookTitle}</Link>
              </h2>
              <div className="photoForBook">
                {photo && (
                  <ul>
                    <img src={photo.url} alt={`Photo for ${book.bookTitle}`} />
                  </ul>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(book.bookId, book.bookTitle);
                  alert(` ${book.bookTitle} : Added to cart! `);
                  console.log("isadded", isAddedToCart);
                }}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? "Added " : "Add to cart"}
              </button>
            </div>
          );
        })}
      <br />
      <Outlet />
    </article>
  );
}
