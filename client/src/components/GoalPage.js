import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import CreateGoal from "./CreateGoal";
import GoalItem from './GoalItem';

function GoalPage( { list }) {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const authToken = cookie.authToken;

    const params = useParams();

    const [goals, setGoals] = useState(null);

    async function getData () {
        try {
          const response = await fetch(`http://localhost:5050/goals/${params.id}`, {
            credentials: 'include'
          });
          const json = await response.json();

          setGoals(json);
        } catch (error){
          console.log(error);
        }
    }

    useEffect(() => {
        if(authToken) {
        getData()
        }
    }, [])
  

    return (
      <>
        <CreateGoal getData={getData} listID={params.id} />
        <div className="lists">
          {!goals 
          ? <p>Loading...</p>
          : ( goals.length === 0
              ? <p>Add a goal to get started!</p>
              : goals?.map((goal) => <GoalItem key={goal.id} getData={getData} goal={goal}/>)
            )
          }
        </div>
      </>
    );
  };
  
  export default GoalPage;