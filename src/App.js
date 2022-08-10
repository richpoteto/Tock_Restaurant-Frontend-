import { Outlet } from 'react-router-dom';
import { Header, HeaderSimple } from './components/Header';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import './styles/App.css';

function App({ simpleHeader }) {
  return (
    <div className="App">
      {simpleHeader ? <HeaderSimple /> : <Header />}
      <Outlet />
      {/* <SearchPage /> */}
      {/* <HeaderSimple greyscale={true}/> */}
      {/* <BookPage /> */}
      {/* <HeaderSimple greyscale={false}/>
      <LoginPage /> */}
    </div>
  );
}

export default App;
