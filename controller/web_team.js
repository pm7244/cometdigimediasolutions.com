const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallwebteam = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from web_team where status >= 0"
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

const getbyidwebteam = async (req, res) => {
  try {
    const { t_id  } = req.params;
    if (!t_id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from web_team where t_id  = ?",
      [t_id ]
    );
    if (data[0][0]?.t_id ) {
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

const createwebteam = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_title,
      group_image,
      team_title,
      meta_title,
      meta_des,
      status,
    } = req.body;

    const data = await connection.query(
      `INSERT INTO web_team 
        (hero_title, group_image, team_title, meta_title, meta_des, status, ip) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        hero_title,
        group_image,
        team_title,
        meta_title,
        meta_des,
        status,
        clientIP,
      ]
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


const updatebyidwebteam = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { t_id } = req.params;

    if (!t_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const {
      hero_title,
      group_image,
      team_title,
      meta_title,
      meta_des,
      status,
    } = req.body;

    const data = await connection.query(
      `UPDATE web_team 
       SET hero_title=?, group_image=?, team_title=?, meta_title=?, meta_des=?, status=?, ip=? 
       WHERE t_id = ?`,
      [
        hero_title,
        group_image,
        team_title,
        meta_title,
        meta_des,
        status,
        clientIP,
        t_id,
      ]
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
        message: "No changes made or invalid ID",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const deletebyidwebteam = async (req, res) => {
  try {
    const { t_id  } = req.params;
    if (!t_id ) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  web_team set status=-1 WHERE t_id =?",
      [t_id ]
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

const updatebyidwebteamstatus = async (req, res) => {
  try {
    const { t_id  } = req.params;
    if (!t_id ) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update web_team set status=? where t_id =?",
      [status, t_id ]
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
  getallwebteam,
  getbyidwebteam,
  createwebteam,
  updatebyidwebteam,
  deletebyidwebteam,
  updatebyidwebteamstatus,
};
