import { Button } from '@mui/material';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1><code>PROVIGOS</code></h1>
        Your personal data aggregator.
        <p>
          Better life through information!
        </p>
        <p>
          Soon!
        </p>
        <Button
        onClick={()=> {
          navigate('/login');
        }}>
          Login
        </Button>
        <Button
        onClick={()=> {
          navigate('/register');
        }}>
          Register
        </Button>
      </header>
    </div>
  );
}

export default App;
