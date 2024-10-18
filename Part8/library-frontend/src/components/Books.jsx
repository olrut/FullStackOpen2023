import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

const BOOKS_BY_GENRE = gql`
  query BooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  const booksResponse = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    pollInterval: 2000,
  });

  const genresResponse = useQuery(ALL_GENRES, {
    pollInterval: 2000,
  });

  if (genresResponse.loading || booksResponse.loading) {
    return <div>loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResponse.data.booksByGenre
            ? booksResponse.data.booksByGenre.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {genresResponse.data.allGenres
        ? genresResponse.data.allGenres.map((a) => (
            <button key={a} onClick={() => setGenre(a)}>
              {a}
            </button>
          ))
        : null}
    </div>
  );
};

export default Books;
