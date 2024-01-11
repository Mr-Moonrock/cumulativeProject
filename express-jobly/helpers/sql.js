const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Generates SQL syntax for a partial update in the database.
 * 
 * @param {object} dataToUpdate - Object containing the fields to be updated with their new values.
 * @param {object} jsToSql - Optional object mapping JS object keys to Sql column names.
 * @returns {object} = An object containing setCols and values properties for Sql update queries.
 * @throws {BadRequestError} - Throws error if no data is provided for update.
 * 
 * 
 * Example: 
 * For input: {firstName: 'Aliya', age: 32}, and {firstName: 'first_name'}
 * Output: { setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
