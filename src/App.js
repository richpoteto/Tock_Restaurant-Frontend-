import BookPage from './components/BookPage';
import { Header, HeaderSimple } from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RestaurantPage from './components/RestaurantPage';
import SearchPage from './components/SearchPage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <HomePage /> */}
      {/* <RestaurantPage /> */}
      {/* <SearchPage /> */}
      {/* <HeaderSimple greyscale={true}/> */}
      {/* <BookPage /> */}
      <HeaderSimple greyscale={false}/>
      <LoginPage />
    </div>
  );
}

export default App;
