class ItemView {
  showItems(items) {
    return {
      success: true,
      message: "Query Success",
      data: items,
      error: false,
    };
  }

  addedItem(item) {
    return {
      success: true,
      message: "Item has been added successfully",
      data: item,
      error: false,
    };
  }

  updatedItem(item) {
    return {
      success: true,
      message: "Item has been updated successfully",
      data: item,
      error: false,
    };
  }

  deletedItem() {
    return {
      success: true,
      message: "Item has been deleted successfully",
      error: false,
    };
  }

  showError(errorMessage) {
    return {
      success: false,
      message: errorMessage,
      error: true,
    };
  }
}

// This is just a random comment

module.exports = ItemView;
