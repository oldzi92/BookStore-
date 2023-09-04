import { Book } from "./pages/Book";
import { BookLayout } from "./pages/BookLayout";
import { NewBook } from "./pages/NewBook";
import { Routes, Route } from "react-router-dom";
import { TPhotos } from "./App";

interface ILayout {
  photos: TPhotos[];
}

export function BookRoutes({ photos }: ILayout) {
  return (
    <>
      <h1>Book List</h1>
      <Routes>
        <Route index element={<BookLayout photos={photos} />} />
        <Route path=":id" element={<Book />} />
        <Route path="new" element={<NewBook />} />
      </Routes>
    </>
  );
}
