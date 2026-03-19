const connection = require("../../connection");
const { getIp } = require("../clientIP");

const getAllwebcareer = async (req, res) => {
  try {
    const [webcareerRows] = await connection.query("SELECT * FROM web_career WHERE status = 1");
    const [careers] = await connection.query("SELECT * FROM career WHERE status = 1");
    const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    const cleanedCareers = webcareerRows.map((row) => {
      try {
        const heroImages = JSON.parse(row.hero_image || "[]");
        row.hero_image = heroImages[0] || "";
      } catch {
        row.hero_image = "";
      }
      return row;
    });



    const pages = {
      meta_title: webcareerRows[0].meta_title || "",
      meta_des: webcareerRows[0].meta_des || "",
    };

    res.render("career", {
      pages,
      career: cleanedCareers,
      careers,
      servicesList,
      addresses
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const getcareerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Slug is required"
      });
    }

    // Fetch career by slug
    const [rows] = await connection.query(
      "SELECT * FROM career WHERE slug = ? AND status = 1 LIMIT 1",
      [slug]
    );
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");
    const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");
    const [job] = await connection.query("SELECT * FROM job_inquiry WHERE status = 1");

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Career not found"
      });
    }

    let career = rows[0];

    const pages = {
      meta_title: career.meta_title || "",
      meta_des: career.meta_des || "",
    };

    res.render("career-detail", {
      pages,
      career,
      servicesList,
      job,
      addresses
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




module.exports = {
  getAllwebcareer,
  getcareerBySlug,
};
