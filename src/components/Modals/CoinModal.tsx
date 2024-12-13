import Button from '@components/button';
import React from 'react';

interface CoinModalProps {
  coin: { coin: number; prize: string; description: string } | null;
  isOpen: boolean;
  onClose: () => void;
//   onPurchase: () => void;
}

const CoinModal: React.FC<CoinModalProps> = ({ coin, isOpen, onClose,  }) => {
  if (!isOpen || !coin) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#34363E] p-6 rounded-lg shadow-lg max-w-sm w-full">
       
        <div className='flex items-center justify-center'>
        <img src="/images/coin.png" alt="Coin" className="w-20 h-20" />
        <h2 className="text-2xl font-bold mb-2 text-center">{coin.coin} Coins</h2>
        </div>
        <div>
            <img src="/images/coins.png" alt="" />
        </div>
        <div>
        <p className="text-xl mb-4 text-center font-bold"><span className='text-sm '>$</span>{coin.prize}</p>
        </div>
        
        <div className='flex gap-5'>
        <Button text='Cancel' onClick={onClose}/>
        <Button text='Purchase'/>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;
