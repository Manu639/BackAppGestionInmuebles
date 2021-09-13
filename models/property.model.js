const { executeQuery, executeQueryUnique } = require("../assets/helpers");

const getByUser = (userId) => {
    return executeQuery('SELECT p.* FROM users_owners as uo JOIN owners_properties as op ON uo.owner_id = op.owner_id  JOIN properties as p ON op.property_id = p.id WHERE uo.user_id = ?;', [userId]);
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
    getByUser,
    getById,
    getByType,
    update
}