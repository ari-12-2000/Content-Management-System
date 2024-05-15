const db = require("../db");

module.exports.getAllUsers = async () => {
  const [records] = await db.query("SELECT * FROM users");
  return records;
};

module.exports.getUserById = async (id) => {
  const [[record]] = await db.query("SELECT * FROM users WHERE id = ?", [id]); // to prevent sql injection this statement is like this. otherwise 'db.query("SELECT * FROM employees WHERE id ="+id)' also would have worked

  return record;
};

module.exports.deleteUser = async (id) => {
  const [{ affectedRows }] = await db.query("DELETE FROM users WHERE id = ?", [
    id,
  ]);
  return affectedRows;
};

module.exports.addOrEditUser = async (obj, id = 0) => {
  const [
    [[{ affectedRows }]],
  ] = await db.query("CALL usp_user_add_or_edit(?,?,?,?,?,?)", [
    id,
    obj.image,
    obj.name,
    obj.email,
    obj.number,
    obj.DateOfBirth,
  ]);
  return affectedRows;
};
