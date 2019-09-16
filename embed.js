var mongoose = require('mongoose');
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

//SCHEMA SETUP
// POST - title, content
var postSchema = mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);



var newUser = new User({
    email: "andrew@123colors.com",
    name: "Andrew Michael"
});

newUser.posts.push({
    title: "How to cook Mantu",
    content: "Search the video in youtube. You will find lots of recipies and when you cook it share it with me."
});
newUser.save((err, savedUser) => {
    if (err) {
        console.log(err);
    } else {
        console.log(savedUser);
    }
});

// Retrieving user and adding another post to it
User.findOne({
    name: "Prince Charlie"
}, (err, retrievedUser) => {
    if (err) {
        console.log(err);
    } else {
        retrievedUser.posts.push({
            title: "How to fry eggs",
            content: "Come on everyone knows how to fry eggs, the secret is to keep the fire low."
        });
        retrievedUser.save((err, savedUser) => {
            if (err) {
                console.log(err);
            } else {
                console.log("*******************************************");
                console.log(savedUser);
            }
        });
    }
});





// var newPost = new Post({
//     title: "How to cook Kabuli Paulao",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id consectetur purus ut faucibus pulvinar. Sollicitudin aliquam ultrices sagittis orci. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui. Pellentesque habitant morbi tristique senectus. Purus sit amet luctus venenatis lectus magna. Sed sed risus pretium quam vulputate dignissim suspendisse. Pellentesque habitant morbi tristique senectus et netus et malesuada. Elit pellentesque habitant morbi tristique senectus. Diam maecenas ultricies mi eget mauris pharetra et ultrices."
// });

// newPost.save((err,savedPost)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(savedPost);
//     }
// });