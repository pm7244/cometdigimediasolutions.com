const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallmember = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from team_member where status >= 0"
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

const getbyidmember = async (req, res) => {
  try {
    const { m_id  } = req.params;
    if (!m_id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM team_member WHERE m_id  = ? AND status >= 0",
  [m_id ]
);
    if (data[0][0]?.m_id ) {
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

 const createmember = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      name,
      position,
      instagram,
      linkedin,
      image,
      status
    } = req.body;

    const [data] = await connection.query(
      `INSERT INTO team_member (
        name,
        position,
        instagram,
        linkedin,
        image,
        ip,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        position,
        instagram,
        linkedin,
        image,
        clientIP,
        status
      ]
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


const updatebyidmember = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { m_id } = req.params;

    if (!m_id) {
      return res.status(400).json({
        status: false,
        message: "m_id not present",
      });
    }

    const {
      name,
      position,
      instagram,
      linkedin,
      image,
      status
    } = req.body;

    const [data] = await connection.query(
      `UPDATE team_member SET 
        name = ?, 
        position = ?, 
        instagram = ?, 
        linkedin = ?, 
        image = ?, 
        ip = ?, 
        status = ?
      WHERE m_id = ?`,
      [
        name,
        position,
        instagram,
        linkedin,
        image,
        clientIP,
        status,
        m_id
      ]
    );

    if (data.changedRows) {
      return res.status(200).json({
        status: true,
        message: "Successfully updated",
        ip: clientIP,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made or record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};



const deletebyidmember = async (req, res) => {
  try {
    const { m_id  } = req.params;
    if (!m_id ) {
      return res.status(400).json({
        status: false,
        message: "m_id  not present",
      });
    }

    const data = await connection.query(
      "update  team_member set status=-1 WHERE m_id =?",
      [m_id ]
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

const updatebyidmemberstatus = async (req, res) => {
  try {
    const { m_id  } = req.params;
    if (!m_id ) {
      res.status(404).json({
        status: false,
        message: "m_id  not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update team_member set status=? where m_id =?",
      [status, m_id ]
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
  getallmember,
  getbyidmember,
  createmember,
  updatebyidmember,
  deletebyidmember,
  updatebyidmemberstatus,
};
