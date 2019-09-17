var mongoose = require('mongoose');
var Post = require("./models/post");
var User = require("./models/user");
// DB CONNECTION SETUP
var DATABASE_URL = process.env.MONGODB_DATABASE_URL;
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("We are connected to the database!!");
});

User.findOne({name: "Merry Christmas"}, (err, foundUser)=>{
    if(err){
        console.log("Error happended while finding user ", err);
    }
    else{
        Post.findOne({title: "How to boil an egg"},(err,foundPost)=>{
            if(err){
                console.log("Error happened while finding Post", err);
            }
            else{
                foundUser.posts.push(foundPost);
                foundUser.save((err, updatedUser)=>{
                    if(err){
                        console.log("Error happened while updating user", err);
                    }
                    else{
                        console.log(updatedUser);
                    }
                });
            }
        });
    }
});

Post.create({
    title: "how to boil rice",
    content: "just put rice in the water with salt"
},(err, savedPost)=>{
    if(err){
        console.log("An error has occured while saving post ", err);
    }
    else{
        User.findOne({name: "Merry Christmas"},(err, foundUser) =>{
            foundUser.posts.push(savedPost);
            foundUser.save((err, updatedUser) =>{
                if(err){
                    console.log("An error occured while saving user ", err);
                }
                else{
                    console.log(updatedUser);
                }
            });
        });
    }
}
    );

User.findOne({ name: "Merry Christmas"}).populate("posts").exec((err, foundUser)=>{
    if(err){
        console.log("An error occured while retrieving user ", err);
    }
    else{
        console.log(foundUser);
    }
});