const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /api/groceries
  router.get("/groceries", (req, res) => {
    db.query(`SELECT * FROM groceries;`)
      .then(data => {
        res.json(data.rows)
      })
      .catch (err => console.log(err));
  })

  // PUT /api/groceries/:groceries_id
  router.put("/groceries/:grocery_id", (req, res) => {
    const item = req.body.item
    const id = req.params.grocery_id
    db.query(
      `UPDATE groceries SET item = '$1' WHERE id = $2;`,
      [item, id]
    )
  })

  // POST /api/groceries
  router.post("/groceries", (req, res) => {
    const item = req.body.item
    db.query(
      `INSERT INTO groceries (item) VALUES($1);`,
      [item]
    )      
  })

  // DELETE /api/groceries
  router.delete("/groceries/:grocery_id", (req, res) => {
    const id = req.params.grocery_id
    db.query(
      `DELETE FROM groceries WHERE id = $1;`,
      [id]
    )
  })

  return router;
};
