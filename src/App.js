import React from 'react'
import './App.css';
import Header from './components/Header/';
import Entry from './components/Entry/';
import file from './Users.json';
import User from './User/';
import Employee from './Employee/';
import Footer from './components/Footer';


var userName = '';
var password = '';

function App() {
  const [cartOpened, SetCartOpened] = React.useState(false);
  const [entryOpened, SetEntryOpened] = React.useState(true);
  const [position, SetPosition] = React.useState('');
  const [userId, SetUserId] = React.useState("");

  const onChangeUserName = (event) => {
    userName = event.target.value;
  }

  const onChangePassword = (event) => {
    password = event.target.value;
  }

  const onClickEntry = () => {
    let tempPosition = '';
    let userId="";
    for (let user of file) {
      if ((user.userName === userName) && (user.password === password)) {
        tempPosition = user.position;
        userId = user.id;
      }
    }
    SetPosition(tempPosition);
    SetUserId(userId);
  }

  return (
    <div className="wrapper clear">
      <Header onClickCart={() => SetCartOpened(true)} onClickEntry={() => SetEntryOpened(true)} />
      {position === 'user' && <User userId={userId} />}
      {entryOpened && position === '' && <Entry
        onClose={() => SetEntryOpened(false)}
        onClickEntry={() => onClickEntry()}
        onChangeUserName={(event) => onChangeUserName(event)}
        onChangePassword={(event) => onChangePassword(event)}
      />}
      {position === 'employee' && <Employee />}
      <Footer />
    </div>
  );
}

export default App;
