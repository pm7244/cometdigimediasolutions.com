const connection = require("../connection");
const { getIP } = require("../controller/clientIP");

const getallarticles = async (req, res) => {
  try {
    const data = await connection.query(
      "select * from articles where status >= 0"
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

const getbyidarticles = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }

    const data = await connection.query(
      "select * from articles where id = ?",
      [id]
    );
    if (data[0][0]?.id) {
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

const createarticles = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { title, date, slug, image,status } = req.body;

    const [result] = await connection.query(
      `INSERT INTO articles 
      (title, date, slug, ip, status) 
      VALUES (?, ?, ?, ?, ?,?)`,
      [
        title,
        date,
        slug,
        image,
        clientIP,
        status,
      ]
    );

    res.status(201).json({
      status: true,
      message: "Article created successfully",
      article_id: result.insertId,
      ip: clientIP,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



const updatebyidarticles = async (req, res) => {
  try {
    const clientIP = getIP(req);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: false,
        message: "ID not present",
      });
    }

    const { title, date, slug, image, status } = req.body;

    const [updateRes] = await connection.query(
      `UPDATE articles 
       SET title = ?, 
           date = ?, 
           slug = ?, 
           image = ? ,
           ip = ?, 
           status = ?
       WHERE id = ?`,
      [
        title,
        date,
        slug,
        image,
        clientIP,
        status,
        id,
      ]
    );

    if (updateRes.changedRows) {
      return res.status(200).json({
        status: true,
        ip: clientIP,
        message: "Successfully updated",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No changes made (or invalid ID)",
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


const deletebyidarticles = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Id not present",
      });
    }

    const data = await connection.query(
      "update  articles set status=-1 WHERE id=?",
      [id]
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

const updatebyidarticlesstatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: false,
        message: "ID not found",
      });
    }

    const { status } = req.body;

    const data = await connection.query(
      "update articles set status=? where id=?",
      [status, id]
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
  getallarticles,
  getbyidarticles,
  createarticles,
  updatebyidarticles,
  deletebyidarticles,
  updatebyidarticlesstatus,
};
