import { useState, useEffect } from 'react'
import { Header, Footer } from './components/index.js';
import './App.css'
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authslice.js';
import authservice from './appwrite/auth.js';
import { Outlet } from "react-router-dom";

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
    <Header />
      <main>
        <Outlet />
      </main>
    <Footer />
  </div>);
}


export default App
