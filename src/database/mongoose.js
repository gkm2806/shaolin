import mongoose from "mongoose"

import "dotenv/config"
var a = process.env.DATABASE_URL
console.log("OLHA ESSA PORRA AKI OH: ", process.env.DATABASE_URL)
mongoose.connect(a.toString(),{ useNewUrlParser: true } )
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose.set('find', false)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("foi")});

export default db;