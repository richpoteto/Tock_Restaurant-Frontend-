import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, HeaderSimple } from './components/Header';
import { auth } from './firebase/firebaseAuth';
import './styles/App.css';

function App({ simpleHeader }) {
  // Passing current user object(logged-in or not) with useOutletContext() and context.
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!user) {
        setUser(currentUser);
        console.log("setUser ran once");
      }
      // setUser(currentUser);
      // console.log("setUser ran once");
    })
  }, []);


  return (
    <div className="App">
      {simpleHeader ? <HeaderSimple /> : <Header user={user} />}
      <Outlet context={[user, setUser]} />
    </div>
  );
}

export default App;
