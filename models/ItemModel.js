const fs = require("fs");

class ItemModel {
  db;
  items = [];

  getItems() {
    const database = fs.readFileSync("database.json").toString();
    this.db = JSON.parse(database);
    this.items = this.db.items;
    return this.items;
  }

  saveToDB() {
    this.db.items = this.items;
    fs.writeFileSync("database.json", JSON.stringify(this.db));
  }

  getItem(itemId) {
    this.getItems();
    const item = this.items.filter((item) => item.id == itemId)[0];
    return item;
  }

  addItem(item) {
    this.getItems();
    this.items.push(item);
    this.saveToDB();
    return item;
  }

  updateItem(itemId, item) {
    this.getItems();
    const index = this.items.findIndex((item) => item.id == itemId);
    const oldItem = this.items[index];
    this.items[index] = { ...oldItem, ...item };
    this.saveToDB();
    return this.items[index];
  }

  deleteItem(itemId) {
    this.getItems();
    const index = this.items.findIndex((item) => item.id == itemId);
    if (index < 0) {
      return false;
    }
    this.items.splice(index, 1);
    this.saveToDB();
    return true;
  }
}

module.exports = ItemModel;