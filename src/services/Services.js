class Services {
    constructor(model) {
        this.model = model;
    }

    async getAllRecords(query={}, page=1, limit=10) {
        const skip = (page - 1) * limit;
        return await this.model.find(query).skip(skip).limit(limit);
    }

    async getRecordById(id) {
        return await this.model.findById(id);
    }

    async createRecord(data) {
        const record = new this.model(data);
        return await record.save();
    }

    async updateRecord(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteRecord(id) {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = Services;