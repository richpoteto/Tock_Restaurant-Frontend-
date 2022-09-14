import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, HeaderSimple } from './components/Header';
import { auth } from './firebase/firebaseAuth';
import { checkAddNewUserToFS } from './firebase/firestore';
import './styles/App.css';

function App({ simpleHeader, headerBoxShadow }) {
  // Passing current user object(logged-in or not) with useOutletContext() and context.
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (!user) {
        // Set user to state if not null, where Outlet can pass it down as context.
        setUser(currentUser);
        // console.log("setUser ran once");
      } else {
        // Checking whether currentUser is inside db, adding data if not.
        await checkAddNewUserToFS(currentUser);
        // console.log("addNewUserToFS ran once");
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
      { simpleHeader ? 
        <HeaderSimple /> 
        : 
        <Header user={user} headerBoxShadow={headerBoxShadow} />
      }
      <Outlet context={user} />
    </div>
  );
}

export default App;
