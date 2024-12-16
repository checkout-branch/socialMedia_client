/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Button from "@components/button/Button";
import { useRouter } from "next/router";
import { getTournamentByIdApi } from "@/service/tournament";

type TournamentDetailsProps = {
  tournament: {
    gameImage: string;
    userImage: string;
    userName: string;
    gameName: string;
    description: string;
    totalSlots: number;
    entryFee: number;
    prizepool: number[];
  };
};

const TournamentDetails: React.FC = () => {
  const [tournament, setTournament] =
    useState<TournamentDetailsProps["tournament"] | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchTournament = async () => {
        try {
          const res = await getTournamentByIdApi(String(id));
          setTournament(res.data);
        } catch (error) {
          console.error("Failed to fetch tournament details:", error);
        }
      };
      fetchTournament();
    }
  }, [id]);

  const handleCancel = () => {
    router.push("/tournaments");
  };

  const handleJoin = () => {
    // Logic for joining the tournament
    console.log("Joining tournament...");
  };

  return (
    <div className="p-4">
      {tournament ? (
        <div className="max-w-3xl bg-[#272932] text-white rounded-lg shadow-lg">
          <div className="p-4">
            {/* Game Image */}
            <div className="mb-3">
              <img
                src={tournament.gameImage}
                alt={tournament.gameName ? `${tournament.gameName} image` : "Game image"}
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
                    alt={tournament.userName ? `${tournament.userName} image` : "User image"}
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
                      const place = index + 1;
                      const suffix =
                        place === 1 ? "st" : place === 2 ? "nd" : place === 3 ? "rd" : "th";
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
                  <p className="font-semibold text-lg">{tournament.entryFee}</p>
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
            <Button text="Join now" onClick={handleJoin} />
          </div>
        </div>
      ) : (
        <p>Loading tournament details...</p>
      )}
    </div>
  );
};

export default TournamentDetails;
