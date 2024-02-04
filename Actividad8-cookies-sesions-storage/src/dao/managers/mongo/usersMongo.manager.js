import userModel from "../../models/user.model.js";

class UsersMongoManager {
    constructor() {
        this.users = userModel;
    }
    
    async getAll() {
        return await this.users.find({active: true}).lean();
    }
    
    async getById(uid) {
        return await this.users.findOne({_id: uid, active: true}).lean();
    }

    async getByEmail(email) {
        return await this.users.findOne({email});
    }
    
    async create(user) {
        return await this.users.create(user);
    }
    
    async update(user) {
        return await this.users.findByIdAndUpdate(user.uid, user, {new: true});
    }
    
    async delete(uid) {
        return await this.users.findByIdAndUpdate({_id: uid}, {active: false});
    }
}

export default UsersMongoManager;