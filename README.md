# Chris Auto Shine

## Overview

Chris Auto Shine is a modern, responsive website built for a professional car detailing and maintenance service. It showcases services, packages, about information, and contact details with a clean, user-friendly interface.

This project is developed using React with Vite for fast builds and Tailwind CSS for styling. It includes interactive components like modals, navigation, and service cards.

## Tech Stack

- **Frontend**: React (18+)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Linting**: ESLint
- **Other**: React Icons (assumed for UI elements)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Danncode10/chrisautoshine_v2.git
   cd chrisautoshine_v2
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Project

- **Development Server**:
  ```
  npm run dev
  ```
  Opens the app at `http://localhost:5173` (or similar port).

- **Build for Production**:
  ```
  npm run build
  ```
  Outputs static files to the `dist` directory.

- **Preview Production Build**:
  ```
  npm run preview
  ```

## Project Structure

- `src/App.jsx`: Main application component.
- `src/components/`: Reusable components:
  - `Hero.jsx`: Landing section.
  - `Services.jsx` & `ServiceCard.jsx`: Service listings.
  - `Packages.jsx` & `PackageCard.jsx`: Pricing packages.
  - `About.jsx`: Company information.
  - `Contact.jsx`: Contact form.
  - `Navbar.jsx`: Navigation bar.
  - `Footer.jsx`: Footer with links.
  - `Modal.jsx`: Popup modals.
- `src/assets/`: Images and static assets.
- `public/`: Public assets like favicon.

## Services Offered

- **Exterior Wash & Wax**
- **Interior Cleaning**
- **Full Detailing Package**
- **Paint Protection**

## Contact

- **Phone**: (555) 123-4567
- **Email**: info@chrisautoshine.com
- **Location**: 123 Auto Lane, Car City, CC 12345

Follow us:
- [Instagram](https://instagram.com/chrisautoshine)
- [Facebook](https://facebook.com/chrisautoshine)

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request for any improvements.

## License

This project is licensed under the MIT License.
