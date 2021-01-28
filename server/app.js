const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const cors = require("cors");
const http = require('http');
const socketio = require('socket.io');


const app = express();

var upload = multer();
app.use(upload.array());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
//const authRouter = require("./routes/authRouter.js");
require('./routes/authRouter')(app);
require('./routes/userRouter')(app);
require('./routes/managerRouter')(app);
require('./routes/journalRouter')(app);
require('./routes/doctorRouter')(app);
require('./routes/alldoctorsRouter')(app);
require('./routes/historyRouter')(app);

//-----------chhhhhaaaaat
const { addUser, removeUser, getUser, getUsersInRoom } = require('./chat');

const router = require('./chatRouter');
const server = http.createServer(app);
const io = socketio(server);

app.use(router);


io.on('connect', (socket) => {
  console.log('CONNECTION ON')
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});





const db = require("./models");
const MONGODB_URI =  'mongodb+srv://MedVED:MedVED@cluster0.girqq.mongodb.net/JWT?retryWrites=true&w=majority';

//const store = new MongoDBStore({
//  uri: MONGODB_URI,
//  collection: 'sessions'
//});

db.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
server.listen(3000, () => console.log(`Server has started.`));  //  initial();
  })
  .catch(err => {
    console.log(err);
  });
