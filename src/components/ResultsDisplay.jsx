import React from 'react'
import { Clock, Calendar, AlertCircle, Lightbulb } from 'lucide-react'

const ResultsDisplay = ({ results }) => {
  const { locations, overlaps, suggestions } = results

  if (overlaps.length === 0) {
    return (
      <div className="card p-6 sm:p-8">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            No Overlapping Time Found
          </h3>
          <p className="text-gray-600 mb-4">
            Unfortunately, there are no time slots where all participants ({locations.map(l => l.name).join(', ')}) 
            are available during business hours (9 AM - 8 PM) in the next 7 days.
          </p>
          <p className="text-gray-500">
            Consider adjusting availability hours or using asynchronous communication methods.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Available Time Slots */}
      <div className="card p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-green-500" />
          <h3 className="text-2xl font-semibold text-gray-800">
            Available Time Slots (Next 7 Days)
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          Time periods when all participants are available (9 AM - 8 PM local time):
        </p>

        <div className="space-y-6">
          {overlaps.map((dayOverlap, dayIndex) => (
            <div key={dayIndex} className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {dayOverlap.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dayOverlap.slots.map((slot, slotIndex) => (
                  <div key={slotIndex} className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="font-semibold text-green-800 mb-2">
                      {slot.utcTime.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        timeZone: 'UTC'
                      })} UTC
                    </div>
                    <div className="space-y-1 text-sm">
                      {slot.localTimes.map((lt, ltIndex) => (
                        <div key={ltIndex} className="text-gray-700">
                          <span className="font-medium">{lt.location}:</span> {' '}
                          {lt.time.toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {suggestions.length > 0 && (
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Recommended Meeting Times
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Here are some optimal time slots based on common preferences:
          </p>

          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">
                    {suggestion.date.toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} - {suggestion.reason}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {suggestion.localTimes.map((lt, ltIndex) => (
                    <div key={ltIndex} className="bg-white rounded-lg p-3 text-center">
                      <div className="font-semibold text-gray-800">{lt.location}</div>
                      <div className="text-lg text-blue-600 font-mono">
                        {lt.time.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultsDisplay 