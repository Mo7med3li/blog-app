import connection from "../../../db/db.connection.js";

export const getAllUsers = (req, res, next) => {
  const { searchKey } = req.query;
  const query = `select * from users ${searchKey ? "where u_firstName like ?" : ""}`;
  connection.execute(query, ["%" + searchKey + "%"], (err, result) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      res.status(200).json({ message: "success", users: result });
    }
  });
};

export const getUserProfile = (req, res, next) => {
  const { id } = req.params;
  const findUserQuery = `select u_id, u_email,concat(u_firstName, ' ',u_middleName, ' ',u_lastName) as fullName, Convert(DATEDIFF(now(),u_DOB)/365,int) as age ,u_gender from users where u_id=?`;

  connection.execute(findUserQuery, [id], (err, data) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      res.json({ message: "success", user: data });
    }
  });
};

export const updateUserProfile = (req, res, next) => {
  const { id } = req.params;
  const { dateOfBirth, firstName, middleName, lastName, gender } = req.body;

  const updateQuery =
    "update users set u_DOB=?,u_firstName=?,u_middleName=?,u_lastName=?,u_gender=? where u_id=?";
  connection.execute(
    updateQuery,
    [dateOfBirth, firstName, middleName, lastName, gender, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: "error", error: err.message });
      } else {
        console.log(result);

        result.affectedRows === 0
          ? res.status(404).json({ message: "user not found" })
          : res.status(200).json({ message: "user updated successfully" });
      }
    },
  );
};

export const deleteUserProfile = (req, res, next) => {
  const { id } = req.params;
  const deleteQuery = "delete from users where u_id=?";
  connection.execute(deleteQuery, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      console.log(result);

      result.affectedRows === 0
        ? res.status(404).json({ message: "user not found" })
        : res.status(200).json({ message: "user deleted successfully" });
    }
  });
};
