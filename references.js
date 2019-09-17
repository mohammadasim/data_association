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