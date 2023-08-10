import './App.css';
import Users from './components/Users/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Users />
      <ToastContainer />
    </div>
  );
}

export default App;
