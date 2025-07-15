"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

const parks = [
  { name: "Akatsuka Park", coords: [35.7836, 139.6586] },
  { name: "Aoyama Park", coords: [35.6697, 139.7191] },
  { name: "Ueno Park", coords: [35.7148, 139.7745] },
  { name: "Ukima Park", coords: [35.7793, 139.6989] },
  { name: "Ogunohara Park", coords: [35.7588, 139.7826] },
  { name: "Ojima Komatsugawa Park", coords: [35.6837, 139.8496] },
  { name: "Oizumi-Chuo Park", coords: [35.7506, 139.5946] },
  { name: "Kasai Rinkai Park", coords: [35.6394, 139.8607] },
  { name: "Kameido-Chuo Park", coords: [35.689, 139.8288] },
  { name: "Kinuta Park", coords: [35.6383, 139.6253] },
  { name: "Kiba Park", coords: [35.6782, 139.8075] },
  { name: "Koishikawa Korakuen Gardens", coords: [35.7073, 139.7515] },
  { name: "Komazawa Olympic Park", coords: [35.6268, 139.6619] },
  { name: "Sarue Park", coords: [35.6842, 139.8157] },
  { name: "Shioiri Park", coords: [35.7413, 139.797] },
  { name: "Johoku-Chuo Park", coords: [35.7645, 139.6869] },
  { name: "Shakujii Park", coords: [35.7442, 139.606] },
  { name: "Shiba Park", coords: [35.6564, 139.7497] },
  { name: "Shinozaki Park", coords: [35.7111, 139.9024] },
  { name: "Soshigaya Park", coords: [35.6529, 139.6091] },
  { name: "Tokyo Rinkai Disaster Prevention Park", coords: [35.6295, 139.7973] },
  { name: "Toneri Park", coords: [35.7997, 139.7705] },
  { name: "Toyama Park", coords: [35.7133, 139.7042] },
  { name: "Higashi-Shirahige Park", coords: [35.7216, 139.8143] },
  { name: "Higashi-Ayase Park", coords: [35.7761, 139.8297] },
  { name: "Hikarigaoka Park", coords: [35.7622, 139.625] },
  { name: "Mizumoto Park", coords: [35.7845, 139.8579] },
  { name: "Meiji Park", coords: [35.6724, 139.7086] },
  { name: "Yokoamicho Park", coords: [35.6978, 139.7962] },
  { name: "Yoyogi Park", coords: [35.6726, 139.6949] },
  { name: "Rikugien Gardens", coords: [35.7326, 139.7461] },
  { name: "Rinshinomori Park", coords: [35.626, 139.7003] },
  { name: "Wadabori Park", coords: [35.6916, 139.6364] },
  { name: "Zenpukuji Park", coords: [35.6936, 139.6351] },
  { name: "Akirudai Park", coords: [35.7245, 139.2872] },
  { name: "Inokashira Park", coords: [35.7013, 139.5768] },
  { name: "Komiya Park", coords: [35.6685, 139.3322] },
  { name: "Koganei Park", coords: [35.7082, 139.5131] },
  { name: "Sakuragaoka Park", coords: [35.6374, 139.4372] },
  { name: "Sayama Park", coords: [35.7804, 139.4328] },
  { name: "Jindai Botanical Gardens", coords: [35.6677, 139.536] },
  { name: "Nogawa Park", coords: [35.6774, 139.5239] },
  { name: "Hachikokuyama Park", coords: [35.7599, 139.4704] },
  { name: "Higashi-Fushimi Park", coords: [35.7311, 139.5729] },
  { name: "Higashimurayama-Chuo Park", coords: [35.7549, 139.4685] },
  { name: "Higashiyamato-Minami Park", coords: [35.7444, 139.4302] },
  { name: "Fuchunomori Park", coords: [35.6702, 139.4773] },
  { name: "Musashikokubunji Park", coords: [35.7011, 139.4718] },
  { name: "Musashino Park", coords: [35.6895, 139.5136] },
  { name: "Musashino-no-mori Park", coords: [35.6717, 139.5229] },
  { name: "Musashino-Chuo Park", coords: [35.7107, 139.5599] },
  { name: "Ryonan Park", coords: [35.6918, 139.438] },
  { name: "Rokusen Park", coords: [35.726, 139.4685] },
  { name: "Tama Park", coords: [35.6586, 139.475] },
  { name: "Tama Zoological Park", coords: [35.651, 139.4755] },
]

const MapComponent = forwardRef((props, ref) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const routingControlRef = useRef<any>(null)
  const userMarkerRef = useRef<L.CircleMarker | null>(null)

  useImperativeHandle(ref, () => ({
    flyToLocation: (lat: number, lon: number, name: string) => {
      if (mapRef.current) {
        mapRef.current.flyTo([lat, lon], 15)

        // Add a temporary marker for the searched location
        const searchMarker = L.marker([lat, lon])
          .addTo(mapRef.current)
          .bindPopup(`<b>${name}</b><br/>Searched Location`)
          .openPopup()

        // Remove the marker after 10 seconds
        setTimeout(() => {
          if (mapRef.current && searchMarker) {
            mapRef.current.removeLayer(searchMarker)
          }
        }, 10000)
      }
    },
  }))

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([35.6895, 139.6917], 11)
    mapRef.current = map

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    // Create custom icon for emergency centers
    const emergencyIcon = L.divIcon({
      html: `<div style="background-color: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: "custom-div-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    // Add park markers
    parks.forEach((park) => {
      const marker = L.marker([park.coords[0], park.coords[1]], { icon: emergencyIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align: center; padding: 5px;">
            <b>${park.name}</b><br/>
            <small>Emergency Recovery Center</small><br/>
            <button onclick="getDirections(${park.coords[0]}, ${park.coords[1]})" 
                    style="margin-top: 5px; padding: 4px 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Get Directions
            </button>
          </div>
        `)

      // Add click event for routing
      marker.on("click", () => {
        if (userMarkerRef.current && routingControlRef.current) {
          map.removeControl(routingControlRef.current)
        }

        if (userMarkerRef.current) {
          createRoute(userMarkerRef.current.getLatLng(), L.latLng(park.coords[0], park.coords[1]))
        }
      })
    })

    // Get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude

          const userMarker = L.circleMarker([lat, lon], {
            radius: 10,
            color: "#ef4444",
            fillColor: "#dc2626",
            fillOpacity: 0.8,
            weight: 3,
          })
            .addTo(map)
            .bindPopup("<b>Your Current Location</b>")

          userMarkerRef.current = userMarker
          map.setView([lat, lon], 13)
        },
        (error) => {
          console.warn("Geolocation failed: ", error.message)
        },
      )
    }

    // Function to create route
    const createRoute = (start: L.LatLng, end: L.LatLng) => {
      // Remove existing route
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current)
      }

      // For now, we'll create a simple line between points instead of routing
      // This avoids the module loading issue
      const routeLine = L.polyline([start, end], {
        color: "#3b82f6",
        weight: 4,
        opacity: 0.8,
        dashArray: "10, 10",
      }).addTo(map)

      // Store reference for cleanup
      routingControlRef.current = routeLine

      // Fit map to show both points
      map.fitBounds([start, end], { padding: [20, 20] })
    }

    // Make getDirections function globally available
    ;(window as any).getDirections = (lat: number, lon: number) => {
      if (userMarkerRef.current) {
        createRoute(userMarkerRef.current.getLatLng(), L.latLng(lat, lon))
      }
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return <div ref={mapContainerRef} className="w-full h-full" />
})

MapComponent.displayName = "MapComponent"

export default MapComponent
