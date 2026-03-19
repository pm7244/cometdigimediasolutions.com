const connection = require("../../connection");
const { getIP } = require("../clientIP");

const getAllwebteam = async (req, res) => {
  try {
    // Fetch from all related tables
    const [rows] = await connection.query("SELECT * FROM web_team WHERE status = 1");
    const [testimonials] = await connection.query("SELECT * FROM testimonials WHERE status = 1");
    const [homeRows] = await connection.query("SELECT * FROM web_home WHERE status = 1");
    const [ourteam] = await connection.query("SELECT * FROM team WHERE status = 1");
    const [teammember] = await connection.query("SELECT * FROM team_member WHERE status = 1");
     const [servicesList ] = await connection.query("SELECT * FROM services WHERE status = 1");
      const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");


    // Handle group_image JSON parsing
    let team = null;
    if (rows.length > 0) {
      const row = rows[0];
      try {
        row.group_image = JSON.parse(row.group_image || '[]');
      } catch {
        row.group_image = [];
      }
      team = row;
    }

    // Parse images for `ourteam`
    const ourteamData = ourteam.map(member => {
      try {
        member.image = JSON.parse(member.image || '[]');
      } catch {
        member.image = [];
      }
      return member;
    });

    // Parse images for `teammember`
    const teammemberData = teammember.map(tm => {
      try {
        tm.image = JSON.parse(tm.image || '[]');
      } catch {
        tm.image = [];
      }
      return tm;
    });

    const pages = {
  meta_title: rows[0].meta_title || "",
  meta_des: rows[0].meta_des || "",
};

    // Render page with all data
    res.render("team", {
pages,
      team,
      testimonials,
      homeRows,
      servicesList ,
      ourteam: ourteamData,
      teammember: teammemberData,
       addresses
     
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

module.exports = { getAllwebteam };
