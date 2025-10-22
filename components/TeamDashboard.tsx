
import React, { useState, useEffect, useCallback } from 'react';
import type { Team, Player } from '../types';
import { getRoster, setOptimalLineup } from '../services/yahooFantasyService';
import PlayerCard from './PlayerCard';
import { ROSTER_POSITIONS } from '../constants';
import { LoadingSpinner, MagicWandIcon } from './Icons';

interface TeamDashboardProps {
  team: Team;
}

const TeamDashboard: React.FC<TeamDashboardProps> = ({ team }) => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [isLoadingRoster, setIsLoadingRoster] = useState<boolean>(true);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationLog, setOptimizationLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRosterData = useCallback(async () => {
    try {
      setIsLoadingRoster(true);
      setError(null);
      const rosterData = await getRoster(team.team_key);
      setRoster(rosterData);
    } catch (err) {
      setError('Failed to load roster.');
      console.error(err);
    } finally {
      setIsLoadingRoster(false);
    }
  }, [team.team_key]);

  useEffect(() => {
    fetchRosterData();
  }, [fetchRosterData]);

  const handleOptimizeLineup = async () => {
    setIsOptimizing(true);
    setOptimizationLog(['Starting lineup optimization...']);
    try {
      const { newRoster, changes } = await setOptimalLineup(team.team_key);
      setRoster(newRoster);
      if (changes.length > 0) {
        setOptimizationLog(prev => [...prev, ...changes, 'Optimization complete!']);
      } else {
        setOptimizationLog(prev => [...prev, 'No changes needed. Your lineup is already optimal for today!']);
      }
    } catch (err) {
      setOptimizationLog(prev => [...prev, 'An error occurred during optimization.']);
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const renderPlayerList = (players: Player[], title: string) => (
    <div>
      <h3 className="text-lg font-semibold text-medium-text mb-3 tracking-wide">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {players.map(player => (
          <PlayerCard key={player.player_key} player={player} />
        ))}
      </div>
    </div>
  );

  const starters = roster.filter(p => ROSTER_POSITIONS.STARTING.includes(p.selected_position));
  const bench = roster.filter(p => ROSTER_POSITIONS.BENCH.includes(p.selected_position));
  const injured = roster.filter(p => ROSTER_POSITIONS.INJURED.includes(p.selected_position));

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 shadow-xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <img src={team.team_logos[0].team_logo.url} alt={`${team.name} logo`} className="h-16 w-16 rounded-full" />
          <h2 className="text-3xl font-bold text-light-text">{team.name}</h2>
        </div>
        <button
          onClick={handleOptimizeLineup}
          disabled={isOptimizing}
          className="flex items-center justify-center px-5 py-3 bg-yahoo-purple text-white font-bold rounded-lg hover:opacity-90 transition-all duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-md"
        >
          {isOptimizing ? (
            <>
              <LoadingSpinner className="h-5 w-5 mr-3" />
              Optimizing...
            </>
          ) : (
            <>
              <MagicWandIcon className="h-5 w-5 mr-3" />
              Set Optimal Lineup
            </>
          )}
        </button>
      </div>

      {optimizationLog.length > 0 && (
        <div className="bg-black/30 p-4 rounded-md border border-dark-border">
          <h4 className="font-semibold mb-2 text-light-text">Optimization Log:</h4>
          <ul className="text-sm text-medium-text space-y-1 font-mono">
            {optimizationLog.map((log, index) => <li key={index}>{`> ${log}`}</li>)}
          </ul>
        </div>
      )}

      {isLoadingRoster ? (
        <div className="text-center py-10">
          <LoadingSpinner className="h-8 w-8 text-yahoo-purple mx-auto" />
          <p className="mt-3 text-medium-text">Loading Roster...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="space-y-8">
          {renderPlayerList(starters, 'Starting Lineup')}
          {renderPlayerList(bench, 'Bench')}
          {renderPlayerList(injured, 'Injured List')}
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;
