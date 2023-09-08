import { create } from "zustand";

export type TBook = {
  bookTitle: string;
  bookId: number;
};

export type BookStore = {
  Book: string;
  NewBook: string;
  id?: number;
  booksList: TBook[];
  checkoutItems: TBook[];

  setBooks: (book: string) => void;
  addBookToBooksList: (book: TBook) => void;
  addToCart: (book: TBook) => void;
  deleteFromCart: (bookId: number) => void;
};

export const useBookStore = create<BookStore>((set) => ({
  Book: "",
  NewBook: "",
  booksList: [
    { bookId: 1, bookTitle: "Harry Potter" },
    { bookId: 2, bookTitle: "Ania z Zielonego Wzgórza" },
    { bookId: 3, bookTitle: "Kod da Vinci" },
    { bookId: 4, bookTitle: "Za zamkniętymi drzwiami" },
  ],
  //robie stora dla dodaj do koszyka,
  checkoutItems: [],
  addToCart: (book) => {
    set((state) => ({ checkoutItems: [...state.checkoutItems, book] }));
  },
  //store dla przycisku usuwania w Cart.tsx
  deleteFromCart: (bookId: number) => {
    set((state) => ({
      checkoutItems: state.checkoutItems.filter(
        (book) => book.bookId !== bookId
      ),
    }));
  },

  addBookToBooksList: (book) => {
    set((state) => ({ booksList: [...state.booksList, book] }));
  },

  setBooks: (Book) => {
    set(() => ({ NewBook: Book }));
  },
}));
