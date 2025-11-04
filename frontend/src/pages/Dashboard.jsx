import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

  const backendURL=import.meta.env.VITE_BACKEND_URL;
  const navigate=useNavigate();
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  
  const handlelogout = async() => {
    const logout=await fetch(`${backendURL}/api/users/logout`,{
      method:"GET",
      credentials:"include"
    });
    const logoutData=await logout.json();
    if(logoutData.success){
      navigate('/login');
    }
  }

  const userdata=async()=>{
    const data=await fetch(`${backendURL}/api/users/profile`,{
      method:"GET",
      credentials:"include"
    });
    const user=await data.json();
    if(!user.success){
      navigate('/login');
    }
    setFirstname(user.user.firstname);
    setLastname(user.user.lastname);
    setEmail(user.user.email);
    setUsername(user.user.username);
  }

  useEffect(()=>{
    userdata();
  },[])

  return (
    <div className='min-h-screen w-full bg-zinc-800 text-zinc-100 flex items-center justify-center px-14'>
      <div className='bg-zinc-900 p-8 rounded-lg shadow-lg'>
        <div className='flex justify-center gap-8'>
          <div className='flex justify-center gap-2'>
          <h1 className='text-3xl font-bold mb-4'>{firstname} {lastname}</h1>
          <span className='ml-2 text-sm text-green-500 mt-2'>(Online)</span>
        </div>
        <p className='text-sm text-sky-400'>{username}</p>
        </div>
        <p>{email}</p>
        <button className='bg-red-550 px-4 py-2 mt-8 text-sm font-semibold border-2 border-red-50 hover:bg-red-600 cursor-pointer transition-all' onClick={handlelogout}>Logout</button>
        
      </div>
    </div>
  )
}

export default Dashboard