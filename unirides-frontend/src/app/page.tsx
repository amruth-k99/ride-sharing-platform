"use client";
import Image from "next/image";
import Dropdown, { LocationProp } from "./components/dropdown";
import React from "react";

const locationList = [
  {
    city: "New York City",
    state: "NY",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    city: "Los Angeles",
    state: "CA",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    city: "Chicago",
    state: "IL",
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    city: "Houston",
    state: "TX",
    latitude: 29.7604,
    longitude: -95.3698,
  },
  {
    city: "Phoenix",
    state: "AZ",
    latitude: 33.4484,
    longitude: -112.074,
  },
  {
    city: "Philadelphia",
    state: "PA",
    latitude: 39.9526,
    longitude: -75.1652,
  },
  {
    city: "San Antonio",
    state: "TX",
    latitude: 29.4241,
    longitude: -98.4936,
  },
  {
    city: "San Diego",
    state: "CA",
    latitude: 32.7157,
    longitude: -117.1611,
  },
  {
    city: "Dallas",
    state: "TX",
    latitude: 32.7767,
    longitude: -96.797,
  },
  {
    city: "Denver",
    state: "CO",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    city: "Seattle",
    state: "WA",
    latitude: 47.6062,
    longitude: -122.3321,
  },
  {
    city: "Miami",
    state: "FL",
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    city: "Washington, D.C.",
    state: "",
    latitude: 38.9072,
    longitude: -77.0369,
  },
  {
    city: "Boston",
    state: "MA",
    latitude: 42.3601,
    longitude: -71.0589,
  },
  {
    city: "Atlanta",
    state: "GA",
    latitude: 33.749,
    longitude: -84.388,
  },
];

const vehicleList = ["Bike", "Sedan", "SUV", "Truck"];

export default function Home() {
  const [from, setFrom] = React.useState<LocationProp | null>(null);
  const [to, setTo] = React.useState<LocationProp | null>(null);
  const [selectedVehicle, setSelectedVehicle] = React.useState<string | null>(
    null
  );
  const [priceResponse, setPriceResponse] = React.useState<number | null>(null);

  const estimatePrice = () => {
    if (from && to && selectedVehicle) {
      setPriceResponse(20);
    } else {
      setPriceResponse(null);
    }
  };

  return (
    <section className="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
      <div className="absolute inset-0">
        <Image
          className="object-cover h-[1200px] w-[100vw]"
          width={1200}
          height={1200}
          src="/bg.jpg"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gray-900/20 sm:bg-gray-900/25 h-[1200px]"></div>

      <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white rounded-md shadow-md h-[70vh]">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-black"> UniRides</span> - Ride Sharing for
                Students
              </h2>
            </div>

            <div className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="From"
                    className="text-base font-medium text-gray-900"
                  >
                    From
                  </label>
                  <div className="mt-2.5 w-full">
                    <Dropdown
                      onChange={(value) => {
                        setFrom(value);
                      }}
                      value={from ? from?.city + ", " + from?.state : null}
                      type="Select a Location"
                      list={locationList.map((location) => {
                        return {
                          value: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            city: location.city,
                            state: location.state,
                          },
                          label: `${location.city}, ${location.state}`,
                        };
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="To"
                    className="text-base font-medium text-gray-900"
                  >
                    To
                  </label>
                  <div className="mt-2.5 w-full">
                    <Dropdown
                      onChange={(value) => {
                        setTo(value);
                      }}
                      value={to ? to?.city + ", " + to?.state : null}
                      type="Select a Location"
                      list={locationList.map((location) => {
                        return {
                          value: {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            city: location.city,
                            state: location.state,
                          },
                          label: `${location.city}, ${location.state}`,
                        };
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="To"
                    className="text-base font-medium text-gray-900"
                  >
                    Select A Vehicle
                  </label>
                  <div className="mt-2.5 w-full">
                    <Dropdown
                      onChange={(value: unknown) => {
                        setSelectedVehicle(value);
                      }}
                      value={selectedVehicle}
                      type="Select a Vehicle Type"
                      list={vehicleList.map((location) => {
                        return {
                          value: location,
                          label: location,
                        };
                      })}
                    />
                  </div>
                </div>

                {/* Estimated price */}

                {priceResponse && (
                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">
                      Estimated Price
                    </p>
                    <p className="text-base font-bold text-red-600">
                      ${priceResponse}
                    </p>
                  </div>
                )}

                <div>
                  <button
                    onClick={estimatePrice}
                    className="inline-flex items-center mt-5 justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                  >
                    Book Ride
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
