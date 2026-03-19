import React from "react";

//Svg icons of Dashboard

const Dashboardsvg = <i className="ri-home-8-line side-menu__icon"></i>;

const WidgetsSvg = <i className="ri-apps-2-line side-menu__icon"></i>;

const ComponentsSvg = <i className="ri-inbox-line side-menu__icon"></i>;

const PagesSvg = <i className="ri-book-open-line side-menu__icon"></i>;

export const MenuItems = [
  {
    id: 1,
    menutitle: "MAIN",
    Items: [
      {
        id: 2,
        icon: Dashboardsvg,
        path: `/cms`,
        title: "Dashboards",
        type: "link",
        active: false,
        selected: false,
      },

     
      // {
      //   id: 115,
      //   icon: WidgetsSvg,
      //   title: "Projects",
      //   type: "sub",
      //   active: false,
      //   selected: false,
      //   children: [
      //     {
      //       id: 201,
      //       icon: Dashboardsvg,
      //       path: `/cms/projects/list`,
      //       title: "Projects",
      //       type: "link",
      //       active: false,
      //       selected: false,
      //     },
      //     {
      //       id: 202,
      //       icon: Dashboardsvg,
      //       path: `/cms/projects/configs`,
      //       title: "Project Configurations",
      //       type: "link",
      //       active: false,
      //       selected: false,
      //     },
      //     {
      //       id: 203,
      //       icon: Dashboardsvg,
      //       path: `/cms/projects/service`,
      //       title: "Service",
      //       type: "link",
      //       active: false,
      //       selected: false,
      //     },
      //   ],
      // },
      // {
      //   id: 333,
      //   icon: Dashboardsvg,
      //   path: `/cms/logs`,
      //   title: "Logs",
      //   type: "link",
      //   active: false,
      //   selected: false,
      // },
    ],
  },
  
  {
    menutitle: "Webcontents",
    Items: [
      {
        id: 16,
        icon: ComponentsSvg,
        title: "General",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 17,
            path: `/cms/pages/store-setting`,
            type: "link",
            active: false,
            selected: false,
            title: "Store Setting",
          },
          {
            id: 18,
            path: `/cms/general/address`,
            title: "Address",
            type: "link",
            active: false,
            selected: false,
          },
          // {
          //   id: 19,
          //   path: `/cms/general/blogs`,
          //   title: "Blogs",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
          // {
          //   id: 20,
          //   path: `/cms/general/career`,
          //   title: "Career",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
          // {
          //   id: 21,
          //   path: `/cms/general/client`,
          //   title: "Client",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
          // {
          //   id: 22,
          //   path: `/cms/general/core-value`,
          //   title: "Core Value",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
          {
            id: 23,
            path: `/cms/general/enquiries`,
            title: "Contact Enquiries",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 24,
            path: `/cms/general/career-enquiries`,
            title: "Career Enquiries",
            type: "link",
            active: false,
            selected: false,
          },
          // {
          //   id: 25,
          //   path: `/cms/general/portfolio`,
          //   title: "Portfolio",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
       
          // {
          //   id: 26,
          //   path: `/cms/general/service`,
          //   title: "Service",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
          
          {
            id: 28,
            path: `/cms/general/testimonials`,
            title: "Testimonials",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
      {
        id: 86,
        icon: PagesSvg,
        title: "Pages",
        type: "sub",
        active: false,
        selected: false,
        children: [
          {
            id: 87,
            path: `/cms/pages/home`,
            title: "Home",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 90,
            path: `/cms/pages/web_about`,
            title: "About",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 91,
            path: `/cms/pages/web_service`,
            title: "Service",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 92,
            path: `/cms/pages/web_career`,
            title: "Career",
            type: "link",
            active: false,
            selected: false,
          },
            {
            id: 25,
            path: `/cms/pages/web_project`,
            title: "Project",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 93,
            path: `/cms/pages/web_team`,
            title: "Team",
            type: "link",
            active: false,
            selected: false,
          },

          {
            id: 94,
            path: `/cms/pages/web_blog`,
            title: "Blogs",
            type: "link",
            active: false,
            selected: false,
          },
          {
            id: 95,
            path: `/cms/pages/web_contact`,
            title: "Contact",
            type: "link",
            active: false,
            selected: false,
          },
  
         
          // {
          //   id: 101,
          //   path: `/cms/pages/web-career`,
          //   title: "Career",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
   
        
      
        ],
      },
    ],
  },
];
export default MenuItems;
