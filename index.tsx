import './index.css'
import React, { FC, useState } from 'react'
import ReactDOM from 'react-dom'
import { filter } from 'ramda'
import { ReactSortable, Sortable } from "react-sortablejs";
import { uniqueId } from 'lodash'

interface Card {
  id: number;
  name: string;
  column_id: number;
}

interface Column {
  id: number;
  name: string;
}

const columns = [
  {id: 1, name: 'TO DO'},
  {id: 2, name: 'DOING'},
  {id: 3, name: 'DONE'}
]

const cards = [
  {id: 1, name: 'Cook', column_id: 1 },
  {id: 2, name: 'Shop', column_id: 1},
  {id: 3, name: 'Fly', column_id: 2 }
]

const Card = ({ data }) => {
  return (
    <div className="card" key={data.id}>{data.name}</div>
  )
}

const Column = ({ data }) => {
  const filterByCurrentColumnId = filter(card => card.column_id === data.id)
  const [state, setState] = useState<Card[]>(filterByCurrentColumnId(cards))

  return (
    <div className='column'>
      <div className="column-header">{data.name}</div>
      <ReactSortable list={state} setList={setState} group="cards" className="column-body">
        {state.map(card=> <Card data={card} key={card.id} />)}
      </ReactSortable>
    </div>
  )
}

const App = () => {
  const [state, setState] = useState<Column[]>(columns)
  return (
      <ReactSortable list={state} setList={setState} group="columns" className="board">
        {state.map(column => <Column data={column} key={column.id} />)}
      </ReactSortable>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))