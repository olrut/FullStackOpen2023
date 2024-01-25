import {createContext, useReducer, useContext, useEffect} from 'react'

let timeOut = 5000
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            timeOut = action.timeout
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext("")
export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    useEffect(() => {
        if (notification) {
           setTimeout(() => {
                notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
            },  timeOut * 1000);
        }
    }, [notification])

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}