import { useState ,useEffect} from "react"
export default function Question(props){
      const [question, setQuestion] = useState("date")
      const [momsDropDown , setMomsDropdown] = useState(false)
        const [dadsDropDown , setDadsDropdown] = useState(false)
     //   const [momsSelector , setMomsSelector] = useState("Select a quality")
     const[relation, setRelation] = useState("")
     const[date,setDate] = useState({
      Year : 2026,
      Month : 0,
      Day: 0
     })
     const[boxText,setBoxText] = useState("")
     const [calender,setCalender] = useState(false)
      const daysofweek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
       const [dadsList,setDadsList] =  useState([])
        const [dropDownQualities,setDropQualities] = useState([])
        const [momsList,setMomsList] =  useState([])
        const [dadsQualities , setDadsQualities] = useState()
        const [momsQualities , setMomsQualities] = useState()
        const [qualities, setQualitiesList] = useState(["Eyes", "Nose", "Face", "Cuteness", "Smile", "Hair", "Personality", "Mischifness", "Kindness", "Patience", "Sense of humor"])
        
        const calenderValues = 
        {
          September:  {
            Dates: ["","","","","",25,26,27,28,29,30]
          },
          October: {
            Dates: ["","","","",1,2,3,4,5,6,7,8,9,10,11,12,13,14]
          }
          
}
        const updateList = (item) =>{
              setQualitiesList(prev => prev.filter(x=> x !== item))
              console.log(qualities)
            setDropQualities(qualities.filter(x=>x !== item).map(quality=>{
                console.log("attempting to change a quality")
              
          return (
            <li className='hover:scale-105' onClick={()=>{ console.log("Clicked a quality 2"); updateList(quality)}} >{quality}</li>
          )
        }))
        }
        const submitAnswer = async()=>{
          console.log({
    userID: props.userID,
    date: `${date.Year}-${date.Month}-${date.Day}`,
    qualitiesofdad: dadsList,
    qualitiesofmom: momsList,
    relation
});
          console.log("attempted a submit questions")
          const res = await fetch(`${props.api}/addData`,{
            method:"PATCH",
            headers:{
              "Content-Type" : "application/json"
            },
            body:JSON.stringify({
              userID: props.userID,
              date: `${date.Year}-${date.Month}-${date.Day}`,
              qualitiesofdad : dadsList,
              qualitiesofmom: momsList,
              relation : relation
            })

          })
          const data = await res.json()
          if(res.ok){
            console.log(data)
            props.pageUpdate("suggestion")
            console.log(date.Year,date.Month,date.Day)
          }
          else{
            console.log("error")
          }
        }
        const SetBox = () =>{setBoxText("cannot be empty");
          setTimeout(()=>setBoxText(""),3000)
        }
       

    return(
         <div className='   transition scrollbar-hide overflow-hidden select-none font-semibold text-gray-800 flex gradientTL-animate inset-0 w-screen h-screen justify-center items-center'>
    <div className='flex overflow-hidden flex-wrap min-h-[30%] inset-0 justify-center space-y-12   p-4 items-center flex-col md:w-1/2 w-[98%] bg-white/10  rounded-xl backdrop-blur-md backdrop-brightness-125 backdrop-saturation-150'>
    {question === "date" &&
    <div className="h-74 space-y-8">
      <h2 className="text-center">When will the baby arrive ?</h2>
      {/* <input type="date" onChange={(e)=>setDate(e.target.value)} min={"2026-09-28"} max={"2026-10-20"}/> */}
      <div className="flex font-semibold relative text-center transition-all duration-1000 ease-in-out w-64 items-center justify-center">
        <button className="mb-4 w-auto flex whitespace-nowrap " onClick={()=>setCalender(!calender)}><span className="mx-2">Select date  </span> <svg className="shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"> <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" /> <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
              </svg>
        </button>
      
        <div className={`z-40 absolute min-w-max overflow-y-auto  h-50 scrollbar-hide top-[75%] left-1/2 -translate-x-1/2 items-center bg-white/70 rounded-xl p-2 transition-all duration-1000 ease-in-out ${calender ? "opacity-100 translate-y-0 " : "opacity-0 -translate-y-4 pointer-events-none"}`}>
        <span>September</span>
        
        {
        <div className="grid grid-cols-7">    
         {     
          daysofweek.map((day,index)=>{
            return (<button key={index} className="p-2">{day}</button>)
          })
        } 
          {     
          calenderValues.September.Dates.map(day=>{
       
            return( <button key={day} onClick={()=>{setDate(prev =>({...prev,Month: 9,Day:day})); setCalender(!calender)}}  className={`p-2 h-10 w-10 focus:outline-4 outline-rose-400 ${day === "" ? "pointer-events-none" : "hover:cursor-pointer"} rounded-full`}>{day}</button>)
          })
}
        </div>
}
<hr className="w-full border-1 border-gray-600/20 my-4 h-px" />
 <span>October</span>
        {
        <div className="grid grid-cols-7 ">     
        
          {     
          daysofweek.map(day=>{
            return (<button key={day} className="p-2">{day}</button>)
          })
        }
        {
          calenderValues.October.Dates.map(day=>{
       
            return(<button key={day} onClick={()=>{setDate(prev =>({...prev,Month: 10,Day:day})); setCalender(!calender)}}  className={`p-2 h-10 w-10 focus:outline-4 outline-rose-400 ${day === "" ? "pointer-events-none" : "hover:cursor-pointer"} rounded-full`}>{day}</button>)
          })
}
        </div>
}
        </div>

        </div>
        <div onClick={()=>setCalender(!calender)} className="flex relative flex-nowrap items-center justify-center rounded-2xl max-w-64 max-h-12 bg-white/70 font-semibold p-6 text-center space-y-12">
        {<div>
          <span>{`${date.Day !== 0 ? `${date.Day} - ${date.Month} - ${date.Year}` : boxText}`}</span> <svg className="w-6 h-6 absolute right-2 bottom-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
  <path fill-rule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clip-rule="evenodd" />
</svg>

          </div>
        }
        </div>
         <button className='w-[96%]  bg-violet-500/20 rounded-xl p-4 text-white text-md font-bold shadow-xl' onClick={()=>{date.Day === 0 ? SetBox() : setQuestion("qualities")}}>Submit</button>
      
      </div>
    }
    {
      question === "qualities" && 
      <>
       <h2>Hope the baby gets : </h2>
       <h1 className="my-2 text-center font-semibold">{boxText}</h1>
       <div className="flex flex-col w-full">
       <div id="qualities" className='flex w-full'>
        <div  className='flex-col w-1/2 mx-2'>
       <h1  onClick={()=>{setMomsDropdown(!momsDropDown); setDadsDropdown(false); console.log("clicked")}}>Moms <span className="relative">▼</span></h1>
       <div  className='flex-col focus:outline-none relative'>
        <div className="flex flex-wrap gap-2 overflow-x-hidden overflow-y-auto h-40">{
           momsList.map((quality)=>{
            return(
            <div onClick={()=>{setMomsList(prev=>prev.filter(x=>x!==quality));  setMomsDropdown(false); setDadsDropdown(false); setQualitiesList(prev =>[...prev, quality ])}} className={` px-4 max-h-12 flex p-2 m-1 bg-white/20 whitespace-nowrap backdrop-blur-lg backdrop-brightness-125 rounded-xl font-bold justify-between `}><span className="px-2">{quality}</span><span>x</span></div>
            )
        })
            }</div>
        {momsDropDown && 
           qualities.length > 0 &&
          <ul className='min-w-32 absolute top-2 left-0 h-50 scrollbar-hide overflow-y-auto bg-white/30 backdrop-blur-md backdrop-brightness-125 backdrop-saturation-50 p-4 space-y-4 rounded-xl absolute'>
        {qualities.map(quality=>{
            
          return (
            <li className='hover:scale-105 border-b border-gray-500/30 pb-3 text-center' onClick={()=>{console.log("Clicked a quality");setMomsList(prev=>[...prev,quality]); console.log(quality,"ts quality"); updateList(quality); }} >{quality}</li>
          )
        })}
        </ul>}

       </div>
       </div>
       <div className='flex flex-col w-1/2 items-end'>
         <h1  onClick={()=>{setDadsDropdown(!dadsDropDown); setMomsDropdown(false); console.log("clicked")}}>Dads <span className="relative">▼</span></h1>
       <div  className='focus:outline-none  relative'>
     <div className="flex flex-wrap gap-2  overflow-x-hidden overflow-y-auto h-40">{
           dadsList.map((quality)=>{
            return(
            <div onClick={()=>{setDadsList(prev=>prev.filter(x=>x!==quality)); setDadsDropdown(false); setMomsDropdown(false);  setQualitiesList(prev =>[...prev, quality ])}} className={`px-4 max-h-12 flex p-2 m-1 bg-white/20 whitespace-nowrap backdrop-blur-lg backdrop-brightness-125 rounded-xl font-bold justify-between`}><span className="px-2">{quality}</span><span>x</span></div>
            )
        })
            }</div>
        {dadsDropDown && 
            qualities.length > 0 &&
          <ul className=' absolute top-2 right-0 min-w-32 h-50 scrollbar-hide overflow-y-auto bg-white/30 backdrop-blur-md backdrop-brightness-125 backdrop-saturation-50 p-4 space-y-4 rounded-xl absolute'>
        {qualities.map(quality=>{
            
          return (
            <li className='over:scale-105 border-b border-gray-500/30 pb-3 text-center' onClick={()=>{console.log("Clicked a quality"); setDadsList(prev=>[...prev,quality]); updateList(quality); }} >{quality}</li>
          )
        })}
        </ul>}

       </div>
       </div>
       </div>
        <button className='w-[96%]  bg-violet-500/20 rounded-xl p-4 text-white text-md font-bold shadow-xl' onClick={()=>{(momsList.length <= 0 || dadsList.length <=0) ? SetBox() : setQuestion("relation")}}>Submit</button>
      
       </div>
      </>
    }
    { 
    question === "relation" &&
      <div className="lg:w-1/2 justify-center items-center flex flex-col space-y-8 md:w-[65%] w-[95%]">
      <h3>What will the baby know you as?</h3>
      <input type="text" placeholder={boxText.length > 0 ? boxText : "Relation"} className="text-center  w-[98%] p-4 rounded-xl focus:outline-none border-1 border-white/40"   onChange={(e)=>setRelation(e.target.value)}/>
            <button className='w-[96%]  bg-violet-500/20 rounded-xl p-4 text-white text-md font-bold shadow-xl' onClick={()=>{relation.length <= 0 ? SetBox() : submitAnswer()}}>Submit</button>
      </div>
    }



    </div>
  </div>
    )
}