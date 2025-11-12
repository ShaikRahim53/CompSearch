import express from "express";
import { Company } from "../models/Company.js";

const router = express.Router();

// GET api
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      location = "",
      industry = "",
      sortBy = "",
      sortOrder = "",
      page = "1",
      limit = "10",
    } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const filter = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (location) {
      filter.location = location;
    }
    if (industry) {
      filter.industry = industry;
    }

    let items = [];
    const total = await Company.countDocuments(filter);

    if (!sortBy || sortBy === "random") {
      items = await Company.aggregate([
        { $match: filter },
        { $addFields: { rand: { $rand: {} } } },
        { $sort: { rand: 1 } },
        { $skip: (pageNum - 1) * pageSize },
        { $limit: pageSize },
      ]);
    } else {
      const sort = {};
      const safeSortBy = ["name", "location", "industry", "createdAt"].includes(
        sortBy
      )
        ? sortBy
        : "name";
      const safeSortOrder = sortOrder === "desc" ? -1 : 1;
      sort[safeSortBy] = safeSortOrder;

      items = await Company.find(filter)
        .sort(sort)
        .skip((pageNum - 1) * pageSize)
        .limit(pageSize)
        .lean();
    }

    const uniqueLocations = await Company.distinct("location");
    const uniqueIndustries = await Company.distinct("industry");

    res.json({
      data: items,
      meta: {
        total,
        page: pageNum,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        locations: uniqueLocations.filter(Boolean).sort(),
        industries: uniqueIndustries.filter(Boolean).sort(),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
