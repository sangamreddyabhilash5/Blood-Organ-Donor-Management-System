// ======================================================
// MongoDB Database Connection
// Blood & Organ Donor Management System
// ======================================================


const mongoose = require("mongoose");



// ======================================================
// Connect Database
// ======================================================


const connectDB = async () => {


    try {


        const conn = await mongoose.connect(

            process.env.MONGO_URI,

            {

                serverSelectionTimeoutMS:5000,

                socketTimeoutMS:45000,

            }

        );



        console.log(
            "===================================="
        );


        console.log(
            "✅ MongoDB Connected Successfully"
        );


        console.log(
            `📦 Database : ${conn.connection.name}`
        );


        console.log(
            `🖥️ Host     : ${conn.connection.host}`
        );


        console.log(
            "===================================="
        );



        return conn;



    }

    catch(error){


        console.log(
            "===================================="
        );


        console.log(
            "❌ MongoDB Connection Failed"
        );


        console.log(
            `Error : ${error.message}`
        );


        console.log(
            "===================================="
        );



        process.exit(1);


    }


};








// ======================================================
// MongoDB Events
// ======================================================


mongoose.connection.on(

    "connected",

    ()=>{


        console.log(
            "🟢 MongoDB Connection Active"
        );


    }

);




mongoose.connection.on(

    "disconnected",

    ()=>{


        console.log(
            "⚠️ MongoDB Disconnected"
        );


    }

);




mongoose.connection.on(

    "reconnected",

    ()=>{


        console.log(
            "🔄 MongoDB Reconnected"
        );


    }

);




mongoose.connection.on(

    "error",

    (error)=>{


        console.log(
            "❌ MongoDB Error:",
            error.message
        );


    }

);









// ======================================================
// Graceful Shutdown
// ======================================================


const closeDatabase = async()=>{


    try{


        await mongoose.connection.close();


        console.log(
            "🛑 MongoDB Connection Closed"
        );


        process.exit(0);



    }

    catch(error){


        console.log(
            "❌ Error Closing MongoDB:",
            error.message
        );


        process.exit(1);


    }


};




process.on(

    "SIGINT",

    closeDatabase

);


process.on(

    "SIGTERM",

    closeDatabase

);





module.exports = connectDB;