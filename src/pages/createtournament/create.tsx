// /pages/tournaments/create.tsx
import { useState } from 'react';

const CreateTournamentForm: React.FC = () => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamentDate, setTournamentDate] = useState('');
  const [tournamentDetails, setTournamentDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Tournament Created:', { tournamentName, tournamentDate, tournamentDetails });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create New Tournament</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Tournament Name
          </label>
          <input
            type="text"
            id="name"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-semibold mb-2">
            Tournament Date
          </label>
          <input
            type="date"
            id="date"
            value={tournamentDate}
            onChange={(e) => setTournamentDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block text-sm font-semibold mb-2">
            Tournament Details
          </label>
          <textarea
            id="details"
            value={tournamentDetails}
            onChange={(e) => setTournamentDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default CreateTournamentForm;
