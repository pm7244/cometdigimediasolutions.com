const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

// ======================= GET ALL BLOGS =======================
const getallblog = async (req, res) => {
  try {
    if (req.query.all === 'true') {
      const [data] = await connection.query(
        `SELECT
           b.*,
           GROUP_CONCAT(
             CONCAT_WS('||',
               bc.bc_id,
               IFNULL(bc.text, ''),
               IFNULL(bc.quote, ''),
               IFNULL(bc.image, ''),
               IFNULL(bc.video, ''),
               bc.status
             )
           ) AS blog_contents
         FROM blog b
         LEFT JOIN blog_content bc ON b.blog_id = bc.blog_id
         WHERE b.status >= 0
         GROUP BY b.blog_id
         ORDER BY b.display_date DESC`
      );
      // Parse JSON fields
      data.forEach((blog) => {
        try {
          blog.related_blog = blog.related_blog ? JSON.parse(blog.related_blog) : [];
        } catch {
          blog.related_blog = [];
        }
        // Convert GROUP_CONCAT back to array of objects
        blog.blog_contents = blog.blog_contents
          ? blog.blog_contents.split(',').map((row) => {
              const [bc_id, text, quote, image, video, status] = row.split('||');
              return {
                bc_id: parseInt(bc_id),
                text,
                quote,
                image: image ? JSON.parse(image) : [],
                video: video ? JSON.parse(video) : [],
                status: parseInt(status),
              };
            })
          : [];
      });
      return res.status(200).json({
        status: true,
        data,
        total: data.length,
        message: "All blogs retrieved successfully",
      });
    }
    // :repeat: Do the same GROUP_CONCAT logic for pagination query too
    let page = parseInt(req.query.page) || 1;
    let limit = 4;
    let offset = (page - 1) * limit;
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM blog WHERE status >= 0"
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    const [data] = await connection.query(
      `SELECT
         b.*,
         GROUP_CONCAT(
           CONCAT_WS('||',
             bc.bc_id,
             IFNULL(bc.text, ''),
             IFNULL(bc.quote, ''),
             IFNULL(bc.image, ''),
             IFNULL(bc.video, ''),
             bc.status
           )
         ) AS blog_contents
       FROM blog b
       LEFT JOIN blog_content bc ON b.blog_id = bc.blog_id
       WHERE b.status >= 0
       GROUP BY b.blog_id
       ORDER BY b.display_date DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    data.forEach((blog) => {
      try {
        blog.related_blog = blog.related_blog ? JSON.parse(blog.related_blog) : [];
      } catch {
        blog.related_blog = [];
      }
      blog.blog_contents = blog.blog_contents
        ? blog.blog_contents.split(',').map((row) => {
            const [bc_id, text, quote, image, video, status] = row.split('||');
            return {
              bc_id: parseInt(bc_id),
              text,
              quote,
              image: image ? JSON.parse(image) : [],
              video: video ? JSON.parse(video) : [],
              status: parseInt(status),
            };
          })
        : [];
    });
    if (data.length > 0) {
      res.status(200).json({
        status: true,
        currentPage: page,
        totalPages,
        totalRecords: total,
        perPage: limit,
        data,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "No blogs found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


// ======================= GET BLOG BY ID =======================
const getbyidblog = async (req, res) => {
  try {
    const { blog_id } = req.params;
    if (!blog_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    // Fetch blog + content
    const [data] = await connection.query(
      `SELECT b.*, bc.bc_id, bc.text AS content_text, bc.quote AS content_quote, 
              bc.image AS content_image, bc.video AS content_video, bc.status AS content_status
       FROM blog b
       LEFT JOIN blog_content bc ON b.blog_id = bc.blog_id
       WHERE b.blog_id = ?`,
      [blog_id]
    );

    if (!data[0]) {
      return res.status(404).json({
        status: false,
        message: "Data not found",
      });
    }

    const blog = data[0];

    // Parse JSON fields
    try {
      blog.related_blog = blog.related_blog ? JSON.parse(blog.related_blog) : [];
    } catch {
      blog.related_blog = [];
    }

    try {
      blog.content_image = blog.content_image ? JSON.parse(blog.content_image) : [];
    } catch {
      blog.content_image = [];
    }

    try {
      blog.content_video = blog.content_video ? JSON.parse(blog.content_video) : [];
    } catch {
      blog.content_video = [];
    }

    // Fetch related blogs if any
    if (blog.related_blog.length > 0) {
      const [related] = await connection.query(
        `SELECT * FROM blog WHERE blog_id IN (?) AND status = 1`,
        [blog.related_blog]
      );
      blog.related_articles = related;
    } else {
      blog.related_articles = [];
    }

    return res.status(200).json({
      status: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};



const createblog = async (req, res) => {
  try {
    const clientIP = getIP(req);

    const {
      blog_name,
      blog_slug,
      short_description,
      overview,
      quote,
      display_date,
      author_name,
      type,
      hero_image,
      list_image,
      meta_title,
      meta_des,
      status,
      related_blog,
      sort_order,
      blog_content 
    } = req.body;

    // Step 1: Insert into blog
    const [blogResult] = await connection.query(
      `INSERT INTO blog 
      (blog_name, blog_slug, short_description, overview, quote, display_date, author_name, type, hero_image, list_image, meta_title, meta_des, ip, status, related_blog, sort_order) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        blog_name,
        blog_slug,
        short_description,
        overview,
        quote,
        display_date,
        author_name,
        type,
        hero_image,
        list_image,
        meta_title,
        meta_des,
        clientIP,
        status,
        JSON.stringify(related_blog || []),
        sort_order || 0,
      ]
    );

    const newBlogId = blogResult.insertId;

    // Step 2: Insert multiple blog_content rows
    if (Array.isArray(blog_content) && blog_content.length > 0) {
      for (const content of blog_content) {
        await connection.query(
          `INSERT INTO blog_content 
          (blog_id, text, quote, image, video, status, ip)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            newBlogId,
            content.text || "",
            content.quote || "",
            JSON.stringify(content.image || []),
            JSON.stringify(content.video || []),
            content.status ?? 1,
            clientIP
          ]
        );
      }
    }

    res.status(200).json({
      status: true,
      message: "Blog and multiple blog_content items created successfully",
      blog_id: newBlogId,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const updatebyidblog = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { blog_id } = req.params;

    if (!blog_id) {
      return res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const {
      blog_name,
      blog_slug,
      short_description,
      overview,
      quote,
      display_date,
      author_name,
      type,
      hero_image,
      list_image,
      meta_title,
      meta_des,
      status,
      related_blog,
      sort_order,
      blog_content 
    } = req.body;

    // Step 1: Update blog
    const [blogData] = await connection.query(
      `UPDATE blog SET 
        blog_name = ?, 
        blog_slug = ?, 
        short_description = ?, 
        overview = ?, 
        quote = ?, 
        display_date = ?, 
        author_name = ?, 
        type = ?, 
        hero_image = ?,
        list_image = ?,
        meta_title = ?, 
        meta_des = ?, 
        ip = ?, 
        status = ?, 
        related_blog = ?,
        sort_order = ?
      WHERE blog_id = ?`,
      [
        blog_name,
        blog_slug,
        short_description,
        overview,
        quote,
        display_date,
        author_name,
        type,
        hero_image,
        list_image,
        meta_title,
        meta_des,
        clientIP,
        status,
        JSON.stringify(related_blog || []),
        sort_order || 0,
        blog_id,
      ]
    );

    // Step 2: Update or Insert blog_content rows
    if (Array.isArray(blog_content) && blog_content.length > 0) {
      for (const content of blog_content) {
        if (content.bc_id) {
          await connection.query(
            `UPDATE blog_content SET 
              text = ?, 
              quote = ?, 
              image = ?, 
              video = ?, 
              status = ?, 
              ip = ?
            WHERE bc_id = ? AND blog_id = ?`,
            [
              content.text || "",
              content.quote || "",
              JSON.stringify(content.image || []),
              JSON.stringify(content.video || []),
              content.status ?? 1,
              clientIP,
              content.bc_id,
              blog_id
            ]
          );
        } else {
          // Insert new content if bc_id not provided
          await connection.query(
            `INSERT INTO blog_content 
              (blog_id, text, quote, image, video, status, ip)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              blog_id,
              content.text || "",
              content.quote || "",
              JSON.stringify(content.image || []),
              JSON.stringify(content.video || []),
              content.status ?? 1,
              clientIP
            ]
          );
        }
      }
    }

    return res.status(200).json({
      status: true,
      message: "Blog and blog_content updated successfully",
      ip: clientIP,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};



// ======================= DELETE BLOG =======================
const deletebyidblog = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const [data] = await connection.query(
      "UPDATE blog SET status=-1 WHERE blog_id =?",
      [blog_id]
    );

    if (data.affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Failed to delete",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// ======================= UPDATE STATUS =======================
const updatebyidblogsstatus = async (req, res) => {
  try {
    const { blog_id } = req.params;
    if (!blog_id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;
    const [data] = await connection.query(
      "UPDATE blog SET status=?  WHERE blog_id =?",
      [status, blog_id]
    );

    if (data.changedRows) {
      return res.status(200).json({
        status: true,
        message: "update data successfully",
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

module.exports = {
  getallblog,
  getbyidblog,
  createblog,
  updatebyidblog,
  deletebyidblog,
  updatebyidblogsstatus,
};
