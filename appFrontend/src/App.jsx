import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import '@fontsource/nunito'
import Selection from './components/selectionPage'
import Scoreboard from './components/scorePage'
import {io} from 'socket.io-client';
const api = import.meta.env.backendURL
const socket = io(api)
function App() {
  const [visibility , setVisibility] = useState(false)
  const [page,setPage] = useState("home")
  const [user, setUser] = useState('')
  const [vote,setVote] = useState()
  const [placeholder, updatePlaceholder] = useState("Enter your name")
  const [userID,updateUserId] = useState()
  const [boyCountPercentage , updateCount] = useState()
  const [countBoys,updateboyCountPercentage] = useState(0)
  const [countGirls,updateGirlCount] = useState(0) 
  const castVote = (gender) => {
    setVote(gender)
    console.log("gender selected",gender)
  }
  useEffect(()=>setVisibility(true) , [])
  const sendToDB = async(e) =>{
    e.preventDefault()
      const res = await fetch(`${api}/user`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      user: user
    })
  })
  const data = await res.json()
  if(res.ok){
    console.log(user)
    console.log("user has been appended to db successfully", data)
    setUser("")
    setPage("selection")
    updateUserId(data.userID)
    console.log("this is user ID",userID)
  }
  else{
    console.log(data)
    updatePlaceholder(data.message)
  }
    
  }
const submitVote = async() =>{
  console.log(userID)
  console.log("Vote has been submitted for ",vote)
  const res = await fetch(`${api}/vote`,{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userID: userID,
      vote: vote
    })
  })
  const data = await res.json()
  if(res.ok){
    socket.emit("vote")
    socket.on("updatedCount",(data)=>{
      updateCount(data.boysCountPercentage)
      console.log("this is boys count : ",data.boysCount)
      updateboyCountPercentage(data.boysCount)
      updateGirlCount(data.girlsCount)
    })
    console.log("successfully voted in db")
    setPage("score")
  }
  else{
    console.log(data)
  }

}
  return (
    <>
  
   

     
    { page === "home" &&
     <div className={` relative  min-h-screen overflow-hidden `}>
      <div className='bg-[#FF6DB6] w-1/2 border-none fixed  top-0 right-0 inset-y-0 '>

      </div>
      
     
      <div className='bg-[#7CB7FF] border-none w-1/2 fixed top-0 left-0 inset-y-0'></div>
      <div className={`flex flex-col items-center  justify-center min-w-screen min-h-screen z-10  relative transition-all duration-1000 ease-out ${visibility ? "opacity-100 translate-y-0" : "opacity-40 translate-y-[-48px]"} `}>
            <h3 className='text-center text-2xl
            font-semibold
            tracking-tight
            text-gray-900'>Who will it be ? any guesses </h3>
          <div className='items-center w-1/2 '><div className='flex justify-between font-semibold text-xl  tracking-tight' ><span>Boy</span><span>Girl</span></div> <div className='h-2 rounded-2xl overflow-hidden flex border-1 border-black'><div id="boy" className='bg-blue-600 h-full w-1/2'></div><div className='bg-pink-600 h-full w-1/2'></div></div> </div>
          <span className='relative h-38'></span>

        <div className={`bg-zinc-50/70  backdrop-blur-sm h-auto w-[90%] max-w-sm  
          border-none rounded-3xl p-4 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/30
          transition-all duration-1000 ease-out ${visibility ? "opacity-100 translate-y-0" : "opacity-40 translate-y-16"}
          `}>
          <h3 className='text-center text-2xl
            font-semibold
            tracking-tight
            text-gray-900'>What's your full name ?</h3>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Who will be the winner ?
            </p>
            <form className='space-y-4' onSubmit={sendToDB}>
          <div className='w-full flex justify-center '><input className='w-full resize-none rounded-md bg-gradient-to-r from-blue-200 to-pink-200 p-4 outline-none' placeholder={placeholder}  onChange={(e)=>{setUser(e.target.value);}} value = {user} ></input></div>
          <div className='w-full flex justify-center' ><button type='submit' className='w-full backdrop-blur-xl bg-gradient-to-l from-blue-500/60 to-pink-500/60 p-4 rounded-lg font-bold hover:cursor-pointer hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md'>Proceed</button></div>
          </form>
     
        </div>
      </div>
      </div>
}
{
  page === "selection" &&
  <>
  <Selection castVote={castVote}/>
  {
    vote !== undefined && 
    <button className='fixed rounded-4xl bg-gray-300 font-semibold bottom-1/4 z-50 left-1/2 -translate-x-1/2 p-4' onClick={submitVote}>Confirm your choice </button>
  }
  </>
}
{
  page === 'score' && 
  <div className='relative h-screen w-screen overflow-hidden'>

  <Scoreboard size={boyCountPercentage} boysCount={countBoys} girlsCount={countGirls}/>

  </div>
}

    
    </>
  )
}

export default App
