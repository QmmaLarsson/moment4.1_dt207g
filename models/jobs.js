/*
//Schema för jobb
const jobSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste fylla i företagsnamn."]
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste fylla i jobbtitel."]
    },
    location: {
        type: String,
        required: [true, "Du måste fylla i plats."]
    },
    description: {
        type: String,
        required: [true, "Du måste fylla i beskrivning."]
    }
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
*/