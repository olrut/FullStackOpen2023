import {useDispatch, useSelector} from 'react-redux'
import {voteAnecdote} from "../reducers/anecdoteReducer";
import {newNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(a => a.content.includes(state.filter))
    })

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(newNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {anecdotes && anecdotes.slice()
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() =>
                                vote(anecdote)}>vote
                            </button>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default AnecdoteList