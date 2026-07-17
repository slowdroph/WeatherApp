import { useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { useSettings } from "./hooks/useSettings";
import { useGeolocation } from "./hooks/useGeolocation";
import { getBackgroundGradient } from "./utils/formatHelpers";
import Header from "./components/layout/Header";
import Dashboard from "./components/layout/Dashboard";
import HeroSection from "./components/weather/HeroSection";
import HourlyForecast from "./components/weather/HourlyForecast";
import DailyForecast from "./components/weather/DailyForecast";
import WeatherDetails from "./components/weather/WeatherDetails";
import SunMoonSection from "./components/weather/SunMoonSection";
import AirQuality from "./components/weather/AirQuality";
import WeatherAlerts from "./components/weather/WeatherAlerts";
import Spinner from "./components/ui/Spinner";
import Skeleton from "./components/ui/Skeleton";

export default function App() {
    const { data, loading, error, searchWeather } = useWeather();
    const { unit, toggleUnit } = useSettings();
    const geo = useGeolocation();

    useEffect(() => {
        if (geo.lat !== null && geo.lon !== null && !data && !loading) {
            searchWeather(`${geo.lat},${geo.lon}`);
        }
    }, [geo.lat, geo.lon, data, loading, searchWeather]);

    const isDay = data ? data.current.is_day === 1 : true;
    const gradient = getBackgroundGradient(isDay);

    return (
        <div
            className={`min-h-screen bg-linear-to-br ${gradient} transition-colors duration-1000`}
        >
            <Header
                unit={unit}
                onToggleUnit={toggleUnit}
                onSearch={searchWeather}
                loading={loading}
                cityName={data?.location.name}
                country={data?.location.country}
            />

            {error && (
                <div className="mx-auto max-w-2xl px-4 sm:px-6">
                    <div
                        role="alert"
                        className="rounded-xl border border-red-500/30 bg-red-500/15 px-4 py-3 text-sm text-red-300"
                    >
                        {error}
                    </div>
                </div>
            )}

            {loading && !data && (
                <Dashboard>
                    <Skeleton />
                </Dashboard>
            )}

            {loading && data && (
                <Dashboard>
                    <Spinner />
                </Dashboard>
            )}

            {!data && !loading && !error && !geo.loading && (
                <Dashboard>
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                            <svg
                                className="h-8 w-8 text-white/40"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-white/60">
                            Search for a city
                        </p>
                        <p className="mt-1 text-sm text-white/30">
                            Type a city name to see the weather
                        </p>
                    </div>
                </Dashboard>
            )}

            {geo.loading && !data && !loading && (
                <Dashboard>
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Spinner />
                        <p className="mt-4 text-sm text-white/40">
                            Detecting your location...
                        </p>
                    </div>
                </Dashboard>
            )}

            {data && !loading && (
                <Dashboard>
                    <HeroSection data={data} unit={unit} />
                    <HourlyForecast
                        hours={data.forecast.forecastday[0]?.hour ?? []}
                        unit={unit}
                    />
                    <DailyForecast
                        forecast={data.forecast.forecastday}
                        unit={unit}
                    />
                    <WeatherDetails data={data} unit={unit} />
                    <SunMoonSection
                        query={`${data.location.lat},${data.location.lon}`}
                        astro={data.forecast.forecastday[0]?.astro}
                    />
                    {data.current.air_quality && (
                        <AirQuality airQuality={data.current.air_quality} />
                    )}
                    {data.alerts && data.alerts.alert.length > 0 && (
                        <WeatherAlerts alerts={data.alerts.alert} />
                    )}
                </Dashboard>
            )}
        </div>
    );
}
