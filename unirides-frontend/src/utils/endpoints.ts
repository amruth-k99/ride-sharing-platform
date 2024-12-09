/* eslint-disable @typescript-eslint/ban-ts-comment */
export const ENDPOINT = "http://localhost:8000/";

export const ENDPOINTS = {
    login: ENDPOINT + "api/login",
    register: ENDPOINT + "api/register",
    logout: ENDPOINT + "api/logout",
    user: ENDPOINT + "api/user",
    rides: ENDPOINT + "api/rides",
    ride: ENDPOINT + "api/ride",
    users: ENDPOINT + "api/users",
    user_profile: ENDPOINT + "api/user_profile",
    provider_profile: ENDPOINT + "api/provider_profile",
    location: ENDPOINT + "api/location",
    vehicles: ENDPOINT + "api/vehicles",
    vehicle: ENDPOINT + "api/vehicle",
    vehicle_types: ENDPOINT + "api/vehicle_types",
    vehicle_type: ENDPOINT + "api/vehicle_type",
};

export const postRequest = async (url: string, method: string, data: unknown) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });
        return response.json();

    } catch (error: unknown) {
        console.error(error);
        return null;
    }
};

