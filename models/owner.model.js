const { executeQuery, executeQueryUnique } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from owners');
}

const getById = (id) => {
    return executeQueryUnique('select * from owners where owners.id = ?', [id]);
}

const update = (owner) => {

    let query = 'UPDATE owners SET ';

    for (property in owner) {
        query += `${property} = '${owner[property]}', `
    };

    query = query.substring(0, query.length - 2);
    query += ` WHERE owners.id = ${owner.id};`;

    return executeQuery(query)
}

module.exports = {
    getAll,
    getById,
    update
}