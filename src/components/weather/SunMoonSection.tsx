import type { ForecastDay } from "../../types/weather";
import GlassCard from "../ui/GlassCard";

interface SunMoonSectionProps {
    query: string;
    astro?: ForecastDay["astro"];
}

export default function SunMoonSection({ astro }: SunMoonSectionProps) {
    if (!astro) return null;

    return (
        <GlassCard>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Sun & Moon
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-white/40">Sunrise</p>
                        <p className="text-lg font-semibold">{astro.sunrise}</p>
                    </div>
                    <div>
                        <p className="text-xs text-white/40">Sunset</p>
                        <p className="text-lg font-semibold">{astro.sunset}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-white/40">Moon Phase</p>
                        <p className="text-sm font-medium">
                            {astro.moon_phase}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white/40">Illumination</p>
                        <p className="text-lg font-semibold">
                            {Math.round(astro.moon_illumination)}%
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-white/40">Moonrise</p>
                        <p className="text-sm font-medium">{astro.moonrise}</p>
                    </div>
                </div>
            </div>
        </GlassCard>
    );
}
