import { useEffect, useState } from "react";

//to get data from to localstorage
const getLocalItems = () =>{
    let list = localStorage.getItem('lists');
    //console.log(list);

    if(list){
        return JSON.parse(localStorage.getItem('lists'));
    }
    else{
        return [];
    }
}


function MyTodo() {
    const [text, settext] = useState("")
    const [task, settask] = useState(getLocalItems()) //This is most important array all data is store this array
    const [toggleBtn, settoggleBtn] = useState(true)
    const [EditItem, setEditItem] = useState(null)
    let [Check, setCheck] = useState([])
    
    
    function Handletext(event) {
        settext(event.target.value)
    }

    function Showdata() {
        if (text === "") {
            alert("Please Enter Your Task")
        }
        // this else if handle the update mater
        else if (text && !toggleBtn) {
            settask(
                task.map((elem) => {
                    if (elem.id === EditItem) {
                        return { ...elem, name: text }
                    }
                    return elem;
                })
            )
            settoggleBtn(true);
            settext("")
            setEditItem(null)
        }
        else {
            const alltextdata = { id: new Date().getTime().toString(), name: text }//this line create a unique id and name "this is logic"
            settask([...task, alltextdata])
            //console.log(task)
            settext("")
        }
    }
    
    //delete one item
    function Deleteitem(index) {
        //console.log(index)
        let updateArray = task.filter((elem) => index !== elem.id)
        settask(updateArray)

    }

    //sava one item
    function CompleteHandler(event) {
        let value = event.parentElement.parentElement.parentElement.firstChild.nextElementSibling
        if (value.style.textDecoration !== 'line-through') {
            value.style.textDecoration = 'line-through'

        }
        else {
            value.style.textDecoration = 'none';
        }

    }
    //update task
    function EditHandler(index) {
        let newEditItem = task.find((elem) => {
            return elem.id === index
        })
        //console.log(newEditItem)
        settoggleBtn(false);
        settext(newEditItem.name)
        setEditItem(index)
    }
    //check box workingh
    function CheckBoxHandling(e) {
        let value = e.target.value
        let checkedValue = e.target.checked
        console.log(value, checkedValue)
        if (checkedValue) {
            setCheck([...Check, value]);
        }
        else {
            setCheck(Check.filter((e) => (e !== value)));
           
        }

    }


    function AllDelete() {
        console.log(Check);
        console.log(task)
        let NewData = task.filter(myFun);
        function myFun(e){
            return !Check.includes(e.id);
        }
        console.log(NewData)
        
    
        
        settask(NewData)
        
        

    }
    //set data to tocalstroage
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(task))
    },[task]);


    return (
        <>
            <div className="container bg-light mt-3">
                <div className="row text-center">
                    <div className="col-lg-12">
                        <h2 className="fw-bold">My todo list</h2>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-md-12 input  ">
                        <input type="text" placeholder="Enter Your Task" value={text} onChange={Handletext} className="w-50" />

                        {toggleBtn ? <button className="btn btn-primary ms-5 pt-2 mb-2" onClick={Showdata}>Addition Task</button> :
                            <button className="btn btn-warning text-white ms-5 pt-2 mb-2" onClick={Showdata}>Update Task</button>}
                    </div>
                </div>



                {task.map(function (elem) {

                    return (
                        <>

                            <div className="row ">
                                <div className="col-md-12 ">
                                    <ul className=" bg-info mt-2 text-white w-75 mx-auto" >
                                        <li className=" ">
                                            <input type="checkbox" name="checkbox" className="m-2" value={elem.id} onChange={CheckBoxHandling}></input>
                                            <label className="textbox w-75" id="text">{elem.name}</label>
                                            <span className="allbtn">
                                                <button className="btn btn-danger m-1 text-white delete " onClick={() => Deleteitem(elem.id)}> <i class="fa-solid fa-trash-can"></i></button>
                                                <button className="btn btn-secondary m-1 text-white" onClick={() => EditHandler(elem.id)}> <i class="fa-solid fa-pen-to-square"></i></button>
                                                <button className="btn btn-success m-1 text-white" onClick={(e) => CompleteHandler(e.target)}> <i class="fa-solid fa-circle-check"></i></button>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    );
                })}
                {task.length > 0 && (
                    <div className="row text-center mb-5">
                        <div>
                            
                            <button className="btn btn-danger m-2  w-50" onClick={AllDelete}>All Delete Task</button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
export default MyTodo