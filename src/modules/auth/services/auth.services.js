import connection from "../../../db/db.connection.js";

export const signupService = (req, res, next) => {
  const { firstName, middleName, lastName, email, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "password and confirm password must be the same" });
  }

  const findEmailQuery = `select * from users where u_email = ?`;
  connection.execute(findEmailQuery, [email], (err, result) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      if (result.length > 0) {
        return res.status(409).json({ message: "email already exists" });
      }
      const signupQuery = `insert into users (u_firstName,u_lastName,u_middleName,u_email,u_password) values (?,?,?,?,?)`;
      connection.execute(
        signupQuery,
        [firstName, lastName, middleName, email, password],
        (err, result) => {
          if (err) {
            res.status(500).json({ message: "error", error: err.message });
          } else {
            res.status(201).json({ message: "user created successfully" });
          }
        },
      );
    }
  });
};

export const loginService = (req, res, next) => {
  const { email, password } = req.body;
  const findUser = `select * from users where u_email=? and u_password=?`;
  connection.execute(findUser, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: "error", error: err.message });
    } else {
      if (result.length === 0) {
        return res.status(401).json({ message: "incorrect email or password" });
      }
      res
        .status(200)
        .json({ message: "user logged in successfully", user: result[0] });
    }
  });
};
