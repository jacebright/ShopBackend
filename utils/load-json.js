const fs = require('fs');

const loadJson = (path) => {
    return JSON.parse(fs.readFileSync(path, {encoding: 'utf-8'}));
}

module.exports = loadJson;