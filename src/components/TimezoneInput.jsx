import React from 'react'
import { MapPin, X } from 'lucide-react'

const TimezoneInput = ({ location, onUpdate, onRemove, canRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MapPin className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={location.value}
          onChange={(e) => onUpdate(location.id, e.target.value)}
          placeholder="Enter city or country (e.g., New York, London, Tokyo)"
          className={`input-field pl-10 ${location.error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        />
        {location.error && (
          <p className="text-red-500 text-sm mt-1">{location.error}</p>
        )}
      </div>
      
      {canRemove && (
        <button
          onClick={() => onRemove(location.id)}
          className="btn btn-danger px-4 py-3 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Remove</span>
        </button>
      )}
    </div>
  )
}

export default TimezoneInput 