/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Button from "@components/button/Button";

const CreateTournamentPage: React.FC = () => {
  const router = useRouter();

  const handleCreateClick = () => {
    // Redirect to the create tournament page
    router.push("/createtournament/create");
  };

  return (
    <div className=" w-[90%]  flex justify-between mt-3">
      {/* Main Content */}
      <div className="">
        <h1 className="text-2xl font-bold mb-3">Create Tournaments</h1>
        <div className="bg-[#272932] p-5 rounded-lg">
          <div className="flex items-center text-xl mb-3">
            <p className="text-[#6a3aba] mr-2">
              Create Your Own Tournament Just 100
            </p>
            <img src="images/coin.png" alt="Coin" className="w-6 h-6" />
          </div>

          {/* Tournament Images Section */}

          <div className="relative">
            <img
              src="/images/tournament.png"
              alt={`Tournament Image `}
              className="rounded-lg  h-[420px]"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div> */}
          </div>

          {/* Create Tournament Button */}
          <div className="mt-2">
            <Button text="Create Tournament" onClick={handleCreateClick} />
          </div>
        </div>
      </div>

      {/* Coin Display Panel */}
      <div className="w-[20%] bg-[#272932] rounded-lg p-6 flex flex-col items-center h-40 mt-10">
        <p className="text-lg font-bold mb-2">Bun Coins</p>
        <div className="flex items-center space-x-2 flex-col">
          <img src="images/coin.png" alt="Coin Icon" className="w-8 h-8" />
          <span className="text-2xl font-extrabold">12,256</span>
        </div>
      </div>
    </div>
  );
};

export default CreateTournamentPage;
