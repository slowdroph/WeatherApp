export interface WeatherCondition {
  text: string
  icon: string
  code: number
}

export interface HourlyForecast {
  time: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: WeatherCondition
  wind_kph: number
  wind_mph: number
  wind_degree: number
  wind_dir: string
  humidity: number
  feelslike_c: number
  feelslike_f: number
  uv: number
  vis_km: number
  pressure_mb: number
  cloud: number
  chance_of_rain: number
  chance_of_snow: number
  precip_mm: number
  gust_kph: number
}

export interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    maxtemp_f: number
    mintemp_c: number
    mintemp_f: number
    avgtemp_c: number
    avgtemp_f: number
    condition: WeatherCondition
    maxwind_kph: number
    maxwind_mph: number
    avghumidity: number
    daily_chance_of_rain: number
    daily_chance_of_snow: number
    uv: number
    totalprecip_mm: number
  }
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
    is_moon_up: number
    is_sun_up: number
  }
  hour: HourlyForecast[]
}

export interface AirQuality {
  co: number
  o3: number
  no2: number
  so2: number
  pm2_5: number
  pm10: number
  "us-epa-index": number
  "gb-defra-index": number
}

export interface WeatherAlert {
  headline: string
  severity: string
  urgency: string
  event: string
  desc: string
  instruction: string
  effective: string
  expires: string
}

export interface WeatherApiResponse {
  location: {
    name: string
    region: string
    country: string
    localtime: string
    localtime_epoch: number
    lat: number
    lon: number
    tz_id: string
  }
  current: {
    temp_c: number
    temp_f: number
    feelslike_c: number
    feelslike_f: number
    humidity: number
    wind_kph: number
    wind_mph: number
    wind_degree: number
    wind_dir: string
    is_day: number
    pressure_mb: number
    uv: number
    vis_km: number
    cloud: number
    gust_kph: number
    precip_mm: number
    condition: WeatherCondition
    air_quality?: AirQuality
  }
  forecast: {
    forecastday: ForecastDay[]
  }
  alerts?: {
    alert: WeatherAlert[]
  }
}

export interface AstronomyResponse {
  location: {
    name: string
    country: string
  }
  astronomy: {
    astro: {
      sunrise: string
      sunset: string
      moonrise: string
      moonset: string
      moon_phase: string
      moon_illumination: number
      is_moon_up: number
      is_sun_up: number
    }
  }
}

export interface WeatherState {
  data: WeatherApiResponse | null
  loading: boolean
  error: string | null
}

export interface UseWeatherReturn extends WeatherState {
  searchWeather: (city: string) => Promise<void>
}
