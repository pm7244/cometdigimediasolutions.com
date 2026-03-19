const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallhome = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from web_home where status >= 0"
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

const getbyidhome = async (req, res) => {
  try {
    const { home_id } = req.params;
    if (!home_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from web_home where home_id = ?",
      [home_id]
    );
    if (data[0][0]?.home_id) {
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

const createhome = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      slider_id,
      title,
      meta_title,
      meta_desc,
      description,
      cover_url,
      breadcrumb_name,
      cover_image,
      image,
      awards_des,
      status,
    } = req.body;

    const data = await connection.query(
      "INSERT INTO web_home (slider_id,title, meta_title, meta_desc,description,cover_url,breadcrumb_name,cover_image,image,awards_des,status ,ip) VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?)",
      [
        slider_id,
        title,
        meta_title,
        meta_desc,
        description,
        cover_url,
        breadcrumb_name,
        cover_image,
        image,
        awards_des,
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

const updatebyidhome = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { home_id } = req.params;
    if (!home_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const {
      slider_id,
      home_about,
      slug,
      title,
      meta_title,
      meta_desc,
      description,
      cover_url,
      breadcrumb_name,
      cover_type,
      image,
      status,
    } = req.body;
    const data = await connection.query(
      "update  web_home set slider_id=?, home_about=?, slug=?,title=?, meta_title=?, meta_desc=?,description=?,cover_url=?,breadcrumb_name=?,cover_type=?,image=?,status=?,ip=? where home_id=?",
      [
        slider_id,
        home_about,
        slug,
        title,
        meta_title,
        meta_desc,
        description,
        cover_url,
        breadcrumb_name,
        cover_type,
        image,
        status,
        clientIP,
        home_id,
      ]
    );

    if (data[0].changedRows) {
      return res.status(200).json({
        status: true,
        ip: clientIP,
        message: "successfully to update",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deletebyidhome = async (req, res) => {
  try {
    const { home_id } = req.params;
    if (!home_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  web_home set status=-1 WHERE home_id=?",
      [home_id]
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

const updatebyidhomestatus = async (req, res) => {
  try {
    const { home_id } = req.params;
    if (!home_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update web_home set status=? where home_id=?",
      [status, home_id]
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
  getallhome,
  getbyidhome,
  createhome,
  updatebyidhome,
  deletebyidhome,
  updatebyidhomestatus,
};
