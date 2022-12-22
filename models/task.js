const mongoose = require(`mongoose`)
const { Schema } = mongoose

// stucture for the data
const taskSchema = new Schema({
    // adding validation to the schema
    // validation in mongoose docs 
    name: {
        type: String,
        // require says that i cant pass the name empty i need something in it
        required: [true, 'Please provide a name.'], // array for custom message
        trim: true, // trim to uhh trim
        maxlength: [20, "Your name can't be longer than 20 characters."],
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

// the schema defines the strcture fot the document - type / validations / etc
// the model provides the interface to the database - create / update / query the models / etc

module.exports = mongoose.model(`tasks`, taskSchema) // Taks is the name of the collection where the tasks will be stored into

// the instance of a model is called a document
// only the properties that i passed into the schema will be passed to the database
