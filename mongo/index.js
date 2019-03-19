import mongoose from 'mongoose'

var db = mongoose.connect('mongodb://localhost/hanseDB');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    name: String, // 유저 이름
    passwd: String, // 유저 비밀번호
    phone: String, // 유저 전화번호
    id: {type: String, unique: true}, // 유저 아이디
    token: String, // 유저 토큰
    notices: [{ // 유저 게시판 글
        title: String, // 글 제목
        token: String // 글 토큰
    }]
})
const eventSchema = new mongoose.Schema({
    img: String, // 이벤트 이미지
    name: String, // 이벤트 이름
    token: String, // 이벤트 토큰
    html: String // 이벤트 html
})

let Users = mongoose.model('users', userSchema);
let Events = mongoose.model('events', eventSchema);
require('./err')(userSchema)

export { Users, Events }