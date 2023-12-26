const fs = require("fs");
const { promises: fsp } = require("fs");
const { dirname } = require("../utils");

const getDataFile = (name) => {
    try {
        const ruta = `${dirname}/db/${name}.json`;
        if(fs.existsSync(ruta)) {
            return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
        } else {
            fs.writeFileSync(ruta, 'utf-8');
            return [];
        }
    } catch (error) {
        console.log(console.log(error));
    }
}

const createNewItem = (name, newItem) => {
    try {
        const allItems = getDataFile(name)
        const newId = allItems.length > 0 ? Math.max(...allItems.map(item => item.id)) + 1 : 1;
        newItem.id = newId;
        allItems.push(newItem);
        safeFile(name, allItems);
    } catch (error) {
        console.log(console.log(error));
    }
}

const safeFile = async (name, items) => {
    try {
        const ruta = `${dirname}/db/${name}.json`;
        const data = JSON.stringify(items, null, 2);
        await fsp.writeFile(ruta, data, 'utf-8');
    } catch (error) {
        console.log(console.log(error));
    }
}

module.exports = {getDataFile, createNewItem, safeFile}