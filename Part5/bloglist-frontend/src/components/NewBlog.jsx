const NewBlog = ({ createBlog }) => {

  return (
    <div>
      <form onSubmit={createBlog}>
            title:
        <input
          type="text"
          name="title"
          placeholder="title"
          id="title"
        />
            author:
        <input
          type="text"
          name="author"
          placeholder="author"
          id="author"
        />
            url:
        <input
          type="text"
          name="url"
          placeholder="url"
          id="url"
        />
        <button id = "create-blog-submit" type="submit">create</button>
      </form>
    </div>
  )
}
export default NewBlog


