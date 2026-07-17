import { useEffect, useState } from 'react'
import './App.css'
import '@fontsource/nunito'
import '@fontsource/fredoka'
import '@fontsource/lilita-one'
import Selection from './components/selectionPage'
import Scoreboard from './components/scorePage'
import Scorelist from "./components/list"
import Questions from "./components/questiions"
import NamePage from "./components/naming"
import Suggestion from './components/suggestion'
import { useLanguage } from './langManager'

import {io} from 'socket.io-client';

import Loader from './components/loader'
const api = import.meta.env.VITE_API_URL
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
  const [loader, setLoader] =  useState(true)
  const {t,lang,setLang} = useLanguage()
  const [admin,sAdmin] = useState("")
  const updatePage = (x) => setPage(x)
  
  const castVote = (gender) => {
    setVote(gender)
    console.log("gender selected",gender)
  }
const loaderSet = (x) => setLoader(x)
  useEffect(()=>{setVisibility(true) 
    console.log(api)
const checkServer = async () =>{
  try{
    setLoader(true)
      const response = await fetch(`${api}/`,{
    method:"GET"

  })
  if(response.ok){
    setLoader(false);
    console.log("Server is reaching and response is ok")
    }
  }
 catch(err){
  console.log(err)
 }
}
checkServer()
}
, [])

  const sendToDB = async(e) =>{
    if(user.toLowerCase() === "admin"){
      setPage("adminVerification")
    }
    else{
    e.preventDefault()
    setLoader(true)
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
    setLoader(false)
    console.log("Username submitted loader set")
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
  }
  const verifyAdmin = async(e) =>{
    e.preventDefault();
    if(admin.trim().length <= 0){setPage("home"); return}
    const res = await fetch(`${api}/verifyAdmin`,{
      method:"POST",
      headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pass: admin
    })
    })
    const data = await res.json()
    if(res.ok){
      console.log(data)
      setPage("scorelist")
    }
    else{
      sAdmin("")
      setUser("")
      setPage("home")
    }
  }
const submitVote = async() =>{
  setLoader(true)
  console.log("Vote submittion loader set")
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
    setLoader(false)
  console.log("successfully voted in db")
     setPage("naming")
   
  }
  else{
    console.log(data)
  }

}
const updateVote  = () =>{
   socket.emit("vote")
    socket.on("updatedCount",(data)=>{
      updateCount(data.boysCountPercentage)
      console.log("this is boys count : ",data.boysCount)
      updateboyCountPercentage(data.boysCount)
      updateGirlCount(data.girlsCount)
    })
    
}
  return (
    <>
    
   {
    !loader && (page !== "adminVerification" && page !== "scorelist") && <button className='fixed top-2 right-4 z-50 rounded-3xl px-4 border-white/30 border-2 space-x-4 p-1 font-bold flex flex-row' onClick={()=>setLang(lang === "mr" ? "en" : "mr" )}><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="M7.75 2.75a.75.75 0 0 0-1.5 0v1.258a32.987 32.987 0 0 0-3.599.278.75.75 0 1 0 .198 1.487A31.545 31.545 0 0 1 8.7 5.545 19.381 19.381 0 0 1 7 9.56a19.418 19.418 0 0 1-1.002-2.05.75.75 0 0 0-1.384.577 20.935 20.935 0 0 0 1.492 2.91 19.613 19.613 0 0 1-3.828 4.154.75.75 0 1 0 .945 1.164A21.116 21.116 0 0 0 7 12.331c.095.132.192.262.29.391a.75.75 0 0 0 1.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 0 0 2.333-5.332c.31.031.618.068.924.108a.75.75 0 0 0 .198-1.487 32.832 32.832 0 0 0-3.599-.278V2.75Z" />
  <path fill-rule="evenodd" d="M13 8a.75.75 0 0 1 .671.415l4.25 8.5a.75.75 0 1 1-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 1 1-1.342-.67l4.25-8.5A.75.75 0 0 1 13 8Zm2.037 6.5L13 10.427 10.964 14.5h4.073Z" clip-rule="evenodd" />
</svg></div>
 <div>{lang === "mr" ? "English" : "मराठी"}</div> </button>
   }
    {
      loader && <Loader />
    }
    {
      page === "scorelist" && <Scorelist api={api} />
    }
    {!loader &&
      page === "adminVerification" && 
        <div className={`
     bg-gradient-to-l from-gray-800 via slate-300 to-stone-500 w-screen h-screen overflow-hidden flex flex-col justify-center items-center `}>
            <div className="bg-white/20 backdrop-blur-md backdrop-brightness-125 backdrop-saturation-125 lg:w-1/3 md:w-[65%] w-[95%] pb-8 h-auto p-4 rounded-xl space-y-8 flex flex-col justify-center">
            <h3 className="relative font-semibold text-lg md:text-xl text-center">Enter admin password </h3>
            
          <form  className='space-y-8' onSubmit={(e)=>verifyAdmin(e)}>
            <input type="text" className="flex w-full justify-center rounded-xl bg-white/30 backdrop-blur-sm backdrop-brightness-50 p-2 border-1 border-white focus:outline-none font-bold text-lg text-center" value={admin} onChange={(e)=>sAdmin(e.target.value)} /> 
            <button  type="submit" className={`bg-yellow-400 flex w-full justify-center shadow-xl text-lg text-black font-bold rounded-2xl p-4`}>Submit</button>
          </form>
            </div>
        
        </div>
}
     
    {!loader && page === "home" &&
     <div className={` relative  min-h-screen overflow-hidden `}>
      <div className='bg-[#FF6DB6] w-1/2 border-none fixed  top-0 right-0 inset-y-0 '>

      </div>
      
     
      <div className='bg-[#7CB7FF] border-none w-1/2 fixed top-0 left-0 inset-y-0'></div>
      <div className={`flex flex-col items-center  justify-center min-w-screen min-h-screen z-10  relative transition-all duration-1000 ease-out ${visibility ? "opacity-100 translate-y-0" : "opacity-40 translate-y-[-48px]"} `}>
            <h3 className='text-center text-2xl
            font-semibold
            tracking-tight
            text-gray-900'>{t("Who will it be ? any guesses")} </h3>
          <div className='items-center w-1/2 '><div className='flex justify-between font-semibold text-xl  tracking-tight' ><span>{t("Boy")}</span><span>{t("Girl")}</span></div> <div className='h-2 rounded-2xl overflow-hidden flex border-1 border-black'><div id="boy" className='bg-blue-600 h-full w-1/2'></div><div className='bg-pink-600 h-full w-1/2'></div></div> </div>
          <span className='relative h-38'></span>

        <div className={`bg-zinc-50/70  backdrop-blur-sm h-auto w-[90%] max-w-sm  
          border-none rounded-3xl p-4 space-y-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/30
          transition-all duration-1000 ease-out ${visibility ? "opacity-100 translate-y-0" : "opacity-40 translate-y-16"}
          `}>
          <h3 className='text-center text-2xl
            font-semibold
            tracking-tight
            text-gray-900'>{t("What's your full name ?")}</h3>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {t("Who will be the winner ?")}
            </p>
            <form className='space-y-4' onSubmit={(e)=>user.trim().length > 0 ? sendToDB(e) : updatePlaceholder("Cannot be empty") && setTimeout(()=>updatePlaceholder("Enter your name here"),[6000])}>
          <div className='w-full flex justify-center '><input className='w-full resize-none rounded-md bg-gradient-to-r from-blue-200 to-pink-200 p-4 outline-none' placeholder={t(placeholder)}  onChange={(e)=>{setUser(e.target.value);}} value = {user} ></input></div>
          <div className='w-full flex justify-center' ><button type='submit' className='w-full backdrop-blur-xl bg-gradient-to-l from-blue-500/60 to-pink-500/60 p-4 rounded-lg font-bold hover:cursor-pointer hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md'>{t("Proceed")}</button></div>
          </form>
     
        </div>
      </div>
      </div>
}
{
 !loader &&  page === "selection" &&
  <>
  <Selection castVote={castVote}/>
  {
    vote !== undefined && 
    <button className='fixed rounded-4xl bg-gray-300 font-semibold bottom-1/4 z-40 left-1/2 -translate-x-1/2 p-4' onClick={submitVote}>{t("Confirm your choice ")}</button>
  }
  </>
}
{!loader && 
  page === 'questions' && 
  <Questions userID={userID} api={api} pageUpdate={updatePage} loader={loaderSet}/>
}
{!loader && 
  page === 'suggestion' && 
  <Suggestion api={api} userID={userID} updateVotes={updateVote} pageUpdate={updatePage} loader={loaderSet} />
}
{!loader && 
  page === 'naming' &&
  <NamePage gender={vote} api={api} userID={userID} pageUpdate={updatePage} loader={loaderSet} />
}
{!loader && 
  page === 'score' && 
  <div className='relative h-screen w-screen overflow-hidden'>
  <Scoreboard size={boyCountPercentage} boysCount={countBoys} girlsCount={countGirls}/>

  </div>
}

  
    </>
  )
}

export default App