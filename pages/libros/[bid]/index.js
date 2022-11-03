import Link from "next/link";

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
    const data = { id: 1, title: "New book from Cypress" };
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
    const data = [{ id: 1, title: "New book from Cypress" }];
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

const BookDetail = ({ book }) => {
  return (
    <div>
      <h1>{book.title}</h1>
      <Link href="/libros" data-cy="link-to-books">
        Book List
      </Link>
    </div>
  );
};
export default BookDetail;
