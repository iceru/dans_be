const db = require("../models/index");

const getAll = (req, res) => {
  const { location, description, full_time, page = 1, limit = 6 } = req.query;

  const offset = (page - 1) * limit;

  const where = {};
  if (location) {
    where.location = { [db.Sequelize.Op.like]: `%${location}%` };
  }
  if (description) {
    where.description = { [db.Sequelize.Op.like]: `%${description}%` };
  }
  if (full_time) {
    where.type = "Full Time";
  }
  db.Position.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
    .then((result) => {
      const { count, rows } = result;
      const totalPages = Math.ceil(count / limit);
      res.send({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  db.Position.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

module.exports = {
  getAll,
  findOne,
};
