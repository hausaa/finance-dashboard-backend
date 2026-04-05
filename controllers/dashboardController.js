const FinancialRecord = require("../model/financialrecord-model");

const getSummary = async (req, res) => {
  try {
    const result = await FinancialRecord.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach(item => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpense = item.total;
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const categorySummary = async (req, res) => {
  try {
    const data = await FinancialRecord.aggregate([
      {
        $match: { type: "expense" }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const monthlyTrend = async (req, res) => {
  try {
    const data = await FinancialRecord.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const recentActivity = async (req, res) => {
  try {
    const records = await FinancialRecord.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSummary,
  categorySummary,
  monthlyTrend,
  recentActivity
};

