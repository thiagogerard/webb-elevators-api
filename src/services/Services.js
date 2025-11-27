class Services {
    contructor(modelName) {
        this.modelName = modelName;
    }

    async createRecord(data) {
        const record = new this.modelName(data);
        await record.save();
    }
}

module.exports = Services;