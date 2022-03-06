import logo from './logo.svg';
import './App.css';
import Items from './components/Items';
import Artists from './components/Artists';
import CreateArtistForm from './components/CreateArtistForm';

function App() {
  return (
    <div className="App">
      <Items />
      <Artists />
      <CreateArtistForm />
    </div>
  );
}

export default App;
