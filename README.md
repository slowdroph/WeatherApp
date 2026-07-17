# WeatherApp

A modern, full-page weather dashboard built with React, TypeScript, and Tailwind CSS. Search any city to see real-time weather conditions, hourly and 3-day forecasts, air quality data, sun & moon info, and weather alerts.

## Features

- **Real-time weather** — temperature, feels like, humidity, wind, UV index, visibility, pressure, cloud cover
- **Hourly forecast** — next 12 hours with weather icons and temperatures
- **3-day forecast** — daily high/low with temperature range bars
- **Air quality** — US EPA index + PM2.5, PM10, O₃, NO₂, SO₂, CO pollutant levels
- **Sun & Moon** — sunrise/sunset times, moon phase, moon illumination
- **Weather alerts** — government-issued alerts with severity indicators
- **Geolocation** — auto-detects your location on first load
- **Search autocomplete** — debounced city suggestions as you type
- **Unit toggle** — switch between metric (°C/km/h) and imperial (°F/mph) with localStorage persistence
- **Responsive design** — works on mobile, tablet, and desktop
- **Dark gradient theme** — time-of-day adaptive background (blue day / indigo night)
- **Frosted glass UI** — modern glassmorphism card design
- **Error boundary** — graceful crash recovery

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| Build | Vite 8 |
| Linter | Oxlint |
| API | [WeatherAPI](https://www.weatherapi.com/) |

## Getting Started

### Prerequisites

- Node.js 18+
- A free API key from [weatherapi.com](https://www.weatherapi.com/)

### Installation

```bash
git clone <your-repo-url>
cd WeatherApp
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Dashboard, SearchBar
│   ├── weather/         # Hero, Hourly, Daily, Details, SunMoon, AirQuality, Alerts
│   └── ui/              # GlassCard, StatPill, Skeleton, Spinner
├── hooks/               # useWeather, useAstronomy, useAutocomplete, useGeolocation, useSettings
├── types/               # TypeScript interfaces for WeatherAPI responses
└── utils/               # formatHelpers, getWeatherIcon
```

## API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/v1/forecast.json` | Current weather + 3-day forecast + hourly data + AQI + alerts |
| `/v1/astronomy.json` | Sunrise/sunset and moon data |
| `/v1/search.json` | City name autocomplete |

## License

MIT
