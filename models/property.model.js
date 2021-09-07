const { executeQuery, executeQueryUnique } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from properties');
}

const getById = (id) => {
    return executeQueryUnique('select * from properties where properties.id = ?', [id]);
}

const getByType = (typeId) => {
    return executeQuery('select * from properties where properties.type = ?', [typeId]);
}

const update = (property) => {

    let query = 'UPDATE properties SET ';

    for (key in property) {
        query += `${key} = '${property[key]}', `
    };

    query = query.substring(0, query.length - 2);
    query += ` WHERE properties.id = ${property.id};`;

    return executeQuery(query)
}

module.exports = {
    getAll,
    getById,
    getByType,
    update
}