"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { ENDPOINT, postRequest } from "@/utils/endpoints";
import Dropdown from "../components/dropdown";

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
  const [requests, setRequests] = React.useState<any[] | null>([]);
  const [rideCreateResponse, setRideCreateResponse] = React.useState<
    unknown | null
  >(null);

  const timerRef = React.useRef<number | null>(null);

  useEffect(() => {
    const getRides = async () => {
      const response = await fetch(ENDPOINT + "rides/requests/").then((res) =>
        res.json()
      );
      console.log("response", response);
      if (response) {
        setRequests(response.data);
      }
    };

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      getRides();
    }, 3000);

    getRides();
  }, []);

  const acceptRide = async (ride_id: number) => {
    setRideCreateResponse(null);
    setLoading(true);
    const response = await postRequest(
      ENDPOINT + "rides/accept-ride/",
      "POST",
      {
        ride_id,
        provider_id: 1,
      }
    );
    console.log(response);
    if (response) {
      setRideCreateResponse(response);
      alert("The ride has been accepted");
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
          src="/provider.jpg"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gray-900/20 sm:bg-gray-900/25 h-[1200px]"></div>

      <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white rounded-md shadow-md min-h-[80vh] h-full">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                <span className="text-black"> UniRides</span> - Drivers
              </h2>

              <p className="mt-1 text-base font-medium text-gray-600">
                Hello Sravan, when the rides are available, you can select a
                ride of your choice to continue.
              </p>
            </div>

            <div className="mt-8">
              <div className="space-y-5">
                {requests?.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex justify-between my-auto pb-3"
                  >
                    <div className="w-full text-black my-auto">
                      <div className="text-xs">Ride: {ride.id}</div>
                      <div className="w-full text-black my-auto">
                        {ride.source_location?.address} to{" "}
                        {ride.destination_location?.address} -
                        <span className="font-bold">
                          {" "}
                          ${ride.estimated_fare}
                        </span>
                      </div>
                    </div>

                    <div className=" my-auto">
                      <button
                        onClick={() => {
                          acceptRide(ride.id);
                        }}
                        className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}

                {requests?.length === 0 && (
                  <div className="w-full text-black my-auto text-center">
                    No rides available at the moment. Please check back later.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
