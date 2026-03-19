const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallwebproject = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT * FROM web_project WHERE status >= 0"
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
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

const getbyidwebproject = async (req, res) => {
  try {
    const { p_id } = req.params;
    if (!p_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "SELECT * FROM web_project WHERE p_id = ?",
      [p_id]
    );
    if (data[0][0]?.p_id) {
      return res.json({
        status: true,
        data: data[0],
      });
    } else {
      return res.json({
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

const createwebproject = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_title,
      meta_title,
      meta_des,
      status
    } = req.body;

    // Insert only the requested columns (p_id is auto-increment, so don't insert it)
    const data = await connection.query(
      `INSERT INTO web_project 
       (hero_title, meta_title, meta_des, status, ip) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        hero_title,
        meta_title,
        meta_des,
        status,
        clientIP
      ]
    );

    res.status(200).json({
      status: true,
      data: data[0],  // this usually contains insertId and affectedRows
      ip: clientIP,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const updatebyidwebproject = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { p_id } = req.params;
    if (!p_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const { hero_title, meta_title, meta_des, status } = req.body;

    const data = await connection.query(
      `UPDATE web_project SET 
        hero_title = ?, 
        meta_title = ?, 
        meta_des = ?, 
        status = ?, 
        ip = ?
       WHERE p_id = ?`,
      [hero_title, meta_title, meta_des, status, clientIP, p_id]
    );

    if (data[0].changedRows) {
      return res.status(200).json({
        status: true,
        ip: clientIP,
        message: "Successfully updated",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const deletebyidwebproject = async (req, res) => {
  try {
    const { p_id } = req.params;
    if (!p_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_project SET status = -1 WHERE p_id = ?",
      [p_id]
    );

    if (data[0].affectedRows) {
      return res.json({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      error: error.message,
    });
  }
};

const updatebyidwebprojectstatus = async (req, res) => {
  try {
    const { p_id } = req.params;
    if (!p_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "UPDATE web_project SET status = ? WHERE p_id = ?",
      [status, p_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "Status updated successfully",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getallwebproject,
  getbyidwebproject,
  createwebproject,
  updatebyidwebproject,
  deletebyidwebproject,
  updatebyidwebprojectstatus,
};
