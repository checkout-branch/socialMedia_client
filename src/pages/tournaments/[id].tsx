/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import React from "react";
import { getTournamentByIdApi } from "@/service/tournament";
import Button from "@components/Button/Button";
import { useRouter } from "next/router";

type TournamentDetailsProps = {
  tournament: {
    gameImage: string;
    userImage: string;
    userName: string;
    gameName: string;
    description: string;
    totalSlots: number;
    entryFee: number;
    prizepool: number[]; // prizePool as an array
  };
};

const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  tournament,
}) => {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/tournaments");
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl bg-[#272932] text-white rounded-lg shadow-lg">
        <div className="p-4">
          {/* Game Image */}
          <div className="mb-3">
            <img
              src={tournament.gameImage}
              alt={`${tournament.gameName} image`}
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>

          {/* Tournament Details */}
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{tournament.gameName}</h1>
              <p className="text-gray-300 mb-6">{tournament.description}</p>

              <div className="flex items-center mb-6">
                {/* Creator Info */}
                <img
                  src={tournament.userImage}
                  alt="Creator Image"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold">{tournament.userName}</p>
                  <p className="text-xs text-gray-400">Creator</p>
                </div>
              </div>
            </div>
            <div>
              {/* Prize Pool */}
              <div className="mt-6 bg-[#34363E] p-2 rounded-lg shadow-lg">
                <div className="flex flex-col gap-3">
                  {tournament.prizepool.map((prize, index) => {
                    const place = index + 1; // Calculate place (1st, 2nd, 3rd, etc.)
                    const suffix =
                      place === 1
                        ? "st"
                        : place === 2
                        ? "nd"
                        : place === 3
                        ? "rd"
                        : "th";
                    return (
                      <div
                        key={index}
                        className="text-center flex justify-between items-center gap-3"
                      >
                        <p className="text-sm text-gray-400">
                          {place}
                          {suffix} Place
                        </p>
                        <p className="font-semibold text-lg">
                          {prize}{" "}
                          <img
                            src="/images/coin.png"
                            alt="Coin"
                            className="w-6 h-6 inline"
                          />
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Slots and Entry Fee */}
          <div className="flex justify-between">
           
            <div className="text-center flex justify-between items-center gap-1 ml-2">
              <div className="gap-2 flex items-center justify-center">
              <p className="text-sm text-gray-400">Entry Fee </p>
              <p className="font-semibold text-lg">
                {tournament.entryFee}{" "}
                </p>
              </div>
              <img
                  src="/images/coin.png"
                  alt="Coin"
                  className="w-10 h-10 inline"
                />
            </div>
            <div className="flex items-center justify-center ml-2 gap-2">
              <p className="text-sm text-gray-400">Total Slots</p>
              <p className="font-semibold text-lg">{tournament.totalSlots}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-5 ml-[50%] pb-3 pr-3">
          <Button text="Cancel" onClick={handleCancel} />
          <Button text="Join now" />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  console.log(context.params);
  console.log(id)


  try {
    console.log(id+"uhhhjj");
    const response = await getTournamentByIdApi(id);
    const tournament = response.data;

    console.log(response)
    // Assuming prizePool is an array in the API response

    if (!tournament) {
      console.error(`Tournament with id ${id} not found`);
      return { notFound: true };  // Return a 404 page if the tournament does not exist
    }

    return {
      props: {
        tournament,
      },
    };
  } catch (error) {
    console.error("Failed to fetch tournament details:", error);
    return {
      notFound: true, // Show 404 page if tournament not found
    };
  }
};

export default TournamentDetails;
