class Controller {
    constructor(entityService) {
        this.entityService = entityService;
    }

    async getAll(req, res) {
        try{
            const { page = 1, limit = 10, ...filters } = req.query;
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const recordList = await this.entityService.getAllRecords(filters, pageNum, limitNum);
            return res.status(200).json(recordList);
        }catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try{
            const record = await this.entityService.getRecordById(id);
            return res.status(200).json(record);
        }catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async create(req, res) {
        const data = req.body;
        try {
            const newRecord = await this.entityService.createRecord(data);
            return res.status(201).json(newRecord);
        } catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedRecord = await this.entityService.updateRecord(id, data);
            if (!updatedRecord) {
                return res.status(404).json({ error: "Record not found" });
            }
            return res.status(200).json(updatedRecord);
        }catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try{
            await this.entityService.deleteRecord(id);
            return res.status(200).json({message: 'Record deleted'})
        }catch(err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = Controller;