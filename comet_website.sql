-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 19, 2026 at 09:44 AM
-- Server version: 8.0.45-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comet_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int NOT NULL,
  `footer_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `address` text COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `footer_title`, `name`, `latitude`, `longitude`, `email`, `address`, `city`, `phone_no`, `status`, `created_at`, `updated_at`, `ip`) VALUES
(9, '', 'Comet Digimedia Solutions', 28.6139, 77.209, 'info@cometdigimediasolutions.com', 'A-704, Sonorous, Silvasa Rd, opp. Circuit House, Near Vapi Railway Station, Vapi, Gujarat 396191', 'Vapi', '98209 24125', 1, '2025-08-11 14:52:26', '2025-08-11 14:52:26', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `date`, `slug`, `image`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'My First Blog Post', '2025-08-13', 'my-first-blog-post', '[\"images/blog/blog-thumb-1.png\"]', '::ffff:127.0.0.1', 1, '2025-08-13 16:16:09', '2025-08-13 16:16:09'),
(2, 'CEO Letter to Shareholders', '2025-08-01', 'ceo-letter-2025', '[\"images/blog/blog-thumb-1.png\"]', '::ffff:127.0.0.1', 1, '2025-08-13 16:16:32', '2025-08-13 16:16:32'),
(3, 'New Product Launch Announcement', '2025-07-15', 'new-product-launch', '[\"images/blog/blog-thumb-1.png\"]', '::ffff:127.0.0.1', 1, '2025-08-13 16:16:41', '2025-08-13 16:16:41'),
(4, 'CEO Letter to Shareholders', '2025-08-01', 'ceo-letter-2025', '[\"images/blog/blog-thumb-1.png\"]', '::ffff:127.0.0.1', 1, '2025-08-13 16:16:49', '2025-08-13 16:16:49');

-- --------------------------------------------------------

--
-- Table structure for table `awards`
--

CREATE TABLE `awards` (
  `awards_id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `awards_info` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `sort_order` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `awards`
--

INSERT INTO `awards` (`awards_id`, `title`, `awards_info`, `sort_order`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'MadCon Dubai 2019 - Top 100 Marketing & Advertising Companies', 'MadCon Dubai ─ 2019', '1', '::1', 1, '2025-08-06 15:34:25', '2025-08-06 15:34:25'),
(2, 'Startup Vapi 2019 - Most Popular Entrepreneur\n', 'Startup Vapi ─ 2019', '2', '::1', 1, '2025-08-06 15:34:53', '2025-08-06 15:34:53'),
(3, 'Global Women Leadership - Gujarat Women Leaders 2020', 'Global Women Leadership', '3', '::1', 1, '2025-08-06 15:35:17', '2025-08-06 15:35:17');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int NOT NULL,
  `related_blog` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `blog_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `blog_slug` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `short_description` text COLLATE utf8mb4_general_ci NOT NULL,
  `overview` text COLLATE utf8mb4_general_ci NOT NULL,
  `quote` text COLLATE utf8mb4_general_ci NOT NULL,
  `display_date` datetime NOT NULL,
  `author_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `list_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `sort_order` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`blog_id`, `related_blog`, `blog_name`, `slug`, `blog_slug`, `short_description`, `overview`, `quote`, `display_date`, `author_name`, `type`, `hero_image`, `list_image`, `sort_order`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, '[3,2]', 'The Future of SEO: Trends That Will Define 2025', 'the-future-of-seo-trends-that-will-define-2025', 'the-future-of-seo-trends-that-will-define-2025', 'Search engine optimization has evolved far beyond keywords and backlinks.', 'Search engine optimization has evolved far beyond keywords and backlinks. In 2025, SEO is a sophisticated, user-focused strategy driven by artificial intelligence, shifting algorithms, and new ways consumers search for information. Businesses that fail to adapt risk being left behind, while those that embrace these changes are positioned for long-term growth. At Comet Digi Media Solutions, we believe SEO is no longer about chasing rankings; it’s about building trust, delivering value, and creating meaningful connections with your audience.', 'In this blog, we explore effective strategies for scaling startups in a competitive market', '2025-09-10 00:00:00', 'Fatima Merchant', 'Business', '[\"images/blog/blog-thumb-1.png\"]', '[\"images/blog/blog-thumb-1.png\"]', '1', 'The Future of SEO: Key Trends to Watch in 2025 | Comet Digi Media Solutions', 'Discover the SEO trends that will shape 2025. Learn how AI, semantic search, mobile UX, and authority-building strategies can boost your brand’s online visibility.\n', '::1', 1, '2025-08-06 15:57:06', '2025-08-06 15:57:06'),
(2, '[1,2]', 'Digital First Impressions: Why Your Brand’s Online Presence Decides Your Success', 'digital-first-impressions-why-your-brands-online-presence-decides-your-success', 'digital-first-impressions-why-your-brands-online-presence-decides-your-success', 'In today’s fast-paced digital world, a brand has only seconds to make a lasting impression. Before a potential customer visits a physical store or makes a call, they’re likely to search for your business online.', 'A website is often the first impression customers have of a brand. It can make or break a potential sale in just a few seconds. Yet, many businesses invest in a website only to unknowingly sabotage their growth with simple mistakes. In 2025, user expectations are higher than ever, and avoiding these common errors is crucial to building a strong digital presence. At Comet Digi Media Solutions, we help businesses create websites that not only look good but also deliver results.', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2025-09-04 00:00:00', 'Fatima Merchant', 'Marketing', '[\"images/blog/blog2.png\"]', '[\"images/blog/blog2.png\"]', '2', 'Digital First Impressions: Build a Strong Online Presence | Comet Digi Media Solutions', 'Learn why your brand’s digital presence is crucial for growth. Explore strategies for websites, social media, and branding that leave a lasting impression.', '::1', 1, '2025-08-06 15:57:35', '2025-08-06 15:57:35'),
(3, '[1,2]', '5 Common Website Mistakes That Are Hurting Your Business', '5-common-website-mistakes-that-are-hurting-your-business', '5-common-website-mistakes-that-are-hurting-your-business', 'A website is often the first impression customers have of a brand. It can make or break a potential sale in just a few seconds.', 'A website is often the first impression customers have of a brand. It can make or break a potential sale in just a few seconds. Yet, many businesses invest in a website only to unknowingly sabotage their growth with simple mistakes. In 2025, user expectations are higher than ever, and avoiding these common errors is crucial to building a strong digital presence. At Comet Digi Media Solutions, we help businesses create websites that not only look good but also deliver results.', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2025-08-04 00:00:00', 'Fatima Merchant', 'Work Culture', '[\"images/blog/blog3.png\"]', '[\"/images/blog/blog-details-img-1.png\"]', '3', '5 Website Mistakes That Hurt Your Business | Comet Digi Media Solutions', 'Avoid common website errors that drive away customers. Improve usability, speed, mobile experience, and SEO to grow your business online.', '::1', 1, '2025-08-06 15:57:44', '2025-08-06 15:57:44'),
(4, '[1]', 'Why Strong Visual Content is the Secret to Digital Marketing Success', '', 'why-strong-visual-content-is-the-secret-to-digital-marketing-success', 'In today’s competitive digital landscape, brands are constantly fighting for attention. ', 'In today’s competitive digital landscape, brands are constantly fighting for attention. Consumers scroll past hundreds of ads, posts, and videos every day, making it harder for businesses to stand out. The secret to breaking through the noise isn’t just clever captions or trending hashtags—it’s high-quality visual content. Graphic design, video production, and motion graphics have become essential tools for brands that want to create a lasting impact.', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2025-08-05 00:00:00', 'Fatima Merchant', 'Technology', '[\"images/blog/blog4.png\"]', '[\"images/blog/blog-details-img-1.png\"]', '4', 'Why Visual Content is Key to Digital Marketing Success | Comet Digi Media Solutions', ' Explore how professional graphics, videos, and motion design drive engagement and conversions. Learn why visual content is essential for modern marketing.', '::1', 1, '2025-08-06 15:57:53', '2025-08-06 15:57:53'),
(5, '[2]', 'Why Does Any Company Need a Good Landing Page?', '', 'quanto-agency-revolutionizes-work-with-the-power-of-ai-driven', 'Discover how AI is changing the landscape of web development.', ' Especially in today’s digital world, your online presence is often the first (and sometimes only) touchpoint with your audience. If visitors don’t immediately connect with what they see, chances are they’ll never explore your business further. That’s exactly why companies today are investing significant time, effort, and money into crafting compelling landing pages.\nWhether you\'re running a 360-degree marketing campaign or a small-scale social media promotion, the effectiveness of your landing page determines your success. As marketers often say — it all comes down to the landing page.\nIf your landing page lacks focus, clarity, or visual appeal, it can negatively impact everything — from your online credibility to your ability to convert leads and retain attention.\n', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2019-12-24 00:00:00', 'Vidhi Punamiya', 'Technology', '[\"images/blog/blog5.png\"]', '[\"images/blog/blog-details-img-1.png\"]', '5', 'he Importance of a High-Converting Landing Page | Comet Digi Media Solutions', ' Discover why landing pages are vital for lead generation and conversions. Learn tips for creating focused, persuasive pages that drive business results.\n', '::1', 1, '2025-08-06 15:57:54', '2025-08-06 15:57:54'),
(6, '[2]', 'Importance of GIFs and Memes in Online Content', '', 'importance-of-gifs-and-memes-in-online-content', 'Discover how AI is changing the landscape of web development.', 'Just like spices enhance the flavor of food, GIFs and memes add life to digital content. They entertain, communicate, and captivate — all while getting your message across in a way that’s both impactful and memorable.\r\nIn today’s fast-paced world, where attention spans are short and content is consumed rapidly, GIFs and memes have become the universal language of the internet. In fact, we’ve reached a point where communication can happen without typing a single word — just one well-placed meme or GIF can say it all.\r\nWhether you\'re targeting millennials, Gen Z, or any visually engaged audience, these tools offer quick gratification and a high entertainment quotient — making your content relatable, shareable, and unforgettable.', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2019-05-14 00:00:00', 'Karishma Shah', 'Technology', '[\"images/blog/blog6.png\"]', '[\"images/blog/blog-details-img-1.png\"]', '7\r\n', 'How GIFs and Memes Boost Engagement in Digital Marketing | Comet Digi Media Solutions', ' Learn how GIFs and memes can make your online content more relatable and shareable. Boost social media engagement and audience interaction effectively.', '::1', 1, '2025-08-06 15:57:54', '2025-08-06 15:57:54'),
(7, '[2]', '9 Common Mistakes People Make While Creating a Business Website', '', '9-common-mistakes-people-make-while-creating-a-business-website', 'Discover how AI is changing the landscape of web development.', 'In today’s digital world, we all know that whether your business is small or big, having a well-designed website is essential. But creating and maintaining that website? That’s where many businesses struggle.\r\nFrom selecting compelling visuals to writing SEO-friendly content and choosing the right tools, we understand how overwhelming developing a corporate website can be — especially when time is short.\r\nAt Comet Digimedia Solutions, we provide 360-degree marketing solutions for both small and large enterprises. Our expert team builds custom CMS platforms that allow even non-technical users to manage their websites with ease.\r\nBut even with all the tools and guidance, we’ve seen many businesses fall into the same traps when building their online presence.\r\n', 'Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project.', '2020-01-08 00:00:00', 'Karishma Shah', 'Technology', '[\"images/blog/blog7.png\"]', '[\"images/blog/blog-details-img-1.png\"]', '8\r\n', ' 9 Common Business Mistakes to Avoid | Comet Digi Media Solutions', 'Starting a business? Avoid these common mistakes that can hinder growth. Learn practical tips for planning, branding, marketing, and operations.', '::1', 1, '2025-08-06 15:57:54', '2025-08-06 15:57:54'),
(16, '[]', 'The Future of Web Development', '', 'future-of-web-development', 'Trends and technologies shaping the future of web development.', 'In this article, we explore upcoming frameworks, AI-driven tools, and best practices for modern developers.', 'The future belongs to those who embrace change.', '2025-09-04 00:00:00', 'Mukesh Pawar', 'technology', 'uploads/blogs/hero-image.png', 'uploads/blogs/list-image.png', '1', 'Future of Web Development - Insights & Trends', 'Discover the latest trends in web development including AI integration, frameworks, and modern best practices.', '::ffff:127.0.0.1', -1, '2025-09-11 11:51:52', '2025-09-11 11:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `blog_content`
--

CREATE TABLE `blog_content` (
  `bc_id` int NOT NULL,
  `blog_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `text` text COLLATE utf8mb4_general_ci,
  `quote` text COLLATE utf8mb4_general_ci,
  `image` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `video` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ip` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL
) ;

--
-- Dumping data for table `blog_content`
--

INSERT INTO `blog_content` (`bc_id`, `blog_id`, `title`, `text`, `quote`, `image`, `video`, `status`, `created_at`, `updated_at`, `ip`) VALUES
(1, 1, 'Smarter Search: AI-Powered Results', 'Google’s use of artificial intelligence has transformed the way users interact with search engines. Features like Search Generative Experience (SGE) now provide conversational answers directly in search results, reducing the importance of traditional ranking positions. To stay visible, brands must focus on building topic authority and delivering content that genuinely educates and engages. A well-structured site, backed by expertise and credibility, is essential for staying competitive in this new search landscape.', NULL, NULL, NULL, 1, '2025-09-04 09:27:13', '2025-09-09 06:18:21', '::1'),
(2, 1, 'Beyond Keywords: The Rise of Intent-Driven Content', 'Search queries are becoming more complex as users ask natural, conversational questions. This shift has made semantic search more important than ever. Instead of targeting single keywords, businesses need to create comprehensive content that addresses user intent. Thoughtful content clusters, strategic internal linking, and genuinely helpful resources now carry more weight than keyword density alone.', NULL, NULL, NULL, 1, '2025-09-04 10:24:47', '2025-09-09 06:21:54', '::1'),
(3, 1, 'The User Experience Factor', 'SEO success is no longer just about technical optimization; user experience is at the core. Mobile-first design is now the standard, but in 2025, speed, clarity, and accessibility define rankings. Websites that frustrate users with slow load times, intrusive popups, or cluttered layouts risk losing both visitors and visibility. Brands must invest in clean design, intuitive navigation, and performance optimization to build trust and maintain engagement.', NULL, NULL, NULL, 1, '2025-09-04 10:28:44', '2025-09-09 06:22:25', '::1'),
(4, 1, 'Link Building Through Authority', 'Traditional link-building strategies are becoming less effective as search engines prioritize trust and credibility. Instead of chasing backlinks, brands should focus on earning mentions through digital PR, thought leadership, and high-quality content. Guest features, partnerships, and original research are becoming powerful tools to strengthen brand reputation and search visibility.', NULL, NULL, NULL, 1, '2025-09-04 10:28:44', '2025-09-09 06:24:15', '::1'),
(5, 2, 'The Power of First Impressions in the Digital Era', 'Studies show that it takes less than three seconds for users to form an opinion about a brand based on its website or social media profile. Unlike traditional marketing, where businesses could rely on personal interaction to build trust, digital-first impressions are instant and unforgiving. A poorly designed website, inconsistent branding, or slow response time can cost a business valuable leads before it even has a chance to communicate its value.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 06:42:43', '::1'),
(19, 2, 'Your Website as a Brand Statement', 'Your website is often the first touchpoint for potential customers. A clean design, intuitive navigation, and clear messaging instantly communicate professionalism and credibility. On the other hand, outdated visuals, cluttered layouts, and slow loading times can create doubt. In 2025, mobile optimization is equally crucial, as a majority of users browse on smartphones. A well-built website acts as a powerful sales tool, working around the clock to build trust and encourage conversions.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 06:42:43', '::1'),
(20, 2, 'Social Media as a Reflection of Brand Identity', 'Social media has become an essential part of a brand’s reputation. A strong and consistent presence not only builds awareness but also establishes authority in your industry. Brands that invest in high-quality content, engage with followers, and maintain a consistent tone and aesthetic stand out in crowded feeds. Consumers now view social media pages as an extension of a brand’s website—both must work together to create a cohesive image.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 06:42:43', '::1'),
(21, 2, 'Consistency Builds Trust', 'A strong online presence isn’t just about visuals; it’s about consistency. Your logo, color palette, messaging, and even your response time on customer inquiries all contribute to how people perceive your brand. Consistency across all platforms reassures customers that your business is professional, reliable, and trustworthy.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 06:42:43', '::1'),
(22, 2, 'Why Digital Branding Is an Investment, Not an Expense', 'Many businesses view website design, social media management, and branding as optional expenses. In reality, they are powerful investments in long-term growth. A professional digital presence increases credibility, drives engagement, and influences purchasing decisions. Customers are more likely to choose a business that demonstrates attention to detail and professionalism through its online presence.\r\nAt Comet Digi Media Solutions, we help brands take control of their first impression. From website design and development to social media strategy and content creation, we ensure every touchpoint reflects your brand’s true value. In a digital-first world, your online presence is your brand’s handshake—and it must be strong, confident, and unforgettable.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 06:42:43', '::1'),
(23, 3, 'Slow Loading Speeds Drive Visitors Away', 'A slow website is one of the fastest ways to lose potential customers. Studies show that nearly half of users abandon a page if it takes longer than three seconds to load. Common causes include unoptimized images, poor hosting, and unnecessary plugins. Speed optimization isn’t optional; it’s a necessity for user experience and search engine rankings.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:09:36', '::1'),
(24, 3, 'Poor Mobile Experience', 'More than 60% of web traffic now comes from mobile devices, yet many businesses still design with desktop users in mind. Mobile-first design ensures that every visitor, no matter the device, has a seamless browsing experience. Sites that aren’t mobile-friendly risk frustrating users and damaging brand credibility.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:09:36', '::1'),
(25, 3, 'Confusing Navigation', 'A beautiful design means nothing if users can’t find what they’re looking for. Complex menus, hidden links, and unclear calls to action discourage engagement. Intuitive navigation helps users quickly access information, increasing the chances of conversions.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:09:36', '::1'),
(26, 3, 'Lack of Clear Branding', 'A website should reflect your brand identity from the first click. Generic templates, inconsistent colors, and mismatched fonts create a forgettable experience. Custom branding and design elements ensure that your website communicates professionalism and trustworthiness.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:09:36', '::1'),
(27, 3, 'Weak SEO and Content Strategy', 'A visually appealing website is only effective if people can find it. Many businesses overlook the importance of SEO, resulting in low visibility on search engines. A well-structured site, strategic keyword use, and engaging content are essential for attracting organic traffic.\r\nA website should be your brand’s strongest salesperson, working 24/7 to convert visitors into customers. Avoiding these mistakes and investing in strategic design, performance optimization, and content planning can transform your website from a static page into a powerful growth tool. At Comet Digi Media Solutions, we build websites that combine aesthetics, performance, and strategy, helping businesses stand out in a crowded digital landscape.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:09:36', '::1'),
(28, 4, 'Visuals Shape Brand Identity', 'First impressions are visual. A brand’s logo, color palette, and design style form the foundation of its identity and influence how people perceive it. Consistency in design builds recognition, trust, and credibility. Businesses that invest in custom design instead of generic templates create a stronger emotional connection with their audience.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:14:57', '::1'),
(29, 4, 'Video Content Dominates Engagement', 'Video has become the most powerful content format for businesses in 2025. From short social media clips to full-scale brand videos, moving visuals capture attention in ways static images can’t. Videos communicate complex ideas quickly, increase audience engagement, and encourage users to take action. Brands that incorporate video into their digital strategy are seeing higher reach and better returns on their marketing efforts.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:14:57', '::1'),
(30, 4, 'Motion Graphics and Animation', 'Static visuals are no longer enough to keep audiences interested. Motion graphics and animation add energy and creativity to digital campaigns. They’re perfect for explaining services, showcasing products, and bringing abstract concepts to life. Motion graphics also provide a competitive edge, making brands feel innovative and forward-thinking.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:14:57', '::1'),
(31, 4, 'The Role of Design in Storytelling', 'Good design is more than aesthetics; it’s storytelling. Every graphic, font choice, and color selection communicates something about your brand. A strong design strategy creates an emotional response and guides users through their journey—whether it’s exploring a website, scrolling through a social feed, or engaging with an ad.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:14:57', '::1'),
(32, 4, 'Why Professional Design Matters', 'Many businesses try to manage design in-house, but the difference between amateur visuals and professional design is clear. Poor design can harm credibility, while a polished visual identity enhances trust and drives results. At Comet Digi Media Solutions, our design and video team focuses on creating visuals that are not just beautiful, but strategic. Every element serves a purpose—to communicate your message clearly and connect with your audience.\r\nBrands that prioritize design and video content are the ones dominating digital spaces. In 2025, consumers expect a seamless, visually appealing experience across every platform. From custom branding and social media graphics to video production and motion design, investing in strong visuals is no longer optional—it’s the key to growth.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:14:57', '::1'),
(33, 5, 'Why a Great Landing Page Matters', 'Here’s how companies can create landing pages that not only look good, but actually perform:', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(34, 5, ' Strong Brand Recall', 'Creative landing pages help establish strong brand recall. Even if a visitor doesn’t convert on the first visit, a memorable experience increases the chance they’ll come back or recommend your brand later.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(35, 5, 'Lead Generation Hub', 'A good landing page is not just a visitor magnet — it’s a smart tool to detect and measure interest in your products or services. A simple form asking for basic contact details (in exchange for a discount, download, or exclusive offer) can be all you need to start a conversation.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(36, 5, 'Keep Forms Short and Sweet', ' Long, detailed forms turn users away. Keep it quick and minimal — the shorter the form, the higher the completion rate.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(37, 5, 'Copy that Connects', ' Clever taglines, sharp messaging, and a visually cohesive layout go a long way. The right copy paired with effective design enhances both engagement and conversion potential.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(38, 5, 'Offers That Matter', 'Your offer is the hook. A landing page should communicate it clearly — what’s the value, why now, and how the user benefits. Make sure your product or service details are also easy to find and understand.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 06:19:13', '::1'),
(39, 5, ' Bounce Rate Control', ' Landing pages reduce bounce rates — especially in paid campaigns. When every click costs money, directing users to a specific, relevant landing page is far more effective than sending them to a generic homepage.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(40, 5, 'Insights Through Closed-Loop Marketing', ' A well-designed landing page isn’t just about conversions. It also gives your marketing team valuable data on user behavior, preferences, and engagement — allowing better targeting and future improvements.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(41, 5, 'Conclusion', 'An effective landing page is a critical element of any successful digital marketing campaign. No matter how compelling your product, service, or ad strategy may be, a weak landing page can hurt your chances of success.\r\nThink of it as the digital storefront of your business. If it doesn’t invite people in or guide them toward action, you\'re missing out.\r\nSo whether you’re planning a full-funnel marketing push or a simple lead-gen effort, start with this: Make your landing page flawless.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-09 07:25:08', '::1'),
(46, 6, 'Why Use GIFs in Your Content?', 'short for Graphics Interchange Format) are compressed image files made up of multiple frames, creating short, animated loops. From expressing emotions to delivering key messages in a few seconds, they’ve become a go-to communication tool in marketing and digital storytelling.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 06:15:57', '::1'),
(47, 6, 'Why Memes Work So Well', 'Memes are image-based content, usually paired with witty or humorous captions, and they’re one of the most effective ways to engage with the millennial and Gen Z audiences.\r\nHumor is at the core of every successful meme. It makes the content approachable and share-worthy, helping brands build emotional connections and a distinct online identity.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:24:39', '::1'),
(48, 6, 'Reasons to Include Memes in Your Strategy', 'Memes boost engagement, influence, and  shareability. They connect emotionally — making your content more memorable. Easy to create and customize for your brand or message. Their viral nature ensures wide communication with minimal effort.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:30:25', '::1'),
(49, 6, 'Pro Tips for Using Memes', 'Always understand the meaning behind a meme before using it.\r\nBe mindful of the timing and the cultural relevance.\r\nUse memes wisely — overuse can dilute your message and brand tone.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:30:56', '::1'),
(50, 6, 'Final Thoughts', 'In the evolving landscape of digital communication, GIFs and memes are no longer just fun additions — they’re strategic content tools. When used intentionally, they can drastically improve your brand’s relatability, retention, and reach.\r\nWhether you\'re crafting a marketing campaign, writing a blog, or designing a landing page, adding the right visual elements can elevate your content from good to unforgettable.\r\nSo, sprinkle your content with just the right dose of memes and GIFs — and watch your audience laugh, like, and love your message', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:24:39', '::1'),
(51, 7, 'No Business Plan', 'Would you start a business without a plan? Of course not. So why would you build a website without one?\r\nYour website is the first impression of your business in the digital world. You need to be clear about what your website should do and what your visitors should take away from it. Your site\'s look and feel should also reflect your brand’s personality and color scheme. Otherwise, you risk confusing potential customers or losing their trust.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(52, 7, 'Focusing Only on Sales', 'Yes, your website should generate sales — but that shouldn’t be its only focus.\r\nAsk yourself: What makes my brand different from others selling the same thing?\r\nYour website should highlight your:\r\nCore values\r\nMission and vision\r\nCompany culture or voice\r\nBrand personality\r\nLet customers connect with your brand, not just your product.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(53, 7, 'No Appropriate Call-to-Action (CTA)', 'A well-designed CTA (Call-to-Action) is what moves visitors from interest to engagement.\r\nWhether it’s prompting a purchase, signing up for a newsletter, or requesting a quote, a strong CTA helps guide users and grow your business.\r\nNo matter how stunning your website looks — without clear CTAs, conversions will suffer.', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(54, 7, 'No Favicon', 'A favicon (the tiny icon in the browser tab) may seem minor, but it’s a vital branding element.\r\nUsers often browse with multiple tabs open. A favicon helps them quickly identify and return to your website. It reinforces brand recognition and adds a layer of professionalism.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(55, 7, 'Not Responsive', 'Today, most users visit websites via mobile devices, not desktops.\r\nIf your website isn’t mobile-friendly, you’re losing a huge share of potential customers. A responsive design ensures your site looks and functions seamlessly on all screen sizes.\r\n\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(56, 7, 'Complex Navigation', 'Your website should feel intuitive, not like a maze.\r\nIf you have too many pages or cluttered navigation, users can get overwhelmed and frustrated. Clear navigation keeps users engaged and reduces bounce rates.\r\nTip: Use a consistent layout and a visible navigation bar that works on both desktop and mobile.\r\n\r\n\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(57, 7, 'Not Including Blog Posts', 'Many startups or mid-sized companies skip blogging, thinking it\'s optional. Big mistake!\r\nBlogs:\r\nDrive more traffic\r\nImprove SEO\r\nBuild brand credibility\r\nShowcase your expertise\r\nHelp you connect with your audience\r\nA regularly updated blog gives your website life and personality.\r\n\r\n\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(58, 7, 'Avoiding SEO Optimizatio	n', 'If you don’t build your site with SEO in mind, it may never show up where people are looking — on Google.\r\nSEO isn’t something you bolt on at the end. It should be built into your site structure, content, and layout from the start.\r\nThink of SEO as your website’s foundation, not just the roof.\r\n\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(59, 7, 'Cut, Copy & Paste Content', 'Duplicating content or stealing it from others is not only unethical — it can harm your SEO and brand trust.\r\nYour content should be 100% original, written in your brand’s unique tone and voice. Original content builds credibility, trust, and better search engine rankings.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1'),
(60, 7, 'Final Thoughts', 'Your website is the digital face of your company. It should reflect your brand values, convey your goals, and provide a seamless experience for your visitors.\r\nAvoiding these common mistakes will help your business website stand out, perform better, and build long-term customer relationships.\r\n', NULL, NULL, NULL, 1, '2025-09-04 10:39:49', '2025-09-17 05:37:54', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `c_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` text COLLATE utf8mb4_general_ci NOT NULL,
  `date_display` date NOT NULL,
  `des` text COLLATE utf8mb4_general_ci NOT NULL,
  `job_req` text COLLATE utf8mb4_general_ci NOT NULL,
  `job_qualification` text COLLATE utf8mb4_general_ci NOT NULL,
  `job_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `exprience` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`c_id`, `title`, `slug`, `date_display`, `des`, `job_req`, `job_qualification`, `job_type`, `exprience`, `location`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Internship', 'internship', '2025-11-01', 'We are offering an internship opportunity for enthusiastic developers interested in learning and working on React.js, Node.js, and SQL-based web applications. As an intern, you will get hands-on experience in developing responsive front-end interfaces using React.js, building back-end APIs with Node.js and Express.js, and managing data with SQL databases such as MySQL. You will also work on debugging, testing, and optimizing code while collaborating with experienced developers, gaining exposure to real-world projects and modern development practices. This internship is ideal for students and freshers who want to strengthen their full-stack development skills and work on live projects.', '[\"Good understanding of JavaScript, HTML, and CSS\", \"Basic knowledge of React.js, Node.js, and Express.js\", \"Familiarity with SQL databases (MySQL or PostgreSQL)\", \"Understanding of RESTful APIs and how they work\", \"Experience with Git/GitHub for version control (basic level)\", \"Strong problem-solving skills and willingness to learn\", \"Ability to work in a team environment and write clean, maintainable code\"]', '[\"Currently pursuing or recently completed a degree/diploma in Computer Science, IT, or a related field\", \"Basic academic knowledge of web development concepts\", \"Availability to commit for the full internship duration\", \"Eagerness to gain hands-on experience with real-world projects\", \"Strong interest in full-stack development using React, Node.js, and SQL\", \"Self-motivated with a willingness to learn and adapt\", \"Good communication and teamwork skills\"]', 'Full-time', 'NOT required', ' Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi', 'Frontend Developer Job Opening', 'Apply now for our frontend developer position and join a dynamic team.', '::1', -1, '2025-08-12 12:46:42', '2025-08-12 12:46:42'),
(2, 'Digital Marketing', 'digital-marketing', '2025-08-25', 'We are seeking a highly motivated Digital Marketing Specialist to develop, implement, and manage marketing campaigns that promote our company’s products and services. You will be responsible for driving brand awareness, generating leads, and engaging with our target audience through various digital channels.', '[\n  \"Plan, execute, and manage digital marketing campaigns across multiple channels including SEO, SEM, social media, email, and display advertising\",\n  \"Create, optimize, and monitor PPC campaigns on platforms like Google Ads and Facebook Ads\",\n  \"Develop and manage engaging content for social media platforms to drive brand awareness and engagement\",\n  \"Perform keyword research, SEO audits, and implement on-page and off-page SEO strategies\",\n  \"Analyze campaign performance metrics and provide actionable insights to improve ROI\",\n  \"Collaborate with designers, copywriters, and developers to deliver high-quality marketing assets\",\n  \"Stay updated with the latest trends, tools, and best practices in digital marketing\",\n  \"Manage and grow the company’s online presence through community engagement\",\n  \"Track and report website analytics using tools like Google Analytics and Search Console\",\n  \"Assist in creating and executing marketing automation workflows\"\n]\n', '[\n  \"Bachelor’s degree in Marketing, Communications, or a related field\",\n  \"Proven experience as a Digital Marketing Specialist, Social Media Manager, or similar role\",\n  \"Strong understanding of SEO, SEM, social media marketing, and email marketing\", \"Proficiency in digital marketing tools such as Google Ads, Facebook Ads Manager, and Google Analytics\", \"Basic knowledge of HTML, CSS, and website CMS platforms like WordPress\",\"Excellent written and verbal communication skills\",\"Strong analytical skills with the ability to interpret data and generate insights\",\"Creative thinking and problem-solving abilities\",\"Ability to manage multiple projects and meet deadlines\",\"Familiarity with marketing automation tools like HubSpot or Mailchimp\"\n]\n', 'Full-time', '2+ years', ' Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi,', 'Digital Marketing Specialist Job', 'Drive brand growth and engagement through strategic digital marketing campaigns.', '::ffff:127.0.0.1', -1, '2025-08-12 12:48:32', '2025-08-12 12:48:32'),
(3, 'UI/UX Designer', 'uiux-designer', '2025-08-20', 'We are seeking a creative UI/UX Designer to craft intuitive digital experiences for our clients.', '[\n  \"Plan, execute, and manage digital marketing campaigns across multiple channels including SEO, SEM, social media, email, and display advertising\",\n  \"Create, optimize, and monitor PPC campaigns on platforms like Google Ads and Facebook Ads\",\n  \"Develop and manage engaging content for social media platforms to drive brand awareness and engagement\",\n  \"Perform keyword research, SEO audits, and implement on-page and off-page SEO strategies\",\n  \"Analyze campaign performance metrics and provide actionable insights to improve ROI\",\n  \"Collaborate with designers, copywriters, and developers to deliver high-quality marketing assets\",\n  \"Stay updated with the latest trends, tools, and best practices in digital marketing\",\n  \"Manage and grow the company’s online presence through community engagement\",\n  \"Track and report website analytics using tools like Google Analytics and Search Console\",\n  \"Assist in creating and executing marketing automation workflows\"\n]\n', '[\n  \"Bachelor’s degree in Marketing, Communications, or a related field\",\n  \"Proven experience as a Digital Marketing Specialist, Social Media Manager, or similar role\",\n  \"Strong understanding of SEO, SEM, social media marketing, and email marketing\", \"Proficiency in digital marketing tools such as Google Ads, Facebook Ads Manager, and Google Analytics\", \"Basic knowledge of HTML, CSS, and website CMS platforms like WordPress\",\"Excellent written and verbal communication skills\",\"Strong analytical skills with the ability to interpret data and generate insights\",\"Creative thinking and problem-solving abilities\",\"Ability to manage multiple projects and meet deadlines\",\"Familiarity with marketing automation tools like HubSpot or Mailchimp\"\n]\n', 'Contract', '1-3 years', ' Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi,', 'UI/UX Designer Position', 'Design modern, user-friendly interfaces that enhance our web and mobile applications.', '::1', -1, '2025-08-12 12:48:42', '2025-08-12 12:48:42'),
(4, 'Digital Marketing Specialist', 'digital-marketing-specialist', '2025-08-25', 'We are hiring a results-driven Digital Marketing Specialist to lead and execute our online marketing strategies. This role will focus on managing SEO initiatives, social media campaigns, and PPC advertising to increase brand visibility, drive qualified traffic, and generate leads. You will work closely with our creative, content, and sales teams to develop innovative campaigns, analyze performance data, and continuously optimize for maximum ROI. This is an exciting opportunity for a creative marketer who thrives in a fast-paced, data-driven environment and wants to make a measurable impact on our company’s growth.', '[\n  \"Plan, execute, and manage digital marketing campaigns across multiple channels including SEO, SEM, social media, email, and display advertising\",\n  \"Create, optimize, and monitor PPC campaigns on platforms like Google Ads and Facebook Ads\",\n  \"Develop and manage engaging content for social media platforms to drive brand awareness and engagement\",\n  \"Perform keyword research, SEO audits, and implement on-page and off-page SEO strategies\",\n  \"Analyze campaign performance metrics and provide actionable insights to improve ROI\",\n  \"Collaborate with designers, copywriters, and developers to deliver high-quality marketing assets\",\n  \"Stay updated with the latest trends, tools, and best practices in digital marketing\",\n  \"Manage and grow the company’s online presence through community engagement\",\n  \"Track and report website analytics using tools like Google Analytics and Search Console\",\n  \"Assist in creating and executing marketing automation workflows\"\n]\n', '[\n  \"Bachelor’s degree in Marketing, Communications, or a related field\",\n  \"Proven experience as a Digital Marketing Specialist, Social Media Manager, or similar role\",\n  \"Strong understanding of SEO, SEM, social media marketing, and email marketing\", \"Proficiency in digital marketing tools such as Google Ads, Facebook Ads Manager, and Google Analytics\", \"Basic knowledge of HTML, CSS, and website CMS platforms like WordPress\",\"Excellent written and verbal communication skills\",\"Strong analytical skills with the ability to interpret data and generate insights\",\"Creative thinking and problem-solving abilities\",\"Ability to manage multiple projects and meet deadlines\",\"Familiarity with marketing automation tools like HubSpot or Mailchimp\"\n]\n', 'Full-time', '2+ years', ' Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi,', 'Digital Marketing Specialist Job', 'Drive brand growth and engagement through strategic digital marketing campaigns.', '::1', -1, '2025-08-12 12:49:05', '2025-08-12 12:49:05'),
(5, 'Digital Marketing Specialist', 'digital-marketing-specialist', '2025-08-25', 'We are hiring a results-driven Digital Marketing Specialist to lead and execute our online marketing strategies. This role will focus on managing SEO initiatives, social media campaigns, and PPC advertising to increase brand visibility, drive qualified traffic, and generate leads. You will work closely with our creative, content, and sales teams to develop innovative campaigns, analyze performance data, and continuously optimize for maximum ROI. This is an exciting opportunity for a creative marketer who thrives in a fast-paced, data-driven environment and wants to make a measurable impact on our company’s growth.', '[\n  \"Plan, execute, and manage digital marketing campaigns across multiple channels including SEO, SEM, social media, email, and display advertising\",\n  \"Create, optimize, and monitor PPC campaigns on platforms like Google Ads and Facebook Ads\",\n  \"Develop and manage engaging content for social media platforms to drive brand awareness and engagement\",\n  \"Perform keyword research, SEO audits, and implement on-page and off-page SEO strategies\",\n  \"Analyze campaign performance metrics and provide actionable insights to improve ROI\",\n  \"Collaborate with designers, copywriters, and developers to deliver high-quality marketing assets\",\n  \"Stay updated with the latest trends, tools, and best practices in digital marketing\",\n  \"Manage and grow the company’s online presence through community engagement\",\n  \"Track and report website analytics using tools like Google Analytics and Search Console\",\n  \"Assist in creating and executing marketing automation workflows\"\n]\n', '[\n  \"Bachelor’s degree in Marketing, Communications, or a related field\",\n  \"Proven experience as a Digital Marketing Specialist, Social Media Manager, or similar role\",\n  \"Strong understanding of SEO, SEM, social media marketing, and email marketing\", \"Proficiency in digital marketing tools such as Google Ads, Facebook Ads Manager, and Google Analytics\", \"Basic knowledge of HTML, CSS, and website CMS platforms like WordPress\",\"Excellent written and verbal communication skills\",\"Strong analytical skills with the ability to interpret data and generate insights\",\"Creative thinking and problem-solving abilities\",\"Ability to manage multiple projects and meet deadlines\",\"Familiarity with marketing automation tools like HubSpot or Mailchimp\"\n]\n', 'Full-time', '2+ years', ' Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi,', 'Digital Marketing Specialist Job', 'Drive brand growth and engagement through strategic digital marketing campaigns.', '::1', -1, '2025-08-12 12:49:21', '2025-08-12 12:49:21'),
(7, 'Backend Developer', 'frontend-developer', '2025-08-18', 'We are looking for a skilled Frontend Developer to join our growing team.', '\"Proficiency in HTML, CSS, JavaScript, and React.js.\"', '\"Bachelor\'s degree in Computer Science or related field.\"', 'Full-Time', '2-4 years', 'Pune, India', 'Frontend Developer Career Opportunity', 'Apply now for the role of Frontend Developer and be part of our innovative tech team.', '::1', -1, '2025-08-18 14:39:01', '2025-08-18 14:39:01'),
(9, 'Digital Marketing Executive', 'digital-marketing-executive', '2025-12-06', 'We are looking for a creative and result-oriented Digital Marketing Executive to manage our online presence. You will be the voice of our brand, handling everything from creating social media strategies to running ads and writing website content. If you are a multitasker who loves digital trends, this is the place for you.', '[\n  \"Social Media Management: Manage day-to-day activities on Facebook, Instagram, and LinkedIn.\",\n  \"Content Strategy: Brainstorm and create a content calendar (ideas, visuals, and themes) to increase engagement.\",\n  \"Content Creation: Write compelling captions, research trending hashtags, and write SEO-friendly content for the website.\",\n  \"Meta Ads Management: Setup, monitor, and optimize paid ad campaigns on Facebook and Instagram to generate leads or awareness.\",\n  \"Community Engagement: Reply to comments and messages to build a community around the brand.\",\n  \"Analytics: Track the performance of posts and ads and report on what is working.\"\n]\n', '[\n  \"Experience: 0 to 2 years of experience in Digital Marketing or Social Media.\",\n  \"Education: Bachelor’s degree in Marketing, Communications, or a related field (or equivalent practical experience).\",\n  \"Excellent Copywriting skills (English).\",\n  \"Hands-on experience with Meta Ads Manager (Facebook/Insta Ads).\",\n  \"Familiarity with social media tools (Canva, Business Suite, etc.).\",\n  \"Soft Skills: Creative thinker, ability to multitask, and good time management.\"\n]\n', 'Full-time', '0-2 YEARS', 'Sonorous A wing-704,Opp. Circuit House Koparli, Silvasa Rd, Corner, Vapi', 'Digital Marketing Executive', 'Digital Marketing Executive', '::1', 1, '2025-12-06 15:09:43', '2025-12-06 15:09:43');

-- --------------------------------------------------------

--
-- Table structure for table `client_logo`
--

CREATE TABLE `client_logo` (
  `client_id` int NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_logo`
--

INSERT INTO `client_logo` (`client_id`, `logo`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, '[\"images/clients/pantheon.png\"]', '::1', 1, '2025-08-06 15:02:14', '2025-08-06 15:02:14'),
(2, '[\"images/clients/creo.png\"]', '::1', 1, '2025-08-06 15:02:27', '2025-08-06 15:02:27'),
(3, '[\"images/clients/eme.png\"]', '::1', 1, '2025-08-06 15:02:40', '2025-08-06 15:02:40'),
(4, '[\"images/clients/shells.png\"]', '::1', 1, '2025-08-06 15:06:46', '2025-08-06 15:06:46'),
(5, '[\"images/clients/beauty.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(6, '[\"images/clients/kannukichai.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(7, '[\"images/clients/actipass.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(8, '[\"images/clients/fortune.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(9, '[\"images/clients/hotel sahyadri.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(10, '[\"images/clients/claf.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(11, '[\"images/clients/rohitwadewale.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(12, '[\"images/clients/cbc.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(15, '[\"images/clients/carat girl.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47'),
(16, '[\"images/clients/comet lubricants.png\"]', '::1', 1, '2025-08-06 15:06:47', '2025-08-06 15:06:47');

-- --------------------------------------------------------

--
-- Table structure for table `core_value`
--

CREATE TABLE `core_value` (
  `core_id` int NOT NULL,
  `experience` varchar(70) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `core_value`
--

INSERT INTO `core_value` (`core_id`, `experience`, `title`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, '10+', 'Years of expertise', '::1', 1, '2025-08-06 12:34:27', '2000-01-27 00:00:00'),
(2, '100+', 'Successful projects ', '::1', 1, '2025-08-06 12:35:07', '2000-01-27 00:00:00'),
(3, '1M+', 'Lines of codes', '::1', 1, '2025-08-06 12:35:37', '2000-01-27 00:00:00'),
(4, '90%', 'Client satisfaction rate', '::1', 1, '2025-08-06 12:36:00', '2000-01-27 00:00:00'),
(5, '847634', 'Clients satisfied & retention', '::1', -1, '2025-08-06 12:36:02', '2000-01-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `custom_package`
--

CREATE TABLE `custom_package` (
  `id` int NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price_inr` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `strike_price_inr` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price_usd` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `strike_price_usd` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `f_av` text COLLATE utf8mb4_general_ci NOT NULL,
  `f_nav` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `custom_package`
--

INSERT INTO `custom_package` (`id`, `type`, `price_inr`, `strike_price_inr`, `price_usd`, `strike_price_usd`, `f_av`, `f_nav`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Starter', '20000', '25000', '449', '499', '[\"Up to 5 pages\", \"Up to 20\", \"Custom CMS\", \"Image Cropper\", \"File Management\", \"Up to 2 forms\"]\n', '[\"Blogs\", \"CDN\", \"E-Commerce Payment Gateway\", \"Order Management\"]\n', '::1', 1, '2025-09-03 16:10:12', '2025-09-03 16:10:12'),
(2, 'Pro', '35000', '40000', '949', '999', '[\"Up to 10 pages\", \"Up to 50\", \"Advanced CMS\", \"Image Cropper\", \"File Management\", \"Up to 5 forms\", \"Blogs\"]\n', '[\"CDN\", \"E-Commerce Payment Gateway\", \"Order Management\"]\n', '::1', 1, '2025-09-03 16:13:05', '2025-09-03 16:13:05'),
(3, 'Pro+', '50000', '65000', '1599', '1699', '[\"Up to 15 pages\", \"Up to 100\", \"Advanced CMS\", \"Up to 10 forms\", \"Image Cropper\", \"File Management\", \"Blogs\", \"CDN\", \"E-Commerce Payment Gateway\", \"Order Management\"]\n', '', '::1', 1, '2025-09-03 16:22:50', '2025-09-03 16:22:50');

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `enquiry_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `enquiry` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `enquiry_status` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`enquiry_id`, `name`, `email`, `phone_no`, `enquiry`, `message`, `ip`, `enquiry_status`, `created_at`, `updated_at`) VALUES
(21, 'fatima', 'demo@gmail.com', '9874562852', 'demo', 'demo', '103.124.205.104', -1, '2025-09-30 11:15:42', '2025-09-30 16:45:42'),
(22, 'mukesh', 'pm@gmail.com', '9856324587', 'test', 'This is for test', '103.124.205.104', 1, '2025-10-01 05:28:07', '2025-10-01 10:58:07'),
(23, 'Jennifer', 'Jennifer@aartechsolutions.in', '9347323949', 'New mobile apps and web development projects ', 'We are selling verified and filtered mobile app project leads for your conversion along with arranging meetings with the leads and a conversion support. All leads will have budget above $25K USD to $300k USD. \nIf you\'re interested, we would like to share a few leads for your reference.', '103.126.33.42', 1, '2025-12-12 12:36:54', '2025-12-12 18:06:54'),
(24, 'Jennifer', 'Jennifer@aartechsolutions.in', '9347323949', 'New mobile apps and web development projects', 'We are selling verified and filtered mobile app project leads for your conversion along with arranging meetings with the leads and a conversion support. All leads will have budget above $25K usd to $300K usd. \nKindly send an email to share a few leads for free as a demo for your reference.\n\n\n', '103.126.33.84', 1, '2026-02-16 05:39:46', '2026-02-16 11:09:46'),
(25, 'Aditya Mishra', 'mishraadi1923@gmail.com', '6355661648', 'My name is Aditya Mishra. I am interested in applying for a job opportunity at your company', '', '157.32.91.49', 1, '2026-03-12 08:29:06', '2026-03-12 13:59:06'),
(26, 'Umeed Patel', 'umeedpatel04@gmail.com', '8200936996', 'I am interested in applying for a job opportunity in your company.', '', '27.61.187.223', 1, '2026-03-12 08:29:20', '2026-03-12 13:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `job_inquiry`
--

CREATE TABLE `job_inquiry` (
  `job_id` int NOT NULL,
  `c_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `experience` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL,
  `resume` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_inquiry`
--

INSERT INTO `job_inquiry` (`job_id`, `c_id`, `name`, `email`, `phone`, `experience`, `introduction`, `resume`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(36, 1, 'Shama Khan ', 'shamakhan200315@gmail.com', '8511160219', '0', 'I just completed 3 months internship from Enjay IT ', '1759390448088-SHAMA1 CV - Copy (1).pdf', '49.34.210.184', 1, '2025-10-02 13:04:08', '2025-10-02 13:04:08'),
(37, 1, 'Hirak Mehta', 'hirakmehta007@gmail.com', '8200127101', '5+', 'I am Laravel WebDeveloper I also have knowledge of VueJS , Bootstrap 5 , Tailwind CSS and WordPress', '1759816396154-Resume 002.pdf', '103.66.113.52', 1, '2025-10-07 11:23:16', '2025-10-07 11:23:16'),
(38, 1, 'shama khan', 'shamakhan200315@gmail.com', '6352237284', '0', ' also completed internship from enajy it', '1760501101658-SHAMA CV - Copy (2).pdf', '114.31.144.97', 1, '2025-10-15 09:35:02', '2025-10-15 09:35:02'),
(39, 1, 'shama khan', 'shamakhan200315@gmail.com', '6353237284', '0', 'looking for job and internship', '1760501164527-SHAMA CV - Copy (2).pdf', '114.31.144.97', 1, '2025-10-15 09:36:05', '2025-10-15 09:36:05'),
(40, 1, 'Sumit Shravan Kasbe ', 'sumitkasbe8382@gmail.com', '6355949869', '0', 'Hello Sir/Madam,\r\nMy name is Sumit Shravan Kasbe, and I am a final-year student at GEC Daman. I am currently learning the MERN Stack (MongoDB, Express, React, Node.js) and looking for an internship opportunity to gain practical experience.\r\n\r\nI would be grateful if I could get an opportunity to work and learn in your company.\r\nKindly consider my request.', '1764823924228-SSK_Resume.pdf.pdf', '152.59.37.233', 1, '2025-12-04 10:22:04', '2025-12-04 10:22:04'),
(41, 1, 'Rohit Dashrath Kuwar ', 'rohitkuwar9012@gmail.com', '9016282554', '0', 'Hi mam\r\nI hope you’re doing well! I’m Rohit Dashrath Kuwar, a final-year B.E. Computer Engineering student from Government Engineering College Daman.\r\n\r\nI’m currently looking for internship or entry-level opportunities in web development (MERN stack / Java), and I would be very grateful if you could guide me regarding the hiring process or refer me for any suitable role.\r\n\r\nThank you so much for your time and help!\r\nBest regards,\r\nRohit Kuwar', '1764824124821-rohitKuwar_resume.pdf', '152.59.34.186', 1, '2025-12-04 10:25:37', '2025-12-04 10:25:37'),
(44, 1, 'Rohit Dashrath Kuwar ', 'rohitkuwar9012@gmail.com', '9016282554', '0', 'Hi mam\r\nI hope you’re doing well! I’m Rohit Dashrath Kuwar, a final-year B.E. Computer Engineering student from Government Engineering College Daman.\r\n\r\nI’m currently looking for internship or entry-level opportunities in web development (MERN stack / Java), and I would be very grateful if you could guide me regarding the hiring process or refer me for any suitable role.\r\n\r\nThank you so much for your time and help!\r\nBest regards,\r\nRohit Kuwar', '1765335756013-rohitKuwar_resume.pdf', '152.59.36.49', 1, '2025-12-10 08:32:36', '2025-12-10 08:32:36'),
(49, 9, 'Dhairyasheel Gaikwad ', 'dhairyagaikwad1432@gmail.com', '9561021568', '0', '\"Hello, my name is Dhairyasheel Gaikwad. I work as a Technical Sales & Business Development Manager at Jas Polychem, representing Sukano Switzerland in India. My focus is on client outreach, product presentations, and strategic initiatives, particularly in masterbatch solutions for PET bottles in pharma and healthcare. I enjoy combining technical expertise with strong communication to deliver impactful solutions.\"', '1765790196893-CV(Updated).pdf', '114.31.144.4', 1, '2025-12-15 14:46:38', '2025-12-15 14:46:38');

-- --------------------------------------------------------

--
-- Table structure for table `job_inquiry3`
--

CREATE TABLE `job_inquiry3` (
  `job_id` int NOT NULL,
  `c_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `experience` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `introduction` text COLLATE utf8mb4_general_ci NOT NULL,
  `resume` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_inquiry3`
--

INSERT INTO `job_inquiry3` (`job_id`, `c_id`, `name`, `email`, `phone`, `experience`, `introduction`, `resume`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 'Priya Verma', 'priya@example.com', '9876501234', '5 years', 'UI/UX Designer', 'resume_priya.pdf', '::1', 1, '2025-08-18 16:18:31', '2025-08-18 16:18:31'),
(2, 0, 'Rahul Sharma', 'rahul@example.com', '9876543210', '3 years', 'I am a full stack developer.', 'resume_rahul.pdf', '::1', 1, '2025-08-18 16:18:47', '2025-08-18 16:18:47'),
(3, 0, 'Rahul Sharma', 'rahul@example.com', '9876543210', '3 years', 'I am a full stack developer.', 'resume_rahul.pdf', '::1', 1, '2025-08-18 16:18:48', '2025-08-18 16:18:48'),
(4, 0, 'wewer', 'Kunal@cometdigisol.com', '23423434234', '2', 'sdfsdfsdfs', '1755519515587.pdf', '::1', 1, '2025-08-18 17:48:35', '2025-08-18 17:48:35'),
(5, 0, 'Rohit', 'Kunal@cometdigisol.com', '5632587456', '3', 'dffdfgdfgd', '1755577712823.pdf', '::1', 1, '2025-08-19 09:58:32', '2025-08-19 09:58:32'),
(6, 0, 'raja', 'Kunal@cometdigisol.com', '9856325742', '1', 'sdfsdfsdfsf', '1755578215114.pdf', '::1', 1, '2025-08-19 10:06:55', '2025-08-19 10:06:55'),
(7, 0, 'Ram', 'Kunal@cometdigisol.com', '3423424324', '3', 'sefsdfsf', '1755578424640.pdf', '::1', 1, '2025-08-19 10:10:24', '2025-08-19 10:10:24'),
(8, 0, 'jon', 'Kunal@cometdigisol.com', '8374626789', '2', 'ddfdfgdfgdg', '1755578478784.pdf', '::1', 1, '2025-08-19 10:11:18', '2025-08-19 10:11:18'),
(9, 0, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '6587456321', '1', 'rdfgdfgdgfd', '1755578529321.pdf', '::1', 1, '2025-08-19 10:12:09', '2025-08-19 10:12:09'),
(10, 0, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '5454545445', '2', 'gdfgdgfdgf', '1755578574527.pdf', '::1', 1, '2025-08-19 10:12:54', '2025-08-19 10:12:54'),
(11, 0, 'sdsdfsdf', 'Kunal@cometdigisol.com', '3234234234', '2', 'sdfsdfsdf', '1755578617425.pdf', '::1', 1, '2025-08-19 10:13:37', '2025-08-19 10:13:37'),
(12, 0, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '4353453548', '1', 'ertrertetr', '1755578736228.pdf', '::1', 1, '2025-08-19 10:15:36', '2025-08-19 10:15:36'),
(13, 0, 'jony', 'Kunal@cometdigisol.com', '3234456789', '1', 'sdfsdfsfdsf', '1755579542494.pdf', '::1', 1, '2025-08-19 10:29:02', '2025-08-19 10:29:02'),
(14, 0, 'jony', 'Kunal@cometdigisol.com', '3234456789', '1', 'some ', '1755579572288.pdf', '::1', 1, '2025-08-19 10:29:32', '2025-08-19 10:29:32'),
(15, 0, 'jony', 'Kunal@cometdigisol.com', '3234456789', '1', 'some ', '1755579573976.pdf', '::1', 1, '2025-08-19 10:29:33', '2025-08-19 10:29:33'),
(16, 0, 'jony', 'Kunal@cometdigisol.com', '3234456789', '1', 'some ', '1755579588850.pdf', '::1', 1, '2025-08-19 10:29:48', '2025-08-19 10:29:48'),
(17, 0, 'jony', 'Kunal@cometdigisol.com', '3234456789', '1', 'some ', '1755579659897.pdf', '::1', 1, '2025-08-19 10:30:59', '2025-08-19 10:30:59'),
(18, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '8536985214', '1', 'I am now ', '1755580080332.pdf', '::1', 1, '2025-08-19 10:38:00', '2025-08-19 10:38:00'),
(19, 4, 'chaung', 'Kunal@cometdigisol.com', '4567898765', '2', 'I am here', '1755580225624.pdf', '::1', 1, '2025-08-19 10:40:25', '2025-08-19 10:40:25'),
(20, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '8374626789', '1', 'this is', '1756898792110.docx', '::1', 1, '2025-09-03 16:56:32', '2025-09-03 16:56:32'),
(21, 4, 'mukesh', 'abc@gmail.com', '9558358802', '3', 'this is for test', '1756958484704.docx', '::1', 1, '2025-09-04 09:31:24', '2025-09-04 09:31:24'),
(22, 4, 'mukesh', 'abc@gmail.com', '9558358802', '3', 'this is for test', '1756958486571.docx', '::1', 1, '2025-09-04 09:31:26', '2025-09-04 09:31:26'),
(23, 1, 'Mukesh', 'Kunal@cometdigisol.com', '9898563247', '1', 'this is for test', '1757057496927.docx', '::1', 1, '2025-09-05 13:01:36', '2025-09-05 13:01:36'),
(24, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '8374626789', '0', 'SDSD', '1757390946078.docx', '::1', 1, '2025-09-09 09:39:06', '2025-09-09 09:39:06'),
(25, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '8374626789', '2', 'THIS ', '1757391074222.docx', '::1', 1, '2025-09-09 09:41:14', '2025-09-09 09:41:14'),
(26, 1, 'FATIMA MERCHANT', 'fatimamerchant@gmail.com', '7698257867', '3', 'DEMO', '1758705443831.docx', '::1', 1, '2025-09-24 14:47:23', '2025-09-24 14:47:23'),
(27, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '7069464859', '1', 'UYRYTRYTRYT', '1758708179473.docx', '::1', 1, '2025-09-24 15:32:59', '2025-09-24 15:32:59'),
(28, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '7069464859', '0', 'SDSDS', '1758708590282.docx', '::1', 1, '2025-09-24 15:39:50', '2025-09-24 15:39:50'),
(29, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '7069464859', '1', 'FGHGFHGFHG', '1758708905124.pdf', '::1', 1, '2025-09-24 15:45:05', '2025-09-24 15:45:05'),
(30, 1, 'dfgdffdfgd', 'Kunal@cometdigisol.com', '8374626789', '3', 'vgfhfghf', '1759216911700.docx', '::1', 1, '2025-09-30 12:51:51', '2025-09-30 12:51:51'),
(31, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '7069464859', '2', 'sdfsdf', '1759217391309.pdf', '::1', 1, '2025-09-30 12:59:51', '2025-09-30 12:59:51'),
(32, 1, 'SHAIKH MEHTAB', 'pm7244875@gmail.com', '8374626789', '0', 'sdfsdfsdf', '1759217455308.docx', '::1', 1, '2025-09-30 13:00:55', '2025-09-30 13:00:55'),
(33, 1, 'Manish', 'pm7244875@gmail.com', '8374626789', '2', 'asdasdads', '1759218310223.pdf', '::1', 1, '2025-09-30 13:15:10', '2025-09-30 13:15:10'),
(34, 1, 'Raja', 'pm7244875@gmail.com', '8374626789', '1', 'test', '1759218435860.pdf', '::1', 1, '2025-09-30 13:17:15', '2025-09-30 13:17:15'),
(35, 1, 'tajesh', 'pm7244875@gmail.com', '8374626789', '1', 'sdfsdfsdf', '1759230422356.pdf', '::1', 1, '2025-09-30 16:37:02', '2025-09-30 16:37:02'),
(36, 1, 'Taj', 'pm7244875@gmail.com', '8374626789', '2', 'sdfsdf', '1759231327247.docx', '::1', 1, '2025-09-30 16:52:07', '2025-09-30 16:52:07'),
(37, 1, 'taj', 'pm7244875@gmail.com', '9856325874', '1', 'dsdf', '1759231471002.docx', '::1', 1, '2025-09-30 16:54:31', '2025-09-30 16:54:31'),
(38, 1, 'ytguyy uytuutu', 'Kunal@cometdigisol.com', '8374626789', '2', 'dfgdfgd', '1759232236938.pdf', '::1', 1, '2025-09-30 17:07:16', '2025-09-30 17:07:16'),
(39, 1, 'taj', 'pm7244875@gmail.com', '8374626789', '2', 'this is for test', '1759232338974.pdf', '::1', 1, '2025-09-30 17:08:58', '2025-09-30 17:08:58');

-- --------------------------------------------------------

--
-- Table structure for table `marketing_approach`
--

CREATE TABLE `marketing_approach` (
  `id` int NOT NULL,
  `s_id` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `des` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marketing_approach`
--

INSERT INTO `marketing_approach` (`id`, `s_id`, `title`, `des`, `status`, `ip`, `updated_at`, `created_at`) VALUES
(1, '2', 'Research First', 'In-depth analysis of brand, audience, and competitors.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(2, '2', 'Tailored Planning', 'Custom content plan balancing creativity and performance.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(3, '2', 'Platform Precision', 'Strategies designed for maximum reach and relevance.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(4, '2', 'Performance Tracking', 'Monitor engagement and key metrics.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(5, '2', 'Continuous Optimization', 'Refine campaigns for maximum ROI and growth.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(6, '1', 'Requirement Analysis', 'We understand your business goals and target audience. This helps us define the website structure, features, and content strategy.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(7, '1', '\r\nDesign', 'Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand identity and enhances UX.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(8, '1', 'Development', 'Build fast, secure, and responsive websites. Our team uses modern technologies to ensure scalability and performance.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(9, '1', 'Testing', 'Ensure smooth performance across all devices and browsers. We check for bugs, responsiveness, speed, and functionality.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(10, '1', 'Launch', 'Deploy the website with a seamless handover. We ensure everything is set up correctly for a smooth live transition.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(11, '1', 'Support', 'Provide ongoing maintenance and updates. We monitor performance, fix issues, and keep your site up to date.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(12, '3', '\r\nGoal Setting', 'We begin by defining clear campaign objectives—whether it’s leads, sales, or traffic.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(13, '3', '\r\nAudience Research', 'We identify and target the right audience segments based on behavior, interests, and demographics.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(14, '3', 'Campaign Setup', 'Our team crafts compelling ad creatives and sets up campaigns across platforms like Google, Meta, and more.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(15, '3', '\r\nMonitoring & Optimization', 'We track performance in real-time and make data-backed adjustments to maximize ROI.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(16, '3', 'Reporting & Insights', 'You receive clear, actionable reports that show what’s working and how to scale effectively.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(17, '4', '\r\nWebsite Audit', 'We begin with a detailed analysis to identify technical issues, content gaps, and performance roadblocks.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(18, '4', 'Keyword Research', 'We find high-impact keywords that align with your audience’s search intent and your business goals.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(19, '4', 'On-Page Optimization', 'We optimize titles, meta tags, content, and internal links to improve relevance and structure.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(20, '4', 'Technical SEO', 'We ensure fast loading, mobile responsiveness, crawlability, and proper indexing of your site.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(21, '4', '\r\nContent Strategy', 'We create SEO-friendly, valuable content that builds authority and attracts organic traffic.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(22, '4', '\r\nLink Building', 'We build high-quality backlinks to boost your website’s credibility and ranking.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(23, '4', '\r\nPerformance Tracking', 'We monitor rankings, traffic, and conversions, refining the strategy for consistent growth.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(24, '5', '\r\n\r\nUnderstanding Your Idea', 'Deep dive into your vision, goals, and target audience.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(25, '5', 'Design That Converts', 'Crafting intuitive and visually appealing interfaces.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(26, '5', '\r\nRobust Development', 'Building with scalable and secure technologies.\r\n\r\n', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(27, '5', '\r\nRobust Development', 'Building with scalable and secure technologies.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(28, '5', 'Rigorous Testing', 'Ensuring flawless performance before launch.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(29, '5', 'Launch & Support', 'Deploying and maintaining for continuous success.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(30, '6', '\r\nUnderstanding the Brand', 'We start by learning about your brand, values, and audience to ensure visual alignment.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(31, '6', 'Concept Development', 'We brainstorm creative ideas that communicate your message effectively.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(32, '6', 'Design Execution', 'Our designers craft high-quality visuals tailored to your specific needs and platforms.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(33, '6', '\r\nFeedback & Revisions', 'We collaborate with you to refine designs until they’re exactly what you envisioned.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(34, '6', '\r\nFinal Delivery', 'We deliver the final files in the required formats, ready for print or digital use.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(35, '7', '\r\nConcept & Strategy', 'Understanding your brand message and goals.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(36, '7', 'Script & Storyboard', 'Planning a narrative that connects.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(37, '7', '\r\nProfessional Filming', 'Capturing high-quality visuals and audio.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(38, '7', '\r\nCreative Editing', 'Adding transitions, effects, and music for impact.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22'),
(39, '7', 'Optimized Delivery', 'Formatting for platforms and maximum reach.', 1, '::1', '2025-09-05 11:40:22', '2025-09-05 11:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `p_id` int NOT NULL,
  `title` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_video` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `short_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `des` text COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_image` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `service` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `client` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `software` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `list_img` text COLLATE utf8mb4_general_ci NOT NULL,
  `challenges_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `results_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `big_list_img` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `brand` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `sort_order` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`p_id`, `title`, `hero_video`, `short_des`, `des`, `type`, `slug`, `hero_image`, `category`, `service`, `client`, `software`, `list_img`, `challenges_des`, `results_des`, `big_list_img`, `date`, `brand`, `status`, `sort_order`, `ip`, `meta_title`, `meta_des`, `created_at`, `updated_at`) VALUES
(1, 'Khushi Group', '[\"images/video/khushi.mp4\"]', 'Khushi Group is a visionary leader in sustainab0le polyester manufacturing,\ndelivering eco-friendly products like recycled chips, staple fibre, and yarn waste.', 'Khushi Group is a visionary leader in sustainab0le polyester manufacturing, delivering eco-friendly products like recycled chips, staple fibre, and yarn waste. Comet Digimedia Solutions crafted a modern, impactful digital presence that highlights their commitment to innovation and environmental responsibility. The website combines clean design with clear messaging to showcase Khushi’s product range and green initiatives, creating an engaging platform that resonates with clients and partners who value sustainability and quality.', '2024-Web-Development', 'khushi-group', '[\"images/pro/P6.png\"]', 'Website Development', 'Web-Development', 'Khushi Group', 'React.js, Node.js, Express.js, MongoDB, Tailwind CSS\n', '[\"images/portfolio-details/k1.png\", \"images/portfolio-details/k2.png\"]\n', '[\"Built a robust website on the MERN stack for speed, scalability, and seamless performance\", \"Designed a clean, corporate interface to cater to global clients and partners\", \"Implemented SEO-friendly architecture for better discoverability\", \"Delivered a future-ready digital platform to showcase Khushi’s product range and sustainability initiatives\"]\n', '[\"Developed a modern, mobile-friendly website for Khushi Group\", \"Improved navigation and product browsing experience\", \"Boosted client’s online presence and lead generation\", \"Deployed secure and scalable MERN stack architecture\"]\n', '[\"images/portfolio-details/k3.png\"]', '2025-08-11', '0', 1, '2', '::1', 'Khushi Group Website Design | Comet Digimedia Solutions', 'Corporate website built on MERN stack for Khushi Group, showcasing sustainable polyester products with speed, scalability, and SEO-friendly design.', '2025-08-06 14:30:37', '2025-08-06 14:30:37'),
(2, 'PackSafe', '[\"images/video/packsafe.mp4\"]', 'PackSafe is a trusted provider of high-quality corrugated packaging solutions, serving\ndiverse industries with durable and customizable boxes.', 'PackSafe is a trusted provider of high-quality corrugated packaging solutions, serving diverse industries with durable and customizable boxes. Comet Digimedia Solutions delivered a clean, professional website that effectively showcases PackSafe’s extensive product offerings and commitment to reliability. With user-friendly navigation and a strong visual hierarchy, the site helps clients easily explore packaging options, reinforcing PackSafe’s reputation as a leader in the packaging industry.\n', '2024-Web-Development', 'packsafe', '[\"images/pro/P2.png\"]', 'Website Development', 'Web-Development', 'PackSafe', 'React.js, Node.js, Express.js, MongoDB, Tailwind CSS\n', '[\"images/portfolio-details/p2.png\", \"images/portfolio-details/p3.png\"]\n', '[\"Needed a complete revamp of their existing e-commerce website\", \"Required a modern, professional design with improved speed, scalability, and flexibility\", \"Sought a robust backend to manage orders, files, and product visuals\", \"Needed custom workflow features to support operational efficiency\"]\n', '[\"Developed a cutting-edge MERN stack website for top-notch speed and scalability\", \"Built a fully responsive platform for seamless use across devices\", \"Created a custom CMS with order management system, file management system, and integrated image cropping feature\", \"Delivered a professional, future-ready e-commerce solution that enhanced PackSafe’s brand presence, simplified internal processes, and provided customers with a smooth, intuitive shopping experience\"]\n', '[\"images/portfolio-details/p1.png\"]', '0000-00-00', '0', 1, '1', '::1', 'PackSafe E-Commerce Website Development | Comet Digimedia solutions', 'Revamped e-commerce platform for PackSafe with custom CMS, order management, and responsive MERN-based design for seamless user experience.', '2025-08-06 14:31:31', '2025-08-06 14:31:31'),
(3, 'Beauty Workks', '[\"images/video/beauty.mp4\"]', 'Beauty Workks is a cutting-edge medi-spa clinic redefining luxury skincare and\nwellness with personalized treatments and expert care. ', 'Beauty Workks is a cutting-edge medi-spa clinic redefining luxury skincare and wellness with personalized treatments and expert care. Comet Digimedia Solutions designed and developed a sleek, immersive digital experience that captures the clinic’s vibrant energy and elegance. The website features intuitive navigation, bold visuals, and seamless functionality inviting visitors to explore services, book appointments, and embrace self-care like never before. This project highlights our ability to blend creativity with strategy, crafting online experiences that truly connect and convert.', '2024-Web-Development', 'beauty-workks', '[\"images/pro/p1.png\"]', 'Website Development', 'Web-Development', 'Beauty Workks', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/b3.png\", \"images/portfolio-details/b2.png\"]\n', '[\"Needed a world-class website to match international standards of luxury skincare\", \"Required a platform to showcase a wide range of services and ongoing promotions\", \"Needed third-party appointment booking integration and live testimonials for client engagement\", \"Sought seamless plugin management for smooth performance\", \"Project had to be designed and delivered within a week without compromising aesthetics or quality\"]\n', '[\"Designed and developed a sleek, fully responsive WordPress website aligned with Beauty Workks’ premium brand identity\", \"Customized templates to create a luxurious and modern look\", \"Integrated third-party tools for appointment booking and real-time testimonials\", \"Ensured seamless functionality through expert plugin management\", \"Delivered in just one week, creating a world-class digital presence that empowers clients to explore services and book appointments effortlessly\"]\n', '[\"images/portfolio-details/b1.png\"]', '0000-00-00', '0', 1, '3', '::1', 'eauty Workks Website Design & Development | Comet Digital', 'Luxury medi-spa website built on WordPress with live testimonials, appointment booking, and responsive design delivered within one week.', '2025-08-06 14:32:49', '2025-08-06 14:32:49'),
(4, 'Pantheon', '[\"images/video/pantheon.mp4\"]', 'Pantheon Development is a leading real estate brand in Dubai, offering luxurious yet affordable homes with a focus on quality and timely delivery.', 'Pantheon Development is a leading real estate brand in Dubai, offering luxurious yet affordable homes with a focus on quality and timely delivery. Comet Digimedia Solutions designed a sophisticated, user-friendly website that showcases Pantheon’s residential projects, emphasizes their value-driven approach, and provides seamless access to floor plans, payment details, and enquiries — creating a compelling digital experience for homebuyers and investors alike.', '2019-Web-Development', 'pantheon', '[\"images/pro/p.png\"]', 'Website Development', 'Web-Development', 'Pantheon', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/n1.png\", \"images/portfolio-details/n2.png\"]\n', '[\"Required a corporate yet modern website to showcase premium real estate projects\", \"Needed an installment payment feature integrated for customer convenience\", \"Provided a brand style guide to ensure design consistency and requested quick delivery\", \"After launch, shared a completely new style guide, requiring a full redesign within 3 days\"]', '[\"Built a fully responsive website on the LAMP PHP stack, ensuring scalability and professional appeal\", \"Designed a visually engaging platform to highlight Pantheon’s projects and services\", \"Integrated a seamless installment payment option for enhanced functionality\", \"Successfully redesigned the entire website in just 3 days to match the new style guide\", \"Delivered a modern, high-performing digital presence tailored for the Dubai market, showcasing Pantheon’s luxury and credibility\"]', '[\"images/portfolio-details/n3.png\"]', '0000-00-00', '0', 1, '4', '::1', 'Pantheon Corporate Website Development | Comet Digimedia', 'Corporate website built on LAMP PHP for Pantheon in Dubai, featuring project showcases, installment payment option, and modern corporate design.', '2025-08-06 14:33:44', '2025-08-06 14:33:44'),
(7, 'Kannu Ki Chai\r\n', '[\"images/video/kannukichai.mp4\"]', 'Creative Design team on demand that can design, build, ship and scale your real has development agency.', 'Kannu Ki Chai is redefining the chai experience with its premium, hand-blended teas sourced from the top 2% of tea estates in India. From their first café in Pune to over 40 outlets nationwide, they\'ve blended tradition with innovation to deliver a modern, soulful tea experience. Comet Digimedia Solutions designed and developed a vibrant, user-friendly website that reflects Kannu Ki Chai’s essence bold, flavorful, and community-driven. The site seamlessly integrates e-commerce functionality, franchise opportunities, and a rich storytelling experience, inviting tea lovers to explore, indulge, and connect with the brand.', '2024-Web-Development', 'kannu-ki-chai', '[\"images/pro/P3.png\"]', 'Website Development', 'Web-Development', 'Kannu Ki Chai\n', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/c1.png\", \"images/portfolio-details/c2.png\"]\n', '[\"Needed to revamp an existing website (originally built by us) that was primarily e-commerce focused\", \"Required a shift in focus to highlight cafés and franchise opportunities while maintaining an engaging user experience\", \"The project had to be completed on a very short timeline\"]\n', '[\"Redesigned the entire site on WordPress, combining sleek design with strong functionality\", \"Highlighted café experiences and franchise growth opportunities while retaining e-commerce usability\", \"Delivered a fully responsive, scalable website in just one week, elevating the brand’s storytelling and positioning Kannu Ki Chai as a vibrant, community-driven tea brand\"]\n', '[\"images/portfolio-details/c3.png\"]', '0000-00-00', '0', 1, '5', '::1', 'Kannu Ki Chai Website Redesign | Comet Digimedia Solutions', 'Revamped WordPress site for Kannu Ki Chai to highlight cafés and franchise opportunities, delivered in one week with responsive design.', '2025-08-06 14:33:44', '2025-08-06 14:33:44'),
(9, 'Claf', '[\"images/video/claf.mp4\"]', 'Creative Design team on demand that can design, build, ship and scale your real has development agency.', 'Advertising is a dynamic creative studio that thrives on transforming brands through innovative design, strategic branding, and impactful digital marketing. With a team of passionate professionals, they offer 360-degree services encompassing brand development, advertising, web design, SEO, and more. Comet Digimedia Solutions collaborated with Claf to craft a visually engaging and user-friendly website that reflects their bold personality and creative prowess. The site showcases their diverse services, portfolio, and unique approach, providing potential clients with a seamless experience to explore and connect.\n', '2023-Web-Development', 'claf', '[\"images/pro/P4.png\"]', 'Website Development', 'Web-Development', 'Claf', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/f1.png\", \"images/portfolio-details/f2.png\"]\n', '[\"Required a modern, minimalist website that accurately reflected their creative agency identity\", \"Needed to highlight portfolio pieces, banner designs, packaging work, and videos in a visually striking manner\", \"Requested multiple hero sliders to feature their projects prominently\", \"Had an extremely short delivery timeline of just 3 days\"]\n', '[\"Built a sleek, fully responsive WordPress website with modern aesthetics and intuitive navigation\", \"Integrated multiple hero sliders and video showcases to spotlight their creative work\", \"Delivered a bold, professional digital presence within 3 days, positioning Claf Advertising as a standout modern creative agency\"]\n', '[\"images/portfolio-details/f3.png\"]', '0000-00-00', '0', 1, '6', '::1', 'Claf Advertising Agency Website | Comet Digimedia Solutions', 'Modern WordPress site for Claf Advertising featuring multiple hero sliders, video showcases, and a minimalist design delivered in just 3 days.', '2025-08-06 14:33:44', '2025-08-06 14:33:44'),
(10, 'Eme Body Care', '[\"images/video/eme.mp4\"]', 'Creative Design team on demand that can design, build, ship and scale your real has development agency.', 'Eme Body Care is redefining self-care with its luxurious, hand-crafted body butters that blend nourishment with indulgence.\r\nComet Digimedia Solutions designed and developed a sleek, user-friendly eCommerce website that mirrors the brand’s elegance, highlights product richness, and ensures a smooth shopping experience.\r\n\r\n', '2024-Web-Development', 'eme-body-care', '[\"images/pro/P5.png\"]', 'Website Development', 'Web-Development', 'Eme Body Care', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/e1.png\", \"images/portfolio-details/e3.png\"]\n', '[\"Needed a fully French-language e-commerce website to cater to their local audience\", \"Required strict adherence to their brand style guide for a luxurious and elegant design\", \"Project needed to be delivered on a short deadline without compromising functionality or brand appeal\"]\n', '[\"Built a sleek, fully responsive WordPress e-commerce site aligned with their brand identity\", \"Designed product displays to emphasize indulgence and richness, enhancing brand perception\", \"Delivered a professional, multilingual platform within the tight deadline, creating a seamless shopping experience and strengthening EME’s position as a premium skincare brand in France\"]\n', '[\"images/portfolio-details/e2.png\"]', '0000-00-00', '0', 1, '7', '::1', 'Eme Body Care E-Commerce Website | Comet Digimedia Solutions', 'Multilingual WordPress e-commerce website for Eme Body Care, reflecting luxury skincare branding with a seamless shopping experience.', '2025-08-06 14:33:44', '2025-08-06 14:33:44'),
(11, 'Creo Composites', '[\"images/video/creo.mp4\"]', 'A short summary of the project that highlights its key achievements.sdfsdf sdfsdfsfd sdfsdfsdf', 'CREO Composites is an advanced materials company specializing in FRP (Fiber Reinforced Polymer) and carbon fiber solutions, delivering high-performance, durable, and sustainable products across infrastructure, aerospace, marine, power, and more. With over 10 years of expertise, CREO designs, sources, fabricates, and installs custom composite systems, supports joint‑ventures, mold‑making and agency services, serving both niche and large‑scale industrial applications.', '2025-Web-Development', 'creocomposites', '[\"images/pro/c.png\"]', 'Marketing', 'Web-Development', 'Creocomposites', 'React.js, Node.js, Express.js, MongoDB, Tailwind CSS\n', '[\"images/portfolio-details/o1.png\", \"images/portfolio-details/o3.png\"]\n', '[\"Clearly present multiple product verticals (grating, handrails, fencing, drainage, ladders, etc.) so each line is easy to find and navigate.\", \"Provide an informative site that explains the technical benefits of materials (FRP, carbon fiber) in detail, while maintaining a modern and professional look.\", \"Build trust and credibility through client testimonials, durable applications, and strong visual elements.\", \"Ensure high performance and usability, especially for heavy content like catalogues, product specifications, and applications across all devices.\", \"Meet security and reliability expectations, critical for industrial and infrastructure clients who require confidence in the brand and website.\"]', '[\"Delivered a clean, modern, fully responsive website that organizes all verticals under clear categories, making navigation intuitive.\", \"Integrated technical content (Why FRP, product specs, applications) in a visually appealing format, balancing design and information.\", \"Showcased real testimonials and case uses to build credibility and trust among potential clients.\", \"Improved user experience across devices with fast load times, optimized images and structured content & catalogues.\", \"Reinforced brand reputation by combining strong visual design, detailed information, and reliability—positioning CREO Composites as a leader in advanced composite solutions.\"]', '[\"images/portfolio-details/o2.png\"]', '2025-09-13', 'Awesome Brand', 1, '8', '::1', 'Creo Composites Website Design | Comet Digimedia Solutions', 'Informative and secure WordPress website for Creo Composites with multiple catalogues, vertical segmentation, and a professional digital presence.', '2025-09-13 13:13:22', '2025-09-13 13:15:35'),
(13, 'Morriko Pure Foods (Kamdhenu)', '[\"images/video/eme.mp4\"]', 'Creative Design team on demand that can design, build, ship and scale your real has development agency.', 'Eme Body Care is redefining self-care with its luxurious, hand-crafted body butters that blend nourishment with indulgence.\r\nComet Digimedia Solutions designed and developed a sleek, user-friendly eCommerce website that mirrors the brand’s elegance, highlights product richness, and ensures a smooth shopping experience.\r\n\r\n', '2025-Web-Development', 'morriko-pure-foods', '[\"images/pro/01.png\"]', 'Website Development', 'Web-Development', 'Eme Body Care', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '', '[\"Needed a scalable, responsive website to showcase their product range.\",\"Required social media channels built entirely from scratch.\",\"The goal was to create a trustworthy digital ecosystem to stand out in a competitive food industry.\"]\n', '[\"Built a dynamic MERN-based website with a clean, user-friendly interface tailored to their brand.\",\"Established and managed new social media channels, curating engaging content and consistent storytelling.\",\"Delivered a cohesive, professional digital presence that enhanced brand credibility and visibility.\",\"Provided a strong foundation for long-term growth and customer engagement.\"]\n', '[\"images/pro/12.png\"]', '0000-00-00', '0', -1, '9', '::1', 'Morriko Pure Foods Website & SMM | Comet Digimedia Solutions', 'MERN-based e-commerce website and complete social media presence built from scratch for Morriko Pure Foods under the Kamdhenu brand.', '2025-08-06 14:33:44', '2025-08-06 14:33:44'),
(15, 'Shells Machinery', '[\"images/video/shells.mp4\"]', 'A short summary of the project that highlights its key achievements.sdfsdf sdfsdfsfd sdfsdfsdf', 'Shells Machinery is a leading manufacturer of pulp and paper machinery, delivering innovative and durable solutions for Kraft, Tissue, and Duplex Board production. With over four decades of industry expertise, they specialize in custom-engineered equipment that enhances efficiency and performance. Comet Digimedia Solutions crafted a clean, professional website that highlights Shells’ legacy, showcases their diverse product range, and reinforces their reputation for quality, reliability, and client-focused engineering. The site features intuitive navigation, detailed product categories, and strong brand storytelling, allowing prospective clients to easily explore solutions designed to their production needs. It positions Shells Machinery as a trusted partner for mills seeking both innovation and long-term value.', '2025-Web-Development', 'shells-machinery', '[\"images/pro/s.png\"]', 'Marketing', 'Web-Development', 'Shells Machinery', 'WordPress, PHP, MySQL, Elementor/Custom Theme, CSS3, JavaScript\n', '[\"images/portfolio-details/s1.png\", \"images/portfolio-details/s3.png\"]\n', ' [\"Needed to reflect a long legacy (“since 1979”) while looking modern and forward-thinking in design.\", \"Required the site to present a wide range of heavy industrial-equipment products clearly: pulp & paper machinery for many sub-segments (stock prep, tissue, duplex board, etc.).\", \"Wanted global credibility: detail, precision, testimonials, strong visuals to show trust and performance.\", \"Ensuring clarity of product specs/data while maintaining strong UI/UX and fast page performance.\", \"Security, reliability, and scalability expected by industrial clients.\"]', '[\"Delivered a clean, professional, responsive website that balances heritage and innovation, showcasing Shells Machinery’s decades of expertise.\", \"Structured product lines clearly in categories, making it easy for visitors to find specific machinery types and details.\", \"Integrated client testimonials, mission & vision, and performance claims prominently to build trust.\", \"Optimized for speed and usability: product catalogues, images, content are accessible across devices with good performance.\", \"Positioned the brand as a leader in pulp & paper machinery with a digital presence that reflects reliability, precision, and long term industry trust.\"]', '[\"images/portfolio-details/s2.png\"]', '2025-09-13', 'Awesome Brand', 1, '8', '::1', 'Shells Machinery Website Development | Comet Digimedia', 'Responsive industrial website for Shells Machinery, showcasing pulp & paper machinery since 1979 with modern design and global appeal.', '2025-09-13 13:13:22', '2025-09-13 13:15:35');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `s_id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `short_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `des` text COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `cover_img` text COLLATE utf8mb4_general_ci NOT NULL,
  `a_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `a_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `video` text COLLATE utf8mb4_general_ci NOT NULL,
  `benefits` text COLLATE utf8mb4_general_ci NOT NULL,
  `stack_title` text COLLATE utf8mb4_general_ci NOT NULL,
  `logo` text COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`s_id`, `title`, `short_des`, `des`, `slug`, `icon`, `cover_img`, `a_title`, `a_des`, `video`, `benefits`, `stack_title`, `logo`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Website Development', 'Building responsive, high-performing websites designed to match your brand goals. We ensure seamless functionality, speed, and mobile optimization.', 'At Comet Digimedia Solutions, web development is more than just coding it’s about creating meaningful digital experiences that engage users and support business goals.\n\nWe specialize in both front-end and back-end development, ensuring that every website we build is visually appealing, technically sound, and fully functional. Our process begins with understanding your brand, business objectives, and target audience. From there, we design intuitive interfaces and develop responsive layouts that adapt seamlessly across desktops, tablets, and mobile devices.', 'web-development', '[\"images/icons/imac.png\"]', '[\"images/service/S1.png\"]', '[\"Custom Website Development\",\"Responsive Design\",\"CMS Integration\",\"E-Commerce Development\",\"SEO-Ready Code\",\"Ongoing Maintenance\"]', ' [\"Tailored solutions built from scratch to match your brand’s identity and functionality needs.\",\"Optimized for all devices, ensuring smooth navigation and user experience.\",\"Easy-to-manage content platforms like WordPress or custom-built systems for flexibility and control.\",\"Scalable online stores with secure payment integration, inventory management, and user-friendly shopping experiences.\",\"Built with performance, speed, and search engine visibility in mind.\",\"We offer support and regular updates to keep your website running smoothly and securely.\"] ', '[\"video.mp4\"]', '[\"Designs that reflect your brand’s identity.\",\"Expertise across all modern technologies.\",\"Seamless, intuitive user experiences.\",\"SEO-optimized for maximum reach.\",\"Fully responsive across every device.\",\"Comprehensive support from concept to launch.\"]', 'Web Dev Tech Stack', '[\"images/logo/html.png\",\"images/logo/css.png\",\"images/logo/js.png\",\"images/logo/19.png\",\"images/logo/20.png\",\"images/logo/26.png\",\"images/logo/22.png\",\"images/logo/23.png\",\"images/logo/24.png\",\"images/logo/25.png\",\"images/logo/21.png\",\"images/logo/27.png\"] ', 'Web Development Services | WordPress, Shopify, Laravel', 'Comet Digimedia Solutions offers full-stack web development with WordPress, Shopify, Laravel and more to build fast and scalable websites.', '::1', 1, '2025-08-06 12:59:49', '2025-08-06 12:59:49'),
(2, 'Social Media Marketing', 'We don’t just improve your search rankings — we turn every click into quality traffic, every visit into trust, and every search into long-term visibility and growth.', 'We build responsive, high-performing websites designed to align with your brand goals, ensuring seamless functionality, speed, and mobile optimization. At Comet, we believe social media isn’t just about posting—it’s about creating conversations that convert. Our strategies blend creativity, storytelling, and data-driven insights to make your brand impossible to ignore. From scroll-stopping visuals to engaging captions, we maintain a consistent, authentic, and impactful brand voice across all platforms. Our SMM campaigns go beyond gaining followers—they focus on building loyal communities that drive real business growth. Whether it’s Instagram, Facebook, LinkedIn, or emerging platforms, we tailor content to where your audience lives, speaks, and connects.', 'social-media-marketing', '[\"images/icons/sm.png\"]', '[\"images/service/S2.png\"]', 'Research First: In-depth analysis of brand, audience, and competitors.\nTailored Planning: Custom content plan balancing creativity and performance.\nPlatform Precision: Strategies designed for maximum reach and relevance.\nPerformance Tracking: Monitor enga', '', '[\"video.mp4\"]', '[\"Creative campaigns that spark engagement.\",\"Platform-specific strategies for maximum impact.\",\"Consistent brand voice across all channels.\",\"Data-driven decisions for measurable growth.\",\"Trend-focused content that stays relevant.\",\"End-to-end management so you stay stress-free.\"]', 'Social Media Marketing Stack', '[\"images/logo/1.png\",\"images/logo/2.png\",\"images/logo/3.png\",\"images/logo/4.png\",\"images/logo/5.png\",\"images/logo/6.png\"]\n', 'Social Media Management Services | Comet Digimedia Solutions', 'Comet Digimedia Solutions manages social media platforms with strategies and campaigns designed to increase engagement and reach.', '::1', 1, '2025-08-06 13:00:52', '2025-08-06 13:00:52'),
(3, 'Performance Marketing', 'Data-driven marketing strategies focused on measurable results. We help you grow through ROI-focused campaigns across search, social media, and display advertising.', 'Performance Marketing is all about measurable results. At Comet Digimedia Solutions, we run data-driven campaigns across platforms like Google Ads, Meta, and more ensuring every rupee you spend delivers real value.\n\nFrom lead generation and conversions to app installs and website traffic, we focus on outcomes that matter. Our team continuously monitors and optimizes campaigns to improve ROI, reduce costs, and scale your brand’s growth.\n\nWhether you’re launching a new product or boosting visibility, our performance marketing strategies are designed to deliver impact, not just impressions.', 'performance-marketing', '[\"images/icons/pro.png\"]', '[\"images/service/s3.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy. Design Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand id', '', '[\"video.mp4\"]', '[\"ROI-focused campaigns that drive results.\",\"Precision targeting to reach the right audience.\",\"Real-time optimization for peak performance.\",\"Transparent tracking for every click and conversion.\",\"Cost-efficient strategies for higher returns.\",\"Scalable campaigns to grow with your business.\"]\n', 'Advertising Platforms', '[\"images/logo/7.png\",\"images/logo/8.png\",\"images/logo/3.png\"]\n', 'Performance Marketing Services | Google Ads & Meta Ads', 'Comet Digimedia Solutions provides performance marketing through Google Ads and Meta Ads to maximize ROI and business growth.', '::1', 1, '2025-08-06 13:01:31', '2025-08-06 13:01:31'),
(4, 'Search engine optimization(SEO)', 'Optimizing your website to rank higher on search engines and attract organic traffic. We enhance visibility, boost credibility, and drive long-term growth through proven SEO strategies.', 'SEO is the process of improving your website’s visibility on search engines like Google to attract more organic traffic. At Comet Digimedia Solutions, we use proven strategies to boost your rankings, increase brand credibility, and drive long-term growth.\n\nFrom on-page optimization and keyword research to technical SEO and quality backlink building, we cover every aspect needed to help your website perform better. Our goal is to ensure your business is found by the right people at the right time—organically and consistently.', 'seo', '[\"images/icons/seo.png\"]', '[\"images/service/S4.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy. Design Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand id', '', '[\"video.mp4\"]', '[\"Keyword strategies that attract the right traffic.\",\"On-page and off-page optimization for higher rankings.\",\"Technical SEO that keeps your site search-engine friendly.\",\"Content that boosts visibility and authority.\",\"Data-backed improvements for sustainable growth.\"]\n', 'SEO & Analytics Stack', '[\"images/logo/9.png\",\"images/logo/10.png\",\"images/logo/11.png\",\"images/logo/12.png\",\"images/logo/13.png\"]\n', 'SEO Services | Comet Digimedia Solutions', 'Comet Digimedia Solutions offers SEO services including keyword optimization, on-page SEO, and technical SEO to improve search rankings.', '::1', 1, '2025-08-06 13:02:09', '2025-08-06 13:02:09'),
(5, 'APP Development', 'From concept to code, we build powerful, user-friendly apps on any modern technology—transforming your bold ideas into smooth, scalable, and seamless digital experiences. Let’s build better.', 'At Comet, we turn your app ideas into seamless, high-performing digital experiences. From sleek UI/UX designs to robust backend systems, our app development process ensures your vision is transformed into a product that engages, performs, and grows. Whether it’s Android, iOS, or cross-platform, we build apps that are fast, functional, and future-ready.\n\nWe focus on blending innovation with usability—so your users don’t just download your app, they love to use it. With the latest technologies and a user-first approach, we create applications that scale with your business and stay ahead in an ever-evolving market.', 'app-development', '[\"images/icons/app.png\"]', '[\"images/service/S5.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy. Design Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand id', '', '[\"video.mp4\"]', '[\"Custom-built apps tailored to your business goals.\",\"User-friendly designs for seamless experiences.\",\"Scalable architecture to grow with your needs.\",\"Cross-platform compatibility for wider reach.\",\"Robust security to protect user data.\",\"End-to-end development and support for hassle-free launches.\"]\n', 'APP Development Tech Stack', '[\"images/logo/28.png\",\"images/logo/29.png\",\"images/logo/30.png\",\"images/logo/31.png\",\"images/logo/32.png\"]\n', 'Custom App Development Services | Comet Digimedia Solutions', 'Build user-friendly mobile and web applications designed to your business goals. Comet Digimedia Solutions delivers scalable app development designed for performance and growth.', '::1', 1, '2025-08-06 13:02:41', '2025-08-06 13:02:41'),
(6, 'Branding & Design', 'Designing impactful visuals including unique logos, branding assets, brochures, and digital creatives. We carefully craft your brand identity with clean, compelling, consistent design. Every detail matters.', 'At Comet, we believe design is more than just visuals—it’s the art of storytelling that shapes how the world sees your brand. Our graphic designing services cover every creative requirement, ensuring your brand stands out in every space it appears. From engaging social media creatives and impactful digital advertisements to large-scale hoardings, striking billboards, and eye-catching product packaging, we do it all under one roof.\n\nWe also specialize in brochures, flyers, business cards, corporate presentations, event branding, and every other design need that falls under the creative spectrum. With a deep focus on aesthetics, brand consistency, and audience psychology, our designs not only attract attention but also inspire action. Whatever your vision, Comet transforms it into visuals that speak louder than words—because when it comes to graphics, we believe there are no limits to creativity.', 'branding-and-design', '[\"images/icons/branding.png\"]', '[\"images/service/S6.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy. Design Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand id', '', '[\"video.mp4\"]', '[\"Unique brand identity that stands out in the market.\", \"Consistent visual language across all platforms.\", \"Creative designs that capture attention instantly.\", \"High-quality graphics for digital, print, packaging, and hoardings.\", \"Strategic branding that builds long-term recognition.\", \"End-to-end design solutions covering every graphic need.\"]\n', 'Branding & Designing Toolkit', '[\"images/logo/14.png\",\"images/logo/15.png\",\"images/logo/16.png\",\"images/logo/17.png\",\"images/logo/18.png\"]\n', 'Creative Branding & Design Services | Comet Digimedia Solutions', 'Strengthen your brand identity with impactful design and branding solutions. From logos to visual identity, Comet Digimedia Solutions creates designs that connect and inspire', '::1', 1, '2025-08-06 13:02:43', '2025-08-06 13:02:43'),
(7, 'Video Production & Editing', 'At Comet DigiMedia Solutions, web development is more than just coding it’s about creating meaningful digital experiences that engage users and support business goals.', 'At Comet, we create videos that don’t just tell your story—they make your audience feel it. From concept to final cut, our video production process blends creativity, storytelling, and technical expertise to craft content that engages, inspires, and converts. Whether it’s brand films, promotional ads, or social media reels, we bring your vision to life in motion.\n\nOur editing team ensures every frame counts—seamlessly weaving visuals, sound, and effects into a polished masterpiece. With cinematic quality and marketing-focused storytelling, we turn raw footage into powerful visual experiences that make your brand unforgettable.', 'video-production-and-editing', '[\"images/icons/imac.png\"]', '[\"images/service/S1.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy.\nDesign Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand id', '', '[\"video.mp4\"]', '[\"Story-driven videos that connect with your audience.\", \"Professional editing for a polished, high-quality finish.\", \"Creative concepts tailored to your brand voice.\", \"Optimized formats for all digital platforms.\", \"Engaging visuals that boost brand recall.\", \"End-to-end production, from idea to final cut.\"]\n', 'Video Editing Suite', '[\"images/logo/34.png\",\"images/logo/33.png\"]\n', 'Graphic and Video Editing Services | Comet Digimedia Solutions', 'Comet Digimedia Solutions creates professional graphic designs and video edits to enhance brand presence and visual impact.', '::1', 1, '2025-08-11 10:43:56', '2025-08-11 10:43:56'),
(8, 'Video Production & Editing', 'At Comet Digi Media Solutions, web development is more than just coding it’s about creating meaningful digital experiences that engage users and support business goals.', 'At Comet Digi Media Solutions, web development is more than just coding it’s about creating meaningful digital experiences that engage users and support business goals.\n\nWe specialize in both front-end and back-end development, ensuring that every website we build is visually appealing, technically sound, and fully functional. Our process begins with understanding your brand, business objectives, and target audience. From there, we design intuitive interfaces and develop responsive layouts that adapt seamlessly across desktops, tablets, and mobile devices.\n\nCustom Website Development – Tailored solutions built from scratch to match your brand’s identity and functionality needs.\nResponsive Design – Optimized for all devices, ensuring smooth navigation and user experience.\nCMS Integration – Easy-to-manage content platforms like WordPress or custom-built systems for flexibility and control.\nE-Commerce Development – Scalable online stores with secure payment integration, inventory management, and user-friendly shopping experiences.\nSEO-Ready Code – Built with performance, speed, and search engine visibility in mind.\nOngoing Maintenance – We offer support and regular updates to keep your website running smoothly and securely', 'custom-web-development', '[\"images/icons/imac.png\"]', '[\"service-2-fig.png\"]', 'Requirement Analysis We understand your business goals and target audience. This helps us define the website structure, features, and content strategy.\r\nDesign Create visually appealing, user-friendly layouts. We ensure the design aligns with your brand i', '', '[\"video.mp4\"]', '[\"Soft and bulky waste, easy to open for fiber extraction\",\"Available in bulk, regular supply possible\",\"Suitable for mechanical and chemical recycling\",\"Can be blended with virgin or recycled PET materials\"]', '', '[\"images/clients/logo-3.png\",\"images/clients/logo-4.png\",\"images/clients/logo-5.png\",\"images/clients/logo-6.png\",\"images/clients/logo-7.png\",\"images/clients/logo-8.png\"]', '', '', '::1', -1, '2025-08-11 10:43:56', '2025-08-11 10:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `store_setting`
--

CREATE TABLE `store_setting` (
  `store_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `overview` text COLLATE utf8mb4_general_ci,
  `logo1` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `logo2` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notify_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `career_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `conf_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `conf_password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `conf_host` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `conf_port` int DEFAULT NULL,
  `conf_secure` tinyint(1) DEFAULT '0',
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meta_desc` text COLLATE utf8mb4_general_ci,
  `status` tinyint DEFAULT '1',
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store_setting`
--

INSERT INTO `store_setting` (`store_id`, `name`, `tagline`, `overview`, `logo1`, `logo2`, `notify_email`, `career_email`, `conf_email`, `conf_password`, `conf_host`, `conf_port`, `conf_secure`, `meta_title`, `meta_desc`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'New Compan dfdgdfgdgddgd', 'New', 'Updated company overview.', '[\"images/logo/logo-deep-blue.png\"]', '[\"images/logo/white.png\"]', 'notify@new.com', 'careers@new.com', 'smtp@new.com', 'newpass123', 'smtp.newhost.com', 587, 1, 'Updated Meta Title', 'Updated Meta Description', 1, '::1', '2025-08-01 06:10:10', '2025-08-29 05:24:31'),
(2, 'New ', 'New', 'Updated company overview.', 'new-logo1.png', 'new-logo2.png', 'notify@new.com', 'careers@new.com', 'smtp@new.com', 'newpass123', 'smtp.newhost.com', 587, 1, 'Updated Meta Title', 'Updated Meta Description', 1, '::1', '2025-08-01 06:10:19', '2025-08-01 06:27:03');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `post` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `des` text COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `phone_no` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `image`, `name`, `post`, `des`, `email`, `phone_no`, `linkedin`, `instagram`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, '[\"images/team/kunal.png\"]', 'Kunal Shah', 'CEO', 'Kunal Naresh Shah, the driving force behind Comet Digimedia Solutions, is a Computer Engineering graduate with a passion for transforming ideas into cutting-edge digital experiences. With a rich career spanning leading roles at Oyyum Solutions, StreamBits InfoTech, Aurum Communication, Fitternity, and as CTO at ALC-Indy CBMA Pvt. Ltd., Kunal brings a blend of technical mastery and strategic insight to the table.\n\nAt Comet Digimedia Solutions, Kunal envisions building a future where marketing goes beyond mere promotion — creating trust-driven, 360-degree digital ecosystems that empower brands to thrive in a rapidly evolving tech landscape. His goal is to lead the company to become a trailblazer in delivering innovative, tailor-made digital and technology solutions that not only meet but anticipate the needs of clients worldwide.', 'shahkunal.441@gmail.com', '9820924125', 'https://www.linkedin.com/in/kunal-shah-in/', 'https://www.instagram.com/kunalshah09/', '::1', 1, '2025-08-08 10:33:41', '2025-08-08 10:33:41'),
(2, '[\"images/team/team22.png\"]', 'Karishma Shah', 'Managing Partner', 'Karishma Shah, Managing Partner at Comet Digimedia Solutions, brings a unique blend of marketing expertise and creative flair. With experience ranging from marketing training at Global Direct to fashion styling for brands like Fuel and Diva’ni, she combines creativity with strategic insight to drive the company’s growth.\n\nAt Comet Digimedia Solutions, Karishma leads HR and Marketing with a passion for building strong, lasting relationships — both within the team and with clients. Her exceptional communication skills, adaptability, and presentable personality enable her to craft tailored solutions that align perfectly with client goals, ensuring consistent satisfaction and success.\n\nKarishma envisions Comet Digimedia as a powerhouse of innovation and trust, dedicated to empowering businesses through creative, client-focused marketing solutions that foster growth and long-term partnerships.', 'krs006@gmail.com', '9167634870', 'https://www.linkedin.com/in/karishma-shah-b98055140/', 'https://www.instagram.com/karishmashah_333/', '::1', 1, '2025-08-08 10:35:25', '2025-08-08 10:35:25'),
(3, '[\"images/team-details/team-details-thumb.png\"]', 'Minul Sanghavi', 'Administrative & HR Assistant', 'Jassica Oliver is known for her ability to take a creative brief and run with it, coming back with fresh ideas and a perfectly built design file every time. From digital design to long-format layouts, she blends beautiful and intuitive with each project she touches. She also happens to be the queen of deadline-crushing, all while maintaining a can-do, Zen attitude that keeps the whole Statement team centered.', 'minul441@gmail.com', '9876543210', 'https://www.linkedin.com/in/johndoe', 'https://www.instagram.com/johndoe', '::1', -1, '2025-08-08 10:35:27', '2025-08-08 10:35:27');

-- --------------------------------------------------------

--
-- Table structure for table `team_member`
--

CREATE TABLE `team_member` (
  `m_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `position` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `linkedin` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_member`
--

INSERT INTO `team_member` (`m_id`, `name`, `position`, `instagram`, `linkedin`, `image`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'Deepak Singh', 'Front-End Developer (WordPress & Shopify)', 'https://instagram.com/johndoe', '', '[\"images/team/team1.png\"]', 1, '::1', '2025-08-08 10:43:08', '2025-08-08 10:43:08'),
(2, 'Mukesh Pawar', 'MERN Developer', 'https://instagram.com/johndoe', 'https://www.linkedin.com/in/pawar-mukesh-209775242/', '[\"images/team/team3.png\"]', 1, '::1', '2025-08-08 10:43:25', '2025-08-08 10:43:25'),
(4, 'Bhargavi Joshi', 'Sr. Graphic Designer', 'https://instagram.com/ananyasharma', 'https://www.linkedin.com/in/bhargavi-upadhyay-47b21b163/', '[\"images/team/team4.png\"]', 1, '::1', '2025-08-08 10:44:15', '2025-08-08 10:44:15'),
(5, 'Prachi Kadu', 'MERN Developer', 'https://instagram.com/rohitverma', 'https://www.linkedin.com/in/prachi-kadu-9064a7278/', '[\"images/team/team5.png\"]', 1, '::1', '2025-08-08 10:44:24', '2025-08-08 10:44:24');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `testimonial_id` int NOT NULL,
  `name` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `company` text COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`testimonial_id`, `name`, `company`, `description`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'Hishma Shah', 'Owner, Future Navigators', 'Kunal with his entire team at comet digimedia solutions has very efficiently made my website.\n                        Being one of his first few clients, I understood Kunal has a very friendly nature and his work\n                        is very trustworthy. Future Navigators is thoroughly happy with our website, including the\n                        colors, content, design etc.', 1, '192.0.2.1', '2024-04-17 11:37:39', '2024-04-17 11:37:39'),
(3, 'Mohit Shah', 'Owner, 9 Automates', ' I would like to thank Kunal and his team from Comet Digimedia Solutions for developing a\n                        professional and beautiful website which showcases our company very well. The custom CMS they\n                        built makes it easy for us to keep our content up-to-date—it\'s simple, intuitive, and painless.\n                        I highly recommend comet digimedia solutions', 1, '192.0.2.1', '2024-04-17 11:39:20', '2024-04-17 11:39:20'),
(5, 'Devansh shah', '', ' Made my companies website at a very reasonable rate and amazingly work done.', 1, '::1', '2024-04-18 17:10:34', '2024-04-18 17:10:34'),
(8, 'Sumant kachru', '', 'High energy team and great founders.', 1, '::1', '2025-08-06 14:45:43', '2025-08-06 14:45:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'comet@admin', '$2b$10$2e2ikA5iZRs.MDNj9NjXjua0N8zMkiSfsWKTCUoqYNnra3T8aNeaO', 0, '::1', '2025-08-13 10:54:09', '2025-08-13 10:54:09'),
(2, 'comet', '$2b$10$qbaF5C3.e960qjs4J2VJp.5fS88k40Z9RA3M0gl1KzGCZWU/xPTby', 0, '::1', '2025-08-13 10:54:09', '2025-08-13 10:54:09'),
(3, 'cometdigisol', '$2b$10$Dwnfo02U9XWxddUy7FWHY.5DxR4ipN5yVJVC0XOkg3K9OpmZPWYY6', 1, '::1', '2025-08-13 10:54:09', '2025-08-13 10:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `web_about`
--

CREATE TABLE `web_about` (
  `id` int NOT NULL,
  `hero_title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `video` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `mission_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `mission_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `vision_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `vision_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_about`
--

INSERT INTO `web_about` (`id`, `hero_title`, `hero_des`, `video`, `meta_title`, `meta_des`, `mission_des`, `mission_image`, `vision_des`, `vision_image`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Empowering Your Brand Through Creative Digital Solutions', 'Ratings based on Google Ratings', '[\"video.mp4\"]', 'About Comet DigiMedia Solutions | Your Digital Growth Partner', 'Discover CometDigi Media Solutions – a team of experts in performance marketing, website development, and social media management. We help businesses build powerful digital identities.', 'We’re on a mission to help you find exceptional marketing solutions and build strong, lasting           partnerships. We believe in collaborative success, working alongside our clients to achieve their most           ambitious goals.', '', ' To empower businesses to harness the full potential of digital marketing, enabling them to enhance           customer engagement and create unforgettable brand experiences.', '', '::1', 1, '2025-08-07 15:12:20', '2025-08-07 15:12:20'),
(2, 'About Our Company', 'We are committed to excellence and innovation.', 'uploads/videos/about1.mp4', 'About Us', 'Learn more about our company.', 'Our mission is to deliver high-quality services.', 'uploads/images/mission1.jpg', 'We envision a sustainable and innovative future.', 'uploads/images/vision2.jpg', '::1', 1, '2025-08-07 15:12:25', '2025-08-07 15:12:25'),
(3, 'About Our Company', 'We are committed to excellence and innovation.', 'uploads/videos/about1.mp4', 'About Us', 'Learn more about our company.', 'Our mission is to deliver high-quality services.', 'uploads/images/mission1.jpg', 'We envision a sustainable and innovative future.', 'uploads/images/vision2.jpg', '::1', 1, '2025-08-08 09:42:45', '2025-08-08 09:42:45');

-- --------------------------------------------------------

--
-- Table structure for table `web_blog`
--

CREATE TABLE `web_blog` (
  `b_id` int NOT NULL,
  `hero_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_blog`
--

INSERT INTO `web_blog` (`b_id`, `hero_title`, `meta_title`, `meta_des`, `ip`, `status`, `updated_at`, `created_at`) VALUES
(1, 'Explore latest news and insights', 'Digital Marketing Insights & Trends | Comet DigiMedia Solutions Blog', 'Read expert articles, tips, and insights on digital marketing, performance marketing, web development, and social media management from Comet Digimedia Solutions.', '::1', 1, '2025-08-08 17:13:55', '2025-08-08 17:13:55'),
(2, 'Innovative', 'Latest Tech Trends and Insights', 'Explore the newest innovations in technology with our in-depth articles and updates.', '::1', 1, '2025-08-08 17:14:05', '2025-08-08 17:14:05'),
(3, 'Innovative Tech Blog', 'Latest Tech Trends and Insights', 'Explore the newest innovations in technology with our in-depth articles and updates.', '::1', 1, '2025-08-08 17:14:07', '2025-08-08 17:14:07');

-- --------------------------------------------------------

--
-- Table structure for table `web_career`
--

CREATE TABLE `web_career` (
  `c_id` int NOT NULL,
  `hero_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `list_img` text COLLATE utf8mb4_general_ci NOT NULL,
  `career_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_career`
--

INSERT INTO `web_career` (`c_id`, `hero_title`, `hero_image`, `list_img`, `career_title`, `meta_title`, `meta_des`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'Build Your future at Comet', '[\"images/hero/common-hero-thumb-3.png\"]', '[\"images/carrer/career-gallery-1.png\",\"images/carrer/career-gallery-2.png\",\"images/carrer/career-gallery-3.png\",\"images/carrer/career-gallery-4.png\"]', 'Current opportunities \nwaiting for you', 'Exciting Career Opportunities - Software Engineer', 'Join us as a Software Engineer to work on innovative projects and grow your career.', 1, '::1', '2025-08-08 14:27:38', '2025-08-08 14:27:38'),
(2, 'Join Our Team', 'careers-hero.jpg', '', 'Software Engineer', 'Exciting Career Opportunities - Software Engineer', 'Join us as a Software Engineer to work on innovative projects and grow your career.', -1, '::1', '2025-08-08 14:27:43', '2025-08-08 14:27:43'),
(3, 'Join Our Team', 'career-hero.jpg', '[\"images/portfolio-details/k1.png\", \"images/portfolio-details/k2.png\"]\n', 'Exciting Career Opportunities', 'Careers at Our Company', 'Explore a range of opportunities to grow with us.', -1, '::ffff:127.0.0.1', '2025-09-17 13:10:23', '2025-09-17 13:10:23');

-- --------------------------------------------------------

--
-- Table structure for table `web_contact`
--

CREATE TABLE `web_contact` (
  `id` int NOT NULL,
  `hero_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `iframe` text COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `form_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `form_des` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_contact`
--

INSERT INTO `web_contact` (`id`, `hero_title`, `iframe`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`, `form_title`, `form_des`) VALUES
(1, 'We’re just a message away to help you', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4217.5044160159205!2d72.91154881128537!3d20.37320398103835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0cfb932c9e1cd%3A0xc640c3dee28868a2!2sComet%20Digimedia%20Solutions!5e1!3m2!1sen!2sin!4v1754904912122!5m2!1sen!2sin\" \n       width=\"600\" \n       height=\"800\" \n       style=\"border: 0\" \n       allowfullscreen=\"\" \n       loading=\"lazy\" \n       referrerpolicy=\"no-referrer-when-downgrade\" \n       class=\"d-block w-100\">\n</iframe>', 'Contact - Example Company', 'Reach out to Example Company for inquiries, support, and collaborations.', '::1', 1, '2025-08-11 14:45:08', '2025-08-11 14:45:08', 'Let’s create your brand that shines!   ', 'Whether you’re interested in collaborating with us on your next project or simply want to reach out for a conversation.');

-- --------------------------------------------------------

--
-- Table structure for table `web_home`
--

CREATE TABLE `web_home` (
  `home_id` int NOT NULL,
  `hero_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `hero_client` varchar(70) COLLATE utf8mb4_general_ci NOT NULL,
  `video` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `about_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `about_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `about_img_left` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `about_img_right` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `about_img_bottom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `core_value_title` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `core_value_status` tinyint NOT NULL,
  `service_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `award_img` text COLLATE utf8mb4_general_ci NOT NULL,
  `work_process_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `project_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `testimonial_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `client_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `blog_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_home`
--

INSERT INTO `web_home` (`home_id`, `hero_title`, `hero_des`, `hero_client`, `video`, `about_title`, `about_des`, `about_img_left`, `about_img_right`, `about_img_bottom`, `core_value_title`, `core_value_status`, `service_title`, `award_img`, `work_process_title`, `project_title`, `testimonial_title`, `client_title`, `blog_title`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Crafting Digital Experiences that Earn', 'As long as your dreams revolve around something like; being the proud owner spectacular website.', 'k+ Clients', '[\"video.mp4\"]', 'Helping businesses make their mark in the digital world', 'For over 10 years, Comet Digimedia Solutions has been crafting digital journeys that connect brands with real people. By combining creativity, technology, and strategy, we help businesses grow and stand out in today’s crowded digital world. From web and app development to design, video production, storytelling, SEO, and marketing, we provide everything under one roof with a simple goal — to make your brand the spark that ignites the digital world.', '[\"images/about/about-thumb-2-1.png\"]', '[\"images/about/about-thumb-2-3.png\"]', '[\"images/about/about-thumb-2-2.png\"]', 'Your Partner in Creative Digital Growth', 1, 'Our Services', '[\"images/main-award.jpg\"]', 'Our Proven Processes for Quality Results', 'Our Projects', 'See Why Businesses Trust Comet', 'We worked with largest global brands', 'Latest Blogs', 'Comet DigiMedia Solutions | Digital Marketing, Performance Marketing & Web Development', 'Grow your brand with CometDigi Media Solutions. We specialize in digital marketing, performance marketing, social media management, and website development to deliver measurable results.', '::1', 1, '2025-08-06 11:54:45', '2025-08-06 11:54:45'),
(2, 'Crafting your fantasies with a twist of', 'Your digital solution', 'Happy Clients', 'video.mp4', 'About Us', 'We build amazing things.', 'left.jpg', 'right.jpg', 'bottom.jpg', 'Trusted by Brands', 1, 'Our Services', '', 'How We Work', 'Our Projects', 'Testimonials', 'Our Clients', 'Latest Blogs', 'Home - MySite', 'This is the homepage.', '::ffff:127.0.0.1', -1, '2025-08-06 12:22:30', '2025-08-06 12:22:30');

-- --------------------------------------------------------

--
-- Table structure for table `web_project`
--

CREATE TABLE `web_project` (
  `p_id` int NOT NULL,
  `hero_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_project`
--

INSERT INTO `web_project` (`p_id`, `hero_title`, `meta_title`, `meta_des`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Explore Our Digital Footprint', 'Our Portfolio | Client Projects & Case Studies – Comet Digimedia Solutions', 'Browse Comet DigiMedia Solutions’ portfolio – showcasing successful client projects across digital marketing, website development, and social media management.\n', '::1', 1, '2025-08-08 15:58:51', '2025-08-08 15:58:51'),
(2, 'New ', 'Updated Meta Title', 'This is the updated meta description for the portfolio.', '::1', -1, '2025-08-08 15:58:56', '2025-08-08 15:58:56'),
(3, 'New Hero Title Example', 'Updated Meta Title', 'This is the updated meta description for the portfolio.', '::1', 1, '2025-08-08 15:58:59', '2025-08-08 15:58:59');

-- --------------------------------------------------------

--
-- Table structure for table `web_service`
--

CREATE TABLE `web_service` (
  `s_id` int NOT NULL,
  `hero_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `hero_image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `service_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `list_img` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_service`
--

INSERT INTO `web_service` (`s_id`, `hero_title`, `hero_image`, `service_title`, `list_img`, `meta_title`, `meta_des`, `status`, `ip`, `created_at`, `updated_at`) VALUES
(1, 'Everything Your Buisness Needs, All in One Place', '[\"images/hero/common-hero-thumb.png\"]', 'We help you to build \ndigital business', '[\"images/service/service-2-fig.png\"]', 'Best Web Development Services', 'We provide cutting-edge full stack web development solutions.', 1, '::1', '2025-08-08 11:48:33', '2025-08-08 11:48:33'),
(2, 'Services', 'uploads/services/hero-banner.jpg', 'Full Stack Development', 'uploads/services/img1.jpg', 'Best Web Development Services', 'We provide cutting-edge full stack web development solutions.', 1, '::1', '2025-08-08 11:49:01', '2025-08-08 11:49:01'),
(3, 'Our Premium Web Services', 'uploads/services/hero-banner.jpg', 'Full Stack Development', 'uploads/services/img1.jpg', 'Best Web Development Services', 'We provide cutting-edge full stack web development solutions.', 1, '::1', '2025-08-08 11:49:20', '2025-08-08 11:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `web_team`
--

CREATE TABLE `web_team` (
  `t_id` int NOT NULL,
  `hero_title` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `group_image` text COLLATE utf8mb4_general_ci NOT NULL,
  `team_title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `meta_title` varchar(300) COLLATE utf8mb4_general_ci NOT NULL,
  `meta_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web_team`
--

INSERT INTO `web_team` (`t_id`, `hero_title`, `group_image`, `team_title`, `ip`, `status`, `meta_title`, `meta_des`, `created_at`, `updated_at`) VALUES
(1, 'Building success through collaboration', '[\"images/hero/common-hero-thumb-4.png\"]', 'Meet our innovative team members', '::1', 1, 'Meet the Team | Comet DigiMedia Solutions Experts', 'Get to know the creative minds at CometDigi Media Solutions – specialists in web development, frontend design, social media management, graphic design, and video editing.', '2025-08-07 17:31:33', '2025-08-07 17:31:33'),
(2, 'Meet', 'team-group.jpg', 'Creative and Dedicated Professionals', '::1', 1, 'Our Team - Company Name', 'Learn about the talented team behind our company.', '2025-08-07 17:31:37', '2025-08-07 17:31:37'),
(3, 'Meet Our Expert Team', 'team-group.jpg', 'Creative and Dedicated Professionals', '::1', 1, '0', 'Learn about the talented team behind our company.', '2025-08-07 17:31:38', '2025-08-07 17:31:38');

-- --------------------------------------------------------

--
-- Table structure for table `wordpress_package`
--

CREATE TABLE `wordpress_package` (
  `id` int NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `strike_price_inr` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `strike_price_usd` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price_inr` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price_usd` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `f_av` text COLLATE utf8mb4_general_ci NOT NULL,
  `f_nav` text COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wordpress_package`
--

INSERT INTO `wordpress_package` (`id`, `type`, `strike_price_inr`, `strike_price_usd`, `price_inr`, `price_usd`, `f_av`, `f_nav`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Starter', '25000', '969', '20000', '949', '[\"Up to 5 pages\", \"Up to 20\", \"Up to 15 free plugins\", \"Wordfence Security (Free version)\", \"Yoast SEO (Free version)\", \"AMC from 2nd year (additional cost)\"]\n', '[\"E-commerce\"]', '::1', 1, '2025-09-03 16:10:12', '2025-09-03 16:10:12'),
(2, 'Pro', '45000', '', '40000', '456', '[\"Up to 10 pages\", \"Up to 50\", \"Up to 25 plugins\", \"Wordfence Security (Premium)\", \"Yoast SEO (Free version)\", \"AMC from 2nd year (additional cost)\"]\n', '[\"E-commerce\"]', '::1', 1, '2025-09-03 16:13:05', '2025-09-03 16:13:05'),
(3, 'Pro+', '65000', '', '60000', '449', '[\"Up to 15 pages\", \"Up to 100\", \"Up to 40 plugins\", \"Wordfence Security (Premium)\", \"Yoast SEO (Premium)\", \"WooCommerce\", \"AMC from 2nd year (additional cost)\"]\n', '', '::1', 1, '2025-09-03 16:22:50', '2025-09-03 16:22:50'),
(4, 'Starter', '', '', '20000', '449', '[\"Up to 5 pages\",\"Up to 20 Products/Services\",\"Custom CMS\",\"Image Cropper\",\"File Management\",\"Up to 2 Forms\"]', '[\"Blogs\",\"CDN\",\"E-Commerce Payment Gateway\",\"Order Management\"]', '::1', -1, '2025-09-03 16:23:27', '2025-09-03 16:23:27'),
(5, 'Pro', '', '', '35000', '949', '[\"up to 10 pages\",\"up to 50 Products/services\",\"Advanced CMS\",\"Image cropper\",\"file management\",\"up to 5 forms\",\"Blogs\"]', '[\"CDN\",\"E-Commerce Payment Gateway\",\"Order Management\"]', '::1', -1, '2025-09-03 16:46:03', '2025-09-03 16:46:03');

-- --------------------------------------------------------

--
-- Table structure for table `work_process`
--

CREATE TABLE `work_process` (
  `w_id` int NOT NULL,
  `title` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `des` text COLLATE utf8mb4_general_ci NOT NULL,
  `process_image` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `ip` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `work_process`
--

INSERT INTO `work_process` (`w_id`, `title`, `des`, `process_image`, `ip`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Plan & Research', 'Define your target audience. Set clear goals. Conduct competitor analysis. This step uncovers opportunities and ensures your strategies are focused.', 'mission.png', '::1', 1, '2025-08-06 13:21:50', '2025-08-06 13:21:50'),
(2, 'Building Your Online Presence', 'User-friendly website (brand & services), optimized for visibility. Strong social media where your audience is.', 'mission.png', '::1', 1, '2025-08-06 13:22:24', '2025-08-06 13:22:24'),
(3, 'Creating Engaging Content', 'Create valuable content (blogs, social, video, etc.) to build trust and thought leadership. Post consistently.', 'mission.png', '::1', 1, '2025-08-06 13:22:59', '2025-08-06 13:22:59'),
(5, 'Brand & Content Promotion', 'Capture leads. Boost reach with paid ads (Google, social) to capture genuine leads. Explore cross-promotions.', 'mission.png', '::1', 1, '2025-08-06 13:24:54', '2025-08-06 13:24:54'),
(7, 'Analyse & Refine', 'Measure performance with analytics. Adapt strategies from data and trends. Test and optimize campaigns regularly.', 'mission.png', '::1', 1, '2025-08-06 13:24:54', '2025-08-06 13:24:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`awards_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `blog_content`
--
ALTER TABLE `blog_content`
  ADD PRIMARY KEY (`bc_id`),
  ADD KEY `fk_blog` (`blog_id`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `client_logo`
--
ALTER TABLE `client_logo`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `core_value`
--
ALTER TABLE `core_value`
  ADD PRIMARY KEY (`core_id`);

--
-- Indexes for table `custom_package`
--
ALTER TABLE `custom_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`enquiry_id`);

--
-- Indexes for table `job_inquiry`
--
ALTER TABLE `job_inquiry`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `job_inquiry3`
--
ALTER TABLE `job_inquiry3`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `marketing_approach`
--
ALTER TABLE `marketing_approach`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `store_setting`
--
ALTER TABLE `store_setting`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_member`
--
ALTER TABLE `team_member`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`testimonial_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_about`
--
ALTER TABLE `web_about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_blog`
--
ALTER TABLE `web_blog`
  ADD PRIMARY KEY (`b_id`);

--
-- Indexes for table `web_career`
--
ALTER TABLE `web_career`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `web_contact`
--
ALTER TABLE `web_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `web_home`
--
ALTER TABLE `web_home`
  ADD PRIMARY KEY (`home_id`);

--
-- Indexes for table `web_project`
--
ALTER TABLE `web_project`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `web_service`
--
ALTER TABLE `web_service`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `web_team`
--
ALTER TABLE `web_team`
  ADD PRIMARY KEY (`t_id`);

--
-- Indexes for table `wordpress_package`
--
ALTER TABLE `wordpress_package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `work_process`
--
ALTER TABLE `work_process`
  ADD PRIMARY KEY (`w_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `awards`
--
ALTER TABLE `awards`
  MODIFY `awards_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `blog_content`
--
ALTER TABLE `blog_content`
  MODIFY `bc_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `career`
--
ALTER TABLE `career`
  MODIFY `c_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `client_logo`
--
ALTER TABLE `client_logo`
  MODIFY `client_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `core_value`
--
ALTER TABLE `core_value`
  MODIFY `core_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `custom_package`
--
ALTER TABLE `custom_package`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `enquiry_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `job_inquiry`
--
ALTER TABLE `job_inquiry`
  MODIFY `job_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `job_inquiry3`
--
ALTER TABLE `job_inquiry3`
  MODIFY `job_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `marketing_approach`
--
ALTER TABLE `marketing_approach`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `p_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `s_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `store_setting`
--
ALTER TABLE `store_setting`
  MODIFY `store_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team_member`
--
ALTER TABLE `team_member`
  MODIFY `m_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `testimonial_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_about`
--
ALTER TABLE `web_about`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_blog`
--
ALTER TABLE `web_blog`
  MODIFY `b_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_career`
--
ALTER TABLE `web_career`
  MODIFY `c_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_contact`
--
ALTER TABLE `web_contact`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `web_home`
--
ALTER TABLE `web_home`
  MODIFY `home_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web_project`
--
ALTER TABLE `web_project`
  MODIFY `p_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_service`
--
ALTER TABLE `web_service`
  MODIFY `s_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `web_team`
--
ALTER TABLE `web_team`
  MODIFY `t_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wordpress_package`
--
ALTER TABLE `wordpress_package`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `work_process`
--
ALTER TABLE `work_process`
  MODIFY `w_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_content`
--
ALTER TABLE `blog_content`
  ADD CONSTRAINT `fk_blog` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`blog_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
