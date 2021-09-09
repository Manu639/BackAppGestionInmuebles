
const executeQuery = (sql, arrValues = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            sql, arrValues, (err, result) => {
                if (err) reject(err);
                if (result.length === 0) resolve({ response: 'No se han encontrado registros' });
                resolve(result);
            }
        )
    });
}

const executeQueryUnique = (sql, arrValues = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            arrValues,
            (err, result) => {
                if (err) reject(err);
                if (result.length !== 1) resolve({});
                resolve(result[0]);
            }
        )
    });
}

module.exports = {
    executeQueryUnique, executeQuery
}