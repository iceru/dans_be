const db = require("../models/index");

const getAll = (req, res) => {
  const { location, description, full_time } = req.query;
  console.log(location);

  const where = {};
  if (location) {
    where.location = location;
  }
  if (description) {
    where.description = { [db.Sequelize.Op.like]: `%${description}%` };
  }
  if (full_time) {
    where.type = "Full Time";
  }
  db.Position.findAll({ where })
    .then((data) => {
      res.send(data);
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
