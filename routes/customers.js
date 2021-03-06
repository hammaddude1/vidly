const auth = require("../middleware/auth");
const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort("name");

  if (!customers) res.status(404).send("No Customer Present");

  res.send(customers);
});

router.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) res.status(404).send("Customer Not Found");

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();

  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).res.send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { isGold: req.body.isGold, name: req.body.name, phone: req.body.phone },
    { new: true }
  );

  if (!customer) res.status(404).res.send("Customer Not Found");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) res.status(404).send("Customer Not Found");

  res.send(customer);
});

module.exports = router;
