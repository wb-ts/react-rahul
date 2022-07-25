import React, { useEffect, useMemo, useState } from 'react';
import Card from './components/Card';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);

  useMemo(() => {
    // Get Users Infomation 
    fetch('config/users-info.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(_users => {
        // Get Event Infomation about the traffic
        fetch('config/events-info.json', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then(res => res.json())
          .then(events => {
            
            _users.map((user, index) => {

              _users[index].revenue = _users[index].conversion = _users[index].impression = 0;

              let user_events = events.filter((event) => event.user_id == user.id);
              user_events.map((each_user_event) => {
                _users[index].revenue += each_user_event.revenue;
                if(each_user_event.type == 'conversion') _users[index].conversion ++ ;
                if(each_user_event.type == 'impression') _users[index].impression ++ ;
              })
            });

            setUsers(_users);

            console.log(_users);
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      });
    

  }, []);

  return (
    <div className="App bg-gray-400">
      <div className='container mx-auto w-[960px] pt-5'>
        <div className="grid grid-cols-3 gap-5 place-items-center">
          {
            users.map((user) => {
              return <Card key={user.id} user={user} />
            })
          }
        </div>
      </div>

    </div>
  );
}

export default App;
