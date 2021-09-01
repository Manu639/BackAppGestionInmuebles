const { executeQuery } = require("./helpers");

const getAll = () => {
    return executeQuery('select * from properties');
}

module.exports = {
    getAll
}