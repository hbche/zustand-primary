import './App.css'
import BearsController from './bears/BearsController'
import { BearCounter } from './bears/BearsCounter'
import BearMoving from './bears/BearsMoving'

function App() {

  return (
    <>
      <BearCounter />
      <BearMoving />
      <BearsController />
    </>
  )
}

export default App
