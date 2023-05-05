import { useEffect, useState } from "react";

function Useeffect(){
    const[num,setnum]=useState(1) 
    const[name,setname]=useState("rani")
    useEffect(()=>{
        console.log("hello useeffect and durgesh")
    },[name])
    
      let increment = ()=>{
        setnum(num+1)
    }
    let decrement = ()=>{
        setnum(num-1)
    }
    let gender=()=>{
        setname("raja")
    }
    return(
        <>
            <h5>Number :{num} {name}</h5>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={gender}>Gender</button>
        </>
    )
}
export default Useeffect