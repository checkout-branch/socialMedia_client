/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@components/button/Button"; // Make sure to adjust the import path if needed
import { useRouter } from "next/router";

// Define the interface
interface TournamentFormValues {
  tournamentName: string;
  game: string;
  startDate: string;
  endDate: string;
  entryFee: string;
  prizePoolFirst: string;
  prizePoolSecond: string;
  prizePoolThird: string;
  format: string;
  slots: string;
  description: string;
  image: File | null;
}

// Validation schema
const validationSchema = Yup.object({
  tournamentName: Yup.string().required("Tournament name is required"),
  game: Yup.string().required("Game is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().required("End date is required"),
  entryFee: Yup.string().required("Entry fee is required"),
  prizePoolFirst: Yup.string().required("First prize pool is required"),
  prizePoolSecond: Yup.string().required("Second prize pool is required"),
  prizePoolThird: Yup.string().required("Third prize pool is required"),
  format: Yup.string().required("Format is required"),
  slots: Yup.string().required("Slots are required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Tournament image is required").nullable(),
});

const TournamentCreationForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter()

  const initialValues: TournamentFormValues = {
    tournamentName: "",
    game: "",
    startDate: "",
    endDate: "",
    entryFee: "",
    prizePoolFirst: "",
    prizePoolSecond: "",
    prizePoolThird: "",
    format: "",
    slots: "",
    description: "",
    image: null,
  };

  const handleSubmit = async (values: TournamentFormValues) => {
    console.log(values);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen mt-4 mb-4">
      <div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create a Tournament</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid grid-cols-2 w-[70%] p-6 bg-[#272932] rounded-lg shadow-lg">
              {/* Tournament Name */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-white">Tournament Name</label>
                  <Field
                    type="text"
                    name="tournamentName"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    placeholder="Enter Tournament Name"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="tournamentName" />
                  </div>
                </div>

                {/* Game */}
                <div>
                  <label className="block mb-1 text-white">Game</label>
                  <Field
                    type="text"
                    name="game"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    placeholder="Enter Game Name"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="game" />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block mb-1 text-white">Start Date</label>
                  <Field
                    type="date"
                    name="startDate"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="startDate" />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block mb-1 text-white">End Date</label>
                  <Field
                    type="date"
                    name="endDate"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="endDate" />
                  </div>
                </div>

                {/* Entry Fee */}
                <div>
                  <label className="block mb-1 text-white">Entry Fee</label>
                  <Field
                    type="number"
                    name="entryFee"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    placeholder="Enter Entry Fee"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="entryFee" />
                  </div>
                </div>

                {/* Prize Pool */}
                <div>
                  <label className="block mb-1 text-white">Prize Pool</label>
                  <div className="flex space-x-2">
                    <Field
                      type="number"
                      name="prizePoolFirst"
                      className="w-[25%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                      placeholder="1st Prize"
                    />
                    <Field
                      type="number"
                      name="prizePoolSecond"
                      className="w-[25%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                      placeholder="2nd Prize"
                    />
                    <Field
                      type="number"
                      name="prizePoolThird"
                      className="w-[25%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                      placeholder="3rd Prize"
                    />
                  </div>
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="prizePoolFirst" />
                    <ErrorMessage name="prizePoolSecond" />
                    <ErrorMessage name="prizePoolThird" />
                  </div>
                </div>

                {/* Format */}
                <div>
                  <label className="block mb-1 text-white">Format</label>
                  <Field
                    type="text"
                    name="format"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    placeholder="Enter Format"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="format" />
                  </div>
                </div>

                {/* Slots */}
                <div>
                  <label className="block mb-1 text-white">Slots</label>
                  <Field
                    type="number"
                    name="slots"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    placeholder="Enter Number of Slots"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="slots" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="ml-5 space-y-4">
                <div>
                  <label className="block mb-1 text-white">Description</label>
                  <textarea
                    rows={4} // You can adjust the number of rows to fit your design.
                    cols={50} // Adjust the width to your preference.
                    name="description"
                    className="w-full p-2 rounded-md bg-[#34363E] text-sm text-gray-400"
                    placeholder="Enter description"
                  />
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="description" />
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block mb-1 text-white">Tournament Image</label>
                  <Field
                    type="file"
                    name="image"
                    className="w-[80%] p-2 rounded-md bg-[#34363E] text-sm text-gray-400 h-14"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Tournament Preview"
                        className="mt-5 rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="mt-2 ">
                      <img src="/images/default.png" 
                      alt="" 
                      className="mt-5 rounded-lg"
                      />
                      
                    </div>
                  )}
                  <div className="text-red-500 text-xs">
                    <ErrorMessage name="image" />
                  </div>
                </div>

                <div className="flex mt-10 gap-5">
                  <Button text="Cancel" onClick={() => router.back()}/>
                  <Button type="submit" text="Create Tournament" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TournamentCreationForm;
