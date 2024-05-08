const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Schema för användare
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Hash av lösenord
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch (error) {
        next(error);
    }
});

//Registrera användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

//Jämför hashade lösenord
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

//Logga in användare
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });

        if (!user) {
            throw new Error("Ogiltigt användarnamn eller lösenord");
        }

        const isPasswordMatch = await user.comparePassword(password);

        //Om lösenordet inte matchar det sparade lösenordet
        if (!isPasswordMatch) {
            throw new Error("Ogiltigt användarnamn eller lösenord");
        }

        return user;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;

//Schema för jobb
//Job schema
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