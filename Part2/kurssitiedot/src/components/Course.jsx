import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content course={course.parts} />
        </div>
    )
}

export default Course