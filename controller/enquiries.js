const connection = require("../connection");
const { getIP } = require("./clientIP");

const nodemailer = require("nodemailer");

const getallEnquiry = async (req, res) => {
  try {
    const data = await connection.query(
      " SELECT * FROM enquiries where enquiry_status >= 0 "
    );

    if (data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
        message: "data fetch successfully.",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "record not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getbyidenquiries = async (req, res) => {
  try {
    const { enquiry_id } = req.params;
    if (!enquiry_id) {
      res.status(404).json({
        status: false,
        meaase: "ID not found",
      });
    }
    const data = await connection.query(
      "select * from enquiries where enquiry_id = ?",
      [enquiry_id]
    );

    if (data[0][0]?.enquiry_id) {
      return res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      return res.status(404).json({
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



const createenquiries = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { name, email, phone_no, enquiry, message } = req.body;

    const enquiry_status = 1;

    const [result] = await connection.query(
      "INSERT INTO enquiries (name, email, phone_no, enquiry, message, ip, enquiry_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, phone_no, enquiry, message, clientIP, enquiry_status]
    );

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "pm7244875@gmail.com",
        pass: process.env.EMAIL_PASS || "imdvvhhckyvaxkbe"
      }
    });

    // Email to admin
    const mailOptions = {
      from: `"Comet Digisol" <${process.env.EMAIL_USER || "pm7244875@gmail.com"}>`,
      to: "pm7244875@gmail.com",
      subject: "New Enquiry Received",
      text: `A new enquiry has been submitted:

Name: ${name}
Email: ${email}
Phone No: ${phone_no}
Enquiry Type: ${enquiry || "N/A"}
Message: ${message}
Client IP: ${clientIP}
`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      status: true,
      message: "Enquiry submitted successfully and admin notified.",
      data: { enquiry_id: result.insertId },
      ip: clientIP
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




// const createenquiries = async (req, res) => {
//   try {
//     const clientIP = getIP(req);
//     const { name, email, phone_no, enquiry, message } = req.body;

//     const enquiry_status = 1;

//     // Insert into MySQL (assuming `enquiry` column exists in your DB)
//     const [result] = await connection.query(
//       "INSERT INTO enquiries (name, email, phone_no, enquiry, message, ip, enquiry_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, email, phone_no, enquiry, message, clientIP, enquiry_status]
//     );

//     // Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER || "cometdigisolmain@gmail.com",
//         pass: process.env.EMAIL_PASS || "hogtgwzkicixcncg"
//       }
//     });

//     // Email to admin
//     const mailOptions = {
//       from: `"Comet Digisol" <${process.env.EMAIL_USER || "cometdigisolmain@gmail.com"}>`,
//       to: "cometdigisolmain@gmail.com",
//       subject: "New Enquiry Received",
//       text: `A new enquiry has been submitted:

// Name: ${name}
// Email: ${email}
// Phone No: ${phone_no}
// Enquiry Type: ${enquiry || "N/A"}
// Message: ${message}
// Client IP: ${clientIP}
// `
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({
//       status: true,
//       message: "Enquiry submitted successfully and admin notified.",
//       data: { enquiry_id: result.insertId },
//       ip: clientIP
//     });

//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       error: error.message
//     });
//   }
// };





const updatebyidenquiries = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const { enquiry_id } = req.params;
    if (!enquiry_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const {
      name,
      email,
      phone_no,
      message,
      form_location,
      enquiry_status,
    } = req.body;
    const data = await connection.query(
      "UPDATE enquiries SET  name=?, email=?, phone_no=?, message=?, form_location=?, enquiry_status=?,ip=? WHERE enquiry_id=?",
      [
        name,
        email,
        phone_no,
        message,
        form_location,
        enquiry_status,
        clientIP,
        enquiry_id,
      ]
    );

    if (data[0].changedRows) {
      return res.status(200).json({
        status: true,
        data: data[0],
        ip: clientIP,
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

const deletebyidenquiries = async (req, res) => {
  try {
    const { enquiry_id } = req.params;
    if (!enquiry_id) {
      res.status(404).json({
        status: false,
        meaase: "ID not found",
      });
    }

    const data = await connection.query(
      "UPDATE enquiries SET  enquiry_status=-1 WHERE enquiry_id=?",
      [enquiry_id]
    );
    if (data[0].affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } else if (data[0].affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Wrong ID",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updatebyidenquirystatus = async (req, res) => {
  try {
    const { enquiry_id } = req.params;
    if (!enquiry_id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const { enquiry_status } = req.body;
    const data = await connection.query(
      "UPDATE enquiries SET  enquiry_status=?  WHERE enquiry_id=?",
      [enquiry_status, enquiry_id]
    );

    if (data[0].changedRows) {
      return res.status(200).json({
        status: true,
        message: " data update successfully",
      });
    } else {
      return res.status(500).json({
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

module.exports = {
  getallEnquiry,
  getbyidenquiries,
  createenquiries,
  updatebyidenquiries,
  deletebyidenquiries,
  updatebyidenquirystatus,
};
