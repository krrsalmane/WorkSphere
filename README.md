# 🏢 WorkSphere - Employee Floor Plan Manager

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-demo-link.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Room Access Rules](#room-access-rules)
- [Room Capacity Limits](#room-capacity-limits)
- [Project Structure](#project-structure)
- [User Stories](#user-stories)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About The Project

WorkSphere is an innovative web application designed for visual and interactive employee management within workspace environments. The application provides a real-time floor plan interface that allows managers to organize and allocate employees across different zones while respecting role-based access restrictions and capacity limits.

### Project Context

WorkSphere aims to simplify the organization and distribution of employees on a floor plan in real-time, while integrating constraints related to roles and authorized zones. The platform centralizes personnel data management and spatial visualization within a single, intuitive interface.

### Main Objectives

- ✅ Enable adding, viewing, and removing employees directly from a graphical interface representing the premises
- ✅ Ensure compliance with business rules: each employee can only be positioned in zones authorized for their role
- ✅ Enforce capacity limits per zone to maintain realistic workspace organization
- ✅ Provide visual feedback for empty required zones
- ✅ Provide a smooth, intuitive, and responsive user experience accessible from various devices (computer, tablet, smartphone)
- ✅ Centralize personnel data management and spatial visualization within the same platform

## ✨ Key Features

### Employee Management
- **Add New Workers**: Dynamic form with comprehensive employee information
  - Full name, role, email, phone number
  - Photo URL with real-time preview
  - Multiple professional experiences with dynamic form fields
  - Advanced form validation using REGEX patterns:
    - Email format validation
    - Phone number validation (10 digits starting with 05, 06, or 07)
  - Date validation for professional experiences (end date must be >= start date)
  - Dynamic "Add Experience" and "Remove" buttons

### Floor Plan Visualization
- **Interactive 6-Zone Floor Plan**:
  - Conference Room (capacity: 10)
  - Staff Room (capacity: 10)
  - Reception (capacity: 2)
  - Server Room (capacity: 2)
  - Security Room (capacity: 2)
  - Archives (capacity: 1)
- **Visual Feedback**:
  - Empty required zones highlighted in pale red (Conference Room and Staff Room excluded)
  - Employee cards displayed directly on the floor plan
  - Background image for realistic workspace representation

### Role-Based Access Control
- Smart zone assignment based on employee roles
- Automatic filtering of eligible employees per zone
- Visual feedback for restricted zones
- Capacity limits per zone with "Zone is Full!!!" alerts
- Real-time validation of employee placement

### Employee Cards & Profiles
- **Compact Employee Cards** on floor plan with:
  - Employee photo (or default avatar)
  - Full name and role
  - Quick unassign "X" button
- **Detailed Employee Profile Modal** displaying:
  - Large format photo
  - Complete contact information (email, phone)
  - Professional experience history with dates
  - Elegant gray background for experiences
- **Sidebar Employee List** for unassigned staff with:
  - Employee photo, name, and role
  - Delete button (permanent removal)
  - Update button (placeholder for future functionality)
  - "..." button to view details

### Assignment System
- **Smart Assignment Modal**:
  - Displays only eligible employees based on role permissions
  - Shows current zone capacity status
  - Prevents assignment when zone is full
  - Click-to-assign functionality with hover effects
- **Zone "+" Buttons**: Located in each zone for quick employee assignment

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
  - Flexible grid layout (16 columns × 6 rows) for floor plan
  - Responsive sidebar that adapts to screen size
  - Mobile-friendly modals
- **Modern Aesthetics**: 
  - Tailwind CSS utility classes for consistent styling
  - Rounded shapes and smooth shadows
  - Color-coded buttons:
    - Green: Add/Save actions
    - Red: Delete/Remove actions
    - Gray: Cancel/Close actions
  - Font Awesome icons for intuitive interaction
- **Smooth Transitions**: Hover effects and modal animations

## 🏗️ Built With

### Core Technologies
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** - Semantic markup
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **Vanilla JavaScript** - Interactive functionality

### Frameworks & Libraries
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first CSS framework (CDN)
- ![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white) **Font Awesome 6.0** - Icon library

### Data Storage
- **LocalStorage API** - Client-side data persistence with key `'employeeForm'`

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor or IDE (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/worksphere.git
   ```

2. Navigate to the project directory
   ```bash
   cd worksphere
   ```

3. Open the project
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

4. Access the application
   ```
   http://localhost:8000
   ```

### File Structure Requirements

Ensure you have the following files in place:
- `index.html` - Main HTML file
- `js/Worker.js` - Employee management logic
- `js/formValidation.js` - Form validation
- `images/WorkSphere.jpg` - Floor plan background
- `images/manager.png` - Default employee avatar

## 💻 Usage

### Adding a New Employee

1. Click the **"Add New Worker"** button (green button with user icon) in the sidebar
2. Fill in the employee information:
   - **Full Name** (required)
   - **Role** (required) - select from dropdown:
     - Receptionist
     - IT Technician
     - Security Agent
     - Manager
     - Cleaning Staff
     - Others
   - **Email** (required, validated with regex)
   - **Phone** (required, must be 10 digits starting with 05, 06, or 07)
   - **Photo URL** (optional) - displays preview below input
3. Add professional experiences (optional):
   - Click **"Add Experience"** link
   - Enter job title, company, start date, and end date
   - End date must be equal to or after start date
   - Click **"Remove"** to delete an experience entry
4. Click **"Save"** to add the employee
5. Click **"Cancel"** to close without saving

### Assigning Employees to Zones

1. Click the **"+"** button (white circular button) in any zone on the floor plan
2. A modal will open showing:
   - Zone name (e.g., "Server Room")
   - List of eligible employees with photos
   - OR "Zone is Full!!!" if at capacity
   - OR "No eligible employees available" if none match role requirements
3. Click on an employee to assign them to the zone
4. The employee card will appear in the assigned zone
5. The employee will be removed from the sidebar

### Viewing Employee Details

1. Click the **"..."** button on any employee card in the sidebar
2. A modal opens displaying:
   - Large employee photo
   - Full name and role
   - Email and phone number
   - Professional experience history (if any)
3. Click **"Close"** to return to the main view

### Unassigning Employees

1. Locate the employee card in any zone on the floor plan
2. Click the **"×"** (red X button) on the employee card
3. The employee will be:
   - Removed from the zone
   - Returned to the "Unassigned Staff" list in the sidebar
4. The zone background will turn pale red if it's a required zone and now empty

### Deleting Employees

1. Find the employee in the sidebar
2. Click the **"Delete"** button (red border button)
3. The employee will be permanently removed from the system
4. Data is removed from localStorage

### Visual Feedback

- **Empty Required Zones**: Reception, Server Room, Security Room, and Archives display a pale red background when empty
- **Conference Room & Staff Room**: Never highlighted (open to all roles)
- **Zone Capacity**: "Zone is Full!!!" message prevents over-assignment

## 🔐 Room Access Rules

| Room | Allowed Roles | Capacity |
|------|---------------|----------|
| **Reception** | Receptionist, Manager, Cleaning Staff | 2 |
| **Server Room** | IT Technician, Manager, Cleaning Staff | 2 |
| **Security Room** | Security Agent, Manager, Cleaning Staff | 2 |
| **Archives** | Manager only | 1 |
| **Conference Room** | All Roles (Universal Access) | 10 |
| **Staff Room** | All Roles (Universal Access) | 10 |

### Special Rules
- **Managers**: Can access Reception, Server Room, Security Room, Archives, Conference Room, and Staff Room
- **Cleaning Staff**: Can access Reception, Server Room, Security Room, Conference Room, and Staff Room
- **Others**: Can only access Conference Room and Staff Room
- **Role-Specific Access**:
  - Receptionist → Reception, Conference Room, Staff Room
  - IT Technician → Server Room, Conference Room, Staff Room
  - Security Agent → Security Room, Conference Room, Staff Room

## 📊 Room Capacity Limits

The application enforces maximum capacity per zone to maintain realistic workspace distribution:

| Zone | Maximum Capacity | Reasoning |
|------|------------------|-----------|
| **Conference Room** | 10 employees | Large meeting space for team gatherings |
| **Staff Room** | 10 employees | Break area accommodating multiple staff |
| **Reception** | 2 employees | Limited desk space at front desk |
| **Server Room** | 2 employees | Restricted technical area |
| **Security Room** | 2 employees | Monitoring station with limited space |
| **Archives** | 1 employee | Manager-only restricted access |

## 📁 Project Structure

```
worksphere/
│
├── index.html                 # Main HTML file with floor plan structure
├── README.md                  # Project documentation
│
├── js/
│   ├── Worker.js             # Employee management, assignment, and display logic
│   └── formValidation.js     # Form validation, REGEX patterns, and modal controls
│
└── images/
    ├── WorkSphere.jpg        # Floor plan background image
    └── manager.png           # Default employee avatar
```

### Key Components

#### index.html
- Floor plan grid layout (16 columns × 6 rows)
- 6 zone areas with data-zone attributes
- Sidebar with employee list and "Add New Worker" button
- 3 modals:
  - Employee form modal
  - Employee details modal
  - Assignment modal

#### js/Worker.js
- `displayEmployees()` - Renders employees on floor plan and sidebar
- `showEmployeeDetails()` - Opens employee profile modal
- `openAssignModal()` - Shows eligible employees for zone assignment
- `assignEmployee()` - Assigns employee to zone with validation
- `unassignEmployee()` - Removes employee from zone
- `removeEmployee()` - Permanently deletes employee
- `highlightEmptyRequiredZones()` - Visual feedback for empty zones
- `ACCESS_RULES` - Role-based zone permissions
- `ZONE_CAPACITY` - Maximum employees per zone

#### js/formValidation.js
- Form modal open/close controls
- `addExperience()` - Dynamically adds experience fields
- `validateExperienceDates()` - Ensures end date >= start date
- Email REGEX: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- Phone REGEX: `/^(0[567])\d{8}$/`
- Form submission handler with validation
- Photo preview functionality

## 📝 User Stories

### Design & UX
- ✅ As a designer, I will ensure the interface is intuitive and fluid for users
- ✅ As a designer, I will define a coherent color palette and intuitive icons to facilitate navigation
- ✅ As a designer, I will create Desktop and Mobile versions with modern design using Flexbox, Grid, rounded shapes, and colored buttons

### Front-End Development - Core Features
- ✅ As a Front-End developer, I will create the complete HTML structure with a sidebar displaying unassigned employees and an "Add New Worker" button
- ✅ As a Front-End developer, I will code the employee addition modal with all required fields (name, role, email, phone, photo URL)
- ✅ As a Front-End developer, I will implement photo preview in the modal when URL is entered
- ✅ As a Front-End developer, I will validate form information with REGEX (email format and phone number)
- ✅ As a Front-End developer, I will validate that end dates are equal to or after start dates for professional experiences
- ✅ As a Front-End developer, I will display the building floor plan with 6 zones on a grid layout

### Front-End Development - Assignment Logic
- ✅ As a Front-End developer, I will implement logical restrictions for zone access based on employee roles
- ✅ As a Front-End developer, I will integrate a "+" button in each zone to select and assign eligible employees
- ✅ As a Front-End developer, I will add an "X" button on each employee card in zones to unassign them
- ✅ As a Front-End developer, I will add capacity limitations per zone (preventing over-assignment)
- ✅ As a Front-End developer, I will display "Zone is Full!!!" message when capacity is reached

### Front-End Development - Visual Features
- ✅ As a Front-End developer, I will highlight mandatory empty zones in pale red (except Conference Room and Staff Room)
- ✅ As a Front-End developer, I will enable detailed profile viewing by clicking "..." button on employee cards
- ✅ As a Front-End developer, I will ensure responsive interface across all screens with smooth CSS animations
- ✅ As a Front-End developer, I will use Tailwind CSS for consistent, modern styling
- ✅ As a Front-End developer, I will implement hover effects and transitions for better UX

### Data Management
- ✅ As a Front-End developer, I will use LocalStorage to persist employee data across sessions
- ✅ As a Front-End developer, I will implement delete functionality to permanently remove employees
- ✅ As a Front-End developer, I will store employee location assignments in the data structure

### Quality Assurance
- ✅ As a Front-End developer, I will validate HTML and CSS code with W3C Validator
- ✅ As a Front-End developer, I will publish the project on GitHub Pages or Vercel

### Scrum Management
- ✅ As a Scrum Master, I will use Trello/Jira/GitHub Projects to organize User Stories and track progress
- ✅ As a Scrum Master, I will manage Git branches to structure development
- ✅ As a Scrum Master, I will present the final project demonstrating all dynamic features

## 🗺️ Roadmap

### Phase 1: Core Features ✅
- [x] Basic HTML structure with floor plan grid
- [x] Employee form with comprehensive validation
- [x] Floor plan visualization with 6 zones
- [x] Role-based access control with ACCESS_RULES
- [x] LocalStorage data persistence

### Phase 2: Enhanced Features ✅
- [x] Employee profile modal with experience display
- [x] Zone capacity limits with enforcement
- [x] Empty required zones highlighting (pale red)
- [x] Assignment modal with eligible employee filtering
- [x] Unassign and delete functionality
- [x] Responsive design with Tailwind CSS
- [x] Photo preview in form
- [x] Dynamic experience fields

### Phase 3: Future Enhancements 🚧
- [ ] Update employee functionality (currently placeholder)
- [ ] Drag-and-drop functionality for employee cards
- [ ] Search and filter employees by name/role
- [ ] Export floor plan as PDF/image
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme toggle
- [ ] Print-friendly floor plan view
- [ ] Employee statistics dashboard
- [ ] Import employees from CSV/JSON
- [ ] Undo/Redo functionality
- [ ] Activity logs and history

### Phase 4: Backend Integration 🔮
- [ ] Backend API integration
- [ ] Database storage (MySQL/MongoDB)
- [ ] User authentication and authorization
- [ ] Role-based admin panel
- [ ] Real-time collaboration features
- [ ] Email notifications
- [ ] Audit trail and compliance logs

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Test thoroughly before submitting
- Update documentation for new features
- Keep commits focused and descriptive

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/yourusername/worksphere](https://github.com/yourusername/worksphere)

Live Demo: [https://your-demo-link.com](https://your-demo-link.com)

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - For the beautiful icons
- [GitHub Pages](https://pages.github.com/) - For free hosting options
- [MDN Web Docs](https://developer.mozilla.org/) - For comprehensive JavaScript documentation

## 🐛 Known Issues

- Update button in sidebar is currently a placeholder (no functionality)
- Drag-and-drop not yet implemented
- No backend integration (data stored only in browser)

## 📈 Performance Notes

- Application uses LocalStorage for data persistence (size limit: ~5-10MB)
- No external API calls - fully client-side
- Responsive design optimized for mobile, tablet, and desktop
- Lightweight: No heavy frameworks, only Tailwind CSS and Font Awesome CDN

---

<div align="center">
  Made with ❤️ by Salmane Karroum
  <br>
  <sub>© 2024 WorkSphere. All rights reserved.</sub>
</div>
