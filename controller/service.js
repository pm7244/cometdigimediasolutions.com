const connection = require("../connection");
const { getIP } = require("../controller/clientIP");



const getallservicecontent = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from services where status >=0"
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


const getbyidservicecontent = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from services where s_id = ?",
      [s_id]
    );
    if (data[0][0]?.s_id) {
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



const deletebyidservicecontent = async (req, res) => {
  try {
    const { s_id } = req.params;
    if (!s_id) {
      throw new Error("Id not present");
    }

    const data = await connection.query(
      "update services set status=-1 WHERE s_id=?",
      [s_id]
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


const createservicecontent = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      title,
      short_des,
      des,
      slug,
      icon,
      logo,
      stack_title,
      cover_img,
      a_title,
      a_des,
      video,
      benefits,
      meta_title,
      meta_des,
      status
    } = req.body;

    const benefitsString = JSON.stringify(benefits || []);
    const iconsString = JSON.stringify(icon || []);
    const logosString = JSON.stringify(logo || []);

    const [result] = await connection.query(
      `INSERT INTO services 
      (title, short_des, des, slug, icon, logo, stack_title, cover_img, a_title, a_des, video, benefits, meta_title, meta_des, ip, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        short_des,
        des,
        slug,
        iconsString,
        logosString,
        stack_title,
        cover_img,
        a_title,
        a_des,
        video,
        benefitsString,
        meta_title,
        meta_des,
        clientIP,
        status
      ]
    );

    res.status(201).json({
      status: true,
      message: "Custom package created successfully",
      s_id: result.insertId,
      ip: clientIP
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
};


const updatebyidservicecontent = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { s_id } = req.params;

    if (!s_id) {
      return res.status(400).json({
        status: false,
        message: "s_id is required"
      });
    }

    const {
      title,
      short_des,
      des,
      slug,
      icon,
      logo,
      stack_title,
      cover_img,
      a_title,
      a_des,
      video,
      benefits,
      meta_title,
      meta_des,
      status
    } = req.body;

    const benefitsString = JSON.stringify(benefits || []);
    const iconsString = JSON.stringify(icon || []);
    const logosString = JSON.stringify(logo || []);

    const [updateRes] = await connection.query(
      `UPDATE services SET
       title = ?, 
       short_des = ?, 
       des = ?, 
       slug = ?, 
       icon = ?, 
       logo = ?, 
       stack_title = ?, 
       cover_img = ?, 
       a_title = ?, 
       a_des = ?, 
       video = ?, 
       benefits = ?, 
       meta_title = ?,
       meta_des = ?,
       ip = ?, 
       status = ?
       WHERE s_id = ?`,
      [
        title,
        short_des,
        des,
        slug,
        iconsString,
        logosString,
        stack_title,
        cover_img,
        a_title,
        a_des,
        video,
        benefitsString,
        meta_title,
        meta_des,
        clientIP,
        status,
        s_id
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
        message: "No changes made (or invalid s_id)"
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};






module.exports = {
  getallservicecontent,
  deletebyidservicecontent,
  updatebyidservicecontent,
  createservicecontent,
  getbyidservicecontent,
};
