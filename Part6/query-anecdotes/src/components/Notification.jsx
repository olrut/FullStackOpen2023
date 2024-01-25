import { useNotificationValue } from './NotificationContext.jsx'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={style}>
            {useNotificationValue()}
        </div>
    )
}

export default Notification
