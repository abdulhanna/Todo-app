import React, { useEffect, useState } from 'react';
import './Todo.css';
// import tod from '../images/note.png';


// To get data from localStorage
  
const getLocalItems = () =>{
    let list = localStorage.getItem('list');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return[];
    }
}

const TodoUpdate = () => {
    const [inputData,setInputData] = useState();
    const[items,setItems] = useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [isEdit,setIsEdit] = useState(null);
    const addItem = () =>{
        if(!inputData)
        {
          alert('plz fil data');
        }
       else if(inputData && !toggleSubmit){
           setItems(
               items.map((elem)=>{
                   if(elem.id === isEdit){
                       return{...elem,name:inputData}

                   }
                  return elem;
               })
           )
           setToggleSubmit(true);
           setInputData('');
           setIsEdit(null);

       }
        else{
           const allInputData = {id:new Date().getTime().toString(),name:inputData} 
            setItems([...items,allInputData]);
            setInputData('');

        }
       

    }

    const submit = () =>{
        if(!inputData)
        {
          alert('plz fil data');
        }
       else if(inputData && !toggleSubmit){
           setItems(
               items.map((elem)=>{
                   if(elem.id === isEdit){
                       return{...elem,name:inputData}

                   }
                  return elem;
               })
           )
           setToggleSubmit(true);
           setInputData('');
           setIsEdit(null);

       }
        else{
           const allInputData = {id:new Date().getTime().toString(),name:inputData} 
            setItems([...items,allInputData]);
            setInputData('');

        }
    }
    const deleteItem=(index)=>{
        // console.log(id);
        const updatedItem =items.filter((elem)=>{
            return index!==elem.id;
        })
        setItems(updatedItem);
    }

    // to delete all item
    const removeall=()=>{
        setItems([]);

    }
    //  add data to localstorage
    useEffect(()=>{
     localStorage.setItem('list',JSON.stringify(items))
    },[items])

    const EditItem = (id) =>{
        
        let newEditItem = items.find((elem) =>{
            return id === elem.id;
        })
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEdit(id);


    }

   
    return (
        <>
            <div className="main_div">
                <div className="child_div">
                <form onSubmit={submit}>
                    <figure>
                        <img src={"../images/note.png"}  alt="img" />
                        <figcaption>Add your item</figcaption>
                    </figure>
                    <div className="add_item">
                        <input type="text" placeholder="✍ Add items..." 
                            value={inputData}
                            onChange={(e)=> setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ?  <i className="fa fa-plus add_btn" title="Add items"  onClick={addItem}></i> :
                            <i className="fa fa-edit add_btn" title="update items"  onClick={addItem}></i>
                        }
                       
                    </div>
                    <div className="showItems">
                    {
                        items.map((elem) =>{
                            return(
                                <div className="eachItem" key={elem.id}>
                         <h3>{elem.name}</h3>
                         <div className="todo-btn">
                         <i className="fas fa-edit add_btn" title="Edit item" onClick={()=>EditItem(elem.id)}></i>
                         <i className="fas fa-trash-alt add_btn" title="Delete item" onClick={()=>deleteItem(elem.id)}></i>
                         </div>
                        </div>)
                        
                        })
                    }
                        
                    </div>
                    <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeall}><span>check list</span> </button>

                    </div>

                    </form>
                </div>
            </div>

        </>
    )
}
export default TodoUpdate;