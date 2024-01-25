import {useNotificationDispatch} from "./NotificationContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.js";

const AnecdoteForm = () => {
   const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: (createAnecdote),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            dispatch({type: 'SET_NOTIFICATION',  notification: `Anecdote '${variables}' created`, timeout: 3})
        },
        onError: (error) => {
            dispatch({type: 'SET_NOTIFICATION', notification: error.message, timeout: 3})
        }
    })

    const handleNewAnecdote = (event) => {
        event.preventDefault()
        newAnecdoteMutation.mutate(event.target.anecdote.value)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleNewAnecdote}>
                <input name='anecdote'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
