import React from "react";
import Button from "@components/button";

type Tournament = {
  id: number;
  gameImage: string;
  userImage: string;
  userName: string;
  gameName: string;
  description: string;
  totalSlots: number;
  entryFee: number;
};

type TournamentCardProps = {
  tournament: Tournament;
};

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {

  return (
    <div className="max-w-xs bg-[#272932] text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      {/* Game Image */}
      <img
        src={tournament.gameImage}
        alt="Game Image"
        className="w-full h-40 object-cover rounded-t-lg"
      />

      {/* Content */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <img
            src={tournament.userImage}
            alt="Creator Image"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-semibold">{tournament.userName}</p>
            <p className="text-xs text-gray-400">Creator</p>
          </div>
        </div>

        {/* Game Details */}
        <h3 className="text-lg font-bold">{tournament.gameName}</h3>
        <p className="text-sm text-gray-300 mt-2">{tournament.description}</p>

        {/* Slots and Entry Fee */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <div>
            <p className="text-xs text-gray-400">Total Slots</p>
            <p className="font-semibold">{tournament.totalSlots}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Entry Fee</p>
            <div className="flex items-center">
              <img
                src="/images/coin.png"
                alt="Coin Icon"
                className="w-4 h-4"
              />
              <p className="font-semibold ml-1">{tournament.entryFee}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Button */}
      {/* <div className="p-4 border-t border-gray-700">
        <Button text="Join Now" />
      </div> */}
    </div>
  );
};

export default TournamentCard;
