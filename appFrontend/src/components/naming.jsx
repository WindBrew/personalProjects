import { useState ,useEffect} from "react";
import { useLanguage } from "../langManager";

export default function NamePage(props){
const [name,setName] = useState("")
    const [placeholderText, setPlaceholderText] = useState("Baby's name")
    const {t} = useLanguage()

const submitName = async(e)=>{
    e.preventDefault();
    if(name.trim().length <= 0) {
         setPlaceholderText("Cannot be empty")
        setTimeout(()=> setPlaceholderText("Baby's name"),3000)
        props.loader(false)
    }
    else{
      props.loader(true)
      console.log("Naming loader set")
    const res = await fetch(`${props.api}/addData`,{
        method:"PATCH",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify({
            userID: props.userID,
            name : name
        })
    })
    const data = await res.json()
    console.log("data : ",data)
    if(res.ok){
        props.pageUpdate("questions")
        props.loader(false)
        setPlaceholderText(data.message)
        setTimeout(()=> setPlaceholderText("Baby's name"),4000)
    }
}
}

    return (
        <div className={`
        ${props.gender === 'Boy' ? "bg-gradient-to-l from-indigo-300 via blue-400 to-cyan-400" : 
        "bg-gradient-to-r from-rose-400 via-red-300 to-pink-400"} w-screen h-screen overflow-hidden flex flex-col justify-center items-center `}>
            <div className="bg-white/20 backdrop-blur-md backdrop-brightness-125 backdrop-saturation-125 lg:w-1/3 md:w-[65%] w-[95%] pb-8 h-auto p-4 rounded-xl space-y-8 flex flex-col justify-center">
            <h3 className="relative font-semibold text-lg md:text-xl text-center">{t("Suggest a name for the baby ")}{t(props.gender)} </h3>
              <span className="italic  text-sm -translate-y-8 text-slate-500  text-center ">{t("as per your prediction")}</span>
          <form  className='space-y-8' onSubmit={(e)=>submitName(e)} >
            <input type="text" placeholder={t(placeholderText)} className="flex w-full justify-center rounded-xl bg-white/30 backdrop-blur-sm backdrop-brightness-50 p-2 border-1 border-white focus:outline-none font-bold text-lg text-center"  onChange={(e)=>setName(e.target.value)} /> 
            <button onClick={submitName} type="submit" className={`${props.gender === 'girl' ? 'bg-pink-300/40' : 'bg-blue-400/40'}  flex w-full justify-center shadow-xl text-lg text-gray-800 font-bold rounded-2xl p-4`}>{t("Submit")}</button>
          </form>
            </div>
        
        </div>
    )
}