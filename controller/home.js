const connection = require("../connection");
const { getIP } = require("./clientIP");

const getallhome = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from web_home where status >= 0"
    );

    if (data && data[0].length > 0) {
      res.status(200).json({
        status: true,
        data: data[0],
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Record not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getbyidhome = async (req, res) => {
  try {
    const { home_id  } = req.params;
    if (!home_id ) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

   const data = await connection.query(
  "SELECT * FROM web_home WHERE home_id  = ? AND status >= 0",
  [home_id ]
);
    if (data[0][0]?.home_id ) {
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

const createhome = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const {
      hero_title,
      hero_des,
      hero_client,
      video,
      about_title,
      about_des,
      about_img_left,
      about_img_right,
      about_img_bottom,
      core_value_title,
      core_value_status,
      service_title,
      award_img,            // ✅ new field
      work_process_title,
      project_title,
      testimonial_title,
      client_title,
      blog_title,
      meta_title,
      meta_des,
      status
    } = req.body;

    const [data] = await connection.query(
      `INSERT INTO web_home (
        hero_title,
        hero_des,
        hero_client,
        video,
        about_title,
        about_des,
        about_img_left,
        about_img_right,
        about_img_bottom,
        core_value_title,
        core_value_status,
        service_title,
        award_img,    
        work_process_title,
        project_title,
        testimonial_title,
        client_title,
        blog_title,
        meta_title,
        meta_des,
        ip,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        hero_title,
        hero_des,
        hero_client,
        video,
        about_title,
        about_des,
        about_img_left,
        about_img_right,
        about_img_bottom,
        core_value_title,
        core_value_status,
        service_title,
        award_img,           
        work_process_title,
        project_title,
        testimonial_title,
        client_title,
        blog_title,
        meta_title,
        meta_des,
        clientIP,
        status
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



const updatebyidhome = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { home_id } = req.params;

    if (!home_id) {
      return res.status(400).json({
        status: false,
        message: "home_id not present",
      });
    }

    const {
      hero_title,
      hero_des,
      hero_client,
      video,
      about_title,
      about_des,
      about_img_left,
      about_img_right,
      about_img_bottom,
      core_value_title,
      core_value_status,
      service_title,
      award_img,       
      work_process_title,
      project_title,
      testimonial_title,
      client_title,
      blog_title,
      meta_title,
      meta_des,
      status
    } = req.body;

    const [data] = await connection.query(
      `UPDATE web_home SET 
        hero_title = ?, 
        hero_des = ?, 
        hero_client = ?, 
        video = ?, 
        about_title = ?, 
        about_des = ?, 
        about_img_left = ?, 
        about_img_right = ?, 
        about_img_bottom = ?, 
        core_value_title = ?, 
        core_value_status = ?, 
        service_title = ?, 
        award_img = ?,      
        work_process_title = ?, 
        project_title = ?, 
        testimonial_title = ?, 
        client_title = ?, 
        blog_title = ?, 
        meta_title = ?, 
        meta_des = ?, 
        ip = ?, 
        status = ?
      WHERE home_id = ?`,
      [
        hero_title,
        hero_des,
        hero_client,
        video,
        about_title,
        about_des,
        about_img_left,
        about_img_right,
        about_img_bottom,
        core_value_title,
        core_value_status,
        service_title,
        award_img,           
        work_process_title,
        project_title,
        testimonial_title,
        client_title,
        blog_title,
        meta_title,
        meta_des,
        clientIP,
        status,
        home_id
      ]
    );

    if (data.changedRows) {
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



const deletebyidhome = async (req, res) => {
  try {
    const { home_id  } = req.params;
    if (!home_id ) {
      return res.status(400).json({
        status: false,
        message: "home_id  not present",
      });
    }

    const data = await connection.query(
      "update  web_home set status=-1 WHERE home_id =?",
      [home_id ]
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

const updatebyidhomestatus = async (req, res) => {
  try {
    const { home_id  } = req.params;
    if (!home_id ) {
      res.status(404).json({
        status: false,
        message: "home_id  not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update web_home set status=? where home_id =?",
      [status, home_id ]
    );

    if (data[0].changedRows) {
      return res.json({
        status: true,
        message: "status updated successfully",
      });
    } else {
      return res.json({
        status: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getallhome,
  getbyidhome,
  createhome,
  updatebyidhome,
  deletebyidhome,
  updatebyidhomestatus,
};
