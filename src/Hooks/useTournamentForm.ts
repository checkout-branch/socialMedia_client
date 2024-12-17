// src/components/Tournament/TournamentValidation.ts

export interface TournamentFormValues {
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

export const validateTournamentForm = (formValues: TournamentFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!formValues.tournamentName) errors.tournamentName = "Tournament name is required";
  if (!formValues.game) errors.game = "Game is required";
  if (!formValues.startDate) errors.startDate = "Start date is required";
  if (!formValues.endDate) errors.endDate = "End date is required";
  if (!formValues.entryFee) errors.entryFee = "Entry fee is required";
  if (!formValues.prizePoolFirst) errors.prizePoolFirst = "First prize pool is required";
  if (!formValues.prizePoolSecond) errors.prizePoolSecond = "Second prize pool is required";
  if (!formValues.prizePoolThird) errors.prizePoolThird = "Third prize pool is required";
  if (!formValues.slots) errors.slots = "Slots are required";
  if (!formValues.description) errors.description = "Description is required";
  if (!formValues.image) errors.image = "Tournament image is required";

  return errors;
};
