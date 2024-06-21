const ItemView = require("../views/ItemView");
const ItemModel = require("../models/ItemModel");

class ItemController {
  view;
  model;

  constructor() {
    this.view = new ItemView();
    this.model = new ItemModel();
  }

  getItemsView = (req, res) => {
    const items = this.model.getItems();
    res.render("index", { items });
  };

  getAddPage = (req, res) => {
    const error = { name: "", quantity: "" };
    const data = { name: "", quantity: "" };
    res.render("add", { error, data });
  };

  getUpdatePage = (req, res) => {
    const itemId = req.params.id;
    const item = this.model.getItem(itemId);

    const error = { name: "", quantity: "" };
    const data = item;

    res.render("edit", { error, data });
  };

  updateItemView = (req, res) => {
    const itemId = req.params.id;
    const item = req.body;
    
    const error = { name: "", quantity: "" };

    if (!item.name) {
      error.name = "Please enter the name";
    }

    if (!item.quantity) {
      error.quantity = "Please enter the quantity";
    }

    if (item.name && item.quantity) {
      this.model.updateItem(itemId, item);
      return res.redirect("/");
    }

    return res.render("edit", {
      error,
      data: { name: item.name ?? "", quantity: item.quantity ?? "" },
    });
  }

  generateID = () => {
    return (
      "IT" +
      Math.round(Math.random() * 1000)
        .toString()
        .padStart(4, "0")
    );
  };

  addItemView = (req, res) => {
    const item = req.body;

    const error = { name: "", quantity: "" };

    if (!item.name) {
      error.name = "Please enter the name";
    }

    if (!item.quantity) {
      error.quantity = "Please enter the quantity";
    }

    if (item.name && item.quantity) {
      item.id = this.generateID();
      this.model.addItem(item);
      return res.redirect("/");
    }

    return res.render("add", {
      error,
      data: { name: item.name ?? "", quantity: item.quantity ?? "" },
    });
  };

  deleteItemView = (req, res) => {
    const itemId = req.params.id;

    const exists = this.model.getItem(itemId);

    if (exists) {
      this.model.deleteItem(itemId);
    }

    res.redirect("/");
  };

  getItems = (req, res) => {
    res.send(this.view.showItems(this.model.getItems()));
  };

  getItem = (req, res) => {
    const itemId = req.params.id;
    const item = this.model.getItem(itemId);
    const view = this.view.showItems(item);
    res.status(200).send(view);
  };

  addItem = (req, res) => {
    const item = req.body;

    if (!item.name) {
      res.status(400).send(this.view.showError("Please enter the 'name'")); //Send an error
    } else if (!item.quantity) {
      res.status(400).send(this.view.showError("Please enter the 'quantity'")); // send an error
    } else {
      item.id = this.generateID();

      this.model.addItem(item);

      res.status(201).send(this.view.addedItem(item));
    }
  };

  updateItem = (req, res) => {
    const item = req.body;

    if (!item.id) {
      const view = this.view.showError("Please enter the item 'id'");
      return res.status(400).send(view);
    }

    const exists = this.model.getItem(item.id);

    if (!exists) {
      const view = this.view.showError("Please enter a valid item 'id'");
      return res.status(400).send(view);
    }

    if (!item.name && !item.quantity) {
      const view = this.view.showError(
        "Please enter a new 'quantity' or 'name'"
      );
      return res.status(400).send(view);
    }

    const newItem = {};

    if (item.name) {
      newItem.name = item.name;
    }

    if (item.quantity) {
      newItem.quantity = item.quantity;
    }

    this.model.updateItem(item.id, newItem);

    const updatedItem = this.model.getItem(item.id);

    const view = this.view.updatedItem(updatedItem);

    res.status(200).send(view);
  };

  deleteItem = (req, res) => {
    const item = req.params;

    if (!item.id) {
      const view = this.view.showError("Please enter the item 'id'");
      return res.status(400).send(view);
    }

    const exists = this.model.getItem(item.id);

    if (!exists) {
      const view = this.view.showError("Please enter a valid item 'id'");
      return res.status(400).send(view);
    }

    const deleted = this.model.deleteItem(item.id);

    if (deleted) {
      const view = this.view.deletedItem();
      res.status(200).send(view);
    } else {
      const view = this.view.showError("Item could not be deleted");
      res.status(500).send(view);
    }
  };
}

module.exports = ItemController;
