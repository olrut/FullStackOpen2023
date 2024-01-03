import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {
    return (
        <div>
            <h2>statistics</h2>
            <table>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={good + neutral + bad}/>
                <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
                <StatisticLine text="positive" value={good / (good + neutral + bad) * 100 + ' %'}/>
            </table>
        </div>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text} </td>
            <td> {value}</td>
        </tr>
    )
}

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button text='good' handleClick={() => setGood(good + 1)}/>
            <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
            <Button text='bad' handleClick={() => setBad(bad + 1)}/>
            {good + neutral + bad === 0 ? <p>No feedback given</p> :
                <div>
                    <Statistics good={good} neutral={neutral} bad={bad}/>
                </div>
            }
        </div>
    )
}

export default App