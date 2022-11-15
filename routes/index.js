const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET /api/groceries
  router.get("/groceries", (req, res) => {
    db.query(`SELECT * FROM groceries ORDER BY id DESC;`)
      .then(data => {
        res.json(data.rows)
      })
      .catch (err => console.log(err));
  })

  // PUT /api/groceries/:grocery_id
  router.put("/groceries/:grocery_id", (req, res) => {
    const updatedGroceryItem = req.body.item
    const updatedQty = Math.floor(req.body.qty)
    const grocery_id = req.params.grocery_id
    db
      .query(
        `UPDATE groceries SET item = $1, qty = $2 WHERE id = $3 RETURNING *;`,
        [updatedGroceryItem, updatedQty, grocery_id]
      )
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err));
  })

  // POST /api/groceries
  router.post("/groceries", (req, res) => {
    const newGroceryItem = req.body.groceryItem
    db
      .query(
        `INSERT INTO groceries (item) VALUES($1) RETURNING id;`,
        [newGroceryItem]
      )
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err));
  })

  // DELETE /api/groceries/:grocery_id
  router.delete("/groceries/:grocery_id", (req, res) => {
    const grocery_id = req.params.grocery_id
    db
      .query (
        `DELETE FROM groceries WHERE id = $1;`,
        [grocery_id]
      )
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json(err));
  })

  return router;
};
