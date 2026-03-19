const connection = require("../../connection");

const getAllContact = async (req, res) => {
  try {
   
    const [contacts] = await connection.query("SELECT * FROM web_contact WHERE status = 1");
    const [addresses] = await connection.query("SELECT * FROM address WHERE status = 1");
    const [enquiries] = await connection.query("SELECT * FROM enquiries WHERE enquiry_status >= 0");
    

     const [servicesList ] = await connection.query("SELECT * FROM services WHERE status = 1");


     const pages = {
  meta_title: contacts[0].meta_title || "",
  meta_des: contacts[0].meta_des || "",
};
  

    
    res.render("contact", {
      pages,
      contacts,
      addresses, 
      enquiries,
       servicesList ,

  
    });

  } catch (error) {
    console.error("Error fetching contact, footer, or address data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllContact,
};
