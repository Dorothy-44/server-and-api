const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'items.json');

function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
