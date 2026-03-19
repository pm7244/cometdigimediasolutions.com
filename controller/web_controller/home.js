const connection = require("../../connection");

const getAllHome = async (req, res) => {
  try {
    const [homeRows] = await connection.query("SELECT * FROM web_home WHERE status = 1");
    const [core] = await connection.query("SELECT * FROM core_value WHERE status = 1");
    const [servicesList] = await connection.query("SELECT * FROM services WHERE status = 1");
    const [work_process] = await connection.query("SELECT * FROM work_process WHERE status = 1");
    const [project] = await connection.query("SELECT * FROM project WHERE status = 1 ORDER BY sort_order ASC");
    const [testimonials] = await connection.query("SELECT * FROM testimonials WHERE status = 1");
    const [clogo] = await connection.query("SELECT * FROM client_logo WHERE status = 1");
    const [awards] = await connection.query("SELECT * FROM awards WHERE status = 1");
    const [blog] = await connection.query("SELECT * FROM blog WHERE status = 1");
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    const home = homeRows[0] || {};

    home.about_img_left = JSON.parse(home.about_img_left || '[]')[0] || '';
    home.about_img_right = JSON.parse(home.about_img_right || '[]')[0] || '';
    home.about_img_bottom = JSON.parse(home.about_img_bottom || '[]')[0] || '';


    const cleanedServices = servicesList.map(row => {
      try {
        const icons = JSON.parse(row.icon || '[]');
        row.icon = icons[0] || '';
      } catch {
        row.icon = '';
      }
      return row;
    });

    const cleanedProject = project.map(row => {
      try {
        const images = JSON.parse(row.hero_image || '[]');
        row.hero_image = images[0] || '';
      } catch {
        row.hero_image = '';
      }
      return row;
    }).slice(0, 4);

    const clientlogo = clogo.map(row => {
      try {
        const logo = JSON.parse(row.logo || '[]');
        row.clogo = logo[0] || '';
      } catch {
        row.clogo = '';
      }
      return row;
    });

    const cleanedBlog = blog.map(row => {
      try {
        const images = JSON.parse(row.hero_image || '[]');
        row.image = images[0] || '';
      } catch {
        row.image = '';
      }

      try {
        const date = new Date(row.display_date);
        row.display_date = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      } catch {
        row.display_date = '';
      }

      return row;
    });

     const pages = {
  meta_title: home.meta_title || "",
  meta_des: home.meta_des || "",
};

    res.render("home", {
      pages,
      home,
      core,
      servicesList: cleanedServices,
      work_process,
      project: cleanedProject,
      testimonials,
      clinetlogo: clientlogo,
      awards,
      blog: cleanedBlog,
      addresses
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

module.exports = { getAllHome };
