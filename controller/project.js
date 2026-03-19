const connection = require("../connection");
const { getIP } = require("./clientIP");


const getAllProject = async (req, res) => {
  try {

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const offset = (page - 1) * limit;

    // Get total count for pagination info
    const [countResult] = await connection.query(
      "SELECT COUNT(*) AS total FROM project WHERE status >= 0"
    );
    const total = countResult[0].total || 0;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const [rows] = await connection.query(
      "SELECT * FROM project WHERE status >= 0 ORDER BY p_id DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No records found",
      });
    }

    res.status(200).json({
      status: true,
      page,
      limit,
      total,
      totalPages,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const getByIdProject = async (req, res) => {
  try {
    const {p_id} = req.params;
    if (!p_id) {
      return res.status(404).json({
        status: false,
        message: "p_id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM project WHERE p_id= ? AND status >= 0",
  [p_id]
);
    if (data[0][0]?.p_id) {
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

const createProject = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_image,
      hero_video,
      title,
      short_des,
      des,
      type,
      date,
      brand,
      status,
      slug,
      category,
      service,
      client,
      software,
      list_img,
      big_list_img,
      results_des,
      challenges_des,
      sort_order,
      meta_title,
      meta_des
    } = req.body;

    const listImgStr = JSON.stringify(list_img || []);
    const bigListImgStr = JSON.stringify(big_list_img || []);
    const resultsDesStr = JSON.stringify(results_des || []);
    const challengesDesStr = JSON.stringify(challenges_des || []);

    const [data] = await connection.query(
      `INSERT INTO project (
        title,
        hero_video,
        short_des,
        des,
        type,
        slug,
        hero_image,
        category,
        service,
        client,
        software,
        list_img,
        challenges_des,
        results_des,
        big_list_img,
        date,
        brand,
        status,
        sort_order,   
        meta_title,
        meta_des,
        ip
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        hero_video,
        short_des,
        des,
        type,
        slug,
        hero_image,
        category,
        service,
        client,
        software,
        listImgStr,
        challengesDesStr,
        resultsDesStr,
        bigListImgStr,
        date,
        brand,
        status,
        sort_order, 
        meta_title,
        meta_des,
        clientIP
      ]
    );

    res.status(200).json({
      status: true,
      data,
      ip: clientIP
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};


const updatebyidproject = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { p_id } = req.params;

    if (!p_id) {
      return res.status(400).json({
        status: false,
        message: "p_id not present",
      });
    }

    const {
      hero_image,
      hero_video,
      title,
      short_des,
      des,
      type,
      date,
      brand,
      status,
      slug,
      category,
      service,
      client,
      software,
      list_img,
      big_list_img,
      results_des,
      challenges_des,
      sort_order,
      meta_title,
      meta_des
    } = req.body;

    const listImgStr = JSON.stringify(list_img || []);
    const bigListImgStr = JSON.stringify(big_list_img || []);
    const resultsDesStr = JSON.stringify(results_des || []);
    const challengesDesStr = JSON.stringify(challenges_des || []);

    const [data] = await connection.query(
      `UPDATE project SET 
        title = ?, 
        hero_video = ?, 
        short_des = ?, 
        des = ?, 
        type = ?, 
        slug = ?, 
        hero_image = ?, 
        category = ?, 
        service = ?, 
        client = ?, 
        software = ?, 
        list_img = ?, 
        challenges_des = ?, 
        results_des = ?, 
        big_list_img = ?, 
        date = ?, 
        brand = ?, 
        status = ?, 
        sort_order = ?,
        meta_title = ?,
        meta_des = ?,
        ip = ?
      WHERE p_id = ?`,
      [
        title,
        hero_video,
        short_des,
        des,
        type,
        slug,
        hero_image,
        category,
        service,
        client,
        software,
        listImgStr,
        challengesDesStr,
        resultsDesStr,
        bigListImgStr,
        date,
        brand,
        status,
        sort_order,
        meta_title,
        meta_des,
        clientIP,
        p_id
      ]
    );

    if (data.affectedRows) {
      return res.status(200).json({
        status: true,
        message: "Successfully updated",
        ip: clientIP,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made or record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};





const deleteProject = async (req, res) => {
  try {
    const {p_id} = req.params;
    if (!p_id) {
      return res.status(400).json({
        status: false,
        message: "p_id not present",
      });
    }

    const data = await connection.query(
      "update  project set status=-1 WHERE p_id=?",
      [p_id]
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


module.exports = {
  getAllProject,
  getByIdProject,
  createProject,
  updatebyidproject,
  deleteProject,
};
