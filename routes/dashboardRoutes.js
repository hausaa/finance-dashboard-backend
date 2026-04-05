const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

const {
getSummary,
categorySummary,
monthlyTrend,
recentActivity
} = require("../controllers/dashboardController");

router.get(
"/summary",
auth,
checkRole("admin","analyst","viewer"),
getSummary
);

router.get(
"/category-summary",
auth,
checkRole("admin","analyst"),
categorySummary
);

router.get(
"/monthly-trend",
auth,
checkRole("admin","analyst"),
monthlyTrend
);

router.get(
"/recent",
auth,
checkRole("admin","analyst","viewer"),
recentActivity
);

module.exports = router;