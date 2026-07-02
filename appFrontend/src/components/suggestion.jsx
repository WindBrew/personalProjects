import { useEffect, useState } from "react"

export default function Suggestion(props){
    const [suggestText,setSuggestText] = useState("")
    const [placeholderText, setPlaceholderText] = useState("Your suggestion here")

    const submitSuggestion = async (e)=>{
        if(suggestText.trim().length <= 0){
            setPlaceholderText("Cannot be empty")
            setTimeout(()=>setPlaceholderText("Your suggestion here"),3000)
        }
        else{
      
        e.preventDefault()
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
                <h4>Suggestion for the new parents</h4>
                <textarea  type="text" placeholder={placeholderText} className="rounded-xl min-h-20 max-h-84 text-center w-[90%] bg-white/20 border-1 border-white/10 p-4 focus:outline-none scrollbar-hide" value={suggestText} onChange={(e)=>{setSuggestText(e.target.value); }}/>
                <button className="rounded-xl bg-blue-800 text-white/80 p-4 shadow-xl w-[94%] text-xl font-bold scrollbar-hide" onClick={(e)=>{submitSuggestion(e); props.loader(true)}}>Submit</button>
            </div>
        </div>
    )
}