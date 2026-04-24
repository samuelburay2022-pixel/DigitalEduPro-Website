(function () {
  const imageExtensions = new Set(["png", "jpg", "jpeg", "webp", "svg"]);
  const videoExtensions = new Set(["mp4", "mov"]);

  function extensionOf(name) {
    const match = name.match(/\.([^.]+)$/);
    return match ? match[1].toLowerCase() : "";
  }

  function titleFromName(name) {
    const baseName = name
      .split("/")
      .pop()
      .replace(/\.[^.]+$/, "")
      .replace(/\.svg$/i, "");
    const cleaned = baseName
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const normalized = cleaned
      .replace(/^\d+[\s_-]*/, "")
      .trim();
    return normalized || (cleaned ? `Sample ${cleaned}` : "Sample file");
  }

  function typeFromName(name) {
    const extension = extensionOf(name);
    if (imageExtensions.has(extension)) return "Image";
    if (videoExtensions.has(extension)) return "Video";
    if (extension === "pdf") return "PDF";
    if (extension === "eml") return "Email";
    if (extension === "pages") return "Pages";
    if (extension === "html") return "Web page";
    return "File";
  }

  const portfolioFileDetails = {
    "DigitalEduPro_Profile/Portfolio/ClientSupport/ClientSupport.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/ClientSupport.jpg",
      description:
        "Client onboarding, request tracking, and day-to-day support workflow organized in one clear view.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/Excel_Tracking.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/Excel_Tracking.jpg",
      description:
        "Spreadsheet tracker used to monitor tasks, updates, deadlines, and client follow-through.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/File Organization.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/File Organization.jpg",
      description:
        "Folder structure and naming system that keeps client files easy to locate, review, and maintain.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/Omnisend.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/Omnisend.jpg",
      description:
        "Email automation and campaign workflow sample built in Omnisend for smoother client communication.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/SemRush_SEO.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/SemRush_SEO.jpg",
      description:
        "SEO reporting and keyword monitoring sample used to track search visibility and content opportunities.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/Slack.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/Slack.jpg",
      description:
        "Slack workspace example showing streamlined team messaging, updates, and response coordination.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/Sling.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/Sling.jpg",
      description:
        "Scheduling and shift coordination sample using Sling to organize availability and team coverage.",
    },
    "DigitalEduPro_Profile/Portfolio/ClientSupport/Wix_Automation.png": {
      thumbnail: "site-assets/portfolio-thumbs/client-support/Wix_Automation.jpg",
      description:
        "Wix automation setup that triggers reminders and follow-up actions for smoother client service.",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/school year camps-4.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/school year camps-4.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/school year camps-8.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/school year camps-8.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/school year camps-10.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/school year camps-10.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/school year camps-12.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/school year camps-12.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/school year camps-14 (1).png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/school year camps-14 (1).jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/4.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/4.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/5.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/5.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/7.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/7.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/13.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/13.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/14.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/14.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/15.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/15.jpg",
    },
    "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media/16.png": {
      thumbnail: "site-assets/portfolio-thumbs/school-camp/16.jpg",
    },
  };

  function defaultDescription(path, title, type) {
    const normalizedPath = path.toLowerCase();

    if (normalizedPath.includes("/website_funnelsample/")) {
      return `${title} strategy sample showing how visitors move from discovery to action.`;
    }

    if (normalizedPath.includes("/clientsupport/")) {
      return `${title} support workflow sample focused on organized communication and operations.`;
    }

    if (normalizedPath.includes("/schoolsystem_project/")) {
      return `${title} system screen from a school operations and reporting workflow.`;
    }

    if (normalizedPath.includes("/layout samples/")) {
      return `${title} design sample prepared for promotion, print, or event marketing.`;
    }

    if (normalizedPath.includes("/books_project/")) {
      return `${title} learning and book design sample created for education-focused content.`;
    }

    if (normalizedPath.includes("/seminars_conducted/")) {
      return `${title} seminar or training asset used for workshops and digital learning sessions.`;
    }

    if (normalizedPath.includes("/other work samples/")) {
      return `${title} additional campaign or visual sample from past client work.`;
    }

    if (normalizedPath.includes("/video_samples/")) {
      return `${title} video sample highlighting motion, campaign storytelling, and promotion.`;
    }

    if (normalizedPath.includes("/newsletters_samples/")) {
      return `${title} communication sample for email outreach, updates, or client messaging.`;
    }

    if (type === "PDF") return `${title} downloadable document sample from the DigitalEduPro portfolio.`;
    if (type === "Video") return `${title} video sample from the DigitalEduPro portfolio.`;
    if (type === "Email") return `${title} email sample from the DigitalEduPro portfolio.`;
    return `${title} ${type.toLowerCase()} sample from the DigitalEduPro portfolio.`;
  }

  function posterNameFromVideo(name) {
    const slug = titleFromName(name)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${slug || "video-sample"}-${extensionOf(name) || "video"}.jpg`;
  }

  function makeFiles(base, names) {
    return names.map((name) => {
      const type = typeFromName(name);
      const path = `${base}/${name}`;
      const title = titleFromName(name);
      const details = portfolioFileDetails[path] || {};
      const file = {
        title,
        path,
        type,
        isImage: imageExtensions.has(extensionOf(name)),
        description: details.description || defaultDescription(path, title, type),
      };

      if (details.thumbnail) {
        file.thumbnail = details.thumbnail;
      }

      if (type === "Video") {
        file.poster = `site-assets/video-thumbs/${posterNameFromVideo(name)}`;
      }

      return file;
    });
  }

  const serviceVisuals = makeFiles("DigitalEduPro_Profile/Services", [
    "1_DigitalEduPro-Virtual-Operations-Support-and-Services.png",
    "2_Running-a-Business-Is-a-Lot-to-Handle.png",
    "3_What-We-Do.png",
    "4_More-Ways-We-Support-You.png",
    "5_Stop-Guessing-Start-Knowing.png",
    "6_Work-Smarter-Not-Harder.png",
    "7_Why-Choose-DigitalEduPro.png",
    "8_Built-on-Values-That-Drive-Real-Results.png",
    "9_Our-Mission-and-Vision.png",
    "10_Lets-Grow-Together.png",
  ]);

  const portfolioGroups = [
    {
      title: "Website Funnel & Strategy",
      summary: "A strategy-first funnel sample designed to guide visitors from discovery to action.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Website_FunnelSample", [
        "Strategy.png",
      ]),
    },
    {
      title: "Client Support",
      summary: "Client support, tracking, automation, SEO, and organized operations samples.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/ClientSupport", [
        "ClientSupport.png",
        "Excel_Tracking.png",
        "File Organization.png",
        "Omnisend.png",
        "SemRush_SEO.png",
        "Slack.png",
        "Sling.png",
        "Wix_Automation.png",
      ]),
    },
    {
      title: "School System Project",
      summary: "Dashboard, reporting, login, ICT, teacher, and division system screens.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/SchoolSystem_Project", [
        "Dashboard.png",
        "Division_Dashboard.png",
        "ICT_1.png",
        "ICT_2.png",
        "Teacher_Dashboard.png",
        "User_Login.png",
        "NK Reporting System Flow.pdf",
      ]),
    },
    {
      title: "Layout & Design Samples",
      summary: "Print, poster, automation, rack card, guide, and promotional layout work.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Layout Samples", [
        "Automation_Release_of_Liability_and_Indemnity Agreement.png",
        "Back.png",
        "Birthday_Planner_guide.png",
        "Coke_Layout.png",
        "Front.png",
        "Google_SketchUp.png",
        "Quantum Quest Poster A 11x17.jpg",
        "Quantum Quest Poster B 11x17.jpg",
        "Rack_Card_Back.png",
        "Rack_Card_Front.png",
        "ReviewUs_Poster (1).png",
        "SUMMER CAMP 26 poster-4 (1).png",
        "Sample Design.pdf",
      ]),
    },
    {
      title: "School Camp Website Media",
      summary: "A complete media set prepared for school camp website and promotion pages.",
      files: [
        ...makeFiles("DigitalEduPro_Profile/Portfolio/Layout Samples", [
          "school year camps-4.png",
          "school year camps-8.png",
          "school year camps-10.png",
          "school year camps-12.png",
          "school year camps-14 (1).png",
        ]),
        ...makeFiles(
          "DigitalEduPro_Profile/Portfolio/Layout Samples/SchoolCampWebsite_Media",
          ["4.png", "5.png", "7.png", "13.png", "14.png", "15.png", "16.png"]
        ),
      ],
    },
    {
      title: "Books Project",
      summary: "Children's book, computational thinking, nursery, camp, and story design assets.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Books_Project", [
        "ComputationalThinkingSkill.jpg",
        "NurseryEssentials.jpg",
        "RiseAndBoss.png",
        "WhereDidBunnyGo.png",
        "WhereDidBunnyGo_1.png",
        "TommyTheTinyTornado_1.png",
        "CT_Sample1.png",
        "CT_Sample2.png",
        "CT_Sample3.png",
        "CT_Sample4.png",
        "5.jpg",
        "6.jpg",
        "Screenshot 2569-04-16 at 10.14.17 PM.png",
        "index.html",
      ]),
    },
    {
      title: "Seminars Conducted",
      summary: "DigitalEduPro learning series and training materials for Canva and Google Workspace.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Seminars_Conducted", [
        "Canva_Website_Free_Training.png",
        "DigitalEduPro Learning Series (2).png",
        "GoogleWorkSpace_FreeTraining.jpeg",
        "Training_Google1.png",
      ]),
    },
    {
      title: "Other Work Samples",
      summary: "Additional social, visual, screenshot, and campaign samples from past work.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Other Work Samples", [
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
        "7.jpg",
        "8.jpg",
        "9.jpg",
        "10.jpg",
        "11.jpg",
        "12.jpg",
        "Screenshot 2026-02-01 at 5.58.26 AM.jpg",
        "Screenshot 2026-02-01 at 5.58.52 AM.jpg",
        "Screenshot 2026-02-01 at 5.58.55 AM.jpg",
        "Screenshot 2026-02-01 at 5.58.59 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.03 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.09 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.14 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.17 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.22 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.25 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.30 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.34 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.37 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.39 AM.jpg",
        "Screenshot 2026-02-01 at 5.59.55 AM.jpg",
        "Screenshot 2026-02-01 at 6.00.03 AM.jpg",
        "Screenshot 2026-02-01 at 6.00.07 AM.jpg",
        "Screenshot 2026-02-04 at 2.06.44 PM.jpg",
      ]),
    },
    {
      title: "Video Samples",
      summary: "Campaign videos, camp promotions, ads, teasers, reels, and content samples.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Video_Samples", [
        "Adriell_Promotion.mp4",
        "Afterschool_Teaser.mp4",
        "Alameda Video Teaser.mp4",
        "Best in Alameda!.mp4",
        "Books, Inc., Island Savoy, Ruby's.mp4",
        "Calling all young scientists! 🧪.mp4",
        "Carousel.mp4",
        "Instgram_Post.mp4",
        "Junior Chef Academy .mp4",
        "Mobile_Spring_Spectacular_Camp_Ads.mp4",
        "Nursery Essentials Book1 Ads.mp4",
        "Potion Camp Video Teaser.mp4",
        "Social Media VKC Camps 2026.mp4",
        "Space_Robots_Laser_Camp.mp4",
        "Spring_Spectacular_Camp.mp4",
        "Summer Lunch Party.mp4",
        "TheArcOfLearning.mp4",
        "Thrill Builders Camp.mp4",
        "VKC_REVIEWS.mp4",
        "VKC_SpringSpectacularCamp_Instagram.mp4",
        "Village Kids Club Where Young Chefs Shine! 👨_🍳.mp4",
        "Where did bunny go ads.mp4",
      ]),
    },
    {
      title: "Newsletters & Email Samples",
      summary: "Newsletter, email, and direct communication examples.",
      files: makeFiles("DigitalEduPro_Profile/Portfolio/Newsletters_Samples", [
        "The Village Alliance Mail - 🎉 Your Tuesday Yoga at VKC is Coming Up!.pdf",
        "🌸 Spring Camp Starts Monday! Don’t Miss the Fun + Photo Moment.eml",
      ]),
    },
  ];

  const tools = makeFiles("DigitalEduPro_Profile/Tools/Operations Application Logo", [
    "AdobeExpress.webp",
    "Canva.webp",
    "Capcut.svg",
    "Claude.webp",
    "Gamma.webp",
    "Gemini.png",
    "GoogleAnalytics.webp",
    "GoogleWorkspace.jpg",
    "Hubspot.jpg",
    "Loom.png",
    "Mac.png",
    "Meta.png",
    "Microsoft.svg.png",
    "Notion.png",
    "Omnisend.webp",
    "PowerBI.png",
    "Python.png",
    "SketchUp.png",
    "Slack.png",
    "SquareSpace.png",
    "Trello.png",
    "Wave.png",
    "Wox.png",
    "Zapier.png",
    "chatgpt.jpg",
    "codex.png",
    "sling.png",
  ]);

  const sammyCertificates = makeFiles("DigitalEduPro_Profile/Team/VA_Sammy/Sammy_Certificates", [
    "Buray, Samuel Jr., P..pdf",
    "Canva_Certificates.pdf",
    "Cert97312228167_MCE.pdf",
    "CertificateOfPassing_LPT.jpg",
    "Certificate_for_Introduction_to_Technology_for_Teaching_and_Learning_(March_2026)-CA_154437.pdf",
    "Certificate_for_Practical_Home_Behavior_Management_for_Children_with_Special_Needs_(February_2026)-CA_146624.pdf",
    "Certificate_of_Completion_DIGITAL_LITERACY 2.pdf",
    "Digital License.png",
    "Digital Literacy Content.pdf",
    "ECE_CANADA_LEVEL 1_Certificate.pdf",
    "Empowering the New Generation of Teachers.jpg",
    "Gemini_Certified_Educator.pdf",
    "Google Certified Educator Level 2 • Samuel Jr. Buray • Google for Education.html",
    "Google_Certified_Educator_Lvl1.pdf",
    "Google_Certified_Educator_Lvl2.pdf",
    "Google_Level2.jpg",
    "Kasetsart_Training.jpg",
    "MCE_Score.pdf",
    "NC2.jpg",
    "NDBD.JPEG",
    "Robotics_VexIQ_Certificate.pdf",
    "TEFL.pdf",
    "TEYL.pdf",
    "Unesco_2026.pdf",
    "education-2030 UNESCO-06 Certificate _ UNESCO Open Learning.pdf",
  ]);

  window.DIGITAL_EDU_PRO_DATA = {
    services: [
      {
        title: "Data Analysis",
        icon: "data",
        copy:
          "Turn your data into meaningful insights. Understand what's working, what needs improvement, and where opportunities lie.",
      },
      {
        title: "Social Media Support",
        icon: "social",
        copy:
          "Show up consistently and professionally online. From content planning to engagement and brand growth.",
      },
      {
        title: "Sales & Marketing Support",
        icon: "marketing",
        copy:
          "Support your sales efforts through lead generation, campaign assistance, and customer outreach.",
      },
      {
        title: "Website Funnel & Design",
        icon: "funnel",
        copy:
          "Design and optimize funnels and pages that guide visitors smoothly into becoming loyal customers.",
      },
      {
        title: "Client Support",
        icon: "support",
        copy:
          "Care for your clients as if they were our own. Create positive, lasting relationships that build trust.",
      },
      {
        title: "Video & Photo Editing",
        icon: "media",
        copy:
          "Bring your ideas to life visually. Create polished, engaging content that reflects your business identity.",
      },
      {
        title: "AI Solutions",
        icon: "ai",
        copy:
          "Embrace the future of work. Integrate AI tools to improve efficiency, creativity, and productivity.",
      },
      {
        title: "Systems Development & Automation",
        icon: "automation",
        copy:
          "Simplify your processes by building smart systems and automating repetitive tasks.",
      },
      {
        title: "Administrative Support",
        icon: "admin",
        copy:
          "Handle the details so you can focus on the bigger picture. Keep your daily operations running seamlessly.",
      },
      {
        title: "Human Resource Management",
        icon: "hr",
        copy:
          "Support your HR needs from recruitment and onboarding to employee coordination.",
      },
    ],
    serviceVisuals,
    portfolio: [
      {
        category: "Website Funnel & Strategy",
        title: "Funnel Strategy Map",
        copy:
          "A structured website funnel plan designed to guide visitors from awareness to action.",
        image: "DigitalEduPro_Profile/Portfolio/Website_FunnelSample/Strategy.png",
        alt: "Website funnel strategy sample",
      },
      {
        category: "Client Support",
        title: "Support Workflow & Tracking",
        copy:
          "Organized support materials and tracking systems for clearer communication and follow-through.",
        image: "DigitalEduPro_Profile/Portfolio/ClientSupport/ClientSupport.png",
        alt: "Client support workflow sample",
      },
      {
        category: "Systems Development",
        title: "School System Project",
        copy:
          "Dashboard, reporting, ICT, teacher, and division screens for a school operations platform.",
        image: "DigitalEduPro_Profile/Portfolio/SchoolSystem_Project/Dashboard.png",
        alt: "School system dashboard sample",
      },
      {
        category: "Design & Layout",
        title: "Campaign Layout Samples",
        copy:
          "Print-ready and digital design samples for campaigns, guides, rack cards, posters, and events.",
        image: "DigitalEduPro_Profile/Portfolio/Layout Samples/Rack_Card_Front.png",
        alt: "Rack card front design sample",
      },
      {
        category: "Books & Learning Materials",
        title: "Books Project",
        copy:
          "Children's books, computational thinking materials, nursery assets, and camp learning designs.",
        image: "DigitalEduPro_Profile/Portfolio/Books_Project/ComputationalThinkingSkill.jpg",
        alt: "Computational thinking book sample",
      },
      {
        category: "Training & Seminars",
        title: "DigitalEduPro Learning Series",
        copy:
          "Training and seminar materials for Google Workspace, Canva, website learning, and digital support.",
        image: "DigitalEduPro_Profile/Portfolio/Seminars_Conducted/DigitalEduPro Learning Series (2).png",
        alt: "DigitalEduPro learning series seminar sample",
      },
    ],
    portfolioGroups,
    tools,
    team: [
      {
        name: "Kimmy",
        role: "System Operations and Admin Support",
        copy:
          "Streamlining operations and managing administrative tasks to keep your business running smoothly.",
        achievements: [
          "Operations support and daily admin coordination",
          "Organized client and team documentation",
          "Reliable workflow tracking and follow-through",
        ],
        image: "DigitalEduPro_Profile/Team/VA_Kimmy/Kimmy .png",
        alt: "Kimmy portrait",
        profile: "https://www.linkedin.com/in/kim-buray/",
        email: "kimmy.buray0110@gmail.com",
        resources: makeFiles("DigitalEduPro_Profile/Team/VA_Kimmy/Kimmy_Portfolio", [
          "Kim Buray_OperationSupport_CV copy.pdf",
          "TSIS.pdf",
        ]),
      },
      {
        name: "Sammy",
        role: "Design Sales and Marketing Support",
        copy:
          "Driving growth through creative design solutions and strategic marketing initiatives.",
        achievements: [
          "Creative design and marketing campaign support",
          "Certified educator and digital content specialist",
          "Systems, automation, and client-facing portfolio work",
        ],
        image: "DigitalEduPro_Profile/Team/VA_Sammy/Sammy.png",
        alt: "Sammy portrait",
        profile: "https://www.linkedin.com/in/teacherwellth/",
        email: "samvirtualops@gmail.com",
        resources: [
          ...makeFiles("DigitalEduPro_Profile/Team/VA_Sammy/About_Sammy", [
            "Samuel_Buray_CV_2026.pdf",
            "SamuelJr_Pana_Buray_CV.pdf",
          ]),
          ...sammyCertificates,
        ],
      },
      {
        name: "Nezzy",
        role: "Creative Virtual Assistant and Support",
        copy:
          "Providing versatile creative support and virtual assistance to enhance your business operations.",
        achievements: [
          "Creative virtual assistance for business operations",
          "Client support and communication coordination",
          "Flexible support for design and admin workflows",
        ],
        image: "DigitalEduPro_Profile/Team/VA_Nezzy/Nezzy.png",
        alt: "Nezzy portrait",
        profile: "https://www.linkedin.com/in/nezza-buray-1a6089351/",
        email: "buray.nezza@gmail.com",
        resources: [],
      },
      {
        name: "Maddy",
        role: "SMM Support",
        copy:
          "Supporting social media planning, posting, and day-to-day platform consistency for growing brands.",
        achievements: [
          "Social media posting and scheduling support",
          "Content coordination for brand consistency",
          "Platform assistance for day-to-day engagement",
        ],
        image: "DigitalEduPro_Profile/Team/VA_Maddy/Maddy_Photo.jpg",
        alt: "Maddy portrait",
        resources: [],
      },
      {
        name: "Keissy",
        role: "Creative Support",
        copy:
          "Providing creative production support across visual content, layouts, and campaign materials.",
        achievements: [
          "Creative asset preparation and design support",
          "Layout assistance for promotional materials",
          "Visual production support across campaigns",
        ],
        image: "DigitalEduPro_Profile/Team/VA_Keissy/Keissy_Photo.jpg",
        alt: "Keissy portrait",
        resources: [],
      },
    ],
    contactReasons: [
      "Quick response within 24 hours",
      "Free initial consultation",
      "Flexible engagement models",
      "Transparent pricing",
      "Dedicated account manager",
    ],
  };
})();
