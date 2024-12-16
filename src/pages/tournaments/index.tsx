import React, { useEffect, useState } from "react";
import { getTournamentApi } from "@/service/tournament";
import TournamentCard from "@components/cards/TournamentCard";

const Tournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await getTournamentApi();
        setTournaments(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  return (
    <div className="p-8 pr-28">
      <h1 className="text-2xl font-bold mb-6">Tournaments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {tournaments.map((tournament, index) => (
          <TournamentCard key={index} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
