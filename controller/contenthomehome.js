const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallcontenthome = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from home_content where status >= 0"
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

const getbyidcontenthome = async (req, res) => {
  try {
    const { hc_id } = req.params;
    if (!hc_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM home_content WHERE hc_id = ? AND status >= 0",
  [hc_id]
);
    if (data[0][0]?.hc_id) {
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

const createcontenthome = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const {
      image1,
      image1_title,
      image1_des,
      image1_btn,
      image1_url,
      image_2,
      image2_title,
      image2_des,
      image2_btn,
      image2_url,
      text_title,
      text_des,
      text_btn,
      text_url,
      status
    } = req.body;

    const [data] = await connection.query(
      `INSERT INTO home_content (
        image1,
        image1_title,
        image1_des,
        image1_btn,
        image1_url,
        image_2,
        image2_title,
        image2_des,
        image2_btn,
        image2_url,
        text_title,
        text_des,
        text_btn,
        text_url,
        ip,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        image1,
        image1_title,
        image1_des,
        image1_btn,
        image1_url,
        image_2,
        image2_title,
        image2_des,
        image2_btn,
        image2_url,
        text_title,
        text_des,
        text_btn,
        text_url,
        clientIP,
        status
      ]
    );

    res.status(200).json({
      status: true,
      data: data,
      ip: clientIP
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




const updatebyidcontenthome = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { hc_id } = req.params;

    if (!hc_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const {
      c_image,
      video,
      webpage_title,
      title,
      project_title,
      projects_status,
      About_title,
      About_status,
      meta_title,
      meta_desc,
      short_des,
      status,
    } = req.body;

    const data = await connection.query(
      `UPDATE home_content SET 
        c_image = ?, 
        video = ?, 
        webpage_title = ?, 
        title = ?, 
        project_title = ?, 
        projects_status = ?, 
        About_title = ?, 
        About_status = ?, 
        meta_title = ?, 
        meta_desc = ?, 
        short_des = ?, 
        status = ?, 
        ip = ?
      WHERE hc_id = ?`,
      [
        c_image,
        video,
        webpage_title,
        title,
        project_title,
        projects_status,
        About_title,
        About_status,
        meta_title,
        meta_desc,
        short_des,
        status,
        clientIP,
        hc_id
      ]
    );

    if (data[0].changedRows) {
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



const deletebyicontenthome = async (req, res) => {
  try {
    const { hc_id } = req.params;
    if (!hc_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  home_content set status=-1 WHERE hc_id=?",
      [hc_id]
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

const updatebyidcontenthomestatus = async (req, res) => {
  try {
    const { hc_id } = req.params;
    if (!hc_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update home_content set status=? where hc_id=?",
      [status, hc_id]
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
  getallcontenthome,
  getbyidcontenthome,
  createcontenthome,
  updatebyidcontenthome,
 deletebyicontenthome,
  updatebyidcontenthomestatus,
};
