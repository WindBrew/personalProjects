import { useEffect, useState } from "react"
import { useLanguage } from "../langManager"

export default function Suggestion(props){
    const {t} = useLanguage()
    const [suggestText,setSuggestText] = useState("")
    const [placeholderText, setPlaceholderText] = useState("Your suggestion here")

    const submitSuggestion = async (e)=>{
              e.preventDefault()
        if(suggestText.trim().length <= 0){
            setPlaceholderText("Cannot be empty")
            setTimeout(()=>setPlaceholderText("Your suggestion here"),3000)
            props.loader(false)
        }
        else{
             document.documentElement.requestFullscreen();
        props.loader(true)
        console.log("Suggestions loader set ");
  
        // suggestText is sent exactly as typed by the user — never passed through t()
        const res = await fetch(`${props.api}/addData`,{
            method:"PATCH",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userID : props.userID,
                suggestion : suggestText
            })

        })
        const data = await res.json()
        if(res.ok){
            
            setPlaceholderText(data.message)
            setTimeout(()=>setPlaceholderText("Your suggestion here"),5000)
            console.log("data : ",data)
            props.updateVotes()
            props.pageUpdate("score")
            props.loader(false)

     
        }
        else{
            console.log("failed")
        }
    }
    }
    
    return (
        <div className="w-screen font-semibold inset-0 justify-center items-center  flex h-screen overflow-hidden gradientTR-animate">
            <div className="rounded-xl flex flex-col space-y-8 p-4 justify-center items-center bg-white/10 backdrop-blur-xl backdrop-brightness-125 w-[90%] lg:w-1/3 md:w-[70%]">
                <h4>{t("Suggestion for the new parents")}</h4>
                <form className="space-y-8" onSubmit={(e)=>{submitSuggestion(e);}}>
                <textarea  type="text" placeholder={t(placeholderText)} className="rounded-xl w-full min-h-60 max-h-84 text-center bg-white/30 border-1 border-white/10 p-4 focus:outline-none scrollbar-hide" value={suggestText} onChange={(e)=>{setSuggestText(e.target.value); }}/>
                <button type="submit" className="rounded-xl bg-blue-800 text-white/80 p-4 shadow-xl w-full text-xl font-bold scrollbar-hide" onClick={(e)=>{submitSuggestion(e);}}>{t("Submit")}</button>
            </form>
            </div>
        </div>
    )
}