# Gooners Studio

[Gooners Studio Website](https://abc-2-omega.vercel.app/)

Gooners Studio is a fully functional, visually appealing website built for a fictional digital media company. The site showcases the company’s expertise across various services including live streaming, media production, digital marketing, event management, and Esports. The website is designed to provide potential clients with an immersive user experience through a modern, responsive, and interactive interface.

## Technologies Used

- **Next.js** – Provides a powerful React framework with server-side rendering and static site generation.
- **Tailwind CSS** – Enables rapid styling with a utility-first approach, ensuring a clean and modern design.
- **Framer Motion** – Adds smooth animations and interactive transitions to enhance user engagement.
- **Next/Image** – Optimizes image loading for performance and responsiveness.
- **Vercel** – Used for deployment and hosting, ensuring fast and reliable performance.

## Design Decisions and Rationale

- **Monochrome Aesthetic:**  
  The entire website adopts a black and white (monochrome) color scheme to create a high-contrast, minimalist environment. This decision was made to focus user attention on content and visuals without distraction, while also lending a timeless and professional appearance.

- **Responsive and Modular Layout:**  
  Each page (Home, About, Services, Portfolio, Blog, Contact, Join Us, Esports, and specialized pages for Live Streaming, Media Production, Digital Marketing, Event Management) is built with a modular structure. This ensures that the website is fully responsive and provides a consistent user experience across desktops, tablets, and mobile devices.

- **Interactive Elements and Animations:**  
  Utilizing Framer Motion and subtle hover effects, interactive components (such as service cards, testimonial sliders, and step-by-step process visuals) make the interface engaging and intuitive. These animations help guide the user’s journey and improve overall usability.

- **Theme Changer:**  
  A theme toggler is integrated into the website, allowing users to switch between dark mode and light mode. This functionality enhances accessibility and user comfort by providing flexible viewing options.

- **Intuitive Navigation and Content Hierarchy:**  
  The design emphasizes clear navigation with anchor links, a fixed header, and well-defined sections, making it easy for users to find relevant information quickly.

## Known Limitations or Unfinished Features

- **Backend Integration:**  
  The contact forms and job application forms currently do not have full backend integration. They are set up for front-end validation only and will require further development for server-side processing.

- **Dynamic Content Loading:**  
  Some sections such as the Blog and Portfolio currently use static placeholder content. Future updates may include dynamic fetching from a CMS or API for real-time content updates.

- **Advanced Features Pending:**  
  - **AI Chatbot Integration:** An AI-powered chatbot for instant user support is planned but not yet implemented.
  - **Multi-Language Support:** While the design is ready for multi-language integration, localization features are pending.
  - **Esports Live Leaderboard & Player Profiles:** Although the Esports section outlines the structure for events and registrations, the live leaderboard and player profile functionalities are still under development.
  - **Social Media Auto-Posting:** Automated social media posting for new blogs or event updates is a potential future enhancement.

## How to Run the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/gooners-studio.git
   cd gooners-studio
