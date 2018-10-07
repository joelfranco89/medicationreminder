var mongoose = require("mongoose")

// Creating mongoose form object structure for db and model
var reminderSchema = new mongoose.Schema({
firstName: String,
lastName: String,
email: String,
medicineName: String,
frequency: String,
amountOfPills: Number,
timeLine: Number,
dateSubmitted: {
    type: Number,
    default: new Date().getTime()
},
timeSinceLastReminder: {
    type: Number,
    default: new Date().getTime()
},
});



module.exports = mongoose.model("Reminder", reminderSchema);