export const timezoneMap = {
  // Major cities
  'new york': 'America/New_York',
  'nyc': 'America/New_York',
  'london': 'Europe/London',
  'tokyo': 'Asia/Tokyo',
  'paris': 'Europe/Paris',
  'berlin': 'Europe/Berlin',
  'sydney': 'Australia/Sydney',
  'los angeles': 'America/Los_Angeles',
  'la': 'America/Los_Angeles',
  'chicago': 'America/Chicago',
  'toronto': 'America/Toronto',
  'vancouver': 'America/Vancouver',
  'miami': 'America/New_York',
  'san francisco': 'America/Los_Angeles',
  'sf': 'America/Los_Angeles',
  'seattle': 'America/Los_Angeles',
  'denver': 'America/Denver',
  'phoenix': 'America/Phoenix',
  'dallas': 'America/Chicago',
  'houston': 'America/Chicago',
  'atlanta': 'America/New_York',
  'boston': 'America/New_York',
  'philadelphia': 'America/New_York',
  'washington': 'America/New_York',
  'dc': 'America/New_York',
  
  // Countries
  'usa': 'America/New_York',
  'united states': 'America/New_York',
  'uk': 'Europe/London',
  'united kingdom': 'Europe/London',
  'england': 'Europe/London',
  'france': 'Europe/Paris',
  'germany': 'Europe/Berlin',
  'japan': 'Asia/Tokyo',
  'australia': 'Australia/Sydney',
  'canada': 'America/Toronto',
  'india': 'Asia/Kolkata',
  'china': 'Asia/Shanghai',
  'south korea': 'Asia/Seoul',
  'singapore': 'Asia/Singapore',
  'hong kong': 'Asia/Hong_Kong',
  'thailand': 'Asia/Bangkok',
  'italy': 'Europe/Rome',
  'spain': 'Europe/Madrid',
  'netherlands': 'Europe/Amsterdam',
  'switzerland': 'Europe/Zurich',
  'sweden': 'Europe/Stockholm',
  'norway': 'Europe/Oslo',
  'denmark': 'Europe/Copenhagen',
  'finland': 'Europe/Helsinki',
  'russia': 'Europe/Moscow',
  'brazil': 'America/Sao_Paulo',
  'mexico': 'America/Mexico_City',
  'argentina': 'America/Argentina/Buenos_Aires',
  'chile': 'America/Santiago',
  'south africa': 'Africa/Johannesburg',
  'egypt': 'Africa/Cairo',
  'israel': 'Asia/Jerusalem',
  'uae': 'Asia/Dubai',
  'saudi arabia': 'Asia/Riyadh',
  
  // More cities
  'madrid': 'Europe/Madrid',
  'rome': 'Europe/Rome',
  'amsterdam': 'Europe/Amsterdam',
  'zurich': 'Europe/Zurich',
  'stockholm': 'Europe/Stockholm',
  'oslo': 'Europe/Oslo',
  'copenhagen': 'Europe/Copenhagen',
  'helsinki': 'Europe/Helsinki',
  'moscow': 'Europe/Moscow',
  'istanbul': 'Europe/Istanbul',
  'dubai': 'Asia/Dubai',
  'mumbai': 'Asia/Kolkata',
  'delhi': 'Asia/Kolkata',
  'bangalore': 'Asia/Kolkata',
  'bengaluru': 'Asia/Kolkata',
  'shanghai': 'Asia/Shanghai',
  'beijing': 'Asia/Shanghai',
  'seoul': 'Asia/Seoul',
  'manila': 'Asia/Manila',
  'jakarta': 'Asia/Jakarta',
  'bangkok': 'Asia/Bangkok',
  'kuala lumpur': 'Asia/Kuala_Lumpur',
  'melbourne': 'Australia/Melbourne',
  'perth': 'Australia/Perth',
  'auckland': 'Pacific/Auckland',
  'wellington': 'Pacific/Auckland',
  'sao paulo': 'America/Sao_Paulo',
  'rio de janeiro': 'America/Sao_Paulo',
  'mexico city': 'America/Mexico_City',
  'buenos aires': 'America/Argentina/Buenos_Aires',
  'santiago': 'America/Santiago',
  'lima': 'America/Lima',
  'bogota': 'America/Bogota',
  'caracas': 'America/Caracas',
  'johannesburg': 'Africa/Johannesburg',
  'cape town': 'Africa/Johannesburg',
  'cairo': 'Africa/Cairo',
  'lagos': 'Africa/Lagos',
  'nairobi': 'Africa/Nairobi'
}

export function calculateMeetingTimes(locations) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  const overlaps = []
  const suggestions = []

  // Calculate for today and next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today)
    currentDate.setDate(today.getDate() + day)
    
    const dayOverlaps = findDayOverlap(locations, currentDate)
    if (dayOverlaps.length > 0) {
      overlaps.push({
        date: currentDate,
        slots: dayOverlaps
      })
      
      // Generate suggestions for this day
      const daySuggestions = generateSuggestions(locations, currentDate, dayOverlaps)
      suggestions.push(...daySuggestions)
    }
  }

  return {
    locations,
    overlaps,
    suggestions: suggestions.slice(0, 5) // Limit total suggestions
  }
}

function findDayOverlap(locations, date) {
  const overlaps = []
  
  // Check each hour from 0 to 23
  for (let hour = 0; hour < 24; hour++) {
    const testTime = new Date(date)
    testTime.setHours(hour, 0, 0, 0)
    
    let allAvailable = true
    const localTimes = []
    
    for (let location of locations) {
      const localTime = new Date(testTime.toLocaleString('en-US', { timeZone: location.timezone }))
      const localHour = localTime.getHours()
      
      localTimes.push({
        location: location.name,
        time: localTime,
        hour: localHour
      })
      
      // Check if this hour is within 9 AM - 8 PM (20:00) for this location
      if (localHour < 9 || localHour >= 20) {
        allAvailable = false
        break
      }
    }
    
    if (allAvailable) {
      overlaps.push({
        utcTime: testTime,
        localTimes: localTimes
      })
    }
  }
  
  return overlaps
}

function generateSuggestions(locations, date, overlaps) {
  if (overlaps.length === 0) return []
  
  const suggestions = []
  const preferredHours = [9, 10, 11, 14, 15, 16] // 9-11 AM and 2-4 PM are typically good
  
  // Find overlaps that align with preferred hours in any timezone
  for (let overlap of overlaps) {
    for (let localTime of overlap.localTimes) {
      if (preferredHours.includes(localTime.hour)) {
        suggestions.push({
          date: date,
          utcTime: overlap.utcTime,
          localTimes: overlap.localTimes,
          reason: `Good time for ${localTime.location} (${localTime.hour}:00)`
        })
        break
      }
    }
  }
  
  // If no preferred times found, suggest the middle of the overlap period
  if (suggestions.length === 0 && overlaps.length > 0) {
    const middleIndex = Math.floor(overlaps.length / 2)
    suggestions.push({
      date: date,
      utcTime: overlaps[middleIndex].utcTime,
      localTimes: overlaps[middleIndex].localTimes,
      reason: 'Balanced time for all participants'
    })
  }
  
  return suggestions.slice(0, 2) // Limit to 2 suggestions per day
} 