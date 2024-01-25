import {useNotificationDispatch} from "./NotificationContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.js";

const AnecdoteForm = () => {
   const dispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: (createAnecdote),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
    })

    const handleNewAnecdote = (event) => {
        event.preventDefault()
        dispatch({type: 'SET_NOTIFICATION', notification: `you created '${event.target.anecdote.value}'`, timeout: 3})
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
