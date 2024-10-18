import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import Notify from "./components/Notify";
import SetBirthYear from "./components/SetBirthYear.jsx";
import FavoriteGenre from "./components/FavoriteGenre.jsx";

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [error, setError] = useState("");
  const client = useApolloClient();

  const authorsResponse = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  if (authorsResponse.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <Notify error={error} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Authors
        show={page === "authors"}
        authors={authorsResponse.data ? authorsResponse.data.allAuthors : []}
      />
      {token ? (
        <SetBirthYear
          show={page === "authors"}
          authors={authorsResponse.data ? authorsResponse.data.allAuthors : []}
          setError={setError}
        />
      ) : null}
      <Books show={page === "books"} />
      {token ? <NewBook setError={setError} show={page === "add"} /> : null}
      <Login
        show={page === "login"}
        setError={setError}
        setToken={setToken}
        setPage={setPage}
      />
      <FavoriteGenre show={page === "recommend"} setError={setError} />
    </div>
  );
};

export default App;
