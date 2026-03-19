const connection = require("../../connection");

const { getIp } = require("../clientIP")


const getAllwebblog = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 4;
    let offset = (page - 1) * limit;

    const [webblog] = await connection.query(
      "SELECT * FROM web_blog WHERE status = 1"
    );
     const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    const [servicesList ] = await connection.query(
      "SELECT * FROM services WHERE status = 1"
    );

    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM blog WHERE status = 1"
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const [blog] = await connection.query(
      `SELECT * FROM blog 
       WHERE status = 1 
       ORDER BY sort_order ASC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
const pages = {
  meta_title: webblog[0]?.meta_title || "",
  meta_des: webblog[0]?.meta_des || "",
};


    const cleanedBlog = blog.map(row => {
      try {
        const images = JSON.parse(row.hero_image || "[]");
        row.hero_image = images[0] || "";
      } catch {
        row.hero_image = "";
      }

      // keep display_date only for showing, not sorting
      try {
        const date = new Date(row.display_date);
        row.display_date = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        row.display_date = "";
      }

      return row;
    });



    res.render("blog", {
      pages,
      webblog,
      blog: cleanedBlog,
      currentPage: page,
      totalPages,
      servicesList ,
       addresses
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};





const getblogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        status: false,
        message: "Slug is required",
      });
    }

    // Fetch the requested blog
    const [rows] = await connection.execute(
      "SELECT * FROM blog WHERE blog_slug = ? AND status = 1 LIMIT 1",
      [slug]
    );

    // Fetch footer dependencies
    const [servicesListRaw] = await connection.query("SELECT * FROM services WHERE status = 1");
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");

    const servicesList = servicesListRaw.map(row => {
      try {
        const icons = JSON.parse(row.icon || "[]");
        row.icon = icons[0] || "";
      } catch {
        row.icon = "";
      }
      return row;
    });

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Blog not found",
      });
    }

    let blog = rows[0];

    // Format display date
    blog.formattedDate = blog.display_date
      ? new Date(blog.display_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "N/A";

    try {
      const heroImages = JSON.parse(blog.hero_image || "[]");
      blog.hero_image = Array.isArray(heroImages) ? heroImages[0] || "" : "";
    } catch {
      blog.hero_image = "";
    }


    try {
      blog.list_image = JSON.parse(blog.list_image || "[]");
      if (!Array.isArray(blog.list_image)) blog.list_image = [];
    } catch {
      blog.list_image = [];
    }

    try {
      blog.related_blog = blog.related_blog ? JSON.parse(blog.related_blog) : [];
      if (!Array.isArray(blog.related_blog)) blog.related_blog = [];
    } catch {
      blog.related_blog = [];
    }

 
    const [contentRows] = await connection.query(
      "SELECT * FROM blog_content WHERE blog_id = ? AND status = 1 ORDER BY bc_id ASC",
      [blog.blog_id]
    );

    const blogContent = contentRows.map(item => ({
      ...item,
      image: (() => {
        try {
          return JSON.parse(item.image || "[]");
        } catch {
          return [];
        }
      })(),
      video: (() => {
        try {
          return JSON.parse(item.video || "[]");
        } catch {
          return [];
        }
      })(),
    }));

    // Fetch related blogs
    let relatedBlogs = [];
    if (blog.related_blog.length > 0) {
      const placeholders = blog.related_blog.map(() => "?").join(",");
      const [related] = await connection.execute(
        `SELECT * FROM blog WHERE blog_id IN (${placeholders}) AND status = 1`,
        blog.related_blog
      );

      relatedBlogs = related.map(item => {
        item.formattedDate = item.display_date
          ? new Date(item.display_date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "N/A";

        try {
          const images = JSON.parse(item.hero_image || "[]");
          item.hero_image = Array.isArray(images) ? images[0] || "" : "";
        } catch {
          item.hero_image = "";
        }

        return item;
      });
    }

 const pages = {
  meta_title: blog.meta_title || "",
  meta_des: blog.meta_des || "",
};

    res.render("blog-detail", {
      pages,
      blog,
      blogContent,
      relatedBlogs,
      servicesList,
      addresses
    });

  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};





module.exports = {
    getAllwebblog,
    getblogBySlug,
}