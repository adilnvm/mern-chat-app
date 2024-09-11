const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const {notFound,errorHandler } = require('./middleware/errorMiddleware')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const path = require("path");


//socket.io,cors ke leye
const cors = require("cors"); 

dotenv.config();

connectDB();

const app = express()

app.use(express.json()) //to accept json data

app.use(cors()); 




app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)


//-------------------------------render deployment start-------------------------------

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname1,'/frontend/build')));

  app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
  )
}else{
  app.get("/",(req, res) => {
    res.send("Api running");
  });
}

//-------------------------------render deployment end--------------------------------


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT ||  5000


const server = app.listen(PORT,console.log(`Server started at PORT ${PORT}`))


const io = require('socket.io')(server,{
    pingTimeout:25000,
    cors:{
        origin : 'http://localhost:3000'
    }    
});    

io.on("connection",(socket) =>{
    console.log("connected to socket.io");

    socket.on('setup', (userData)=>{
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit("connected");
        
        // socket.emit("setup",user);

    })
    socket.on('join chat', (room)=>{
        socket.join(room);
        console.log('User joined Room' + room);
        
    });

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });