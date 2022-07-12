import { Link, useParams } from 'react-router-dom'

export default function Form() {
  const { uuid } = useParams()

  return (
    <div>
      <p>{uuid}</p>
      <Link to="/">Back to Index</Link>
    </div>
  )
}
