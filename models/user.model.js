const { executeQuery, executeQueryUnique } = require("../assets/helpers");

const create = ({ email, password, role_id, name, last_name }) => {
    return executeQueryUnique('INSERT INTO users (email, password, role_id, name, last_name) VALUES (?, ?, ?, ?, ?)', [email, password, role_id, name, last_name])
}

const getByEmail = (email) => {
    return executeQueryUnique('SELECT * FROM users WHERE users.email = ?', [email])
}

const getRoles = () => {
    return executeQuery('SELECT * FROM roles')
}

const getRoleByName = (role) => {
    return executeQueryUnique('SELECT * FROM roles WHERE roles.name === ?', [role])
}

module.exports = { create, getByEmail, getRoles, getRoleByName }