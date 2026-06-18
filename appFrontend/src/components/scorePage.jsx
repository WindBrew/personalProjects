export default function Scoreboard(props){
  const {  boysCount : boys , girlsCount : girls , size} = props
    return(
        <div className="relative 
        bg-gradient-to-r from-rose-500 from-0% via-purple-500 via-60% to-indigo-600 to-100%


min-h-screen relative overflow-hidden md:w-screen flex flex-col relative h-screen overflow-hidden z-60 items-center  pt-8">
          <div className={`relative w-[90%] md:w-1/2 bg-white/[0.08] border border-white/15 pb-2
                 rounded-2xl px-6 py-5
                backdrop-blur-sm`} >
            <div className='flex  justify-between font-bold text-2xl  tracking-tight' >
                <span>Boy</span><span>Girl</span>
                </div> 
                <div className='h-2 rounded-3xl overflow-hidden flex '>
                    <div id="boy" className={`bg-indigo-600 h-full`} style={{width: `${props.size}%`}}>
                    </div><div className={`bg-rose-600 h-full `}  style={{width: `${100 - props.size}%`}}></div>
                    </div> 
                    <p className={`text-xs mt-2 text-center ${boys > girls ? "text-blue-200/50"   : girls > boys ? "text-pink-200/50" : "text-white/50"}`}>
                      {boys > girls ? `Team Boy are leading by ${boys-girls}`   : girls > boys ? `Team Girl are leading by ${girls - boys}` : `Both teams are tied by ${boys} : ${girls}`}
                    </p>
                    </div>
                    <div className="flex md:w-screen w-[85%] flex-col space-y-6 mt-6">
                    <p className="text-lg font-semibold text-white text-center ">
  One little secret. Two very loud teams. 💕
</p>
<p className="text-sm text-white/75 text-center">
  Guess right and earn your bragging rights.
</p>
<p className="text-xs text-white/50 text-center">
  Either way, a baby is coming and that's everything.
</p>
</div>
<p className="absolute bottom-8 w-full text-center text-white/50 text-sm italic">
Either way, our favorite chapter is about to begin.
</p>
<div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2
                w-[500px] h-[250px]
                rounded-full
                bg-white/10 blur-3xl" />
                    </div>
                    
    )
}