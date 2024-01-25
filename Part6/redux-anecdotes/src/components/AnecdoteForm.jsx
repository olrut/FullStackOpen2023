import {createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import {newNotification} from "../reducers/notificationReducer.js";

const anecdoteForm = () => {
    const dispatch = useDispatch()
    const newAnecdote = async (e) => {
        e.preventDefault()
        dispatch(newNotification(`you created '${e.target.anecdote.value}'`, 5))
        dispatch(createAnecdote(e.target.anecdote.value))
        e.target.anecdote.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name = "anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default anecdoteForm