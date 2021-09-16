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

const create = (owner) => {
    let { name, last_name, phone, email, identification_number, personal_address, tax_address, birth_date } = owner
    return executeQuery('INSERT INTO owners (name, last_name, phone, email, identification_number, personal_address, tax_address, birth_date) VALUES(?, ?, ?, ?, ?, ?, ?, ?);', [name, last_name, phone, email, identification_number, personal_address, tax_address, birth_date])
}

const createUserOwnerIndex = (userId, ownerId) => {
    return executeQuery('INSERT INTO users_owners (user_id, owner_id) VALUES(?, ?);', [userId, ownerId])
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
    createUserOwnerIndex,
    getByUser,
    getById,
    create,
    update
}