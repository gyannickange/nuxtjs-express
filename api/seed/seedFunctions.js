require('dotenv').config();
const { mongoose, connect } = require('../startup/db');
const { User } = require('../models/user');
const { userSeedData } = require('./seedData');

const populateData = async () => {
    if (mongoose.connection.readyState === 0) {
        connect();
    }

    let userId;

    console.log('\n[PROCESS:SEED] Seeding User Data');

    await User.deleteMany({}).exec();

    for (let user of userSeedData) {
        const userData = await new User({
            email: user.email,
            password: user.password,
            role: user.role
        }).save();
        userId = userData._id;
    }

    console.log('[PROCESS:FIN] Completed Seeding User Data');

    await mongoose.connection.close();
};

module.exports = { populateData };
