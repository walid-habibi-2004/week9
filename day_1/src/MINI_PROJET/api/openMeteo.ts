export type GeocodeCity = {
  id: number
  name: string
  latitude: number
  longitude: number
  country?: string
  admin1?: string
}

type GeocodeResponse = {
  results?: GeocodeCity[]
}

export type CurrentWeather = {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  is_day: number
  time: string
}

type ForecastResponse = {
  current_weather: CurrentWeather
}

export async function searchCities(query: string): Promise<GeocodeCity[]> {
  const q = query.trim()
  if (!q) return []

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', q)
  url.searchParams.set('count', '10')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('City search failed')
  const data: GeocodeResponse = await res.json()
  return data.results ?? []
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('current_weather', 'true')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Weather request failed')
  const data: ForecastResponse = await res.json()
  return data.current_weather
}

/** WMO code interpretation (Open-Meteo). */
export function describeWeatherCode(code: number): string {
  const codes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
  }
  return codes[code] ?? 'Weather'
}
