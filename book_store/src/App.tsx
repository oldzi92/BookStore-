import "@picocss/pico";
import "./styles.scss";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";
import { Home } from "./pages/Home";
import { BookRoutes } from "./BookRoutes";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Quotations } from "./Quotations";
import { useState, useEffect } from "react";
import { Cart } from "./pages/Cart";
import { Book } from "./pages/BookLayout";
import { LogIn, LogInProps, UserData } from "./LogIn";

export type TPhotos = {
  albumId: number;
  id: number;
  title: string;
  url: string;
};

interface TData {
  data: UserData;
  onSubmit: LogInProps;
}

function App() {
  const location = useLocation();
  const [photos, setPhotos] = useState<TPhotos[]>([]);
  const [, setAddedBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((response) => setPhotos(response));
  }, []);

  const handleSubmit = ({ data }: TData) => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };

  return (
    <>
      <nav>
        <article>
          <ul>
            <li>
              <NavLink to="/" reloadDocument>
                {({ isActive }) => {
                  return isActive ? "Home" : "Home is here!";
                }}
              </NavLink>
            </li>
            <li>
              <NavLink to="/books">BookList</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/quote">Quotations</NavLink>
            </li>
            <li className="cart">
              <NavLink to="/cart">
                <img
                  src="https://st2.depositphotos.com/3665639/7453/v/950/depositphotos_74537483-stock-illustration-shopping-cart-icon.jpg"
                  alt="cart"
                  className="cartNavLink"
                ></img>
              </NavLink>
            </li>
            <li className="login">
              <NavLink to="/login" className="loginNavLink">
                LogIn
              </NavLink>
            </li>
          </ul>
        </article>
      </nav>

      {location.state}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/*" element={<BookRoutes photos={photos} />} />
        <Route path="/about/*" element={<About />} />
        <Route path="contact/*" element={<Contact />} />
        <Route path="quote/*" element={<Quotations />} />
        <Route
          path="/cart/*"
          element={<Cart setAddedBooks={setAddedBooks} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="login/*" element={<LogIn onSubmit={handleSubmit} />} />
      </Routes>
    </>
  );
}

export default App;
