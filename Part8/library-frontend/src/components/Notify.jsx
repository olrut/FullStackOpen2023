const Notify = ({ error }) => {
  return (
    <div>
      {error === null ? null : <div style={{ color: "red" }}>{error}</div>}
      <br />
    </div>
  );
};

export default Notify;
