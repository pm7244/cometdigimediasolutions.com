const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallaboutcontent = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from about_content where status >=0"
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

const getbyidaboutcontent = async (req, res) => {
  try {
    const { ac_id } = req.params;
    if (!ac_id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from about_content where ac_id = ? AND status >= 0",
      [ac_id]
    );
    if (data[0][0]?.ac_id) {
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

const createaboutcontent = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      type,
      image,
      layout,
      title,
      des,
      sort_order,
      status
    } = req.body;

    const imageJson = JSON.stringify(image);

    const data = await connection.query(
      `INSERT INTO about_content (
        type,
        image,
        layout,
        title,
        des,
        ip,
        status
      ) VALUES (?, ?, ?, ?, ?, ?,?)`,
      [
        type,
        imageJson,
        layout,
        title,
        des,
        clientIP,
        status
      ]
    );

    res.status(200).json({
      status: true,
      message: "Content inserted successfully.",
      data: data[0],
      ip: clientIP,
    });

  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};



const updatebyidaboutcontent = async (req, res) => {
  try {
    const clientIP = getIP(req); 
    const { ac_id } = req.params;

    if (!ac_id) {
      return res.status(400).json({ status: false, message: "ac_id is required." });
    }
    const [existing] = await connection.query(
      `SELECT ac_id FROM about_content WHERE ac_id = ?`,
      [ac_id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ status: false, message: "ac_id not found." });
    }

    const { image, layout, title, des, status } = req.body;


    const imageJson = Array.isArray(image) ? JSON.stringify(image) : image;

    const [result] = await connection.query(
      `UPDATE about_content 
       SET image = ?, 
            layout = ?,
           title = ?, 
           des = ?, 
           status = ?, 
           ip = ?
       WHERE ac_id = ?`,
      [ 
        imageJson,
       layout,
        title,
        des,
        status,
        clientIP,
        ac_id
      ]
    );

    return res.status(200).json({
      status: true,
      message: "Data updated successfully",
      ip: clientIP
    });

  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};



const deletebyidaboutcontent = async (req, res) => {
  try {
    const { ac_id  } = req.params;
    if (!ac_id ) {
      throw new Error("ac_id  not present");
    }

    const data = await connection.query(
      "update about_content set status=-1 WHERE ac_id =?",
      [ac_id ]
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


const updatebyidaboutstatuscontent = async (req, res) => {
  try {
    const { ac_id } = req.params;
    if (!ac_id ) {
      res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update about_content set status=? where id=?",
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
  getallaboutcontent,
  getbyidaboutcontent,
  createaboutcontent,
  updatebyidaboutcontent,
  deletebyidaboutcontent,
  updatebyidaboutstatuscontent,
};
