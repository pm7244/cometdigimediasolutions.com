const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

// GET ALL
const getAllblog_content  = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT * FROM blog_content  WHERE status >= 0"
    );

    if (data[0].length > 0) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const getByIdblog_content  = async (req, res) => {
  try {
    const { bc_id} = req.params;
    if (!bc_id) {
      return res.status(400).json({
        status: false,
        message: "ID not provided",
      });
    }

    const data = await connection.query(
      "SELECT * FROM blog_content  WHERE bc_id= ? AND status >= 0",
      [bc_id]
    );

    if (data[0][0]) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const createblog_content = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      blog_id,
      title,
      text,
      quote,
      image,
      video,
      status
    } = req.body;

    const [result] = await connection.query(
      `INSERT INTO blog_content  
        (blog_id, title, text, quote, image, video, status, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [blog_id, title, text, quote, image, video, status, clientIP]
    );

    res.status(201).json({
      status: true,
      message: "blog_content created successfully",
      bc_id: result.insertId,
      blog_id,
      title,
      ip: clientIP
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};


const updatebyidblog_content = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { bc_id } = req.params;

    if (!bc_id) {
      return res.status(400).json({
        status: false,
        message: "blog_content ID is required",
      });
    }

    const { blog_id, title, text, quote, image, video, status } = req.body;

    const [result] = await connection.query(
      `UPDATE blog_content SET 
        blog_id = ?, 
        title = ?, 
        text = ?, 
        quote = ?, 
        image = ?, 
        video = ?, 
        status = ?, 
        ip = ?
      WHERE bc_id = ?`,
      [blog_id, title, text, quote, image, video, status, clientIP, bc_id]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: true,
        message: "blog_content updated successfully",
        bc_id,
        blog_id,
        title,
        ip: clientIP,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No blog_content found with this ID",
        bc_id,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};





const deleteblog_content  = async (req, res) => {
  try {
    const { bc_id} = req.params;
    const data = await connection.query(
      "UPDATE blog_content  SET status = -1 WHERE bc_id= ?",
      [bc_id]
    );

    if (data[0].affectedRows) {
      return res.json({
        status: true,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Invalid ID",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllblog_content ,
   getByIdblog_content ,
createblog_content ,
updatebyidblog_content ,
deleteblog_content ,
};
