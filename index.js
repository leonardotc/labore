import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { filter } from 'ramda'

// _
const columnData = [
  {id: 1, name: 'TO DO'},
  {id: 2, name: 'DOING'},
  {id: 3, name: 'DONE'}
]

const cardData = [
  {id: 1, name: 'Cook', column_id: 1 },
  {id: 2, name: 'Shop', column_id: 1},
  {id: 3, name: 'Fly', column_id: 2 }
]

const Card = ({data}) => {
  return <div className="card">{data.name}</div>
}

const Column = ({ data }) => {
  const filterByCurrentColumnId = filter(card => card.column_id === data.id)
  let currentColumnCards = filterByCurrentColumnId(cardData)
  return (
    <div className='column'>
      <div className="column-header">{data.name}</div>
      <div className="column-body">
        {currentColumnCards.map(card=> <Card data={card} />)}
      </div>
    </div>
  )
}

const App = () => {
  return <div class="board">
    {columnData.map( columnData => <Column data={columnData} />)}
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'))