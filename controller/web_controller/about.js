const connection = require("../../connection");

const getAllAbout = async (req, res) => {
  try {
    const [aboutRows] = await connection.query("SELECT * FROM web_about WHERE status = 1");
    const [homeRows] = await connection.query("SELECT * FROM web_home WHERE status = 1");
    const [core] = await connection.query("SELECT * FROM core_value WHERE status = 1");
    const [awards] = await connection.query("SELECT * FROM awards WHERE status = 1");
    const [work_process] = await connection.query("SELECT * FROM work_process WHERE status = 1");
    const [testimonials] = await connection.query("SELECT * FROM testimonials WHERE status = 1");
    const [clogo] = await connection.query("SELECT * FROM client_logo WHERE status = 1");
    const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    if (!aboutRows || aboutRows.length === 0) {
      return res.status(404).render("404", { message: "About page data not found" });
    }

    const about = aboutRows[0];

    const home = homeRows[0] || {};
    home.about_img_left = JSON.parse(home.about_img_left || "[]")[0] || "";
    home.about_img_right = JSON.parse(home.about_img_right || "[]")[0] || "";
    home.about_img_bottom = JSON.parse(home.about_img_bottom || "[]")[0] || "";

    const clientlogo = clogo.map(row => {
      try {
        const logo = JSON.parse(row.logo || "[]");
        row.clogo = logo[0] || "";
      } catch {
        row.clogo = "";
      }
      return row;
    });

    const pages = {
      meta_title: about.meta_title || "",
      meta_des: about.meta_des || "",
    };

    res.render("about", {
      pages,
      about,
      home,
      core,
      servicesList,
      awards,
      work_process,
      testimonials,
      clinetlogo: clientlogo,
      addresses,
    });
  } catch (error) {
    res.status(500).send("Error rendering About page: " + error.message);
  }
};

module.exports = { getAllAbout };
