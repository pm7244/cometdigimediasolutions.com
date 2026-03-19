const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallprocess = async (req, res) => {
  try {
    const data = await connection.query(
      "SELECT * FROM work_process where status >=0"
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

const getbyidprocess = async (req, res) => {
  try {
    const { w_id } = req.params;
    if (!w_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from work_process where w_id = ?",
      [w_id]
    );
    if (data[0][0]?.w_id) {
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

const createprocess = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { title, des, process_image, status } = req.body;

    const [result] = await connection.query(
      `INSERT INTO work_process (title, des, process_image, status, ip)
       VALUES (?, ?, ?, ?, ?)`,
      [title, des, process_image, status, clientIP]
    );

    res.status(201).json({
      status: true,
      message: "Process created successfully",
      w_id: result.insertId,
      ip: clientIP
    });
  } catch (error) {
    console.error("Create process error:", error);
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

const updatebyidprocess = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { w_id } = req.params;

    if (!w_id) {
      return res.status(400).json({
        status: false,
        message: "id is required",
      });
    }

    const { title, des, process_image, status } = req.body;

    const [data] = await connection.query(
      `UPDATE work_process 
       SET title = ?, des = ?, process_image = ?, status = ?, ip = ? 
       WHERE w_id = ?`,
      [title, des, process_image, status, clientIP, w_id]
    );

    if (data.changedRows) {
      return res.status(200).json({
        status: true,
        message: "Data updated successfully",
        ip: clientIP
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made or invalid w_id",
        ip: clientIP
      });
    }
  } catch (error) {
    console.error("Update process error:", error);
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};




const deletebyidprocess = async (req, res) => {
  try {
    const { w_id } = req.params;
    if (!w_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update work_process set status=-1 WHERE w_id=?",
      [w_id]
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

const updatebyidprocessstatus = async (req, res) => {
  try {
    const { w_id } = req.params;

    if (!w_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const { status } = req.body;
    const data = await connection.query(
      "update  work_process set status=? where w_id=?",
      [status, w_id]
    );

    if (data[0].changedRows) {
      res.status(200).json({
        status: false,
        message: "status update successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getallprocess,
  getbyidprocess,
  createprocess,
  updatebyidprocess,
  deletebyidprocess,
  updatebyidprocessstatus,
};
