import { useBookStore } from "../store";
import { Book } from "./BookLayout";

export interface TCart {
  setAddedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export const Cart = ({ setAddedBooks }: TCart) => {
  const checkoutItems = useBookStore((state) => state.checkoutItems);

  const handleRemoveFromCart = (bookId: number) => {
    useBookStore.getState().deleteFromCart(bookId);
    setAddedBooks((prevBooks) =>
      prevBooks.filter((book) => book.bookId !== bookId)
    );
  };

  return (
    <>
      <h1>Your Cart</h1>
      <article>
        <div>
          {checkoutItems.map((book) => {
            return (
              <div key={book.bookId}>
                <li>
                  {book.bookTitle}
                  <button
                    onClick={() => {
                      handleRemoveFromCart(book.bookId);
                    }}
                  >
                    Delete
                  </button>
                </li>
              </div>
            );
          })}
        </div>
      </article>
    </>
  );
};
