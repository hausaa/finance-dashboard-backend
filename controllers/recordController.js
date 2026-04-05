const FinancialRecord = require("../model/financialrecord-model");

// CREATE RECORD
const createRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET RECORDS (Pagination + Search + Filter)
const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate, q, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (q) {
      filter.description = { $regex: q, $options: "i" };
    }

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 20;
    const skip = (pageNumber - 1) * pageSize;

    const records = await FinancialRecord.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize);

    const total = await FinancialRecord.countDocuments(filter);

    res.json({
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      records
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RECORD
const updateRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE RECORD
const deleteRecord = async (req, res) => {
  try {
    const record = await FinancialRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      message: "Record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
};