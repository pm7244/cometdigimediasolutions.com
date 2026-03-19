const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallcareer = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from career where status >= 0"
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

const getbyidcareer = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      return res.status(404).json({
        status: false,
        message: "c_id not found",
      });
    }

    const data = await connection.query(
      "select * from career where c_id = ?",
      [c_id]
    );
    if (data[0][0]?.c_id) {
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

const createcareer = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      title,
      slug,
      date_display,
      des,
      job_req,
      job_qualification,
      job_type,
      exprience,
      location,
      meta_title,
      meta_des,
      status,
    } = req.body;

    // Convert arrays to JSON strings
    const jobReqString = JSON.stringify(job_req);
    const jobQualificationString = JSON.stringify(job_qualification);

    const [result] = await connection.query(
      `INSERT INTO career 
      (title, slug, date_display, des, job_req, job_qualification, job_type, exprience, location, meta_title, meta_des, ip, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        date_display,
        des,
        jobReqString,
        jobQualificationString,
        job_type,
        exprience,
        location,
        meta_title,
        meta_des,
        clientIP,
        status,
      ]
    );

    res.status(201).json({
      status: true,
      message: "Career created successfully",
      career_id: result.insertId,
      ip: clientIP,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const updatebyidcareer = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { 	c_id } = req.params;

    if (!	c_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const {
      title,
      slug,
      date_display,
      des,
      job_req,
      job_qualification,
      job_type,
      exprience,
      location,
      meta_title,
      meta_des,
      status,
    } = req.body;

    // Convert arrays to JSON strings
    const jobReqString = JSON.stringify(job_req);
    const jobQualificationString = JSON.stringify(job_qualification);

    const [updateRes] = await connection.query(
      `UPDATE career 
       SET title = ?, 
           slug = ?, 
           date_display = ?, 
           des = ?, 
           job_req = ?, 
           job_qualification = ?, 
           location = ?, 
           job_type = ?, 
           exprience = ?, 
           meta_title = ?, 
           meta_des = ?, 
           ip = ?, 
           status = ? 
       WHERE 	c_id = ?`,
      [
        title,
        slug,
        date_display,
        des,
        jobReqString,
        jobQualificationString,
        location,
        job_type,
        exprience,
        meta_title,
        meta_des,
        clientIP,
        status,
        c_id,
      ]
    );

    if (updateRes.changedRows) {
      return res.status(200).json({
        status: true,
        ip: clientIP,
        message: "Successfully updated",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made (or invalid ID)",
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deletebyidcareer = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  career set status=-1 WHERE c_id=?",
      [c_id]
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

const updatebyidcareerstatus = async (req, res) => {
  try {
    const { c_id } = req.params;
    if (!c_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update career set status=? where id=?",
      [status, c_id]
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
  getallcareer,
  getbyidcareer,
  createcareer,
  updatebyidcareer,
  deletebyidcareer,
  updatebyidcareerstatus,
};
