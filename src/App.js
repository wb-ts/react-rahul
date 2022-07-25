import React, { useMemo, useState } from 'react';
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

              let user_events = events.filter((event) => event.user_id === user.id);
              user_events.map((each_user_event) => {
                _users[index].revenue += each_user_event.revenue;
                if (each_user_event.type === 'conversion') _users[index].conversion++;
                if (each_user_event.type === 'impression') _users[index].impression++;
              });
            });

            setUsers(_users);
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        console.log(error);
      });


  }, []);

  const sort = (event) => {
    let _users = JSON.parse(JSON.stringify(users)) , sortValue = event.target.value ;
    console.log(event.target.value);
    let sortedUsers = _users.sort((a, b) => {
      if(sortValue === 'name' ){
        if(b.name <= a.name) return 1;
        else return -1;
      }
      else if (sortValue === 'impression') {
        return b.impression - a.impression;
      }
      else if (sortValue === 'conversion'){
        return b.conversion - a.conversion;
      }
      else if (sortValue === 'revenue') {
        return b.revenue - a.revenue;
      }
    });
    setUsers(sortedUsers);
  }

  return (
    <div className="App bg-gray-400">
      <div className="flex justify-center">
        <div className=" absolute top-2 right-2 mb-3 w-32">
          <select className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            onChange={sort}
          >
            <option defaultChecked>Sort By</option>
            <option value="name">Name</option>
            <option value="impression">Impression</option>
            <option value="conversion">Conversion</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
      </div>
      <div className='container mx-auto w-[960px] py-5'>
        <div className="grid grid-cols-3 gap-5 place-items-center">
          {
            users && users.map((user) => {
              return <Card key={user.id} user={user} />
            })
          }
        </div>
      </div>

    </div>
  );
}

export default App;
