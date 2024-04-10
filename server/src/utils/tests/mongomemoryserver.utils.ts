import { MongoMemoryServer } from "mongodb-memory-server"
import { configuraDB, desconectaDB } from "../../config/db.config"

export async function createMongoMemoryServer(): Promise<MongoMemoryServer> {
    const mongoServer = new MongoMemoryServer()
    await mongoServer.start()
    const mongoUri = await mongoServer.getUri()
    await configuraDB(mongoUri)
    return mongoServer
}

export async function stopMongoMemoryServer(mongoServer: MongoMemoryServer){
    await desconectaDB()
    await mongoServer.stop()
}
