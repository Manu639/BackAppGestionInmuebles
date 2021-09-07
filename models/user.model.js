const { executeQuery, executeQueryUnique } = require("./helpers");

const create = ({ email, password, rol, phone, tax_address, tax_identification_number }) => {
    return executeQuery('INSERT INTO usuarios (email, password, rol, phone, tax_address, tax_identification_number) VALUES (?, ?, ?, ?, ? ,?)', [email, password, rol, phone, tax_address, tax_identification_number])
}

const getByEmail = (email) => {
    return executeQueryUnique('SELECT * FROM usuarios WHERE usuarios.email = ?', [email])
}

const getRoles = () => {
    return executeQuery('SELECT * FROM roles')
}

module.exports = { create, getByEmail, getRoles }