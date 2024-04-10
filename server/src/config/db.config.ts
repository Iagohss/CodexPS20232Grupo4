import mongoose from 'mongoose'

export function configuraDB(uri: string) {

    const options = {
        autoIndex: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    };
    return mongoose.connect(uri, options)
        .then(res => {
            if (res) {
                console.log("Conexão com MongoDB realizada com sucesso.")
            }
            return res;
        }).catch(err => {
            console.log(err)
        });
}

export function desconectaDB(){
    mongoose.disconnect()
}