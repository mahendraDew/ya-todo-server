const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;


const UserSchema = new mongoose.Schema({
    // Schema definition here
    email: {type: String, unique:true},
    password: String,
    username: String,
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    priority:String,    // low, mid, high
    date: Date,
    progress: String, // new, inprogress, underreview, completed
    createdAt: { type: Date, default: Date.now } ,
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' } // reference to User
});

const UserModel = mongoose.model('User', UserSchema);
const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = {
    UserModel,
    TodoModel
}