import { connect, disconnect } from 'mongoose';

async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    } catch(err){
        console.log(err)
        throw new Error("cannot connect to database.");
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log(error)
        throw new Error("cannot disconnect from database.");
    }
}

export { connectToDatabase, disconnectFromDatabase };