import { useState, useEffect } from "react";

export type TContact = {
  id: number;
  name: string;
  email: string;
  phone: number;
  address: {
    street: string;
    city: string;
    zipcode: number;
  };
};

export function Contact() {
  const [contact, setContact] = useState<TContact | null>(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((resp) => resp.json())
      .then((response) => {
        setContact(response);
      });
  }, []);

  return (
    <>
      <h1>Contact</h1>
      <article>
        {contact ? (
          <div>
            <div key={contact.id}>
              <h2>{contact.name}</h2>
              <p>{contact.email}</p>
              <p>
                Address: {contact.address.street}, {contact.address.city},{" "}
                {contact.address.zipcode}
              </p>
              <p>
                Phone: <a>{contact.phone}</a>
              </p>
            </div>
          </div>
        ) : (
          <p>loading contact data...</p>
        )}
      </article>
    </>
  );
}
