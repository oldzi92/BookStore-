import { useParams } from "react-router-dom";
import { useBookStore } from "../store";

export const Book = () => {
  const bookList = useBookStore((state) => state.booksList);
  const { id } = useParams();

  // Szukamy książki o zadanym id
  const selectedBook = bookList.find((book) => book.bookId === parseInt(id));

  return (
    <>
      <p>Tytuł książki:</p>
      {selectedBook ? (
        <h3>{selectedBook.bookTitle}</h3>
      ) : (
        <h2>Nie znaleziono książki o podanym id: {id}</h2>
      )}
      <br></br>
    </>
  );
};
