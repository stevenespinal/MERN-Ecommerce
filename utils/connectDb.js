import mongoose from 'mongoose';

const connection = {};

async function connectDb() {

  if (connection.isConnected) {
  //  use existing db connection
    console.log('Using existing connection');
    return;
  }
  //connect to the database using the env string
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('DB Connected');
//  connects to mongo atlas to a server-less app/backend
  connection.isConnected = db.connections[0].readyState;
}


export default connectDb;
