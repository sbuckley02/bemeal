import './App.css';
import Post from './components/Post';

// The primary component for the entire application
// This will contain the other components that you use
// in your application, such as Home
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Post />
        <Post />
        <Post />
      </header>
    </div>
  );
}

export default App;
