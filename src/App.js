
import './App.css';
import { UserContextProvider } from './Context/User';
import SignIn from './SignIn';
import HomePage from './HomePage';

function App() {
  
  return (
    <UserContextProvider>
      <div className="app">
        <SignIn />
        <HomePage />
    </div>
    </UserContextProvider>
    
  );
}

export default App;
