require("dotenv").config() 
const express = require("express");
const {Pool} = require("pg")
const cors = require("cors")
const http = require("http")
const app = express()
const {Server} = require("socket.io")
const server = http.createServer(app)
const PORT = process.env.PORT || 5002 //render services auto set a PORT in env (useful to remember)
const io = new Server(server,{
    cors:{origin:process.env.prodURL}
})

app.use(cors({origin:process.env.prodURL}))
const database = new Pool({connectionString:process.env.databaseKey})
app.use(express.json())
io.on("connection",(socket)=>{
    console.log("connected")
    socket.on("vote",async ()=>{
         const countBoys = Number((await database.query("select count(*) from uservotes where vote = $1 and suggestion is not null",['Boy'])).rows[0].count)
        const countTotal = Number((await database.query("select count(*) from uservotes where vote is not null and suggestion is not null")).rows[0].count)
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
    res.status(200).json({message: "server live"})
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

app.get("/userdata",async (req,res)=>{
    const userdata = (await database.query("select * from uservotes where suggestion is not null")).rows
    res.json({
        userdata
    })
})
app.delete("/userdata",async(req,res)=>{
    await database.query("delete from uservotes where id = $1",[req.body.id])
    res.json({
        message:"deleted from database successfully"
    })
})
app.post("/verifyAdmin",async(req,res)=>{
    if((req.body.pass) === (process.env.adminPass)){
        res.json({
            message:"Welcome Admin",
        
            
        })
    }
    else{
        res.status(401).json({message: "Not an admin"})
    }
})
app.patch("/addData", async (req,res)=>{
    const updates = req.body
    const fields = Object.keys(updates).filter(key => key !== "vote" && key !== "username" && key !== "userID")
    console.log("update and fields", updates, fields)
    const fieldData = fields.map(field => field === "qualitiesofmom" || field ===  "qualitiesofdad" ? JSON.stringify(updates[field]) : updates[field])
    const updateScript = fields.map((field,i)=>`${field} = $${i+1}`).join(',') //remember this for the next time that imperfect returns or adding {} without return can also cause such errors
    fields.forEach(field=>{if(updates[field].length <= 0){
        res.json({message:"Cannot be empty"})
        return
    }})
    try{
    await database.query(`update uservotes set ${updateScript} where id = $${fields.length + 1}`,[...fieldData,req.body.userID])
    }
    catch(err){
        console.log(err)
    }
    res.json({
        message:"successfully added",
        db: await database.query("select * from uservotes where id = $1",[req.body.userID])

    })
})

server.listen(PORT,()=>{
    console.log("http server is listening on port 5002 to check visit http://localhost:5002")
})
