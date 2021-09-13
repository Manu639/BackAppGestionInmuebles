const { executeQuery, executeQueryUnique } = require("../assets/helpers");

const getAll = () => {
    return executeQuery('select * from owners');
}

const getByUser = (userId) => {
    return executeQuery('SELECT o.* FROM users_owners as uo JOIN owners as o ON uo.owner_id = o.id WHERE uo.user_id = ?;', [userId])
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
    getByUser,
    getById,
    update
}