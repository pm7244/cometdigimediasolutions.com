const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallawards = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from awards where status >=0 "
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
        message: "get all post",
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

const getbyidawards = async (req, res) => {
  try {
    const { awards_id } = req.params;
    if (!awards_id) {
      res.status(404).json({
        status: false,
        meaase: "ID not found",
      });
    }

    const data = await connection.query(
      "select * from awards where awards_id= ? ",
      [awards_id]
    );
    if (data[0][0]?.awards_id) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      stattus: false,
      message: error.message,
    });
  }
};

const createawards = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { title, awards_info, sort_order, status } = req.body;

    const [data] = await connection.query(
      `INSERT INTO awards (title, awards_info, sort_order, status, ip) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, awards_info, sort_order, status, clientIP]
    );

    res.status(200).json({
      status: true,
      message: "Award created successfully",
      data,
      ip: clientIP,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const updatebyidawards = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { awards_id } = req.params;

    if (!awards_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { title, awards_info, sort_order, status } = req.body;

    const [data] = await connection.query(
      `UPDATE awards 
       SET title = ?, awards_info = ?, sort_order = ?, status = ?, ip = ? 
       WHERE awards_id = ?`,
      [title, awards_info, sort_order, status, clientIP, awards_id]
    );

    if (data.changedRows) {
      return res.json({
        status: true,
        message: "Award updated successfully",
        data,
        ip: clientIP,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Update failed or no changes made",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


const deletebyidawards = async (req, res) => {
  try {
      const { awards_id } = req.params
      if (!awards_id) {
          res.status(404).json({
              status: false,
              meaase: "ID not found"
          })
      }

      const data = await connection.query(
          "UPDATE awards SET status=-1 WHERE awards_id=?",
          [awards_id]
      );

      if (data[0].affectedRows) {
          res.status(200).json({
              status: true,
              message: "daleted sucessfully"
          })
      } else if (data[0].affectedRows === 0) {
          return res.status(404).json({
              status: false,
              message: "Wrong ID"
          });
      } else {
          res.status(404).json({
              status: false,
              message: "failed is deleted"
          })
      }
  } catch (error) {
      res.status(500).json({
          status: false,
          message: error.message
      })
  }
}

const updatebyidawardsstatus = async (req, res) => {
  const { awards_id } = req.params;
  if (!awards_id) {
    res.status(404)({
      status: false,
      message: "IP not found",
    });
  }
  const { status } = req.body;
  const data = await connection.query(
    "UPDATE awards SET status=? where awards_id = ?",
    [status, awards_id]
  );
  if (data[0].changedRows) {
    res.status(200).json({
      status: true,
      message: " status updated successfully",
    });
  } else if (data[0].affectedRows === 0) {
    return res.status(404).json({
      status: false,
      message: "Wrong ID",
    });
  } else {
    res.status(404).json({
      status: false,
      message: "failed to update",
    });
  }
};

module.exports = {
  getallawards,
  getbyidawards,
  createawards,
  updatebyidawards,
  deletebyidawards,
  updatebyidawardsstatus,
};
