import { useState } from "react";

function GoalItem ( { goal, getData } ) {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(goal.title);

    function editData() {
        setIsEdit(false);

        const goalItem = {
            id: goal.id,
            title: title
        }

        fetch(`http://localhost:5050/goals/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goalItem),
            credentials: 'include'
        }).then((response) => {
            if(response.ok) {
                getData();
            }
        })
    }

    function deleteData() {

        fetch(`http://localhost:5050/goals/delete/${goal.id}`, {
        method: 'DELETE',
        credentials: 'include'
      }).then((response => {
        if(response.ok) {
          getData();
        }
      }))
    }

    function toggleComplete() {
        if(!goal.completed) {
            fetch(`http://localhost:5050/goals/complete/${goal.id}`, {
                method: 'PATCH',
                credentials: 'include'
            }).then((response) => {
                if(response.ok) {
                    getData();
                }
            })
        } else {
            fetch(`http://localhost:5050/goals/uncomplete/${goal.id}`, {
                method: 'PATCH',
                credentials: 'include'
            }).then((response) => {
                if(response.ok) {
                    getData();
                }
            })
        }
    }

    return (
        <div className="list-item">
            {!isEdit && <>
                <input 
                    onChange={toggleComplete}
                    type="checkbox"
                    checked={goal.completed ? 'checked' : ''}
                />
                <p
                    onClick={toggleComplete}
                    className={goal.completed ? 'task-complete' : 'task'}
                >{goal.title}</p>
            </>}
            {isEdit && <input type="text" placeholder={title} value={title} onChange={(e) => setTitle(e.target.value)}/>}

            <div className="button-container">
            {!isEdit && <button onClick={() => setIsEdit(true)}>Edit</button>}
            {isEdit && <button onClick={editData}>Save</button>}
          
            <button className="delete" onClick={deleteData}>Delete</button>
            </div>
        </div>
    )
}

export default GoalItem;