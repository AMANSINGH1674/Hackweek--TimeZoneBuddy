import React, { useState } from 'react'
import { Globe, Clock, Users, Plus, X } from 'lucide-react'
import TimezoneInput from './components/TimezoneInput'
import ResultsDisplay from './components/ResultsDisplay'
import { timezoneMap, calculateMeetingTimes } from './utils/timezoneUtils'

function App() {
  const [locations, setLocations] = useState([
    { id: 1, value: '', error: '' },
    { id: 2, value: '', error: '' }
  ])
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const addLocation = () => {
    const newId = Math.max(...locations.map(l => l.id)) + 1
    setLocations([...locations, { id: newId, value: '', error: '' }])
  }

  const removeLocation = (id) => {
    if (locations.length > 2) {
      setLocations(locations.filter(l => l.id !== id))
    }
  }

  const updateLocation = (id, value) => {
    setLocations(locations.map(l => 
      l.id === id ? { ...l, value, error: '' } : l
    ))
  }

  const validateAndFindTimes = async () => {
    setIsLoading(true)
    
    // Validate inputs
    const validatedLocations = locations.map(location => {
      const value = location.value.trim()
      if (!value) {
        return { ...location, error: 'Please enter a location' }
      }
      
      const timezone = timezoneMap[value.toLowerCase()]
      if (!timezone) {
        return { 
          ...location, 
          error: `"${value}" not recognized. Try cities like "New York", "London", "Tokyo"` 
        }
      }
      
      return { ...location, error: '', timezone, name: value }
    })

    const hasErrors = validatedLocations.some(l => l.error)
    const validLocations = validatedLocations.filter(l => !l.error && l.value.trim())

    if (hasErrors) {
      setLocations(validatedLocations)
      setIsLoading(false)
      return
    }

    if (validLocations.length < 2) {
      setIsLoading(false)
      return
    }

    // Calculate meeting times
    try {
      const meetingTimes = calculateMeetingTimes(validLocations)
      setResults(meetingTimes)
    } catch (error) {
      console.error('Error calculating meeting times:', error)
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-10 h-10 text-white" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              TimeZoneBuddy
            </h1>
          </div>
          <p className="text-white/80 text-lg">
            Find the perfect meeting time across different time zones
          </p>
        </div>

        {/* Input Section */}
        <div className="card p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Add Locations
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            {locations.map((location) => (
              <TimezoneInput
                key={location.id}
                location={location}
                onUpdate={updateLocation}
                onRemove={removeLocation}
                canRemove={locations.length > 2}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addLocation}
              className="btn btn-secondary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Location
            </button>
            <button
              onClick={validateAndFindTimes}
              disabled={isLoading}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Clock className="w-4 h-4" />
              {isLoading ? 'Finding Times...' : 'Find Meeting Times'}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && <ResultsDisplay results={results} />}
      </div>
    </div>
  )
}

export default App 