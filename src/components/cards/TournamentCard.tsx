type TournamentCardProps = {
    gameImage: string;
    userImage: string;
    userName: string;
    gameName: string;
    description: string;
    totalSlots: number;
    entryFee: number;
  };
  
  const TournamentCard: React.FC<TournamentCardProps> = ({
    gameImage,
    userImage,
    userName,
    gameName,
    description,
    totalSlots,
    entryFee,
  }) => {


    return(
        <div className="max-w-64 bg-[#272932] rounded-lg shadow-lg mt-10">
  
  <img
    src={gameImage}
    alt="Game Image" 
    className="w-full h-40 object-cover"
  />
  
  <div className="p-4">
    
    <div className="flex items-center mb-3">
      <img
        src={userImage}
        alt="Creator Image" 
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="ml-3">
        <p className="text-sm font-semibold text-gray-700"> {userName}</p>
        <p className="text-xs text-gray-500">Creator</p>
      </div>
    </div>

    <h3 className="text-lg font-bold text-gray-800">{gameName}</h3>
  
    <p className="text-sm text-gray-600 mt-1">
   { description}
    </p>
  
    <div className="mt-4 flex justify-between items-center text-gray-700">
      <div>
        <p className="text-xs text-gray-500">Total Slots</p>
        <p className="text-sm font-semibold">{totalSlots}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500">Entry Fee</p>
        <div className="flex items-center">
          <img 
            src="https://via.placeholder.com/20" 
            alt="Coin Icon" 
            className="w-4 h-4"
          />
          <p className="text-sm font-semibold ml-1">{entryFee}</p>
        </div>
      </div>
    </div>
  </div>
  
  <div className="p-4 border-t border-gray-200">
    <button 
            className 
            ="w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 rounded-lg transition">
      Join Now
    </button>
  </div>
</div>

    )
}
export default TournamentCard