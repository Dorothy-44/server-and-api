const { readData, writeData } = require('./utils');

// Helper for consistent response
function response(success, data = null, message = '') {
  return { success, data, message };
}

// Validation 
function validateItem(item) {
  const { name, price, size } = item;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'Name is required and must be a string';
  }

  // convert price to number
  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return 'Price must be a number greater than 0';
  }
  item.price = numericPrice; // normalize to number

  if (!['s', 'm', 'l'].includes(size)) {
    return 'Size must be one of: s, m, l';
  }

  return null; 
}

function createItem(item) {
  const error = validateItem(item);
  if (error) return response(false, null, error);

  const items = readData();
  const id = Date.now().toString(); // unique id
  const newItem = { id, ...item };
  items.push(newItem);
  writeData(items);
  return response(true, newItem, 'Item created successfully');
}

function getAllItems() {
  const items = readData();
  return response(true, items, 'All items fetched');
}

function getItem(id) {
  const items = readData();
  const item = items.find(i => i.id === id);
  if (!item) return response(false, null, 'Item not found');
  return response(true, item, 'Item fetched');
}

function updateItem(id, updatedFields) {
  const items = readData();
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return response(false, null, 'Item not found');

  const current = items[index];
  const updatedItem = { ...current, ...updatedFields };

  const error = validateItem(updatedItem);
  if (error) return response(false, null, error);

  items[index] = updatedItem;
  writeData(items);
  return response(true, items[index], 'Item updated successfully');
}

function deleteItem(id) {
  const items = readData();
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return response(false, null, 'Item not found');

  const deleted = items.splice(index, 1)[0];
  writeData(items);
  return response(true, deleted, 'Item deleted successfully');
}

module.exports = { createItem, getAllItems, getItem, updateItem, deleteItem };
