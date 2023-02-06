import './App.css';
import Home from './components/Home';

// The primary component for the entire application
// This will contain the other components that you use
// in your application, such as Home
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
