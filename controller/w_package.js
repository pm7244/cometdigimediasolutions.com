const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallwordpress = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from wordpress_package where status >= 0"
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

const getbyidwordpress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from wordpress_package where id = ?",
      [id]
    );
    if (data[0][0]?.id) {
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

const createwordpress = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { type, price_inr, price_usd, f_av, f_nav, status } = req.body;

    // Store arrays as JSON strings
    const fAvString = JSON.stringify(f_av || []);
    const fNavString = JSON.stringify(f_nav || []);

    const [result] = await connection.query(
      `INSERT INTO wordpress_package 
       (type, price_inr, price_usd, f_av, f_nav, ip, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        type,
        price_inr,
        price_usd,
        fAvString,
        fNavString,
        clientIP,
        status
      ]
    );

    res.status(201).json({
      status: true,
      message: "Custom package created successfully",
      id: result.insertId,
      ip: clientIP
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

const updatebyidwordpress = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID is required"
      });
    }

    const { type, price_inr, price_usd, f_av, f_nav, status } = req.body;

    // Convert arrays to JSON strings
    const fAvString = JSON.stringify(f_av || []);
    const fNavString = JSON.stringify(f_nav || []);

    const [updateRes] = await connection.query(
      `UPDATE wordpress_package 
       SET type = ?, 
           price_inr = ?, 
           price_usd = ?, 
           f_av = ?, 
           f_nav = ?, 
           ip = ?, 
           status = ?
       WHERE id = ?`,
      [
        type,
        price_inr,
        price_usd,
        fAvString,
        fNavString,
        clientIP,
        status,
        id
      ]
    );

    if (updateRes.changedRows > 0) {
      return res.status(200).json({
        status: true,
        message: "Custom package updated successfully",
        ip: clientIP
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made (or invalid ID)"
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};


const deletebyidwordpress = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  wordpress_package set status=-1 WHERE id=?",
      [id]
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

const updatebyidwordpressstatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update wordpress_package set status=? where id=?",
      [status, id]
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
  getallwordpress,
  getbyidwordpress,
  createwordpress,
  updatebyidwordpress,
  deletebyidwordpress,
  updatebyidwordpressstatus,
};
