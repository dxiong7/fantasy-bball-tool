
import React, { useState, useEffect } from 'react';
import type { Team } from '../types';
import { getTeams } from '../services/yahooFantasyService';
import TeamDashboard from './TeamDashboard';
import { LoadingSpinner } from './Icons';

const Dashboard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamKey, setSelectedTeamKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const userTeams = await getTeams();
        setTeams(userTeams);
        if (userTeams.length > 0) {
          setSelectedTeamKey(userTeams[0].team_key);
        }
      } catch (err) {
        setError('Failed to fetch teams. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner className="h-10 w-10 text-yahoo-purple" />
        <p className="ml-4 text-lg text-medium-text">Loading your teams...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  
  const selectedTeam = teams.find(t => t.team_key === selectedTeamKey);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="team-select" className="block text-sm font-medium text-medium-text mb-2">
          Select Your Team
        </label>
        <select
          id="team-select"
          value={selectedTeamKey || ''}
          onChange={(e) => setSelectedTeamKey(e.target.value)}
          className="w-full max-w-sm bg-dark-card border border-dark-border rounded-md px-3 py-2 text-light-text focus:ring-2 focus:ring-yahoo-purple focus:border-yahoo-purple"
        >
          {teams.map((team) => (
            <option key={team.team_key} value={team.team_key}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTeam ? (
        <TeamDashboard key={selectedTeam.team_key} team={selectedTeam} />
      ) : (
        <p className="text-center text-medium-text">No teams found.</p>
      )}
    </div>
  );
};

export default Dashboard;
