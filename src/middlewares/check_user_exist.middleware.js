import connection from "../db/db.connection.js";
export const checkUserExist = (req, res, next) => {
  const { id } = req.params;
  const query = `select * from users where u_id=?`;
  connection.execute(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ message: "user not found" });
      }
      next();
    }
  });
};
