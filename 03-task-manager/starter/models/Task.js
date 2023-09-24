const mongoose = require("mongoose")

const TackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
        maxLength: [20, "Name cannot be more tha 20 Characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TackSchema)