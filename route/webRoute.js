const express = require("express");
const webRouter = express.Router();

const home = require("../controller/web_controller/home.js");

const about = require("../controller/web_controller/about.js");


const contact = require("../controller/web_controller/contact.js");




const details = require("../controller/web_controller/industry.js");  


const team = require("../controller/web_controller/team.js");
const service = require("../controller/web_controller/service.js");
const career = require("../controller/web_controller/career.js");
const portfolio = require("../controller/web_controller/portfolio.js");
const blog = require("../controller/web_controller/blog.js");
const serviceses = require("../controller/web_controller/service.js");
const careers = require("../controller/web_controller/career.js");

const blogs = require("../controller/web_controller/blog.js");





/*webRouter.get("/", (req, res) => {
  res.json({ status: true, message: "Hello" });
});*/
webRouter.get("/", home.getAllHome);
webRouter.get("/about", about.getAllAbout);
webRouter.get("/contact", contact.getAllContact);
webRouter.get("/team", team.getAllwebteam);

// Collection routes
webRouter.get("/service", service.getallservice);
webRouter.get("/career", career.getAllwebcareer);
webRouter.get("/blog", blog.getAllwebblog);
webRouter.get("/portfolio", portfolio.getAllwebportfolio);

// Detail routes (with parameters)
webRouter.get("/services/:slug", service.getserviceBySlug);
webRouter.get("/careers/:slug", career.getcareerBySlug);
webRouter.get("/blog/:slug", blog.getblogBySlug);
webRouter.get("/portfolios/:slug", portfolio.getportfolioBySlug);
webRouter.get("/details/:slug", details.getalldetails);


module.exports = webRouter;
