const mongoose = require("mongoose");
mongoose.connect('mongodb://warehowz-dev-test-01:Wd6r2CgyZLfhhRY2TuaHUbaxPDJ3axUTYzHce9KL7f4HjAsKqtasBYhQ4ddV6wqw123@localhost:27017/test?authSource=warehowz-dev-test');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function() {
    console.log("Connected to Database :: MongoDB");
});

module.exports = db; 
