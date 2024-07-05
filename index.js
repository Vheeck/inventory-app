const express = require("express");
const ItemController = require("./controllers/ItemController");

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

const itemController = new ItemController();

// Web App Route

app.get("/", itemController.getItemsView);

app.get("/add", itemController.getAddPage);

app.post("/add", itemController.addItemView);

app.get("/delete/:id", itemController.deleteItemView);

app.get("/edit/:id", itemController.getUpdatePage);

app.post("/edit/:id", itemController.updateItemView);

// REST API End Points

app.get("/items", itemController.getItems);

app.get("/item/:id", itemController.getItem);

app.post("/items", itemController.addItem);

app.put("/items", itemController.updateItem);

app.delete("/item/:id", itemController.deleteItem);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
