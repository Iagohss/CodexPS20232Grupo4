import { MongoMemoryServer } from "mongodb-memory-server"
import { configuraDB, desconectaDB } from "../../config/db.config"
import { Usuario } from "../../models/usuario"
import { Tarefa } from "../../models/tarefa"

/**
 * Cria e retorna uma instância de um MongoMemoryServer preparado para os testes.
 * 
 * @returns Uma Promise de um MongoMemoryServer.
 */
export async function createMongoMemoryServer(): Promise<MongoMemoryServer> {
    const mongoServer = new MongoMemoryServer()
    await mongoServer.start()
    const mongoUri = await mongoServer.getUri()
    await configuraDB(mongoUri)

    //Necessário para o MongoMemoryServer, mas não para o MongoDB real.
    await Usuario.ensureIndexes()
    await Tarefa.ensureIndexes()
    
    return mongoServer
}

/**
 * Para o MongoMemoryServer e desfaz a conexão do Mongoose.
 * 
 * @param mongoServer - O MongoMemoryServer a ser parado.
 */
export async function stopMongoMemoryServer(mongoServer: MongoMemoryServer) {
    await desconectaDB()
    await mongoServer.stop()
}
