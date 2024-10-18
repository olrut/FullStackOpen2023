import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

const FAVORITEBOOKS = gql`
  query {
    booksByFavoriteGenre {
      title
      author {
        name
      }
      published
    }
    favoriteGenre
  }
`;

const FavoriteGenre = ({ show, setError }) => {
  const client = useApolloClient();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErrorState] = useState(null);

  useEffect(() => {
    if (show) {
      setLoading(true);
      client
        .query({ query: FAVORITEBOOKS })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setErrorState(err);
          setLoading(false);
        });
    }
  }, [show, client]);

  if (!show) {
    return null;
  }

  if (error) {
    setError(error);
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>No favorite genre</div>;
  }

  if (data) {
    return (
      <>
        <h1>recommendations</h1>
        <p>
          books in your favorite genre <strong>{data.favoriteGenre}</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.booksByFavoriteGenre
              ? data.booksByFavoriteGenre.map((a) => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </>
    );
  }
};
export default FavoriteGenre;
