import { useState, useEffect } from 'react'
import { header, footer } from './components';
import './App.css'
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import authservice from './appwrite/auth.js';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.Getcurrentuser().then((userdata) => {
      if (userdata) {
        dispatch({ type: 'SET_USER', payload: userdata });
      }
      else {
        dispatch(logout());
      }
    })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400"> 
    <h1>Welcome to the App</h1> 
    <header />
      <main>
        {/* outlet */}
      </main>
    <footer />
  </div>);
}


export default App
