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

const getTypes = () => {
    return executeQuery('select * FROM properties_types')
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

const create = ({ alias, address, lat, lng, type }) => {
    return executeQuery('INSERT INTO properties (alias, address, lat, lng, type, is_shelved) VALUES(?, ?, ?, ?, ?, 1)', [alias, address, lat, lng, type])
}

const createOwnerPropertyIndex = ({ property_id, owner_id, ownership, purchase_date }) => {
    return executeQuery('INSERT INTO owners_properties (owner_id, property_id, ownership, purchase_date) VALUES(?, ?, ?, ?)', [property_id, owner_id, ownership, purchase_date])
}

const getByOwner = (owner_id) => {
    console.log(owner_id)
    return executeQuery('SELECT p.* FROM properties as p, owners_properties as op  WHERE p.id = op.property_id AND op.owner_id = ?', [owner_id])
}

module.exports = {
    getByOwner,
    createOwnerPropertyIndex,
    create,
    getByUser,
    getById,
    getByType,
    update,
    getTypes
}