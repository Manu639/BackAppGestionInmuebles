const { executeQuery } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from properties');
}

const getById = (id) => {
    return executeQuery('select * from properties where properties.id = ?', [id]);
}

const getByType = (typeId) => {
    return executeQueryUnique('select * from properties where properties.type = ?', [typeId]);
}

module.exports = {
    getAll,
    getById,
    getByType
}