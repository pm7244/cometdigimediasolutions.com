const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallwebcareer = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT * FROM web_career WHERE status >= 0"
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

const getbyidwebcareer = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const data = await connection.query(
      "SELECT * FROM web_career WHERE c_id = ?",
      [c_id]
    );

    if (data[0][0]?.c_id) {
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

const createwebcareer = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_title,
      hero_image,
      career_title,
      meta_title,
      meta_des,
      status,
      list_img,
    } = req.body;

    const listImgStr = Array.isArray(list_img) ? JSON.stringify(list_img) : list_img;

    const data = await connection.query(
      `INSERT INTO web_career 
        (hero_title, hero_image, career_title, meta_title, meta_des, status, list_img, ip) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [hero_title, hero_image, career_title, meta_title, meta_des, status, listImgStr, clientIP]
    );

    res.status(200).json({
      status: true,
      data: data[0],
      ip: clientIP,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updatebyidwebcareer = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { c_id } = req.params;

    if (!c_id) {
      return res.status(400).json({
        status: false,
        message: "ID not present",
      });
    }

    const {
      hero_title,
      hero_image,
      career_title,
      meta_title,
      meta_des,
      status,
      list_img,
    } = req.body;

    const listImgStr = Array.isArray(list_img) ? JSON.stringify(list_img) : list_img;

    const data = await connection.query(
      `UPDATE web_career SET 
         hero_title = ?, 
         hero_image = ?, 
         career_title = ?, 
         meta_title = ?, 
         meta_des = ?, 
         status = ?, 
         list_img = ?, 
         ip = ?
       WHERE c_id = ?`,
      [hero_title, hero_image, career_title, meta_title, meta_des, status, listImgStr, clientIP, c_id]
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
        message: "Failed to update or no changes detected",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const deletebyidwebcareer = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      return res.status(400).json({
        status: false,
        message: "ID not present",
      });
    }

    const data = await connection.query(
      "UPDATE web_career SET status = -1 WHERE c_id = ?",
      [c_id]
    );

    if (data[0].affectedRows) {
      return res.json({
        status: true,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Wrong ID or record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updatebyidwebcareerstatus = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "UPDATE web_career SET status = ? WHERE c_id = ?",
      [status, c_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "Status updated successfully",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to update status or no changes detected",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  getallwebcareer,
  getbyidwebcareer,
  createwebcareer,
  updatebyidwebcareer,
  deletebyidwebcareer,
  updatebyidwebcareerstatus,
};
