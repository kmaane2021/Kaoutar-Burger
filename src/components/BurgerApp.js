
import React, { useState, useEffect } from "react";
import "./burgerapp.css";
import firebase from "../firebase";

function BurgerApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [idOfUpdate, setIdOfUpdate] = useState(null);
  const [truth, setTruth] = useState();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

 useEffect(() => {
  populate();
  }, []);

  useEffect(() => {
    let id = idOfUpdate;
    if (id !== null) {
      markCompleteGlobal();
    }
  }, [truth]);

 ///////////////////////////////////////

  const AddTask = () => {
    const datas = {
      id: firebase
        .firestore()
        .collection("burgers")
        .doc().id,
    };


    const db = firebase.firestore();
    db.collection("burgers")
      .doc(datas.id)
      .set({ task: task, completed: false, id: datas.id,value: task })
      .then(() => {
        populate();
      })
  };

  const populate = (data) => {
    setTaskList([]);
    return firebase
      .firestore()
      .collection("burgers")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let newData = doc.data();

          if (tasklist.indexOf(newData.id) === -1) {
            setTaskList((arr) => {
              return [...arr, newData];
            });
          } 
        });
      })
  };

///////////////////////////////////////////////////////////
const taskCompleted = (e,id) => {
  e.preventDefault();

  debugger
setIdOfUpdate(id);
  setTaskList(
    tasklist.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;

        setTimeout(function() {
          setTruth(task.completed);
        }, 1000);
      }
      return task;
    }))
  
};



 

  const markCompleteGlobal = () => {
  let id = idOfUpdate;
  const itemtoupdate = firebase
    .firestore()
    .collection("burgers")
    .doc(id)

  itemtoupdate.update({
  completed: truth,
  })

  setIdOfUpdate(null);
  setTruth(null);
};

///////////////////////////////////////////////////////////

const deletetask = (e,id) => {
  e.preventDefault();
  const db = firebase.firestore();
  db.collection("burgers")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!", id);
    })
    .catch((error) => {
      console.error(id, "Error removing document: ", error);
    })
    .then((res) => setTaskList([...tasklist.filter((task) => task.id !== id)]));
  console.log(id, "here is an id", id);
};

///////////////////////////////////////////////////////////

 
return (
  <div className="todo">
    <h1>Burgers Made</h1>
    New Burger  :
    <input type="text" name="text" id="text" onChange={(e) => handleChange(e)}/>
    <button className="add-btn" onClick={AddTask}>Make it</button>
    
    <br />
    <div>{task.value}</div>
    <br />
    
    {tasklist !== [] ? (
      <div>
    
        {tasklist.map((task) => (!task.completed ? <div>{task.value} Burger <button className="completed" onClick={(e) => taskCompleted(e, task.id)}>

Eat it!! </button></div> : null
     
           
     ))}        

     </div>

  
    ) : null}

<h1>Burgers Made</h1>



{tasklist !== [] ? (
      <div>
    
        {tasklist.map((task) => (task.completed ? <div><br></br>{task.value} Burger<button className="delete" onClick={(e) => deletetask(e, task.id)}> Delete it!</button></div> 
        : null
     
           
     ))}        

     </div>

  
    ) : null}
    

    

  </div>
);
}


//
export default BurgerApp;
