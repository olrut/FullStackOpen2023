import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const SetBirthYear = ({ authors, show, setError }) => {
  const [author, setAuthor] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  if (!show) {
    return null;
  }

  const updateAuthor = async (event) => {
    event.preventDefault();
    await editAuthor({
      variables: { name: author, setBornTo: parseInt(birthYear) },
    });
    setBirthYear("");
  };

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={updateAuthor}>
        <select onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((a) => (
            <option key={a.name}>{a.name}</option>
          ))}
        </select>
        <input
          value={birthYear}
          type="number"
          onChange={({ target }) => setBirthYear(target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
export default SetBirthYear;
