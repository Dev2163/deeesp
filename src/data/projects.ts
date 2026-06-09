export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  gradient: string;
  liveDemo?: string;
  sourceCode?: string;
  detailedDescription?: string;
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "codit",
    title: "Codit",
    subtitle: "Food & Logistics Delivery Ecosystem",
    description: "High-performance, real-time logistics delivery platform with a cross-platform mobile app and a web-based admin control panel.",
    image: "/images/codit.png",
    technologies: ["React Native", "Expo", "React.js", "TypeScript", "Firebase"],
    category: "Mobile",
    gradient: "from-plasma-500 to-neural-500",
    detailedDescription: "Built a high-performance, real-time logistics delivery platform featuring a cross-platform mobile application for food ordering and parcel delivery alongside a web-based admin control panel. Integrated Expo Router for file-based routing navigation, LiveKit SDK for dynamic driver communication and Webhooks to handle real-time automated delivery status events. Developed a multi-layer data access architecture — Bloom Filters for membership pre-checks for hot state caching and Firebase for persistence — drastically reducing latency and database bottlenecks.",
    features: [
      "Cross-platform mobile app for food and parcel delivery",
      "Web-based admin control panel",
      "Real-time automated delivery status events via Webhooks",
      "Dynamic driver communication with LiveKit SDK",
      "Multi-layer data access architecture with Bloom Filters"
    ]
  },
  {
    id: "whowear",
    title: "WhoWear",
    subtitle: "Clothing Website",
    description: "An e-commerce fashion site showcasing dynamic product displays, category filters, and secure checkout.",
    image: "/images/whowear.png",
    technologies: ["React", "Node.js", "MongoDB"],
    category: "Web",
    gradient: "from-neural-500 to-quantum-500",
    liveDemo: "#",
    sourceCode: "https://github.com/Dev2163/whowear",
    detailedDescription: "WhoWear is a modern e-commerce platform designed for the fashion industry. It offers a seamless shopping experience with dynamic product displays, intuitive category filters, and a secure checkout process. The backend is powered by Node.js and MongoDB, ensuring scalable and fast performance.",
    features: [
      "Dynamic product catalog with filtering",
      "User authentication and profile management",
      "Secure checkout integration",
      "Responsive design for mobile and desktop"
    ]
  },
  {
    id: "ds-car-show",
    title: "DS Car Show",
    subtitle: "Automotive Platform",
    description: "A platform for showcasing latest and upcoming cars with detailed specifications and comparisons.",
    image: "/images/carshow.png",
    technologies: ["Django", "SQLite", "Bootstrap"],
    category: "Web",
    gradient: "from-quantum-500 to-photon-500",
    liveDemo: "#",
    sourceCode: "https://github.com/Dev2163/car_shows",
    detailedDescription: "DS Car Show is an automotive platform that allows users to explore the latest and upcoming cars. It provides detailed specifications, high-quality images, and comparison tools to help users make informed decisions.",
    features: [
      "Comprehensive car database",
      "Detailed specifications and galleries",
      "Advanced search and filtering",
      "Admin panel for managing cars"
    ]
  },
  {
    id: "finance-tracker",
    title: "Finance Tracker",
    subtitle: "Expense Management",
    description: "A comprehensive finance and expense tracking web app with analytics and insights.",
    image: "/images/finance.png",
    technologies: ["MERN Stack"],
    category: "Web",
    gradient: "from-photon-500 to-plasma-500",
    liveDemo: "#",
    sourceCode: "#",
    detailedDescription: "Finance Tracker is a comprehensive tool to help you manage your personal finances. It allows you to track expenses, set budgets, and gain insights into your spending habits through detailed analytics and charts.",
    features: [
      "Expense and income tracking",
      "Budget management",
      "Visual analytics and charts",
      "Data export options"
    ]
  },
  {
    id: "ev-app",
    title: "EV App",
    subtitle: "Charging Stations",
    description: "Real-time charging stations locator with availability tracking and booking system.",
    image: "/images/ev.png",
    technologies: ["Kotlin", "Firebase"],
    category: "Mobile",
    gradient: "from-plasma-500 to-neural-500",
    sourceCode: "https://github.com/Dev2163/ev_app",
    liveDemo: "https://drive.google.com/drive/folders/1u3ZGEb1pPxRWUq2C6MJIl6vvqAqCLlYU?usp=drive_link",
    detailedDescription: "EV App is a mobile application designed for electric vehicle owners. It helps users locate nearby charging stations, check their real-time availability, and even book a slot in advance. Built with Kotlin and Firebase, it provides a smooth and reliable experience.",
    features: [
      "Real-time charging station locator",
      "Availability tracking",
      "Slot booking system",
      "User reviews and ratings"
    ]
  },
  {
    id: "grocery-purchase",
    title: "Grocery Purchase",
    subtitle: "Billing System",
    description: "Bill generation, export PDF, and inventory management for grocery stores.",
    image: "/images/grocery.png",
    technologies: ["Flutter", "SQLite"],
    category: "Mobile",
    gradient: "from-neural-500 to-photon-500",
    sourceCode: "https://github.com/Dev2163/grocery_purchase",
    liveDemo: "https://drive.google.com/drive/folders/1u3ZGEb1pPxRWUq2C6MJIl6vvqAqCLlYU?usp=drive_link",
    detailedDescription: "A comprehensive billing and inventory management solution for grocery stores. It simplifies the checkout process, tracks inventory levels, and generates professional PDF bills.",
    features: [
      "Quick bill generation",
      "PDF export for invoices",
      "Inventory tracking",
      "Offline support with SQLite"
    ]
  },
  {
    id: "sundarkand-booking",
    title: "Sundarkand Booking",
    subtitle: "Event Management",
    description: "Booking system with WhatsApp reminders and automated notifications.",
    image: "/images/sunderkand.png",
    technologies: ["Flutter", "SQLite"],
    category: "Mobile",
    gradient: "from-quantum-500 to-plasma-500",
    sourceCode: "https://github.com/Dev2163/sundarkand_booking",
    detailedDescription: "An event management app tailored for Sundarkand bookings. It streamlines the booking process and keeps attendees informed with automated WhatsApp reminders and notifications.",
    features: [
      "Easy event booking",
      "Automated WhatsApp reminders",
      "Attendee management",
      "Customizable notification templates"
    ]
  },
  {
    id: "fixsnap",
    title: "Fixsnap",
    subtitle: "Home Service Platform",
    description: "Complete home service booking app and website with real-time tracking.",
    image: "/images/fixsnap.png",
    technologies: ["Flutter", "MongoDB", "Node.js", "Express.js"],
    category: "Mobile",
    gradient: "from-photon-500 to-quantum-500",
    sourceCode: "https://github.com/Dev2163/fixsnap",
    liveDemo: "#",
    detailedDescription: "Fixsnap is a comprehensive platform for booking home services. Whether you need a plumber, electrician, or cleaner, Fixsnap connects you with verified professionals. It features real-time tracking of service providers and secure payments.",
    features: [
      "Wide range of home services",
      "Verified service providers",
      "Real-time tracking",
      "Secure payment integration"
    ]
  },
  {
    id: "over-expense",
    title: "Over Expence",
    subtitle: "Budget Tracker",
    description: "Personal expense tracker with budget planning and spending insights.",
    image: "/images/tracker.png",
    technologies: ["Flutter", "SQLite"],
    category: "Mobile",
    gradient: "from-plasma-500 to-photon-500",
    sourceCode: "https://github.com/Dev2163/over-Expence",
    liveDemo: "https://drive.google.com/drive/folders/1axyuP37mHb9MPyZ71A4h4xONKQVBGv61?usp=drive_link",
    detailedDescription: "Over Expense is a personal finance app that helps you stay on top of your budget. It provides detailed insights into your spending habits and helps you plan your budget effectively.",
    features: [
      "Intuitive expense logging",
      "Custom budget planning",
      "Detailed spending insights",
      "Data backup and restore"
    ]
  },
  {
    id: "portfolio",
    title: "Portfolio",
    subtitle: "Portfolio Website",
    description: "A portfolio website showcasing my skills and projects.",
    image: "/images/portfolio.png",
    technologies: ["React", "Node.js"],
    category: "Web",
    gradient: "from-quantum-500 to-plasma-500",
    sourceCode: "https://github.com/Dev2163/devpot",
    liveDemo: "https://devpot.vercel.app/",
    detailedDescription: "My personal portfolio website, designed to showcase my skills, projects, and professional journey. It features a modern, responsive design with smooth animations and interactive elements.",
    features: [
      "Responsive and modern design",
      "Project showcase with detailed views",
      "Interactive timeline and about section",
      "Contact form integration"
    ]
  }
];
