const salesRouter = require("express").Router();
const { response } = require("express");
const Sales = require("../models/sales");
const User = require("../models/users");
const jwt = require('jsonwebtoken')

salesRouter.get("/", async (req, res) => {
  const sales = await Sales.find({}).populate();
  res.json(sales);
});

salesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    
    Sales.findById(id).then(sale => {
        if (sale) return
    })
});

salesRouter.post("/", async (req, res) => {
  const { firstname, lastname, phone, email, ticket, userId, paymentMethod } =
    req.body;

  const user = await User.findById(userId);

  const sale = new Sales({
    firstname,
    lastname,
    phone,
    email,
    ticket,
    user: user.userId,
    paymentMethod,
  });

  let token = ''
  
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.split(' ')[1]
  }

  let decodedToken = {}
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (e) {}

  if(!token || !decodedToken.userId) {
    return response.status(401).json({ERROR: 'token missing'})
  }

  try {
    const savedSale = await sale.save();
    user.sales = user.sales.concat(savedSale.id);
    await user.save();

    res.json(savedSale);
  } catch (error) {
    res.json(error);
  }
});

module.exports = salesRouter;
