import { getCoinApi, getCoinByIdApi } from '@/service/coin';
import CoinCard from '@components/Cards/CoinCard';
import CoinModal from '@components/Modals/CoinModal';
import React, { useState, useEffect } from 'react';

const CoinListPage: React.FC = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCoinApi();
        setCoins(data.details);
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch coins:', error);
      }
    };
    fetchCoins();
  }, []);

  // Open modal to view coin details
  const openModal = async (id: string) => {
    try {
      console.log(id)
      const response = await getCoinByIdApi(id);
      console.log(response)
      setSelectedCoin(response.coin);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch coin details:', error);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  // Handle coin purchase
  // const handlePurchase = async () => {
  //   if (selectedCoin) {
  //     try {
  //       await purchaseCoinByIdApi(selectedCoin.id);
  //       alert('Coin purchased successfully!');
  //       closeModal();
  //     } catch (error) {
  //       console.error('Failed to purchase coin:', error);
  //       alert('Purchase failed.');
  //     }
  //   }
  // };

  return (
      <div className=' ml-5 mt-2'>
        <h1 className='text-2xl font-bold'>Purchase coins</h1>
        <div className="p-10 pr-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mr-32 bg-[#272932] rounded-lg ">
      {coins.map((coin,ind) => (
        <CoinCard key={ind} coin={coin} onOpenModal={openModal} />
      ))}

      {/* Modal */}
      <CoinModal
        coin={selectedCoin}
        isOpen={isModalOpen}
        onClose={closeModal}
        // onPurchase={handlePurchase}
      />
    </div>
      </div>
  );
};

export default CoinListPage;
