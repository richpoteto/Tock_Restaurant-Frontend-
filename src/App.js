import Header from './components/Header';
import HomePage from './components/HomePage';
import RestaurantPage from './components/RestaurantPage';
import SearchPage from './components/SearchPage';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <HomePage /> */}
      {/* <RestaurantPage /> */}
      <SearchPage />
    </div>
  );
}

export default App;
