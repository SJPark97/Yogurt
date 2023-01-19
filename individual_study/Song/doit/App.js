import React, {useState} from 'react'
import Average from './doit/Average';
import Effect from "./doit/Effect";

function App() {
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <Average/>
      <button
      onClick={() => {
        setVisible(!visible)
      }}>
        {visible?'hide':'show'}
      </button>
      <hr/>
      {visible &&<Effect/>}
    </div>
  )
}

export default App