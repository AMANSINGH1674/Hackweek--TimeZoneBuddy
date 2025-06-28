# TimeZoneBuddy - Vite React App

A modern web application to find optimal meeting times across different time zones.

## Features

- 🌍 **Smart Location Recognition**: Supports major cities and countries
- ⏰ **Business Hours Overlap**: Finds available times (9 AM - 8 PM local)
- 📅 **7-Day Forecast**: Shows time slots for the next week
- 💡 **Smart Recommendations**: Suggests optimal meeting times
- 🎨 **Modern UI**: Built with React + Tailwind CSS
- 📱 **Responsive Design**: Works on all devices

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/timezone-buddy.git
cd timezone-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── TimezoneInput.jsx    # Location input component
│   └── ResultsDisplay.jsx   # Results display component
├── utils/
│   └── timezoneUtils.js     # Timezone calculations
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Tailwind CSS imports
```

## Usage

1. Enter 2 or more locations (cities or countries)
2. Click "Find Meeting Times"
3. View available time slots and recommendations
4. All times shown in each participant's local timezone

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Native Intl API** - Timezone calculations

## Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect Vite and deploy

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/timezone-buddy",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Deploy: `npm run deploy`


##Output
<img width="1800" alt="Screenshot 2025-06-28 at 2 38 47 PM" src="https://github.com/user-attachments/assets/32daccf7-5f6c-44a7-86d9-8449bf5c1adc" />
<img width="1800" alt="Screenshot 2025-06-28 at 2 38 59 PM" src="https://github.com/user-attachments/assets/61f59f0a-6f36-48d3-a31a-596658d0ecdd" />
<img width="1800" alt="Screenshot 2025-06-28 at 2 39 07 PM" src="https://github.com/user-attachments/assets/b504d333-0138-43bd-8ef9-92b685165784" />




## License

MIT License - feel free to use this project for your own purposes. 




