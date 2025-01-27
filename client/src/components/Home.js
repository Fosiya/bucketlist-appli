import { useEffect, useState } from "react";
import GoalList from './GoalList';
import Auth from './Auth';
import CreateList from './CreateList';
import { useCookies } from 'react-cookie';


function Home({ list, getData }) {
    const [cookie, setCookie, removeCookie] = useCookies(null);
    const authToken = cookie.authToken;

    const [lists, setLists] = useState(null);

    async function getData () {
        try {
            const response = await fetch(`http://localhost:5050/list/`, {
                credentials: 'include'
            });
            const json = await response.json();

            setLists(json);
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(authToken) {
        getData()
        }
    }, [authToken])

    return (
        <>
            {!authToken && <Auth />}
            {authToken && 
                <>
                <CreateList getData={getData}/>
                <div className="lists">
                    {!lists 
                    ? <p>Loading...</p>
                    : ( lists.length === 0
                        ? <p>Add a bucketlist to get started!</p>
                        : lists?.map((list) => <GoalList key={list.id} getData={getData} list={list}/>)
                      )
                    }
                </div>
                </>
            }
        </>
    )
}

export default Home;