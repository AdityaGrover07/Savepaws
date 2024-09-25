import "../styles/Landing.css";
import LoadingCard from "../components/loadingCard";
import React, { useState, useEffect } from "react";
// import NearbyPetsMap from "./Map";
import axios from "axios";
import { API_ROOT } from "../api-config";

export default function Landing() {
  const [tab, setTab] = useState(0);

  const dummyCards = [...Array(3)].map((_, index) => (
    <LoadingCard key={index} />
  ));

  const tabs = [
    { state: 0, value: dummyCards },
    { state: 1, value: dummyCards },
    { state: 2, value: dummyCards },
  ];

  const [userLocation, setUserLocation] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const nearByPets = async () => {
    try {
      const pets = await axios.get(
        `${API_ROOT}/pets?latitude=${userLocation[0]}&longitude=${userLocation[1]}`
      );
      // console.log(pets.data.response);
      setPets(pets.data.response);
    } catch (err) {
      console.log("Something went wrong!!!");
    }
  };

  useEffect(() => {
    nearByPets();
  }, [userLocation]);

  console.log(pets);

  return (
    <div className=" container-fluid ">
      <div className="Landing container-fluid border border-3 border-success shadow-lg my-4 rounded">
        {/* Banner div */}
        <div class="banner-div ps-4">
          <h1>Paws Adoption</h1>
          <h3>Everyone can pass by, but not everyone can stop and help.</h3>
          <h2>Adopt, don't shop.</h2>
          <h3>
            We inspire and enpower communities to make difference in the lives
            of animals. Find your new best friend and give a pet a loving home.
          </h3>
          <a
            href="/home"
            class="btn btn-success btn-lg banner-btn mt-3 text-white"
          >
            Find a buddy
          </a>
        </div>
      </div>
      <div className=" container-fluid content-cards">
        <div className=" d-flex flex justify-content-center container lg:w-50 w-100 rounded py-1 bg-light">
          <button
            onClick={() => setTab(0)}
            class="btn btn-light btn-lg text-black  lg:mx-3 mx-0"
          >
            <b> New Cuties</b>
          </button>
          <button
            onClick={() => setTab(1)}
            class="btn btn-light btn-lg text-black mx-3"
          >
            <b>Urgent Help</b>
          </button>
          <button
            onClick={() => setTab(2)}
            class="btn btn-light btn-lg text-black mx-3"
          >
            <b>Our '23 Goals</b>
          </button>
        </div>
        <div className=" d-flex flex justify-content-center my-5">
          {tabs[tab].value}
        </div>
      </div>

      <div className=" flex container-fluid content-help d-flex w-100 justify-content-between m-0">
        <div className=" help-text">Text</div>
        <div className="help-img rounded"></div>
      </div>
      <br />

      {/* <div>
        {userLocation && pets.length > 0 ? (
          <NearbyPetsMap userLocation={userLocation} nearbyPets={pets} />
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </div>
  );
}
