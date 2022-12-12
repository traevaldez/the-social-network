const { default: mongoose } = require('mongoose');
const monogoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/the-social-network",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

mongoose.set("debug", true);

module.exports = mongoose.connection;