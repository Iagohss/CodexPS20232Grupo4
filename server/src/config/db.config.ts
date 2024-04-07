import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const dbConnection: string = `mongodb+srv://${process.env.DETALHES_CONEXAO}.dmx1tcy.mongodb.net/todolist?retryWrites=true&w=majority&appName=todolist`;

const options = { // retirado de: https://medium.com/@rachealkuranchie/how-to-build-a-crud-api-with-express-js-and-typescript-21c7c66e5296
    // TODO: modificar essas opções conforme necessário
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  };

export const db = mongoose.connect(dbConnection, options)
  .then(res => {
      if(res){
          console.log("Conexão com MongoDB realizada com sucesso.")
      }
      
  }).catch(err => {
      console.log(err)
  })