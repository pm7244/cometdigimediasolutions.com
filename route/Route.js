const express = require("express");
const router = express.Router();



const middleware = require("../middleware/auth.js");
const filemanager = require("../controller/filemanager.js");
const connection = require("../connection.js");
const cropperLogic = require("../controller/cropper.js");
const store_setting = require("../controller/store_setting.js");
const users = require("../controller/users.js");


const about = require("../controller/about.js");



const webfooter = require("../controller/web_footer.js");

















const contenthome = require("../controller/home_content.js");



///////////////////////////////////////////////////////
const home = require("../controller/home.js");
const core = require("../controller/core_value.js");

const servicecontent = require("../controller/service.js");
const process = require("../controller/work_process.js");
const project = require("../controller/project.js");
const testimonial = require("../controller/testimonial.js");
const client = require("../controller/client.js");
const awards = require("../controller/awards.js");
const blog = require("../controller/blog.js");

const address = require("../controller/address.js");
const enquiries = require("../controller/enquiries.js");


const webabout = require("../controller/web_about.js");
const webteam = require("../controller/web_team.js");
const team = require("../controller/team.js");
const member = require("../controller/team_member.js");
const webservice = require("../controller/web_service.js");
const webcareer = require("../controller/web_career.js");
const webproject = require("../controller/web_project.js");
// const portfolio = require("../controller/portfolio.js");
const webblog = require("../controller/web_blog.js");
const webcontact = require("../controller/web_contact.js");
const career = require("../controller/career.js");
const articles = require("../controller/articles.js");
const job = require("../controller/job_inquiry.js");
const customp = require("../controller/c_package.js");

const wordpress = require("../controller/w_package.js");

const marketing_approach = require("../controller/marketing_approach.js");








//marketing_approach
router.get("/getallmarketing_approach",marketing_approach.getallapproach);
router.get("/getbyidmarketing_approach/:id",marketing_approach.getbyidapproach);
router.post("/createmarketing_approach",marketing_approach.createapproach);
router.put("/updatebyidmarketing_approach/:id?",marketing_approach.updatebyidapproach);
router.put("/updatemarketing_approach-status/:id",marketing_approach.updatebyidapproachstatus);
router.delete("/deletebyidmarketing_approach/:id",marketing_approach.deletebyidapproach);


//wordpress
router.get("/getallwordpress",wordpress.getallwordpress);
router.get("/getbyidwordpress/:id",wordpress.getbyidwordpress);
router.post("/createwordpress",wordpress.createwordpress);
router.put("/updatebyidwordpress/:id?",wordpress.updatebyidwordpress);
router.put("/updatewordpress-status/:id",wordpress.updatebyidwordpressstatus);
router.delete("/deletebyidwordpress/:id",wordpress.deletebyidwordpress);

//customp
router.get("/getallcustomp",customp.getallcustomp);
router.get("/getbyidcustomp/:id",customp.getbyidcustomp);
router.post("/createcustomp",customp.createcustomp);
router.put("/updatebyidcustomp/:id?",customp.updatebyidcustomp);
router.put("/updatecustomp-status/:id",customp.updatebyidcustompstatus);
router.delete("/deletebyidcustomp/:id",customp.deletebyidcustomp);


//job_inquiry
router.get("/getalljob", job.getalljob);
router.get("/getbyidjob/:job_id", job.getbyidjob);
router.post("/createjob", job.upload.single("resume"), job.createjob); // <-- corrected
router.put("/updatebyidjob/:job_id?", job.upload.single("resume"), job.updatebyidjob); // optional file
router.put("/updatejob-status/:job_id", job.updatebyidjobstatus);
router.delete("/deletebyidjob/:job_id", job.deletebyidjob);



//articles
router.get("/getallarticles",articles.getallarticles);
router.get("/getbyidarticles/:id",articles.getbyidarticles);
router.post("/createarticles",articles.createarticles);
router.put("/updatebyidarticles/:id?",articles.updatebyidarticles);
router.put("/updatearticles-status/:id",articles.updatebyidarticlesstatus);
router.delete("/deletebyidarticles/:id",articles.deletebyidarticles);



//career
router.get("/getallcareer",career.getallcareer);
router.get("/getbyidcareer/:c_id",career.getbyidcareer);
router.post("/createcareer",career.createcareer);
router.put("/updatebyidcareer/:c_id?",career.updatebyidcareer);
router.put("/updatecareer-status/:c_id",career.updatebyidcareerstatus);
router.delete("/deletebyidcareer/:c_id",career.deletebyidcareer);


//enquiries
router.get("/getallenquiries", enquiries.getallEnquiry);
router.get("/getbyidenquiries/:enquiry_id", enquiries.getbyidenquiries);
router.post("/createenquiries", enquiries.createenquiries);
router.put("/updatebyidenquiries/:enquiry_id?", enquiries.updatebyidenquiries);
router.put("/updateenquiries-status/:enquiry_id?",enquiries.updatebyidenquirystatus);
router.delete("/deletebyidenquiries/:enquiry_id",enquiries.deletebyidenquiries);


//webblog
router.get("/getallwebblog",webblog.getallwebblog);
router.get("/getbyidwebblog/:b_id",webblog.getbyidwebblog);
router.post("/createwebblog",webblog.createwebblog);
router.put("/updatebyidwebblog/:b_id?",webblog.updatebyidwebblog);
router.put("/updatewebblog-status/:b_id",webblog.updatebyidwebblogstatus,);
router.delete("/deletebyidwebblog/:b_id",webblog.deletebyidwebblog);


//portfolio
// router.get("/getallportfolio",portfolio.getallportfolio);
// router.get("/getbyidportfolio/:id",portfolio.getbyidportfolio);
// router.post("/createportfolio",portfolio.createportfolio);
// router.put("/updatebyidportfolio/:id?",portfolio.updatebyidportfolio);
// router.put("/updateportfolio-status/:id",portfolio.updatebyidportfoliostatus);
// router.delete("/deletebyidportfolio/:id",portfolio.deletebyidportfolio);



//webproject
router.get("/getallwebproject",webproject.getallwebproject);
router.get("/getbyidwebproject/:p_id",webproject.getbyidwebproject);
router.post("/createwebproject",webproject.createwebproject);
router.put("/updatebyidwebproject/:p_id?",webproject.updatebyidwebproject);
router.put("/updatewebproject-status/:p_id",webproject.updatebyidwebprojectstatus);
router.delete("/deletebyidwebproject/:p_id",webproject.deletebyidwebproject);





//webcareer
router.get("/getallwebcareer",webcareer.getallwebcareer);
router.get("/getbyidwebcareer/:c_id",webcareer.getbyidwebcareer);
router.post("/createwebcareer",webcareer.createwebcareer);
router.put("/updatebyidwebcareer/:c_id?",webcareer.updatebyidwebcareer);
router.put("/updatewebcareer-status/:c_id",webcareer.updatebyidwebcareerstatus);
router.delete("/deletebyidwebcareer/:c_id",webcareer.deletebyidwebcareer);


//webservice
router.get("/getallwebservice",webservice.getallwebservice);
router.get("/getbyidwebservice/:s_id",webservice.getbyidwebservice);
router.post("/createwebservice",webservice.createwebservice);
router.put("/updatebyidwebservice/:s_id?",webservice.updatebyidwebservice);
router.put("/updatewebservice-status/:s_id",webservice.updatebyidwebservicestatus);
router.delete("/deletebyidwebservice/:s_id",webservice.deletebyidwebservice);



//team_member
router.get("/getallmember",member.getallmember);
router.get("/getbyidmember/:m_id",member.getbyidmember);
router.post("/createmember",member.createmember);
router.put("/updatebyidmember/:m_id?",member.updatebyidmember);
router.put("/updatemember-status/:m_id",member.updatebyidmemberstatus);
router.delete("/deletebyidmember/:m_id",member.deletebyidmember);

//team
router.get("/getallteam",team.getallteam);
router.get("/getbyidteam/:id",team.getbyidteam);
router.post("/createteam",team.createteam);
router.put("/updatebyidteam/:id?",team.updatebyidteam);
router.put("/updateteam-status/:id",team.updatebyidteamstatus);
router.delete("/deletebyidteam/:id",team.deletebyidteam);




//new_home
router.get("/getallhome",home.getallhome);
router.get("/getbyidhome/:home_id",home.getbyidhome);
router.post("/createhome",home.createhome);
router.put("/updatebyidhome/:home_id?",home.updatebyidhome);
router.put("/updatehome-status/:home_id",home.updatebyidhomestatus);
router.delete("/deletebyidhome/:home_id",home.deletebyidhome);


//new_TEAM
router.get("/getallwebteam",webteam.getallwebteam);
router.get("/getbyidwebteam/:t_id",webteam.getbyidwebteam);
router.post("/createwebteam",webteam.createwebteam);
router.put("/updatebyidwebteam/:t_id?",webteam.updatebyidwebteam);
router.put("/updatewebteam-status/:t_id",webteam.updatebyidwebteamstatus);
router.delete("/deletebyidwebteam/:t_id",webteam.deletebyidwebteam);

//core value 
router.get("/getallcore",core.getallcore);
router.get("/getbyidcore/:core_id",core.getbyidcore);
router.post("/createcore",core.createcore);
router.put("/updatebyidcore/:core_id?",core.updatebyidcore);
router.put("/updatecore-status/:core_id",core.updatebyidcorestatus);
router.delete("/deletebyidcore/:core_id",core.deletebyidcore);

//service
router.get("/getallservice",servicecontent.getallservicecontent);
router.get("/getbyid_service/:s_id",servicecontent.getbyidservicecontent);
router.post("/createservice",servicecontent.createservicecontent);
router.put("/updatebyidservice/:s_id?",servicecontent.updatebyidservicecontent);
router.delete("/deletebyidservice/:s_id",servicecontent.deletebyidservicecontent);


//work_process
router.get("/getallprocess", process.getallprocess);
router.get("/getbyidprocess/:w_id", process.getbyidprocess);
router.post("/createprocess", process.createprocess);
router.put("/updatebyidprocess/:w_id?", process.updatebyidprocess);
router.put("/updateprocess-status/:w_id", process.updatebyidprocessstatus);
router.delete("/deletebyidprocess/:w_id", process.deletebyidprocess);

//project
router.get("/getallproject", project.getAllProject);
router.get("/getbyidproject/:p_id", project.getByIdProject);
router.post("/createproject", project.createProject);
router.put("/updateproject/:p_id", project.updatebyidproject);
// router.put("/status/:p_id", project.updatebyidprojectstatus);
router.delete("/deletebtidproject/:p_id", project.deleteProject);

//testimonial
router.get("/getalltestimonial", testimonial.getalltestimonial);
router.get("/getbyidtestimonial/:testimonial_id", testimonial.getbyidtestimonial);
router.post("/createtestimonial", testimonial.createtestimonial);
router.put("/updatebyidtestimonial/:testimonial_id?", testimonial.updatebyidtestimonial);
router.put( "/updatebyidtestimonial-status/:testimonial_id?", testimonial.updatebyidenquirytestimonialstatus);
router.delete("/deletebyidtestimonial/:testimonial_id",testimonial.deletebyidtestimonial);

//client
router.get("/getallclient", client.getallclient);
router.get("/getbyidclient/:client_id", client.getbyidclient);
router.post("/createclient", client.createclient);
router.put("/updatebyidclient/:client_id?", client.updatebyidclient);
router.put( "/updatebyidclient-status/:client_id?", client.updatebyidenquiryclientstatus);
router.delete("/deletebyidclient/:client_id",client.deletebyidclient);


//AWARDS
router.get("/getallawards", awards.getallawards);
router.get("/getbyidawards/:awards_id", awards.getbyidawards);
router.post("/createawards", awards.createawards);
router.put("/updatebyidawards/:awards_id?", awards.updatebyidawards);
router.put("/updateawards-status/:awards_id", awards.updatebyidawardsstatus);
router.delete("/deletebyidawards/:awards_id", awards.deletebyidawards);

//blog
router.get("/getallblog", blog.getallblog);
router.get("/getbyidblog/:blog_id", blog.getbyidblog);
router.post("/createblog", blog.createblog);
router.put("/updatebyidblog/:blog_id?", blog.updatebyidblog);
router.put("/updateblog-status/:blog_id?", blog.updatebyidblogsstatus);
router.delete("/deletebyidblog/:blog_id", blog.deletebyidblog);

//web_about
router.get("/getallabout", webabout.getallabout);
router.get("/getbyidabout/:id", webabout.getbyidabout);
router.post("/createabout", webabout.createabout);
router.put("/updatebyidabout/:id?", webabout.updatebyidabout);
router.put("/updateabout-status/:id", webabout.updatebyidaboutstatus);
router.delete("/deletebyidabout/:id", webabout.deletebyidabout);



//web_contact
router.get("/getallcontact", webcontact.getallwebcontact);
router.get("/getbyidcontact/:id", webcontact.getbyidwebcontact);
router.post("/createcontact", webcontact.createwebcontact);
router.put("/updatebyidcontact/:id?", webcontact.updatebyidwebcontact);
router.put("/updatecontact-status/:id", webcontact.updatebyidwebcontactstatus);
router.delete("/deletebyidcontact/:id", webcontact.deletebyidwebcontact);

//address
router.get("/getalladdress", address.getalladdress);
router.get("/getbyidaddress/:address_id", address.getbyidaddress);
router.post("/createaddress", address.createaddress);
router.put("/updatebyidaddress/:address_id?", address.updatebyidaddress);
router.put("/updateaddress-status/:address_id",address.updatebyidaddressstatus
);
router.delete("/deletebyidaddress/:address_id", address.deletebyidaddress);



































//new_home_content
router.get("/getallhomecontent",contenthome.getallcontenthome);
router.get("/getbyidhomecontent/:hc_id",contenthome.getbyidcontenthome);
router.post("/createhomecontent",contenthome.createcontenthome);
router.put("/updatebyidhomecontent/:hc_id?",contenthome.updatebyidcontenthome);
// router.put("/updatehomecontent-status/:hc_id",contenthome.updatebyidcontenthomestatus);
router.delete("/deletebyidhomecontent/:hc_id",contenthome. deletebyicontenthome);







//authentication
router.post("/register", middleware.register);
router.post("/login", middleware.login);
router.get("/logout", middleware.logout);





//filemanager
router.get("/get-files/:directory(*)", filemanager.fetchAllFiles);
router.post("/create-directory/:directory(*)", filemanager.createDirectory);
router.post("/upload-file/:directory(*)", filemanager.uploadFile);
router.delete("/delete-directory/:directory(*)", filemanager.deleteDirectory);
router.delete("/delete-all/:directory(*)", filemanager.deleteAll);


//store_setting
router.get("/getallstore_setting", store_setting.getallstore_setting);
router.get("/getbyid-store_setting/:store_id",store_setting.getbyidstore_setting
);
router.post("/create-store_setting", store_setting.createstore_setting);
router.put("/update-store_setting/:store_id",store_setting.updatebyidstore_setting
);
router.put("/status-store_setting/:store_id",store_setting.updatebyidstore_settingstatus
);
router.delete("/delete-store_setting/:store_id",store_setting.deletebyidstore_setting
);

//users
router.get("/getallusers", users.getallusers);
router.get("/getbyidusers/:user_id", users.getbyidusers);
router.post("/createusers", users.createusers);
router.put("/updatebyidusers/:user_id?", users.updatebyidusers);
router.put("/updateuser-status/:user_id?", users.updatebyidassociateuserstatus);
router.delete("/deletebyidusers/:user_id", users.deletebyidusers);



//about
router.get("/getall-about", about.getallaboutcontent);
router.get("/getbyid-about/:ac_id", about.getbyidaboutcontent);
router.post("/create-about", about.createaboutcontent);
router.put("/updatebyid-about/:ac_id?", about.updatebyidaboutcontent);
router.put("/update-about-status/:ac_id", about.updatebyidaboutstatuscontent);
router.delete("/deletebyid-about/:ac_id", about.deletebyidaboutcontent);




//web_footer
router.get("/getallfooter", webfooter.getallwebfooter);
router.get("/getbyidfooter/:id", webfooter.getbyidwebfooter);
router.post("/createfooter", webfooter.createwebfooter);
router.put("/updatebyidfooter/:id?", webfooter.updatebyidwebfooter);
router.put("/updatefooter-status/:id", webfooter.updatebyidwebfooterstatus);
router.delete("/deletebyidfooter/:id", webfooter.deletebyidwebfooter);

























//web_pre_projects

// router.get("/getallwebservice",service.getallpreprojects);
// router.put("/updatebyidwebservice/:id?",service.updatebyidpreprojects);





//image-cropper
router.get("/transform/:filename(*)", cropperLogic.cropperLogic);








module.exports = router;
