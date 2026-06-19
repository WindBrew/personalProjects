require("dotenv").config() 
const express = require("express");
const {Pool} = require("pg")
const cors = require("cors")
const http = require("http")
const app = express()
const {Server} = require("socket.io")
const server = http.createServer(app)

const io = new Server(server,{
    cors:{origin:"https://personal-projects-u6zd.vercel.app"}
})

app.use(cors({origin:"https://personal-projects-u6zd.vercel.app"}))
const database = new Pool({connectionString:process.env.databaseKey})
app.use(express.json())
io.on("connection",(socket)=>{
    console.log("connected")
    socket.on("vote",async ()=>{
         const countBoys = Number((await database.query("select count(*) from uservotes where vote = $1",['Boy'])).rows[0].count)
        const countTotal = Number((await database.query("select count(*) from uservotes where vote is not null")).rows[0].count)
        const countGirls = countTotal - countBoys
        console.log("listened to frontends vote")
        console.log("this is counting of boys and total", countBoys, countTotal)
       io.emit("updatedCount" , {boysCountPercentage : ((countBoys/countTotal) * 100) , girlsCount: countGirls , boysCount: countBoys}) 
    })
    socket.on("disconnect",()=>{
        console.log("disconnected")
    })
})
app.get("/",(req,res)=>{
    res.json({message: "successfully activated backend base"})
})
app.post("/",async(req,res)=>{
    await database.query("insert into uservotes (username,vote) values ($1,$2) ",[req.body.user,req.body.vote])
    res.json({message:"success"})
})
app.post("/user",async(req,res)=>{
    if((req.body?.user).length > 0 && req.body?.user != " "){
     const userID =   (await database.query("insert into uservotes (username) values ($1) returning id",[req.body.user])).rows[0].id
        res.json({message: 'success',userID: userID})
    }
    else{
        res.status(401).json(
            {
                message: "No name detected"
            }
        )
    }
})
app.post("/vote", async(req,res)=>{
    if (req.body?.vote.length > 0){
        await database.query("update  uservotes set vote = $1 where id = $2 ",[req.body.vote,req.body?.userID])
        res.json({message:"successfully voted"})
    } 
    else{
        res.status(401).json({message: "not valid vote"})
    }
})
// app.get("/score", async(req,res)=>{
   
    
//     const boysPercentage = (countBoys/countTotal)* 100
//     const girlsPercentage = 100 - boysPercentage 
//     boyCount = boysPercentage
//     res.json({
//         countBoys: boysPercentage,
//         countGirls: girlsPercentage
//     })
// })



server.listen(5002,"0.0.0.0",()=>{
    console.log("http server is listening on port 5002 to check visit http://localhost:5002")
})
