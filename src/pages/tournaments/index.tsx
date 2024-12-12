import TournamentCard from "@components/cards/TournamentCard";

const tournaments = [
    {
      id: 1,
      gameImage: "/path/to/game-image1.jpg",
      userImage: "/path/to/user-image1.jpg",
      userName: "PlayerOne",
      gameName: "Battle Royale",
      description: "Fast-paced action game.",
      totalSlots: 20,
      entryFee: 50,
    },
    {
      id: 2,
      gameImage: "/path/to/game-image2.jpg",
      userImage: "/path/to/user-image2.jpg",
      userName: "PlayerTwo",
      gameName: "Racing Thunder",
      description: "Competitive car racing.",
      totalSlots: 15,
      entryFee: 30,
    },
    {
        id: 1,
        gameImage: "/path/to/game-image1.jpg",
        userImage: "/path/to/user-image1.jpg",
        userName: "PlayerOne",
        gameName: "Battle Royale",
        description: "Fast-paced action game.",
        totalSlots: 20,
        entryFee: 50,
      },
      {
        id: 2,
        gameImage: "/path/to/game-image2.jpg",
        userImage: "/path/to/user-image2.jpg",
        userName: "PlayerTwo",
        gameName: "Racing Thunder",
        description: "Competitive car racing.",
        totalSlots: 15,
        entryFee: 30,
      },
      {
        id: 1,
        gameImage: "/path/to/game-image1.jpg",
        userImage: "/path/to/user-image1.jpg",
        userName: "PlayerOne",
        gameName: "Battle Royale",
        description: "Fast-paced action game.",
        totalSlots: 20,
        entryFee: 50,
      },
      {
        id: 2,
        gameImage: "/path/to/game-image2.jpg",
        userImage: "/path/to/user-image2.jpg",
        userName: "PlayerTwo",
        gameName: "Racing Thunder",
        description: "Competitive car racing.",
        totalSlots: 15,
        entryFee: 30,
      },
  ];
  

export default function Tournaments () {
    return (
        <div className="grid grid-cols-4">
            {tournaments.map((ele,ind)=>(
                <TournamentCard key={ind} {...ele}/>
            ))}

        </div>
    )
}