import { useParams } from "react-router-dom";

export function Book() {
  // const obj = useOutletContext();
  const { id } = useParams();

  return (
    <>
      <h2>Book{id}</h2>
    </>
  );
}
