
import React from 'react';
import type { Player } from '../types';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="bg-[#2a2a2a] rounded-lg p-4 border border-dark-border flex items-center space-x-4 transition-all hover:border-yahoo-purple/50 hover:shadow-lg">
      <img
        src={player.image_url}
        alt={player.name.full}
        className="h-16 w-16 rounded-full object-cover border-2 border-dark-border"
      />
      <div className="flex-1">
        <p className="font-bold text-light-text text-lg leading-tight">{player.name.full}</p>
        <p className="text-sm text-medium-text">{player.editorial_team_abbr} - {player.display_position}</p>
        <div className="flex items-center mt-2">
            <span className="text-xs font-bold bg-gray-600 text-gray-200 px-2 py-1 rounded-full mr-2">{player.selected_position}</span>
            {player.is_playing ? (
                <span className="flex items-center text-xs font-semibold text-green-400">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Playing Today
                </span>
            ) : (
                 <span className="flex items-center text-xs font-semibold text-gray-400">
                    <span className="h-2 w-2 bg-gray-500 rounded-full mr-1.5"></span>
                    Inactive
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
