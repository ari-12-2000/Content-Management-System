const express = require("express"),
  router = express.Router();

const { validateUser, validateUpdatedUser, validate } = require("../helpers/validation");
const service = require("../services/user.service");

//http://localhost:3000/api/Users/
router.get("/", async (req, res) => {
  const users = await service.getAllUsers();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await service.getUserById(req.params.id);
  if (user == undefined)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send(user);
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteUser(req.params.id);
  if (affectedRows == 0)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send("deleted successfully.");
});

router.post("/", validateUser, validate, async (req, res) => {
  await service.addOrEditUser(req.body);
  res.status(201).send("created successfully.");
});

router.put("/:id", validateUpdatedUser, validate, async (req, res) => {
  const affectedRows = await service.addOrEditUser(req.body, req.params.id);
  if (affectedRows == 0)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send("updated successfully.");
});

module.exports = router;
