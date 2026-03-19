const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallapproach = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from marketing_approach where status >= 0"
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

const getbyidapproach = async (req, res) => {
  try {
    const { id  } = req.params;
    if (!id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM marketing_approach WHERE id  = ? AND status >= 0",
  [id ]
);
    if (data[0][0]?.id ) {
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


const createapproach = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { s_id, title, des, status } = req.body;

    if (!s_id) {
      return res.status(400).json({
        status: false,
        message: "s_id is required"
      });
    }

    const [data] = await connection.query(
      `INSERT INTO marketing_approach (s_id, title, des, ip, status) VALUES (?, ?, ?, ?, ?)`,
      [s_id, title, des, clientIP, status]
    );

    res.status(200).json({
      status: true,
      data,
      ip: clientIP
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




const updatebyidapproach = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "id is required"
      });
    }

    const { s_id, title, des, status } = req.body;

    const [data] = await connection.query(
      `UPDATE marketing_approach 
       SET s_id = ?, title = ?, des = ?, ip = ?, status = ? 
       WHERE id = ?`,
      [s_id, title, des, clientIP, status, id]
    );

    if (data.affectedRows > 0) {
      res.status(200).json({
        status: true,
        message: "Successfully updated",
        ip: clientIP
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found or no changes made"
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};





const deletebyidapproach = async (req, res) => {
  try {
    const { id  } = req.params;
    if (!id ) {
      return res.status(400).json({
        status: false,
        message: "id  not present",
      });
    }

    const data = await connection.query(
      "update  marketing_approach set status=-1 WHERE id =?",
      [id ]
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

const updatebyidapproachstatus = async (req, res) => {
  try {
    const { id  } = req.params;
    if (!id ) {
      res.status(404).json({
        status: false,
        message: "id  not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update marketing_approach set status=? where id =?",
      [status, id ]
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
  getallapproach,
  getbyidapproach,
  createapproach,
  updatebyidapproach,
  deletebyidapproach,
  updatebyidapproachstatus,
};
