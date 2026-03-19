const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

// Get all services
const getallwebservice = async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM web_service WHERE status >= 0"
    );

    if (rows.length > 0) {
      res.status(200).json({ status: true, data: rows });
    } else {
      res.status(404).json({ status: false, message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Get service by ID
const getbyidwebservice = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(400).json({ status: false, message: "ID not provided" });
    }

    const [rows] = await connection.query(
      "SELECT * FROM web_service WHERE s_id = ?",
      [s_id]
    );

    if (rows.length > 0) {
      return res.json({ status: true, data: rows[0] });
    } else {
      return res.status(404).json({ status: false, message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Create service
const createwebservice = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_title,
      hero_image,
      service_title,
      list_img,
      meta_title,
      meta_des,
      status
    } = req.body;

    const [result] = await connection.query(
      "INSERT INTO web_service (hero_title, hero_image, service_title, list_img, meta_title, meta_des, status, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        hero_title,
        hero_image,
        service_title,
        list_img,
        meta_title,
        meta_des,
        status,
        clientIP
      ]
    );

    res.status(200).json({
      status: true,
      message: "Service created successfully",
      ip: clientIP
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update service by ID
const updatebyidwebservice = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(400).json({ status: false, message: "ID not provided" });
    }

    const {
      hero_title,
      hero_image,
      service_title,
      list_img,
      meta_title,
      meta_des,
      status
    } = req.body;

    const [result] = await connection.query(
      "UPDATE web_service SET hero_title=?, hero_image=?, service_title=?, list_img=?, meta_title=?, meta_des=?, status=?, ip=? WHERE s_id=?",
      [
        hero_title,
        hero_image,
        service_title,
        list_img,
        meta_title,
        meta_des,
        status,
        clientIP,
        s_id
      ]
    );

    if (result.changedRows) {
      res.status(200).json({ status: true, message: "Updated successfully", ip: clientIP });
    } else {
      res.status(404).json({ status: false, message: "No changes or wrong ID" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Delete service by ID (soft delete)
const deletebyidwebservice = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(400).json({ status: false, message: "ID not provided" });
    }

    const [result] = await connection.query(
      "UPDATE web_service SET status=-1 WHERE s_id=?",
      [s_id]
    );

    if (result.affectedRows) {
      res.json({ status: true, message: "Deleted successfully" });
    } else {
      res.status(404).json({ status: false, message: "Wrong ID" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// Update only status
const updatebyidwebservicestatus = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(400).json({ status: false, message: "ID not provided" });
    }

    const { status } = req.body;

    const [result] = await connection.query(
      "UPDATE web_service SET status=? WHERE s_id=?",
      [status, s_id]
    );

    if (result.changedRows) {
      res.json({ status: true, message: "Status updated successfully" });
    } else {
      res.status(404).json({ status: false, message: "Failed to update" });
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = {
  getallwebservice,
  getbyidwebservice,
  createwebservice,
  updatebyidwebservice,
  deletebyidwebservice,
  updatebyidwebservicestatus
};
