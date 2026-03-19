const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallclient = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from clinet_logo where status >=0"
    );
    if (data && data[0].length > 0) {
      return res.status(200).json({
        message: "get all post",
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
      message: error.message,
    });
  }
};

const getbyidclient = async (req, res) => {
  try {
    const { client_id  } = req.params;
    if (!client_id ) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const data = await connection.query(
      "select * from clinet_logo where client_id  = ?",
      [client_id ]
    );
    if (data[0][0]?.client_id ) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        staus: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const createclient = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { logo, status } = req.body;
    const data = await connection.query(
      "INSERT INTO clinet_logo (logo,status,ip) VALUE(?,?,?)",
      [logo, status, clientIP]
    );
    {
      res.status(200).json({
        staus: true,
        data: data[0],
        ip: clientIP,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidclient = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { client_id  } = req.params;
    if (!client_id ) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }
    const { logo, status } = req.body;
    const data = await connection.query(
      "UPDATE clinet_logo set logo=?,status=?,ip=? where client_id  = ?",
      [logo, status, clientIP, client_id ]
    );
    if (data[0].changedRows) {
      res.status(200).json({
        status: true,
        message: "data update sucessfully",
        ip: clientIP,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deletebyidclient = async (req, res) => {
  try {
    const { client_id  } = req.params;
    if (!client_id ) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }
    const data = await connection.query(
      " update clinet_logo set status=-1 where client_id  = ?",
      [client_id ]
    );
    if (data[0].affectedRows) {
      res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidenquiryclientstatus = async (req, res) => {
  try {
    const { client_id  } = req.params;
    if (!client_id ) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }
    const { status } = req.body;
    const data = await connection.query(
      "UPDATE clinet_logo set status=? where client_id  = ? ",
      [status, client_id ]
    );
    if (data[0].changedRows) {
      res.status(200).json({
        status: true,
        message: "data update sucessfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "failed to update",
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
  getallclient,
  getbyidclient,
  createclient,
  updatebyidclient,
  deletebyidclient,
  updatebyidenquiryclientstatus,
};
