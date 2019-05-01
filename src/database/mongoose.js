import mongoose from "mongoose"

import "dotenv/config"

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true } )
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose.set('find', false)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("foi")});

export default db;