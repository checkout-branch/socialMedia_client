/* eslint-disable @next/next/no-img-element */
// /pages/tournaments/index.tsx
import { useRouter } from 'next/router';
import Button from '@components/Button/Button';

const CreateTournamentPage: React.FC = () => {
  const router = useRouter();

  const handleCreateClick = () => {
    // Redirect to the create tournament page
    router.push('/createtournament/create');
  };

  return (
    <div className="w-[80%] flex flex-col items-center justify-center mt-6 text-2xl px-4 ">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600">Create Tournament</h1>
      
      {/* Image Section with hover effect and gradient overlay */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative">
          <img
            src="https://images4.alphacoders.com/277/277594.jpg"
            alt="Tournament Image 1"
            className="rounded-lg w-full h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>
        
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIP.A3Zc465Mf5upBILOMknxcgHaEH?w=331&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt="Tournament Image 2"
            className="rounded-lg w-full h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>

        <div className="relative">
          <img
            src="https://hdqwalls.com/download/battlefield-4-pc-game-3840x2160.jpg"
            alt="Tournament Image 3"
            className="rounded-lg w-full h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>

        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIP.wYfb8iK1rkh-IFLU0tKXvAHaEK?rs=1&pid=ImgDetMain"
            alt="Tournament Image 4"
            className="rounded-lg w-full h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/R.d99bc358bd7fa9acffaee7e0d01063c9?rik=75PDfFb9JwkVnA&riu=http%3a%2f%2fimages2.alphacoders.com%2f648%2f64890.jpg&ehk=fXAw8%2fOoE1YlLGuccyKSqqZp5GrE%2fXj5wE3I9KNQ%2bDY%3d&risl=&pid=ImgRaw&r=0"
            alt="Tournament Image 4"
            className="rounded-lg w-full h-56 object-cover transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Create Your Tournament</h1>
      <p className="text-lg mb-6 text-center text-gray-700">
        Ready to create a tournament? Click the button below to get started.
      </p>

      <div className="w-full max-w-xs flex justify-center">
        <Button
          text="Create Tournament"
          onClick={handleCreateClick}
          
        />
      </div>
    </div>
  );
};

export default CreateTournamentPage;
