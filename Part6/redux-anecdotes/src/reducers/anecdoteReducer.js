import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from "../../services/anecdoteService.js";

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload.id
            const anecdoteToVote = state.find(a => a.id === id)
            const votedAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            }
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : votedAnecdote
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})


export const {vote, setAnecdotes, appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newNote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newNote))
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update(anecdote)
        dispatch(vote(updatedAnecdote))
    }
}



export default anecdoteSlice.reducer