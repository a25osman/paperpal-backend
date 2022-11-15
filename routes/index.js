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

  // PUT /api/groceries/:grocery_id
  router.put("/groceries/:grocery_id", (req, res) => {
    const updatedGroceryItem = req.body.item
    const grocery_id = req.params.grocery_id
    db.query(
      `UPDATE groceries SET item = '$1' WHERE id = $2;`,
      [updatedGroceryItem, grocery_id]
    )
  })

  // POST /api/groceries
  router.post("/groceries", (req, res) => {
    const newGroceryItem = req.body.groceryItem
    db
      .query(
        `INSERT INTO groceries (item) VALUES($1);`,
        [newGroceryItem]
      )
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err));
  })

  // DELETE /api/groceries/:grocery_id
  router.delete("/groceries/:grocery_id", (req, res) => {
    const grocery_id = req.params.grocery_id
    db.query(
      `DELETE FROM groceries WHERE id = $1;`,
      [grocery_id]
    )
  })

  return router;
};
