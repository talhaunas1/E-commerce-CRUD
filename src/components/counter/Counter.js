import React,{useState} from 'react'

function Counter() {

    const [count, setCount] = useState(0)

    const onIncrement = () => {setCount(count+1)};
    const ondecrement = () => {setCount(count-1)};
    const onReset = () => {setCount(0)};

  return (
    <div>
        
        <button onClick={onIncrement}>+</button>
        {count}
        <button onClick={ondecrement}>-</button>
        <button onClick={onReset} >Reset</button>

    </div>
  )
}

export default Counter