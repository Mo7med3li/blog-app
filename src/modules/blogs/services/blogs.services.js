import connection from "../../../db/db.connection.js";

// create blog
export const createBlog = (req, res) => {
  const { title, content, authorId } = req.body;
  const findAuthor = `select * from users where u_id=?`;
  const sql = `INSERT INTO blogs (b_title,b_content,b_author_id) VALUES (?,?,?)`;
  connection.execute(findAuthor, [authorId], (err, result) => {
    if (err) return res.status(500).json({ message: "error", err });
    if (result.length == 0)
      return res.status(400).json({ message: "author not found" });

    connection.execute(sql, [title, content, authorId], (err, data) => {
      if (err) return res.status(500).json({ message: "error", err });
      res.status(201).json({ message: "blog added successfully", data });
    });
  });
};

// get all blogs
export const getAllBlogs = (req, res) => {
  const { searchKey } = req.query;

  const sql = `select users.u_firstName as authorName,users.u_email as authorEmail,users.u_gender as authorGender,blogs.* from users inner join blogs on users.u_id = blogs.b_author_id ${searchKey ? `where b_title like ?` : ""}`;
  connection.execute(sql, [`%${searchKey}%`], (err, result) => {
    if (err) return res.status(500).json({ message: "error", err });
    res.json({ message: "success", blogs: result });
  });
};

// get single blog
export const getSingleBlog = (req, res) => {
  const { id } = req.params;

  const sql = `select users.u_firstName as authorName,users.u_email as authorEmail,users.u_gender as authorGender,blogs.* from users inner join blogs on users.u_id = blogs.b_author_id where b_id=?`;
  connection.execute(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "error", err });
    if (result.length == 0)
      return res.status(404).json({ message: "blog not found" });
    res.json({ message: "success", blog: result });
  });
};

// update blog
export const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const sql = `update blogs set b_title=?,b_content=? where b_id=?`;
  connection.execute(sql, [title, content, id], (err, result) => {
    if (err) return res.status(500).json({ message: "error", err });
    result.affectedRows == 0
      ? res.status(404).json({ message: "blog not found" })
      : res.json({ message: "blog updated successfully" });
  });
};

// delete blog
export const deleteBlog = (req, res) => {
  const { id } = req.params;
  const sql = `delete from blogs where b_id=?`;
  connection.execute(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "error", err });
    result.affectedRows == 0
      ? res.status(404).json({ message: "blog not found" })
      : res.json({ message: "blog deleted successfully" });
  });
};
