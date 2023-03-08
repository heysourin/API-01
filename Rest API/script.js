const express = require("express");
const { func } = require("joi");
const Joi = require("joi");
const app = express(); // Creating an express application on the top of express
app.use(express.json());

//Give data to the server

const customers = [
  { title: "George", id: 1 },
  { title: "Josh", id: 2 },
  { title: "Tyles", id: 3 },
  { title: "Alice", id: 4 },
  { title: "Bob", id: 5 },
];

//READ: Request handlers: using 'get' method
//display the msg when the URL consists of '/'
app.get("/", (req, res) => {
  res.send("Welcome to My Page");
});

//Display the list of customers when URL consist of api customers
app.get("/api/customers", (req, res) => {
  res.send(customers);
});

//displeay the information of a specific customer by mentioning their id. eg: "api/customers/2"
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));

  //If no valid customer id then show error
  if (!customer) res.status(404).send("<h2>Not found!</h2>");
  res.send(customer);
});

//CREATE new handler: Using 'post' method
//CREATE New customer information
app.post("/api/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //increamenting customer id
  const customer = {
    id: customers.length + 1,
    title: req.body.title,
  };

  customers.push(customer);
  req.send(customer);
});

//UPDATE Request handler: 'put' methhod
//Update existing customer info

app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) res.status(404).send("<h2>Not found!</h2>");
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  customer.title = req.body.title;
  res.send(customer);
});

//DELETE Request handler: 'delete' method
//DELETE customer details
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) res.status(404).send("<h2>Not found!</h2>");

  const index = customers.indexOf(customer);
  customers.splice(index, 1);
  res.send(customer);
});

//Validate information
function validateCustomer(customer) {
  const schema = {
    title: Joi.string().min(3).required(),
  };
  return Joi.validate(customer, schema);
}

//PORT env Var
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
