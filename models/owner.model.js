const { executeQuery } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from owners');
}

const getById = (id) => {
    return executeQuery('select * from owners where owners.id = ?', [id]);
}

module.exports = {
    getAll,
    getById
}