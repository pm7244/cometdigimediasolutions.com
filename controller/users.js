const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallusers = async (req, res) => {
  try {
    const data = await connection.query("select * from users where status >=0");

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

const getbyidusers = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from users where user_id  = ?",
      [user_id]
    );
    if (data[0][0]?.user_id) {
      return res.json({
        status: true,
        data: data[0],
      });
    } else {
      return res.json({
        status: false,
        message: "Id not present",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const createusers = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { username, password, status } = req.body;

    const data = await connection.query(
      "INSERT INTO users (username,password,status,ip) VALUES (?,?, ?, ?)",
      [username, password, status, clientIP]
    );

    res.status(200).json({
      status: true,
      data: data[0],
      ip: clientIP,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

const updatebyidusers = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { user_id } = req.params;
    if (!user_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const { username, password, status } = req.body;

    const data = await connection.query(
      "update users set username=?,password=?,status=?,ip=? where user_id=?",
      [username, password, status, clientIP, user_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        data: data[0],
        ip: clientIP,
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

const deletebyidusers = async (req, res) => {
  try {
      const { user_id } = req.params
      if (!user_id ) {
          res.status(404).json({
              status:false,
              message:"id not found"
          })
      }

      const data = await connection.query("update users set status=-1 WHERE user_id=?", [user_id ]);

      if (data[0].affectedRows) {
          return res.json({
              status: true,
              ip:clientIP,
              message: " Deleted successfully"
          });
      }
       else {
          return res.json({
              status: false,
              message: "Failed to delete"
          })
      }
  } catch (error) {
      res.json({
          status:false,
          error: error.message
      })
  }
}

const updatebyidassociateuserstatus = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const { status } = req.body;
    const data = await connection.query(
      "update users set status=? where user_id=?",
      [status, user_id]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "data Update successfully",
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
  getallusers,
  getbyidusers,
  createusers,
  updatebyidusers,
  deletebyidusers,
  updatebyidassociateuserstatus,
};
