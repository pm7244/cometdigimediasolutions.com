const connection = require("../../connection");
const { getIp } = require("../clientIP");

const getAllwebportfolio = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 6; 
    let offset = (page - 1) * limit;

    // Total projects count
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM project WHERE status = 1"
    );
     const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Paginated projects ordered by sort_order
    const [projectRows] = await connection.query(
      `SELECT * FROM project WHERE status = 1 ORDER BY sort_order ASC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    // Clean hero_image
    const cleanedProject = projectRows.map(row => {
      try {
        const images = JSON.parse(row.hero_image || "[]");
        row.image = images[0] || "";
      } catch {
        row.image = "";
      }
      return row;
    });

    // Other data
    const [web_portfolio] = await connection.query("SELECT * FROM web_project WHERE status = 1");
    const [homeRows] = await connection.query("SELECT * FROM web_home WHERE status = 1");
    const [servicesList ] = await connection.query("SELECT * FROM services WHERE status = 1");

     const pages = {
  meta_title: web_portfolio[0].meta_title || "",
  meta_des: web_portfolio[0].meta_des || "",
};
    

    res.render("portfolio", {
      pages,
      portfolios: web_portfolio,
      home: homeRows[0] || {},
      project: cleanedProject,
      servicesList ,
       addresses,      
       currentPage: page,
      totalPages
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getportfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Slug is required"
      });
    }

    const [rows] = await connection.query(
      "SELECT * FROM project WHERE slug = ? AND status = 1 LIMIT 1",
      [slug]
    );
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");
    const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Project not found"
      });
    }

    let portfolio = rows[0];

    if (portfolio.date) {
      const dateObj = new Date(portfolio.date);
      portfolio.formattedDate = dateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    } else {
      portfolio.formattedDate = "";
    }

    try {
      const heroImages = JSON.parse(portfolio.hero_image || "[]");
      portfolio.hero_image = heroImages[0] || "";
    } catch {
      portfolio.hero_image = "";
    }

    try {
      portfolio.list_img = JSON.parse(portfolio.list_img || "[]");
    } catch {
      portfolio.list_img = [];
    }

    try {
      portfolio.big_list_img = JSON.parse(portfolio.big_list_img || "[]");
    } catch {
      portfolio.big_list_img = [];
    }

    try {
      const heroVideos = JSON.parse(portfolio.hero_video || "[]");
      portfolio.hero_video = heroVideos[0] || "";
    } catch {
      portfolio.hero_video = "";
    }

    try {
      portfolio.challenges_des = JSON.parse(portfolio.challenges_des || "[]");
    } catch {
      portfolio.challenges_des = [];
    }

    try {
      portfolio.results_des = JSON.parse(portfolio.results_des || "[]");
    } catch {
      portfolio.results_des = [];
    }

    try {
      portfolio.sections = JSON.parse(portfolio.sections || "[]");
    } catch {
      portfolio.sections = [];
    }

    const pages = {
      meta_title: portfolio.meta_title || "",
      meta_des: portfolio.meta_des || "",
    };

    res.render("portfolio-detail", {
      pages,
      portfolio,
      servicesList,
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
  getAllwebportfolio,
  getportfolioBySlug,
};
