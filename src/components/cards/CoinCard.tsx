import React from 'react';

interface Coin {
  _id: string;
  coin: number;
  prize: string;
}

interface CoinCardProps {
  coin: Coin;
  onOpenModal: (id: string) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onOpenModal }) => {
  return (
    <div
      onClick={() => onOpenModal(coin._id)}
        className="w-60 bg-[#34363E] hover:bg-[#6a3aba] p-6 rounded-lg shadow-lg h-full text-center flex flex-col items-center">
          <div className='flex justify-center items-center'>
            <img src="/images/coin.png" alt="Coin" className="w-12 h-12 mb-4" />
            <div className="font-bold text-lg text-white mb-2">{coin.coin} Coins</div>

          </div>
          <div>
            <img src={'images/coins.png'} alt="" className='w-20 h-20'/>
          </div>
      <div className="font-bold text-xl text-white"><span className='text-sm'>$</span>{coin.prize}</div>

    </div>
  );
};

export default CoinCard;
