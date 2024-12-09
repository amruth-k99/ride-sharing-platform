"use client";
import Image from "next/image";
import Dropdown, { LocationProp } from "./components/dropdown";
import React from "react";
import { ENDPOINT, postRequest } from "@/utils/endpoints";

const locationList = [
  {
    city: "Hartford",
    state: "CT",
    latitude: 41.7658,
    longitude: -72.6734,
  },
  {
    city: "New Haven",
    state: "CT",
    latitude: 41.3083,
    longitude: -72.9279,
  },
  {
    city: "Stamford",
    state: "CT",
    latitude: 41.0534,
    longitude: -73.5387,
  },
  {
    city: "Bridgeport",
    state: "CT",
    latitude: 41.1792,
    longitude: -73.1894,
  },
  {
    city: "Waterbury",
    state: "CT",
    latitude: 41.5582,
    longitude: -73.0515,
  },
  {
    city: "Norwalk",
    state: "CT",
    latitude: 41.1177,
    longitude: -73.4082,
  },
  {
    city: "Danbury",
    state: "CT",
    latitude: 41.3948,
    longitude: -73.454,
  },
  {
    city: "New Britain",
    state: "CT",
    latitude: 41.6612,
    longitude: -72.7795,
  },
  {
    city: "Meriden",
    state: "CT",
    latitude: 41.5382,
    longitude: -72.807,
  },
  {
    city: "Bristol",
    state: "CT",
    latitude: 41.6718,
    longitude: -72.9493,
  },
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const [priceResponse, setPriceResponse] = React.useState<number | null>(null);
  const [rideCreateResponse, setRideCreateResponse] = React.useState<
    unknown | null
  >(null);

  const estimatePrice = async () => {
    setLoading(true);
    if (from && to && selectedVehicle) {
      const response = await postRequest(ENDPOINT + "rides/estimate/", "POST", {
        source_latitude: from.latitude,
        source_longitude: from.longitude,
        destination_latitude: to.latitude,
        destination_longitude: to.longitude,
        vehicle_type: selectedVehicle.toLowerCase(),
      });
      console.log(response);
      if (response) {
        setPriceResponse(response);
      }
    } else {
      setPriceResponse(null);
    }
    setLoading(false);
  };

  const createRide = async () => {
    setRideCreateResponse(null);
    setLoading(true);
    if (from && to && selectedVehicle) {
      const response = await postRequest(ENDPOINT + "rides/create/", "POST", {
        source_latitude: from.latitude,
        source_longitude: from.longitude,
        destination_latitude: to.latitude,
        destination_longitude: to.longitude,
        vehicle_type: selectedVehicle.toLowerCase(),
        source_address: from.city + ", " + from.state,
        destination_address: to.city + ", " + to.state,
        user_profile_id: 1,
      });
      console.log(response);
      if (response) {
        setRideCreateResponse(response);
      }
    } else {
      setPriceResponse(null);
    }
    setLoading(false);
  };

  const _renderButton = () => {
    if (loading) {
      return (
        <button
          disabled
          className="inline-flex items-center mt-5 justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-gray-400 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
        >
          Loading...
        </button>
      );
    }

    if (rideCreateResponse?.id) {
      return (
        <button
          disabled
          className="inline-flex items-center mt-5 justify-center disabled:cursor-not-allowed w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
        >
          Ride Created. Please wait for the driver to accept the ride. (RideID:{" "}
          {rideCreateResponse?.id})
        </button>
      );
    }

    if (from && to && selectedVehicle && priceResponse) {
      return (
        <button
          onClick={createRide}
          className="inline-flex items-center mt-5 justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
        >
          Create Ride
        </button>
      );
    }

    if (from && to && selectedVehicle) {
      return (
        <button
          onClick={estimatePrice}
          className="inline-flex items-center mt-5 justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
        >
          Check Price
        </button>
      );
    }

    return (
      <button
        disabled
        className="inline-flex items-center mt-5 justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-gray-400 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
      >
        Book Ride
      </button>
    );
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
        <div className="overflow-hidden bg-white rounded-md shadow-md min-h-[80vh] h-full">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-black"> UniRides</span> - Ride Sharing for
                Students
              </h2>

              <p className="mt-1 text-base font-medium text-gray-600">
                Hello Amruth, select a from and to location to book a ride. We
                will give you an estimated price for the ride. If you are happy,
                you can book the ride.
              </p>
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
                  <div className="flex justify-start">
                    <p className="text-base font-medium text-gray-900">
                      Estimated Fare Price for the Ride:{" "}
                    </p>
                    <p className="text-base font-bold text-red-600 ml-2">
                      {" "}
                      $
                      {priceResponse &&
                        Math.round(priceResponse?.fares?.total_fare)}
                    </p>
                  </div>
                )}

                <div
                  className={`${
                    !priceResponse ? "hidden" : "flex"
                  } justify-start`}
                >
                  <p className="text-base font-medium text-gray-900">
                    Estimated Time for the Ride:
                  </p>
                  <p className="text-base font-bold text-red-600 ml-2">
                    {" "}
                    {priceResponse?.duration?.toFixed(2)} minutes
                  </p>
                </div>

                <div
                  className={`${
                    !priceResponse ? "hidden" : "flex"
                  } justify-start`}
                >
                  <p className="text-base font-medium text-gray-900">
                    Estimated Distance for the Ride:
                  </p>
                  <p className="text-base font-bold text-red-600 ml-2">
                    {" "}
                    {priceResponse?.distance?.toFixed(2)} km
                  </p>
                </div>

                {_renderButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
