"use client"

import type React from "react"

import { useState, useEffect } from "react"

// Simple icon components
const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SearchIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const MapPinIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const NavigationIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const LoaderIcon = () => (
  <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null)

  const emergencyLinks = [
    {
      title: "Emergency Disaster Relief",
      url: "https://www.jica.go.jp/english/activities/schemes/jdr/index.html",
    },
    {
      title: "Refugee Assistance",
      url: "https://aarjapan.gr.jp/en/what-we-do/refugees/",
    },
    {
      title: "Disaster Preparedness",
      url: "Disaster preparedness.pdf",
    },
    {
      title: "Donations",
      url: "https://pbv.or.jp/en/donate/",
    },
  ]

  const emergencyCenters = [
    {
      id: 1,
      name: "Akatsuka Park Emergency Center",
      coords: [35.7836, 139.6586],
      district: "Itabashi",
      capacity: "500 people",
    },
    {
      id: 2,
      name: "Aoyama Park Emergency Center",
      coords: [35.6697, 139.7191],
      district: "Minato",
      capacity: "300 people",
    },
    {
      id: 3,
      name: "Ueno Park Emergency Center",
      coords: [35.7148, 139.7745],
      district: "Taito",
      capacity: "800 people",
    },
    {
      id: 4,
      name: "Ukima Park Emergency Center",
      coords: [35.7793, 139.6989],
      district: "Kita",
      capacity: "400 people",
    },
    {
      id: 5,
      name: "Kasai Rinkai Park Emergency Center",
      coords: [35.6394, 139.8607],
      district: "Edogawa",
      capacity: "1000 people",
    },
    {
      id: 6,
      name: "Kinuta Park Emergency Center",
      coords: [35.6383, 139.6253],
      district: "Setagaya",
      capacity: "600 people",
    },
    {
      id: 7,
      name: "Komazawa Olympic Park Emergency Center",
      coords: [35.6268, 139.6619],
      district: "Setagaya",
      capacity: "1200 people",
    },
    {
      id: 8,
      name: "Shiba Park Emergency Center",
      coords: [35.6564, 139.7497],
      district: "Minato",
      capacity: "400 people",
    },
    {
      id: 9,
      name: "Tokyo Rinkai Disaster Prevention Park",
      coords: [35.6295, 139.7973],
      district: "Koto",
      capacity: "2000 people",
    },
    {
      id: 10,
      name: "Yoyogi Park Emergency Center",
      coords: [35.6726, 139.6949],
      district: "Shibuya",
      capacity: "900 people",
    },
    {
      id: 11,
      name: "Inokashira Park Emergency Center",
      coords: [35.7013, 139.5768],
      district: "Musashino",
      capacity: "500 people",
    },
    {
      id: 12,
      name: "Koganei Park Emergency Center",
      coords: [35.7082, 139.5131],
      district: "Koganei",
      capacity: "700 people",
    },
  ]

  const filteredCenters = emergencyCenters.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.district.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(1)
  }

  const openInMaps = (center: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.coords[0]},${center.coords[1]}&travelmode=driving`
    window.open(url, "_blank")
  }

  const openLocationInMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    window.open(url, "_blank")
  }

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + " Tokyo Japan")}&limit=8&addressdetails=1`,
      )
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    searchLocation(searchQuery)
  }

  const selectSearchResult = (result: any) => {
    setSelectedSearchResult(result)
    setSearchResults([])
    setSearchQuery(result.display_name.split(",")[0])
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setSelectedSearchResult(null)
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.warn("Geolocation failed: ", error.message)
        },
      )
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-2xl border-b border-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 rounded-xl hover:bg-red-700 transition-all duration-200 hover:scale-105"
              >
                <MenuIcon />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-red-600">
                    <MapPinIcon />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">DISASTER RELIEF</h1>
                  <p className="text-red-200 text-sm sm:text-base font-medium">Emergency Services Tokyo</p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-800 px-4 py-2 rounded-xl shadow-lg">
                <PhoneIcon />
                <span className="text-sm font-bold">Police: 110</span>
              </div>
              <div className="flex items-center space-x-2 bg-red-800 px-4 py-2 rounded-xl shadow-lg">
                <PhoneIcon />
                <span className="text-sm font-bold">Fire: 119</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="absolute left-0 top-0 h-full w-80 bg-gray-900 border-r border-gray-700 shadow-2xl overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Emergency Resources</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <XIcon />
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="mb-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
              <h3 className="font-bold mb-3 text-white">Emergency Numbers</h3>
              <div className="space-y-2 text-sm text-red-100">
                <div className="flex items-center space-x-2">
                  <span>🚔</span>
                  <span>Police: 110</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🚒</span>
                  <span>Fire/Ambulance: 119</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🏥</span>
                  <span>Medical Info: #7119</span>
                </div>
              </div>
            </div>

            <nav className="space-y-3">
              {emergencyLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-200 hover:text-white"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-6 border border-gray-700">
          <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">Tokyo Emergency Centers Map</h2>
            <p className="text-gray-400">Interactive map showing all emergency recovery centers across Tokyo</p>
          </div>
          <div className="h-96 sm:h-[500px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207264.16114639767!2d139.69170757812503!3d35.689506250000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b2423b7e7d1%3A0x46c7c5ac1b5f3bea!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl mb-8">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Search Locations in Tokyo</h3>
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-gray-900 rounded-xl border border-gray-600 p-1">
                  <div className="flex items-center space-x-4 px-6 py-4">
                    <SearchIcon />
                    <input
                      type="text"
                      placeholder="Search any location in Tokyo (e.g., Shibuya Station, Tokyo Tower, Ginza)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                    />
                    {isSearching && <LoaderIcon />}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <XIcon />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-4 bg-gray-900 rounded-xl border border-gray-600 max-h-60 overflow-y-auto">
                <div className="p-3 border-b border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300">Search Results</h4>
                </div>
                {searchResults.map((result: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => selectSearchResult(result)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-800 border-b border-gray-700 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-white text-sm truncate">{result.display_name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {result.type} • {result.addresstype || "Location"}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Search Result */}
            {selectedSearchResult && (
              <div className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">📍 Selected Location</h4>
                    <p className="text-blue-100 text-sm mb-3">{selectedSearchResult.display_name}</p>
                    <div className="flex items-center text-xs text-blue-200 mb-3">
                      <MapPinIcon />
                      <span className="ml-1">
                        Lat: {Number.parseFloat(selectedSearchResult.lat).toFixed(4)}, Lng:{" "}
                        {Number.parseFloat(selectedSearchResult.lon).toFixed(4)}
                      </span>
                    </div>
                    {userLocation && (
                      <div className="flex items-center text-xs text-green-200">
                        <NavigationIcon />
                        <span className="ml-1">
                          Distance:{" "}
                          {calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            Number.parseFloat(selectedSearchResult.lat),
                            Number.parseFloat(selectedSearchResult.lon),
                          )}{" "}
                          km from your location
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      openLocationInMaps(
                        Number.parseFloat(selectedSearchResult.lat),
                        Number.parseFloat(selectedSearchResult.lon),
                      )
                    }
                    className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-gray-400 mt-4 text-sm">
              Press Enter or click Search to find any location in Tokyo • Results appear instantly
            </p>
          </div>
        </div>

        {/* Emergency Centers */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Emergency Recovery Centers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select any emergency center below to get directions and detailed information about capacity and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <div
                key={center.id}
                className="bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{center.name}</h3>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <MapPinIcon />
                        <span className="ml-2">{center.district} District</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <ClockIcon />
                        <span className="ml-2">Capacity: {center.capacity}</span>
                      </div>
                      {userLocation && (
                        <div className="flex items-center text-sm text-green-400">
                          <NavigationIcon />
                          <span className="ml-2">
                            {calculateDistance(userLocation.lat, userLocation.lng, center.coords[0], center.coords[1])}{" "}
                            km away
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">🏥</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => openInMaps(center)}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-sm font-medium shadow-lg"
                    >
                      Get Directions
                    </button>
                    <button
                      onClick={() => setSelectedCenter(center)}
                      className="px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 text-sm font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">National Seismic Hazard Maps for Japan</h2>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
              The National Seismic Hazard Maps for Japan is prepared by a governmental organization, the Headquarters
              for Earthquake Research Promotion (HERP) to estimate strong motions caused by earthquakes that could occur
              in Japan in the future and show the estimated results on the maps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg">
                <div className="text-4xl mb-3">🚨</div>
                <h3 className="font-bold text-white mb-2">Emergency Alert</h3>
                <p className="text-sm text-red-100">Stay informed about disaster warnings and evacuation orders</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="font-bold text-white mb-2">Recovery Centers</h3>
                <p className="text-sm text-blue-100">Safe locations with emergency supplies and medical aid</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg">
                <div className="text-4xl mb-3">📱</div>
                <h3 className="font-bold text-white mb-2">Emergency Contacts</h3>
                <p className="text-sm text-green-100">Quick access to police, fire, and medical emergency services</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-75" onClick={() => setSelectedCenter(null)} />
          <div className="relative bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Center Details</h3>
              <button
                onClick={() => setSelectedCenter(null)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <XIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white text-lg">{selectedCenter.name}</h4>
                <p className="text-gray-400">{selectedCenter.district} District</p>
              </div>

              <div className="flex items-center text-sm text-gray-300">
                <ClockIcon />
                <span className="ml-2">Capacity: {selectedCenter.capacity}</span>
              </div>

              {userLocation && (
                <div className="flex items-center text-sm text-green-400">
                  <NavigationIcon />
                  <span className="ml-2">
                    Distance:{" "}
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      selectedCenter.coords[0],
                      selectedCenter.coords[1],
                    )}{" "}
                    km
                  </span>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => openInMaps(selectedCenter)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg"
                >
                  Get Directions in Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
