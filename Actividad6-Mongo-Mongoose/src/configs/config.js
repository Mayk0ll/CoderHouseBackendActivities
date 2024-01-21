import { connect } from 'mongoose';

const connectionMongoDB = async () => {
    try {
        await connect('mongodb+srv://mayk0ll:glagmzj5PKiDhhwx@proyectocoderhouse.uoq2r5h.mongodb.net/ecommers?retryWrites=true&w=majority')
        console.log('database connected')
    } catch (error) {
        console.log('database not connected')
    }
}

export default connectionMongoDB;