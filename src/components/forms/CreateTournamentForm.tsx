"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@components/button/Button";
import {
  TournamentFormValues,
  validateTournamentForm,
} from "@/Hooks/useTournamentForm";

const TournamentCreationForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<TournamentFormValues>({
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
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleSubmit = () => {
    const newErrors = validateTournamentForm(formValues);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formValues, "Tournament Submitted");
      router.push("/about");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormValues({ ...formValues, image: file });
    }
  };

  return (
    <div className="min-h-screen flex justify-center flex-col mt-5 w-[90%] mx-auto">
      <h1 className="text-2xl font-bold ">
          Create a Tournament
        </h1>
      <div className="container max-w-5xl p-8 bg-[#272932] rounded-xl shadow-lg mt-3 ">
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tournament Name
              </label>
              <input
                type="text"
                name="tournamentName"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.tournamentName}
                onChange={handleInputChange}
                placeholder="Enter Tournament Name"
              />
              {errors.tournamentName && (
                <p className="text-xs text-red-500">{errors.tournamentName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Game
              </label>
              <input
                type="text"
                name="game"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.game}
                onChange={handleInputChange}
                placeholder="Enter Game Name"
              />
              {errors.game && (
                <p className="text-xs text-red-500">{errors.game}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.startDate}
                onChange={handleInputChange}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.endDate}
                onChange={handleInputChange}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500">{errors.endDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Entry Fee
              </label>
              <input
                type="number"
                name="entryFee"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.entryFee}
                onChange={handleInputChange}
                placeholder="Enter Entry Fee"
              />
              {errors.entryFee && (
                <p className="text-xs text-red-500">{errors.entryFee}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Slots
              </label>
              <input
                type="number"
                name="slots"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.slots}
                onChange={handleInputChange}
                placeholder="Enter Number of Slots"
              />
              {errors.slots && (
                <p className="text-xs text-red-500">{errors.slots}</p>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  First
                </label>
                <input
                  type="number"
                  name="prizePoolFirst"
                  className="block w-full p-2 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formValues.prizePoolFirst}
                  onChange={handleInputChange}
                  placeholder="First Place"
                />
                {errors.prizePoolFirst && (
                  <p className="text-xs text-red-500">
                    {errors.prizePoolFirst}
                  </p>
                )}
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Second{" "}
                </label>
                <input
                  type="number"
                  name="prizePoolSecond"
                  className="block w-full p-2 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formValues.prizePoolSecond}
                  onChange={handleInputChange}
                  placeholder="Second Place"
                />
                {errors.prizePoolSecond && (
                  <p className="text-xs text-red-500">
                    {errors.prizePoolSecond}
                  </p>
                )}
              </div>

              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Third{" "}
                </label>
                <input
                  type="number"
                  name="prizePoolThird"
                  className="block w-full p-2 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 text-sm"
                  value={formValues.prizePoolThird}
                  onChange={handleInputChange}
                  placeholder="Third Place"
                />
                {errors.prizePoolThird && (
                  <p className="text-xs text-red-500">
                    {errors.prizePoolThird}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 flex flex-col justify-between">
           <div className="">
           <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Enter Tournament Description"
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Tournament Image
              </label>
              <input
                type="file"
                name="image"
                className="block w-full p-3 rounded-md bg-[#34363E] text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                onChange={handleImageChange}
              />
              <div className="mt-2 ">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Tournament Preview"
                    width={500}
                    height={200}
                    className="rounded-lg"
                  />
                ) : (
                  <Image
                    src="/images/default.webp"
                    alt="Default Image"
                    width={500}
                    height={200}
                    className="rounded-lg"
                  />
                )}
              </div>
            </div>
           </div>
            <div>
            <div className="flex gap-5">
              <Button
                text="Cancel"
                onClick={handleSubmit}
              />
              <Button
                text="Create Tournament"
                onClick={handleSubmit}
              />
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TournamentCreationForm;
