import { useState } from "react"
import { useEffect } from "react"

export default function List(props){
   const [userBoard,setUserBoard] = useState([])
   const [active,setActive] = useState(false)
   const [deletionMode,setDeletionMode] = useState(false)
   const [selectedUser , setUser] = useState("Ravee")
   const [key,setKey] = useState()
   const [qualities,setQualities] = useState({mom:false,dad:false});
   const [readSuggestion, setReadsuggestion] = useState(false)
    const [prevKey , setPrevKey] = useState()
    const rowExpanded = qualities.mom || qualities.dad || readSuggestion
    const [prevQualities , setPrev ] = useState({mom: false,dad: false})
   useEffect(()=>{
    const loadBoard = async()=>{
    const res = await fetch(`${props.api}/userdata`,{
        method:"GET"
    })
    const data = await res.json()
    console.log("fetch success")
    console.log(data)
    if(Array.isArray(data.userdata)){
   setUserBoard(data.userdata)
}
else{
    console.log("not an array")
}

} 

loadBoard()
   
},[])
// useEffect(()=>{
    
//     //setQualities({mom:false, dad:false})
//     setPrevKey()

// },
// [key]
// )
const KeyManage = (newKey) =>{
  
    if(!key){
        setKey(newKey)
        setPrevKey(key)
    }
    
    else if(key && key !== newKey){
        console.log("ran this sync condition")
      
      
        setQualities(prev=>{
      
        const {mom , dad} = prev
        console.log("qualityprev" , prevQualities)
                  //console.log(mom,dad,freshMom,freshDad)
               // check for previous one and current one but you cannot rely on the prev for false and true checks 
        console.log(mom,dad,prevQualities.mom,prevQualities.dad) 
        
        setTimeout(()=>{setPrev(prev=>{
            console.log("prevQuals" , prev.mom , prev.dad)
            setTimeout(()=>{setQualities({mom:  prev.mom , dad: prev.dad});  setKey(newKey)},0)
            return {...prev}
        })
    },0)
        return ({mom: false,dad: false})
        
      })

    }
    
}

const deleteUser = async() =>{
    setUserBoard(userBoard.filter(user=>user.id !== key))
    setActive(false)
    const res = await fetch(`${props.api}/userdata`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "id":key
        })
    })
    const data = await res.json()
    console.log(data)
}
const refreshData = async() =>{
    const res = await fetch(`${props.api}/userdata`,{
        method:"GET"
    })
    const data = await res.json()
    console.log("fetch success")
    console.log(data)
    if(Array.isArray(data.userdata)){
   setUserBoard(data.userdata)
}
else{
    console.log("not an array")
}
}

    return(
        <div className="flex relative justify-center select-none gradientTR-animate-lite items-center h-screen inset-0">
            <h3 className="text-3xl font-semibold absolute top-12">Welcome Admin!</h3>
            <button className="fixed top-2 left-1/2 -translate-x-1/2 rounded-xl border-2 border-gray-300/30 flex flex-row " onClick={refreshData}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
</svg>
 Refresh </button>
            <button className={`absolute bottom-4 p-4 font-semibold rounded-3xl ${!deletionMode ? "bg-red-500" : "bg-gray-400"}`} onClick={()=>setDeletionMode(!deletionMode)}>{deletionMode ? "View mode" : "Deletion mode"}</button>

        <div className={`space-y-8  ring-1 ring-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.15)] scrollbar-hide rounded-md min-h-[150px] max-h-[300px]   overflow-auto scrollbar-hide rounded-lg bg-gray-400/30 backdrop-blur-md m-4 w-[90%] lg:w-1/4 md:w-1/3 font-semibold text-center p-2 pt-0`}>
            <div className="grid z-50  min-w-max -mb-[0.5px] grid-cols-[140px_40px_120px_100px_120px_120px_70px_220px] sticky top-0 p-2 -mx-4 gap-y-[2px] gap-x-6   backdrop-blur-xl   backdrop-brightness-100   content-start">
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 w-40">Name</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Vote</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Baby's Name</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Date</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Mom's Qualities</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Dad's Qualities</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Relation</h1>
            <h1  className="font-semibold sticky text-center px-2 top-0 fredoka m-0 ">Suggestion</h1>
            </div>
            {userBoard.map(user=>{return(
                
                <div key={user.id} className={`pb-2 ${user.id === key ? "z-40" : "z-0"} relative grid grid-cols-[160px_80px_120px_120px_150px_150px_100px_480px] scrollbar-hide overflow-y-hidden overflow-x-hidden min-w-[1100px] transition-all duration-1000 ease-in-out ${(rowExpanded) && user.id === key  ? "h-54 " : "h-10"} mb-2 gap-x-0 hover:scale-105 transition rounded-md`} onClick={()=>KeyManage(user.id)}>
                     <div className="flex items-center bg-white font-bold truncate justify-between p-2">
                     {deletionMode &&
                <button className="p-4" onClick={()=>{setActive(true); setUser(user.username)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" className="size-5 hover:cursor-pointer" >
  <path fill-rule="evenodd" 
  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" 
  clip-rule="evenodd" />

</svg>


                
                </button>
                
                } <h1>{user.username}</h1>
                </div>

            <div className="flex items-center bg-white font-bold truncate p-2"><span className="text-center w-full">{user.vote}</span>
               
            </div>
            <div className="truncate whitespace-nowrap flex  bg-white p-2 items-center scrollbar-hide">
               <span className="w-full text-center">{user.name}</span>
            </div>
             <div className="flex bg-white p-2 truncate  justify-center items-center scrollbar-hide">
                {new Date(user.date).toLocaleDateString("en-In",{
                    day: 'numeric' , month: 'short', year:'numeric'
                })}
            </div>
            <div className={`flex  flex-col  relative bg-white p-2 scrollbar-hide transition-all duration-1000 ease-in-out transition-all duration-1000 ease-in-out ${qualities.mom && user.id === key ? "h-54" : "justify-center"}`}>
               <span className="w-full text-center" onClick={()=>{ setPrev({mom:true , dad: false}); setQualities(prev=>({...prev, mom: !prev.mom}))}}>qualities</span>
               {
                
                 <div className={`z-40 my-2 flex h-50 overflow-y-auto overflow-x-hidden bg-gray-400/30 rounded-xl p-2 flex flex-col scrollbar-hide  transition-all duration-500 ease-in-out ${qualities.mom && user.id === key ? "h-50 opacity-100 translate-y-0 " : "pointer-events-none opacity-0 absolute top-0 -translate-y-1/2 h-px"} `}>
                
                
{
    
        
            
            user.qualitiesofmom.map(quality=>{
                
                return(
                     <span className="font-semibold p-2 border-b border-gray-300/20">
                        {quality}
                    </span>

                )
            
            })
          
        
        }
    
            
    

    </div>
            }
        
            </div> 
         <div className={`flex  flex-col  relative bg-white p-2  scrollbar-hide transition-all duration-1000 ease-in-out ${qualities.dad && user.id === key ? "h-54" : "justify-center"}`}>
               <span className="w-full text-center" onClick={()=>{ setPrev({mom: false, dad: true});  setQualities(prev=>({...prev, dad:  !prev.dad}));}}>qualities</span>
               {
                
                 <div className={`z-50 top-6 my-2 flex overflow-y-auto overflow-x-hidden bg-gray-200/90 rounded-xl p-2 flex flex-col scrollbar-hide transition-all duration-500 ease-in-out ${qualities.dad && user.id === key ? "h-50 opacity-100 translate-y-0 " : "pointer-events-none opacity-0 absolute top-0 -translate-y-1/2 h-px"} `}>
                
{
    
        
            
            user.qualitiesofdad.map(quality=>{
                
                return(
                     <span className="font-semibold p-2 border-b border-gray-300/20">
                        {quality}
                    </span>

                )
            
            })
          
        
        }
    
            
    

    </div>
            }
        
            </div> 
             <div className="truncate flex  bg-white p-2 items-center scrollbar-hide">
               <span className="w-full text-center">{user.relation}</span>
            </div>
             <div className={`max-w-[220px] min-w-0 flex flex-wrap rounded-r-md bg-white p-4 items-center scrollbar-hide ${  user.id === key && rowExpanded 
      ? "break-words whitespace-normal" 
      : "truncate"}`} onClick={()=>{setReadsuggestion(!readSuggestion); setPrev({mom: false,dad: false})}}>
               <span className="text-center break-words ">{user.suggestion}</span>
            </div>
           
            </div>
            )
            }    
        )
            }    
                                                                                        
        </div>
        {
        active &&
        <div className="flex absolute justify-center items-center inset-0 w-full h-full bg-white/10 backdrop-blur-md">
        <div className="fixed flex flex-col md:w-[30%] w-[96%] p-4 space-y-12 bg-white/50 px-4 h-64 backdrop-blur-2xl border border-white/20 backdrop-brightness-75 shadow-2xl
ring-1 ring-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.15)] rounded-2xl items-center justify-center">
    <button className="absolute top-3 right-4 font-bold text-2xl hover:cursor-pointer" onClick={()=>{setActive(false)}}>X</button>
            <h3 className="text-md font-semibold ">Are you sure you want to remove <span>{selectedUser}</span></h3>
            <button className="w-[95%] hover:cursor-pointer bg-red-600/90 font-semibold p-4 rounded-xl" onClick={deleteUser}>Delete</button>
        
 </div>
</div>

}
        </div>
    )
}