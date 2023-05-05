import { useState } from "react"

function Check(){
    const[Data,SetData]=useState("red")
    const[count,setcount]=useState(0)
    function Change(){
        SetData("blue")
    }
    function updatanum(){
        setcount(count+1)
    }
    return(
        <>
        <h1 className="heading">This color is {Data}</h1>
        <button onClick={Change}>change color</button>
        <p>THis number is{count}</p>
        <button onClick={updatanum()}>num change</button>
       
        </>
    )
}
export default Check