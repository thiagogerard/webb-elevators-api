class Services {
    contructor(model) {
        this.model = model;
    }

    async createRecord(data) {
        const record = new this.model(data);
        return await record.save();
    }

    async getAllRecords() {
        return await this.model.find();
    }
}

module.exports = Services;