import { Outlet } from 'react-router-dom';
import { Header, HeaderSimple } from './components/Header';
import './styles/App.css';

function App({ simpleHeader }) {
  return (
    <div className="App">
      {simpleHeader ? <HeaderSimple /> : <Header />}
      <Outlet />
    </div>
  );
}

export default App;
