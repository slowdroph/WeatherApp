const conditionIconMap: Record<number, string> = {
  1000: "/icons/sun.png",
  1003: "/icons/cloudly.png",
  1006: "/icons/overcast.png",
  1009: "/icons/overcast.png",
  1030: "/icons/overcast.png",
  1063: "/icons/overcast.png",
  1066: "/icons/overcast.png",
  1069: "/icons/overcast.png",
  1072: "/icons/overcast.png",
  1087: "/icons/overcast.png",
  1114: "/icons/overcast.png",
  1117: "/icons/overcast.png",
  1135: "/icons/overcast.png",
  1147: "/icons/overcast.png",
  1183: "/icons/overcast.png",
  1186: "/icons/overcast.png",
  1189: "/icons/overcast.png",
  1192: "/icons/overcast.png",
  1195: "/icons/overcast.png",
  1210: "/icons/overcast.png",
  1213: "/icons/overcast.png",
  1216: "/icons/overcast.png",
  1219: "/icons/overcast.png",
  1222: "/icons/overcast.png",
  1225: "/icons/overcast.png",
  1240: "/icons/overcast.png",
  1243: "/icons/overcast.png",
  1246: "/icons/overcast.png",
  1249: "/icons/overcast.png",
  1252: "/icons/overcast.png",
  1255: "/icons/overcast.png",
  1258: "/icons/overcast.png",
  1261: "/icons/overcast.png",
  1264: "/icons/overcast.png",
  1273: "/icons/overcast.png",
  1276: "/icons/overcast.png",
  1279: "/icons/overcast.png",
  1282: "/icons/overcast.png",
}

const clearNightCodes = new Set([1000])

export function getWeatherIcon(code: number, text: string, isDay: boolean): string {
  if (clearNightCodes.has(code) && !isDay && text.toLowerCase() === "clear") {
    return "/icons/night.png"
  }

  return conditionIconMap[code] ?? "/icons/sun.png"
}
