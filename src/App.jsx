import { useState } from 'react'
import { Chessboard } from './components/Chessboard/Chessboard'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
        <Chessboard/>
    </div>
  )
}

export default App
