import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const BookCreate = () => {
  const router = useRouter();
  const [bookTitle, setBookTtile] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );
    if (res.ok) {
      setErrors([]);
      setBookTtile("");
      return router.push("/libros");
    }

    const data = await res.json();
    setErrors(data.errors);
    setSubmitting(false);
    return {
      props: {
        book: data,
      },
    };
  }
  return (
    <div>
      <h1>BookCreate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="input-book-title"
          onChange={(e) => setBookTtile(e.target.value)}
          value={bookTitle}
          disabled={submitting}
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
      </form>
      <br />
      <br />
      <Link href="/libros" data-cy="link-to-books">
        Book List
      </Link>
    </div>
  );
};
export default BookCreate;
