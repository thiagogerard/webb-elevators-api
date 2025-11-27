class Controller {
    constructor(entityService) {
        this.entityService = entityService;
    }

    async getAll(req, res) {
        try{
            const recordList = await this.entityService.getAllRecords();
            return res.status(200).json(recordList);
        }catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        const data = req.body;
        try {
            const newRecord = await this.entityService.createRecord(data);
            return res.status(200).json(newRecord);
        } catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = Controller;