import { createTournamentApi } from "@/service/tournament"; 
import TournamentCreationForm from "@components/forms/CreateTournamentForm";
import { useRouter } from "next/navigation";

export default function CreateTournamentPage() {
  const router = useRouter();

  const handleTournamentSubmit = async (data: {
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
  }) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") as string);
      const userId = user?.id;

      if (!userId) {
        console.error("User ID not found in session storage.");
        return;
      }

      // Create form data for the API
      const formData = new FormData();
      formData.append("tournamentName", data.tournamentName);
      formData.append("game", data.game);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("entryFee", data.entryFee);
      formData.append("firstPrize", data.prizePoolFirst);
      formData.append("secondPrize", data.prizePoolSecond);
      formData.append("thirdPrize", data.prizePoolThird);
      formData.append("slots", data.slots);
      formData.append("description", data.description);
      if (data.image) {
        formData.append("image", data.image);
      }

      // Log FormData contents (optional for debugging)
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      // Call API to create the tournament
      const response = await createTournamentApi(formData, userId);

      console.log("Tournament created successfully:", response);
      router.push('/tournaments')
      // router.push("/tournaments");  // Redirect to tournaments page or wherever you want
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };

  return (
    <div className="mt-8 max-w-[90%]">
      <h2 className="text-white text-xl font-semibold mb-4">Create new tournament</h2>
      <TournamentCreationForm onSubmit={handleTournamentSubmit} />
    </div>
  );
}
