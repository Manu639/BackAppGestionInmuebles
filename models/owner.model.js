const { executeQuery, executeQueryUnique } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from owners');
}

const getById = (id) => {
    return executeQueryUnique('select * from owners where owners.id = ?', [id]);
}

module.exports = {
    getAll,
    getById
}