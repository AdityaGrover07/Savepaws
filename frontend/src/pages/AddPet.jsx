import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getBreedOptions, getStatesOption } from "../utils/options";
import Select from "react-select";
import "../styles/addPet.css";
import axios from "axios";
import upload from "superagent";
import Modal from "../components/modal";
import { API_ROOT } from "../api-config";
const elephant = require("../icons-profile/elephant.jpg");

library.add(fab);

export default function AddPet() {
  const [selectedImages, setSelectedImages] = useState([]);
  const { state } = useContext(UserContext);
  const [preview, setPreview] = useState([]);
  const [petAddModal, setPetAddModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [breedOptions, setBreedOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]);
  const [breed, setbreed] = useState(null);
  const [gender, setgender] = useState(null);
  const [age, setage] = useState(null);
  const [type, settype] = useState(null);
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  const [currlocation, setlocation] = useState(null);

  const formSchema = yup.object().shape({
    Name: yup
      .string()
      .required("Name is mandatory")
      .max(15, "Max length of name must be less then 15"),
    Description: yup
      .string()
      .required("Description is mandatory")
      // .min(20, "Description must be atleast 20 char long")
      .max(50, "Max Length of Description must be 50"),
    Address: yup
      .string()
      .required("Address is required")
      .min(20, "Address must be atleast 20 char long")
      .max(80, "Max Length of Description must be 80"),
    City: yup.string().required("City is required"),
    State: yup.number().required("State is mandatory"),
    Pincode: yup.number().required("Pincode is mandatory"),
    checkBox: yup.bool().oneOf([true], "Checkbox selection is required"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm(formOptions);

  const genderOptions = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
    { value: 3, label: "Not Known" },
  ];

  const typeOptions = [
    { value: 1, label: "Dog" },
    { value: 2, label: "Cat" },
    { value: 3, label: "Others" },
  ];

  const ageOptions = [];
  for (let i = 0; i <= 30; i++) {
    ageOptions.push({ label: i, value: i });
  }
  const [pet, setPet] = useState({
    PetID: "",
    RescuerID: state.userID,
    Name: "",
    Type: null,
    Age: null,
    Breed1: null,
    Gender: null,
    Vaccinated: null,
    Sterilized: null,
    Health: null,
    State: null,
    City: "",
    Pincode: null,
    Address: "",
    Description: "",
    PhotoAmt: null,
    Status: false,
  });

  useEffect(() => {
    getBreedOptions().then((res) => {
      setBreedOptions(res);
    });
  }, [getBreedOptions]);

  useEffect(() => {
    getStatesOption().then((res) => {
      setStatesOptions(res);
    });
  }, [getStatesOption]);

  useEffect(() => {
    if (!selectedImages[0]) {
      setPreview([elephant, elephant, elephant, elephant]);
      return;
    }

    setPreview([]);
    [...selectedImages].forEach((element) => {
      const objectUrl = URL.createObjectURL(element);
      setPreview((preview) => [...preview, objectUrl]);
    });

    // free memory when ever this component is unmounted
    //return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImages]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      console.log("loading...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlat(position.coords.latitude);
          setlong(position.coords.longitude);
        },
        () => {
          console.log("Unable to get the location");
        }
      );
    }
    setlocation({ lat, long });

    console.log("Latitude", lat);
    console.log("longitude", long);
  };

  const onSubmit = (data) => {
    if (selectedImages.length < 4) alert("Please select images");
    else {
      data.Breed1 = breed.value;
      data.Gender = gender.value;
      data.Type = type.value;
      data.Vaccinated = pet.Vaccinated;
      data.Sterilized = pet.Sterilized;
      data.Health = pet.Health;
      data.PhotoAmt = selectedImages.length;
      data.Age = age.value;
      data.RescuerID = pet.RescuerID;
      data.location = {
        type: "Point",
        coordinates: [lat, long],
      };
      uploadImages(data);
    }
  };

  const uploadImages = async (data) => {
    // uploading images to aws-s3
    try {
      upload
        .post(`${API_ROOT}/pets/upload`)
        .attach("files", selectedImages[0])
        .attach("files", selectedImages[1])
        .attach("files", selectedImages[2])
        .attach("files", selectedImages[3])
        .end((err, res) => {
          if (err) setErrorModal(true);
          if (res.text.length > 0) {
            setPet({ ...pet, PetID: res.text });
            data.PetID = res.text;
            setPet(data);
            newPetData(data);
          } else {
            alert("Something went wrong, Please try again later");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const newPetData = async (data) => {
    // add new pet
    try {
      // console.log("Data..", data);
      const res = await axios.post(`${API_ROOT}/pets/addpet`, { data });
      console.log(res);
      if (res.status == 200) setPetAddModal(true);
      else setErrorModal(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-fluid p-2 add-pet-container ">
      {petAddModal ? (
        <Modal
          state={petAddModal}
          text={`${pet.Name} Sucessfully added to the platform. You can access the pet details in your profile or using the search by location section.`}
        />
      ) : (
        <></>
      )}
      {errorModal ? (
        <Modal
          state={errorModal}
          text={`Error occured. Please try again later`}
        />
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="add-pet">
        <div
          className="d-flex flex-row-reverse me-2"
          style={{ color: "green" }}
        >
          <h1>
            <b>
              <img width="60" height="60" src="/assets/icons/cute.png" /> Help a
              buddy
            </b>
          </h1>
        </div>
        <h6>* Give details to best of your knowledge</h6>
        <div>
          <b>
            <h3>Pet Details</h3>
          </b>
          <hr />
          <div className="details">
            {/* Text Details */}

            <div className=" text-details">
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="Name"
                  {...register("Name")}
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  placeholder="* Pet's Name"
                  aria-label="Name"
                  aria-describedby="basic-addon2"
                />
              </div>
              {errors.Name && (
                <div className="alert alert-danger py-0" role="alert">
                  {errors.Name.message}
                </div>
              )}

              <div className="input-group mb-3  cursor-pointer dropdown">
                <Select
                  options={typeOptions}
                  defaultValue={type}
                  placeholder="Select Type"
                  onChange={settype}
                  isSearchable={true}
                  isClearable
                  noOptionsMessage={() => "Sorry no such type found"}
                  styles={{
                    control: (baseStyles, state, defaultStyles) => ({
                      ...defaultStyles,
                      ...baseStyles,
                      width: 180,
                      borderColor: state.isFocused ? "green" : "green",
                    }),
                  }}
                />
                &nbsp; &nbsp;
                <Select
                  options={breedOptions}
                  defaultValue={breed}
                  placeholder="Select Breed"
                  onChange={setbreed}
                  isSearchable={true}
                  isClearable
                  noOptionsMessage={() => "Sorry no such breed found"}
                  styles={{
                    control: (baseStyles, state, defaultStyles) => ({
                      ...defaultStyles,
                      ...baseStyles,
                      width: 180,
                      borderColor: state.isFocused ? "green" : "green",
                    }),
                  }}
                />
                &nbsp; &nbsp;
                <Select
                  options={genderOptions}
                  defaultValue={gender}
                  placeholder="Select Gender"
                  onChange={setgender}
                  isSearchable={true}
                  isClearable
                  noOptionsMessage={() => "Sorry no such gender found"}
                  styles={{
                    control: (baseStyles, state, defaultStyles) => ({
                      ...defaultStyles,
                      ...baseStyles,
                      width: 180,
                      borderColor: state.isFocused ? "green" : "green",
                    }),
                  }}
                />
                &nbsp; &nbsp;
                <Select
                  options={ageOptions}
                  defaultValue={age}
                  placeholder="Select Age"
                  onChange={setage}
                  isSearchable={true}
                  isClearable
                  styles={{
                    control: (baseStyles, state, defaultStyles) => ({
                      ...defaultStyles,
                      ...baseStyles,
                      width: 180,
                      borderColor: state.isFocused ? "green" : "green",
                    }),
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Description:</span>
                <textarea
                  rows="3"
                  name="Description"
                  {...register("Description")}
                  className={`form-control ${
                    errors.Description ? "is-invalid" : ""
                  }`}
                  aria-label="Description:"
                  onChange={(e) =>
                    setPet({ ...pet, Description: e.target.value })
                  }
                ></textarea>
              </div>
              {errors.Description && (
                <div className="alert alert-danger py-0" role="alert">
                  {errors.Description.message}
                </div>
              )}
              <div className=" pt-2">
                <b>
                  <h3>
                    Health, Please tell if buddy is injured or need urgent care
                  </h3>
                </b>
                <hr />
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="Health"
                    className="form-control"
                    placeholder="Status"
                    aria-label="Health status"
                    aria-describedby="basic-addon2"
                    value={`Status: ${pet.Health}`}
                    disabled
                  />
                  <span
                    role="button"
                    className="input-group-text cursor-pointer lg:px-3"
                    onClick={() => setPet({ ...pet, Health: 1 })}
                    id="basic-addon2"
                  >
                    Healthy
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer lg:px-3"
                    onClick={() => setPet({ ...pet, Health: 2 })}
                    id="basic-addon2"
                  >
                    Minor Injury
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer lg:px-3"
                    onClick={() => setPet({ ...pet, Health: 3 })}
                    id="basic-addon2"
                  >
                    Serious Injury
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer lg:px-3"
                    onClick={() => setPet({ ...pet, Health: 4 })}
                    id="basic-addon2"
                  >
                    Not Specified
                  </span>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="Vaccinated"
                    className="form-control"
                    placeholder="Vaccinated"
                    aria-label="Vaccinated status"
                    aria-describedby="basic-addon2"
                    value={
                      pet.Vaccinated === 1
                        ? "Vaccination: Yes"
                        : pet.Vaccinated === 2
                        ? "Vaccination: No"
                        : "Vaccination: No Idea"
                    }
                    disabled
                  />
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Vaccinated: 1 })}
                    id="basic-addon2"
                  >
                    Yes
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Vaccinated: 2 })}
                    id="basic-addon2"
                  >
                    No
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Vaccinated: 3 })}
                    id="basic-addon2"
                  >
                    No Idea
                  </span>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="Sterilized"
                    placeholder="Sterilized"
                    aria-label="Sterilized status"
                    aria-describedby="basic-addon2"
                    value={
                      pet.Sterilized === 1
                        ? "Sterilized: Yes"
                        : pet.Sterilized === 2
                        ? "Sterilized: No"
                        : "Sterilized: No Idea"
                    }
                    disabled
                  />
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Sterilized: 1 })}
                    id="basic-addon2"
                  >
                    Yes
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Sterilized: 2 })}
                    id="basic-addon2"
                  >
                    No
                  </span>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer px-5"
                    onClick={() => setPet({ ...pet, Sterilized: 3 })}
                    id="basic-addon2"
                  >
                    Not Idea
                  </span>
                </div>
              </div>
              <div>
                <b>
                  <h3>
                    Where? (Please be as specific as possible incase of strays)
                  </h3>
                </b>
                <hr />
                <div className="input-group mb-3">
                  <span className="input-group-text">* Address:</span>
                  <textarea
                    rows="3"
                    name="Address"
                    {...register("Address")}
                    className={`form-control ${
                      errors.Address ? "is-invalid" : ""
                    }`}
                    aria-label="Address:"
                    value={currlocation}
                  ></textarea>
                  <span
                    role="button"
                    className="input-group-text cursor-pointer"
                    id="basic-addon2"
                    onClick={getLocation}
                  >
                    Click me &nbsp; <FontAwesomeIcon icon={faLocationDot} />
                  </span>
                </div>
                {errors.Address && (
                  <div className="alert alert-danger py-0" role="alert">
                    {errors.Address.message}
                  </div>
                )}
                <div>
                  <h6>
                    * City, State, Pincode - (auto fill using geolocation)
                  </h6>
                  <div className="input-group mb-3 ">
                    <span className="input-group-text">City:</span>
                    <input
                      name="City"
                      {...register("City")}
                      className={`form-control ${
                        errors.City ? "is-invalid" : ""
                      }`}
                      type="text"
                      aria-label="City"
                    ></input>
                    &nbsp; &nbsp;
                    <span className="input-group-text">State:</span>
                    <input
                      type="text"
                      name="State"
                      {...register("State")}
                      className={`form-control ${
                        errors.State ? "is-invalid" : ""
                      }`}
                      aria-label="State"
                    ></input>
                    &nbsp; &nbsp;
                    <span className="input-group-text">Pincode:</span>
                    <input
                      type="number"
                      name="Pincode"
                      aria-label="Pincode"
                      {...register("Pincode")}
                      className={`form-control ${
                        errors.State ? "is-invalid" : ""
                      }`}
                    ></input>
                  </div>
                </div>
                {(errors.City || errors.State || errors.Pincode) && (
                  <div className="alert alert-danger py-0" role="alert">
                    Please fill the above row
                  </div>
                )}
              </div>
            </div>
            {/* Images */}
            <div className="imgs">
              <div className="image-upload container text-center">
                <label for="file-input" className="img-div">
                  <div class="row border border-dark">
                    <div class="col">
                      <img
                        src={preview[0]}
                        height={260}
                        class="w-100 shadow-1-strong p-2 pe-0 img-1"
                        alt="Pet's pics (max-4)"
                      />
                      <img
                        src={preview[1]}
                        class="w-100 shadow-1-strong p-2 pb-0 img-2"
                        alt="Pet's pics (max-4)"
                      />
                    </div>
                    <div class="col">
                      <img
                        src={preview[2]}
                        class="w-100 shadow-1-strong p-2 img-3"
                        alt="Pet's pics (max-4)"
                      />
                      <img
                        src={preview[3]}
                        height={260}
                        class="w-100  shadow-1-strong p-2 pt-0 ps-0 img-4"
                        alt="Pet's pics (max-4)"
                      />
                    </div>
                  </div>
                </label>
                <input
                  onChange={(e) => {
                    if (e.target.files.length !== 4)
                      alert("You must upload 4 images");
                    else {
                      if (e.target.files?.[0]) {
                        setSelectedImages(e.target.files);
                      }
                    }
                  }}
                  id="file-input"
                  multiple
                  name="files"
                  type="file"
                />
              </div>
              {/* <div className="alert alert-success my-2" role="alert">
                Color, Doesn't matter!
              </div> */}
            </div>
          </div>
        </div>
        {/* Submit */}
        <div className=" d-flex flex-row justify-content-between align-items-center pt-5">
          <div className="form-check d-flex justify-content-center mb-5">
            <input
              type="checkbox"
              name="terms"
              {...register("checkBox")}
              className={`form-check-input me-2 ${
                errors.checkBox ? "is-invalid" : ""
              }`}
            />
            <label className="form-check-label" for="form2Example3g">
              I agree all statements in
              <a href="#!" className="text-body">
                <u>Terms of service</u>
              </a>
            </label>
            {errors.checkBox && (
              <div class="alert alert-danger py-0 mx-2" role="alert">
                {errors.checkBox.message}
              </div>
            )}
          </div>

          <button
            style={{ fontSize: "14px" }}
            type="submit"
            className="btn btn-success btn-lg banner-btn "
          >
            Voila, Submit
          </button>
        </div>
      </form>
    </div>
  );
}
