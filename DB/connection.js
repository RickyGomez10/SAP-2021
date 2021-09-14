const mongoose = require('mongoose');

const URI = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@sap.6hxuc.mongodb.net/"+process.env.DB_NAME+"?retryWrites=true&w=majority"

const connectDB = async () =>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Conexión a base de datos abierta');
}

const closeDB = () => {
    mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
}

module.exports = {
    connectDB,
    closeDB
};