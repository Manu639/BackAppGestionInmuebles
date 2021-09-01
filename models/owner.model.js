const { executeQuery } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from owners');
}

module.exports = {
    getAll
}