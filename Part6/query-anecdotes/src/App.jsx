import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAnecdotes, updateAnecdote} from "./requests.js";
import {useNotificationDispatch} from "./components/NotificationContext.jsx";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const App = () => {
    const queryClient = useQueryClient()
    const dispatch = useNotificationDispatch()

    const updateAnecdoteMutation = useMutation({
        mutationFn: (updateAnecdote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
    })
    
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: () => getAnecdotes(),
        retry: 1,
    })

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }
    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const anecdotes = result.data

    const handleVote = (anecdote) => {
        dispatch({type: 'SET_NOTIFICATION', notification: `you voted '${anecdote.content}'`, timeout: 3})
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1
        })
    }

    return (
        <div>
            <h3>Anecdote app</h3>
            <Notification/>
            <AnecdoteForm/>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App