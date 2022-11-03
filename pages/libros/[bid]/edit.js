import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
    );

    const data = await res.json();
    return {
      props: {
        book: data,
      },
    };
  } catch (e) {
    const data = { id: 1, title: "1" };
    return {
      props: {
        book: data,
      },
    };
  }
}

export async function getStaticPaths({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
    );
    const data = await res.json();
    return {
      paths: data.map((book) => {
        return {
          params: { bid: String(book.id) },
        };
      }),
      fallback: false,
    };
  } catch (e) {
    const data = [{ id: 1, title: "Book Title 1" }];
    return {
      paths: data.map((book) => {
        return {
          params: { bid: String(book.id) },
        };
      }),
      fallback: false,
    };
  }
}

const BookEdit = ({ book }) => {
  const router = useRouter();
  const [bookTitle, setBookTtile] = useState(book.title);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
          _method: "PATCH",
        }),
      }
    );
    if (res.ok) {
      setErrors([]);
      setBookTtile("");
      return router.push("/libros");
    }

    const data = await res.json();
    console.log(data);
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
      <h1>BookEdit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="input-book-title"
          onChange={(e) => setBookTtile(e.target.value)}
          value={String(bookTitle)}
          disabled={submitting}
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {errors?.title && (
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
export default BookEdit;
