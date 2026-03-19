const connection = require("../../connection");
const { getIP } = require("../clientIP");

const getallservice = async (req, res) => {
  try {
    const [webservicesrows] = await connection.query("SELECT * FROM web_service WHERE status >= 0");
    const [testimonials] = await connection.query("SELECT * FROM testimonials WHERE status = 1");
    const [clogo] = await connection.query("SELECT * FROM client_logo WHERE status = 1");
    const [homeRows] = await connection.query("SELECT * FROM web_home WHERE status = 1");
    const [servicess] = await connection.query("SELECT * FROM services WHERE status = 1");
     const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");


    // Parse list_img & hero_image for webservices
    const services = webservicesrows.map(service => {
      if (service.list_img) {
        try {
          service.list_img = JSON.parse(service.list_img);
        } catch {
          service.list_img = [];
        }
      } else {
        service.list_img = [];
      }

      try {
        const images = JSON.parse(service.hero_image || '[]');
        service.hero_image = images[0] || '';
      } catch {
        service.hero_image = '';
      }

      return service;
    });

    // Parse cover_img & video for servicess
    const servicesList = servicess.map(svc => {
      try {
        const coverImgs = JSON.parse(svc.cover_img || '[]');
        svc.cover_img = coverImgs[0] || '';
      } catch {
        // If not JSON, keep as is
      }

      try {
        const videos = JSON.parse(svc.video || '[]');
        svc.video = videos[0] || '';
      } catch {
        // If not JSON, keep as is
      }

      return svc;
    });

    // Parse client logos
    const clientlogo = clogo.map(row => {
      try {
        const logo = JSON.parse(row.logo || '[]');
        row.clogo = logo[0] || '';
      } catch {
        row.clogo = '';
      }
      return row;
    });

    const pages = {
  meta_title: webservicesrows[0].meta_title || "",
  meta_des: webservicesrows[0].meta_des || "",
};

    res.render("service", {
      pages,
      services,
      servicesList,
      testimonials,
      homeRows,
      clinetlogo: clientlogo,
       addresses
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


const getserviceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Slug is required"
      });
    }

    const [rows] = await connection.query(
      "SELECT * FROM services WHERE slug = ? AND status = 1 LIMIT 1",
      [slug]
    );

        const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");
    
     const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Service not found"
      });
    }

    let service = rows[0];

    // Parse JSON fields from service
    try { service.cover_img = JSON.parse(service.cover_img || "[]"); } catch { service.cover_img = []; }
    try { service.a_title = JSON.parse(service.a_title || "[]"); } catch { service.a_title = []; }
    try { service.a_des = JSON.parse(service.a_des || "[]"); } catch { service.a_des = []; }
    try { service.video = JSON.parse(service.video || "[]"); } catch { service.video = []; }
    try { service.icon = JSON.parse(service.icon || "[]"); } catch { service.icon = []; }
    try { service.logo = JSON.parse(service.logo || "[]"); } catch { service.logo = []; }   

    // Fetch other related data
    const [home] = await connection.query(
      "SELECT * FROM web_home WHERE status = 1"
    );

    const [custom] = await connection.query(
      "SELECT * FROM custom_package WHERE status = 1"
    );

    const [wordpress] = await connection.query(
      "SELECT * FROM wordpress_package WHERE status = 1"
    );

    const [approach] = await connection.query(
      "SELECT * FROM marketing_approach WHERE s_id = ? AND status = 1",
      [service.s_id]
    );

    const customParsed = custom.map(pkg => {
      try { pkg.f_av = JSON.parse(pkg.f_av || "[]"); } catch { pkg.f_av = []; }
      try { pkg.f_nav = JSON.parse(pkg.f_nav || "[]"); } catch { pkg.f_nav = []; }
      return pkg;
    });

    const wordpressParsed = wordpress.map(pkg => {
      try { pkg.f_av = JSON.parse(pkg.f_av || "[]"); } catch { pkg.f_av = []; }
      try { pkg.f_nav = JSON.parse(pkg.f_nav || "[]"); } catch { pkg.f_nav = []; }
      return pkg;
    });

    const pages = {
  meta_title: service.meta_title || "",
  meta_des: service.meta_des || "",
};

    res.render("service-detail", {
      pages,
      service,
      home,
      custom: customParsed,
      wordpress: wordpressParsed,
      approach,
       addresses,
       servicesList
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};








module.exports = {
  getallservice,
  getserviceBySlug,
};
