import Part from './Part'

const Content = ({course}) => {
    const totalExercises = course.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            {course.map(part => <Part key={part.id} part={part}/>)}
            <strong> total of {totalExercises} exercises </strong>
        </div>
    )
}

export default Content