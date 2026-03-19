// job_inquiry.js
const connection = require("../connection");
const { getIP } = require("./clientIP");
const multer = require("multer");
const path = require("path");

const nodemailer = require("nodemailer");

// -------------------- Multer Setup --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "upload/resumes"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// -------------------- Get All Job Applications --------------------
const getalljob = async (req, res) => {
  try {
    const data = await connection.query("SELECT * FROM job_inquiry WHERE status >= 0");

    if (data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
        message: "Data fetched successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// -------------------- Get Job Application By ID --------------------
const getbyidjob = async (req, res) => {
  try {
    const { job_id } = req.params;
    if (!job_id) return res.status(400).json({ status: false, message: "Job ID not present" });

    const data = await connection.query("SELECT * FROM job_inquiry WHERE job_id = ?", [job_id]);

    if (data[0][0]?.job_id) {
      res.status(200).json({ 
        status: true, 
        data: data[0] 
      });
    } else {
      res.status(404).json({ 
        status: false, 
        message: "Job not found" 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: false, 
      message: error.message 
    });
  }
};

// -------------------- Create Job Application --------------------
const createjob = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { c_id, name, email, phone, experience, introduction, status } = req.body;

    // Check file upload
    if (!req.file) {
      return res.status(400).json({ 
        status: false, 
        message: "Resume file is required"
      });
    }
    const resume = req.file.filename;

    if (!name || !email || !phone) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const [result] = await connection.query(
      `INSERT INTO job_inquiry 
       (c_id, name, email, phone, experience, introduction, resume, ip, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [c_id, name, email, phone, experience, introduction, resume, clientIP, status]
    );

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "pm7244875@gmail.com",
        pass: process.env.EMAIL_PASS || "imdvvhhckyvaxkbe"
      }
    });

    // ==============================
    // Email to Admin
    // ==============================
    const adminMail = {
      from: `"Comet Digisol" <${process.env.EMAIL_USER || "pm7244875@gmail.com"}>`,
      to: "pm7244875@gmail.com",
      subject: "New Job Application Received",
      text: `A new job application has been submitted:

Job ID: ${c_id}
Name: ${name}
Email: ${email}
Phone: ${phone}
Experience: ${experience || "N/A"}
Introduction: ${introduction || "N/A"}
Resume: ${resume}
Client IP: ${clientIP}
`
    };

    await transporter.sendMail(adminMail);

    // ==============================
    // Confirmation Email to Applicant
    // ==============================
    if (email) {
      const userMail = {
        from: `"Comet Digisol" <${process.env.EMAIL_USER || "pm7244875@gmail.com"}>`,
        to: email,
        subject: "Your Job Application has been received!",
        text: `Hello ${name},

Thank you for applying at Comet Digisol. We have received your job application and our HR team will review it shortly.

Here are the details you submitted:
------------------------------------
Job ID: ${c_id}
Name: ${name}
Email: ${email}
Phone: ${phone}
Experience: ${experience || "N/A"}
Introduction: ${introduction || "N/A"}
Resume: ${resume}
------------------------------------

Best Regards,  
Comet Digisol HR Team`
      };

      await transporter.sendMail(userMail);
    }

    res.status(200).json({
      status: true,
      message: "Job application submitted successfully. Admin and applicant notified.",
      insertId: result.insertId,
      ip: clientIP,
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// -------------------- Update Job Application By ID --------------------
const updatebyidjob = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { job_id } = req.params;
    if (!job_id) return res.status(400).json({ status: false, message: "Job ID not present" });

    const { name, email, phone, experience, introduction, status } = req.body;
    const resume = req.file ? req.file.filename : null; // optional update

    const query =
      resume
        ? `UPDATE job_inquiry SET name=?, email=?, phone=?, experience=?, introduction=?, resume=?, ip=?, status=? WHERE job_id=?`
        : `UPDATE job_inquiry SET name=?, email=?, phone=?, experience=?, introduction=?, ip=?, status=? WHERE job_id=?`;

    const values = resume
      ? [name, email, phone, experience, introduction, resume, clientIP, status, job_id]
      : [name, email, phone, experience, introduction, clientIP, status, job_id];

    const [result] = await connection.query(query, values);

    if (result.changedRows) {
      res.status(200).json({ status: true, message: "Job application updated successfully", ip: clientIP });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ status: false, message: "Wrong ID" });
    } else {
      res.status(500).json({ status: false, message: "Failed to update" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// -------------------- Delete Job Application By ID --------------------
const deletebyidjob = async (req, res) => {
  try {
    const { job_id } = req.params;
    if (!job_id) return res.status(400).json({ status: false, message: "Job ID not present" });

    const data = await connection.query("UPDATE job_inquiry SET status=-1 WHERE job_id=?", [job_id]);

    if (data[0].affectedRows) {
      res.status(200).json({ status: true, message: "Deleted successfully" });
    } else if (data[0].affectedRows === 0) {
      res.status(404).json({ status: false, message: "Wrong ID" });
    } else {
      res.status(500).json({ status: false, message: "Failed to delete" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// -------------------- Update Job Status By ID --------------------
const updatebyidjobstatus = async (req, res) => {
  try {
    const { job_id } = req.params;
    const { status } = req.body;
    if (!job_id) return res.status(400).json({ status: false, message: "Job ID not present" });

    const data = await connection.query("UPDATE job_inquiry SET status=? WHERE job_id=?", [status, job_id]);

    if (data[0].changedRows) {
      res.status(200).json({ status: true, message: "Status updated successfully" });
    } else if (data[0].affectedRows === 0) {
      res.status(404).json({ status: false, message: "Wrong ID" });
    } else {
      res.status(500).json({ status: false, message: "Failed to update" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// -------------------- Export --------------------
module.exports = {
  getalljob,
  getbyidjob,
  createjob,
  updatebyidjob,
  deletebyidjob,
  updatebyidjobstatus,
  upload, // multer
};
