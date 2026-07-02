import { react, useState } from "react";
export default function Selection(props){
    const [activeButton , setActivebutton] = useState()
    return(
        <div className={`relative min-h-screen flex w-screen z-40 `}>
            <span className="fixed z-50 font-semibold text-xl text-gray-900/80 left-1/2 -translate-x-1/2 top-1/4 -translate-y-full outline-none border-none">Pick one of the two</span>
        <button className={`flex-1  text-center hover:cursor-pointer font-semibold text-xl bg-[#7CB7FF]  ${activeButton === "boy" ? "scale-[1.01] " : "brightness-75 saturation-75"}`} onClick={()=>{props.castVote("Boy"); setActivebutton("boy")}}>Boy's team</button>
        <button className={`flex-1 text-center hover:cursor-pointer font-semibold text-xl bg-[#FF6DB6] ${activeButton === "girl" ? "scale-[1]  " : "brightness-75 saturation-75"}`} onClick={()=>{props.castVote("Girl"); setActivebutton("girl")}}>Girl's team</button>
        </div>
    )
}
//two colored sides become the button or are overflown by the buttons click either color and pew done