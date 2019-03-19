// Import Modules
import express from 'express'
import bodyParser from 'body-parser'
import randomString from 'randomstring'
import cors from 'cors'
import session from 'express-session'
import multer from 'multer'
import path from 'path'

// Set Express app
let app = express();
let router = express.Router();

// Set Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));
app.use(cors())
app.use(session({ 
    secret: 'akat32',
    resave: true, 
    saveUninitialized: false 
}));
app.use(express.static(path.join(__dirname, 'public')));

// import func
import './func'

// DB Schemas
import { Users, Events, Notice, Impeachment } from './mongo/index'

let passport = require('./passport')(Users);

app.use(passport.initialize());
app.use(passport.session());

// Set Router
let auth = require('./routes/auth')(router, Users, randomString, passport)
let event = require('./routes/event')(router, Events, randomString, passport, multer)
let notice = require('./routes/notice')(router, Notice, Users, passport, randomString, multer)

// Use Router
app.use('/auth', auth)
app.use('/event', event)
app.use('/notice', notice)

// Set Server Port
const PORT = 3030

app.get('/', (req,res)=>{
})
// Server On
app.listen(PORT, console.log('Server on Port', PORT))
