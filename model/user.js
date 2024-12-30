const { default: mongoose, model, models } = require("mongoose");

const UserS = new mongoose.Schema({
    email : {
        type : String,
        require: [true, "Email is required"],
        unique: [ true, "Email already exit"]
    },
    username: {
        type : String,
        required: [true, "Username is required"],
    },
    image: {
        type: String
    }
})


const User = models.User || model('User', UserS)

export default User