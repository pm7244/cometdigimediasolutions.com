const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallcore = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from core_value where status >= 0"
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

const getbyidcore = async (req, res) => {
  try {
    const { core_id  } = req.params;
    if (!core_id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM core_value WHERE core_id  = ? AND status >= 0",
  [core_id ]
);
    if (data[0][0]?.core_id ) {
      return res.json({
        status: true,
        data: data[0],
      });
    } else {
      return res.json({
        status: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const createcore = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      experience,
      title,
      status
    } = req.body;

    const [data] = await connection.query(
      `INSERT INTO core_value (
        experience,
        title,
        ip,
        status
      ) VALUES (?, ?, ?, ?)`,
      [
        experience,
        title,
        clientIP,
        status
      ]
    );

    res.status(200).json({
      status: true,
      message: "Core value created successfully",
      data,
      ip: clientIP
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Core value creation failed",
      error: error.message
    });
  }
};

const updatebyidcore = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { core_id } = req.params;

    if (!core_id) {
      return res.status(400).json({
        status: false,
        message: "core_id not present",
      });
    }

    const { experience, title, status } = req.body;

    const [data] = await connection.query(
      `UPDATE core_value SET 
        experience = ?, 
        title = ?, 
        ip = ?, 
        status = ?
      WHERE core_id = ?`,
      [
        experience,
        title,
        clientIP,
        status,
        core_id
      ]
    );

    if (data.changedRows) {
      return res.status(200).json({
        status: true,
        message: "Core value updated successfully",
        ip: clientIP
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made or record not found"
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




const deletebyidcore = async (req, res) => {
  try {
    const { core_id  } = req.params;
    if (!core_id ) {
      return res.status(400).json({
        status: false,
        message: "core_id  not present",
      });
    }

    const data = await connection.query(
      "update  core_value set status=-1 WHERE core_id =?",
      [core_id ]
    );

    if (data[0].affectedRows) {
      return res.json({
        status: true,
        message: " Deleted successfully",
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

const updatebyidcorestatus = async (req, res) => {
  try {
    const { core_id  } = req.params;
    if (!core_id ) {
      res.status(404).json({
        status: false,
        message: "core_id  not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update core_value set status=? where core_id =?",
      [status, core_id ]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "status updated successfully",
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
  getallcore,
  getbyidcore,
  createcore,
  updatebyidcore,
  deletebyidcore,
  updatebyidcorestatus,
};
