
import type { Team, Player } from '../types';
import { ROSTER_POSITIONS } from '../constants';

const API_BASE_URL = 'https://fantasysports.yahooapis.com/fantasy/v2';

const makeApiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('yahoo_access_token');
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/xml;charset=utf-8',
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    console.error('API request failed', await response.text());
    throw new Error(`API request failed with status ${response.status}`);
  }

  // Yahoo API can return empty responses for successful PUTs
  if (response.status === 204 || response.headers.get('Content-Length') === '0') {
    return null;
  }

  return response.json();
};


export const getTeams = async (): Promise<Team[]> => {
  console.log('Fetching user\'s teams...');
  const data = await makeApiRequest('/users;use_login=1/games;game_keys=nba/teams');
  console.warn('PLACEHOLDER: Team data parsing not implemented. Returning mock data for UI.');
  console.log('Fetched raw team data:', data);
  // Returning mock data to allow UI to function. Replace with real parsing.
  return [
      { team_key: '428.l.12345.t.1', name: 'My Demo Team', team_logos: [{ team_logo: { url: 'https://picsum.photos/seed/team1/100' } }], roster: [] }
  ];
};

export const getRoster = async (teamKey: string): Promise<Player[]> => {
    console.log(`Fetching roster for team ${teamKey}...`);
    const data = await makeApiRequest(`/team/${teamKey}/roster`);
    console.warn('PLACEHOLDER: Roster data parsing not implemented. Returning mock data for UI.');
    console.log(`Fetched raw roster data for ${teamKey}:`, data);
    // Returning mock data to allow UI to function. Replace with real parsing.
    return [
      { player_key: '399.p.6027', name: { full: 'Stephen Curry' }, editorial_team_abbr: 'GS', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'PG', is_playing: true, image_url: 'https://picsum.photos/seed/curry/128' },
      { player_key: '399.p.5833', name: { full: 'Kevin Durant' }, editorial_team_abbr: 'PHX', display_position: 'SF,PF', eligible_positions: ['SF', 'PF'], selected_position: 'SF', is_playing: true, image_url: 'https://picsum.photos/seed/durant/128' },
      { player_key: '399.p.7513', name: { full: 'Tyrese Haliburton' }, editorial_team_abbr: 'IND', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'BN', is_playing: true, image_url: 'https://picsum.photos/seed/haliburton/128' },
      { player_key: '399.p.4718', name: { full: 'LeBron James' }, editorial_team_abbr: 'LAL', display_position: 'SF', eligible_positions: ['SF'], selected_position: 'IL', is_playing: false, image_url: 'https://picsum.photos/seed/lebron/128' },
    ];
}

const getEmptyRosterSlots = (roster: Player[]): Record<string, number> => {
    const slots: Record<string, number> = { 'PG': 1, 'SG': 1, 'G': 1, 'SF': 1, 'PF': 1, 'F': 1, 'C': 1, 'Util': 2 };
    roster.forEach(player => {
        if(ROSTER_POSITIONS.STARTING.includes(player.selected_position)) {
            if(slots[player.selected_position] > 0) slots[player.selected_position]--;
            if(player.eligible_positions.includes('PG') && slots['G'] > 0) slots['G']--;
            else if(player.eligible_positions.includes('SG') && slots['G'] > 0) slots['G']--;
            if(player.eligible_positions.includes('SF') && slots['F'] > 0) slots['F']--;
            else if(player.eligible_positions.includes('PF') && slots['F'] > 0) slots['F']--;
        }
    });
    return slots;
}

const generateRosterUpdateXml = (playersToUpdate: { player_key: string, position: string }[]): string => {
    const playersXml = playersToUpdate.map(p => `
        <player>
            <player_key>${p.player_key}</player_key>
            <position>${p.position}</position>
        </player>
    `).join('');

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return `
        <fantasy_content>
            <roster>
                <coverage_type>date</coverage_type>
                <date>${today}</date>
                <players>${playersXml}</players>
            </roster>
        </fantasy_content>
    `;
};


export const setOptimalLineup = async (teamKey: string): Promise<{ newRoster: Player[], changes: string[] }> => {
  console.log('Optimizing lineup for team:', teamKey);
  const currentRoster = await getRoster(teamKey);
  if (currentRoster.length === 0) {
      return { newRoster: [], changes: ['Roster data not available, cannot optimize.'] };
  }

  const newRoster: Player[] = JSON.parse(JSON.stringify(currentRoster));
  const changes: string[] = [];
  const benchedStarters = new Set<string>();

  newRoster.filter(p => ROSTER_POSITIONS.STARTING.includes(p.selected_position)).forEach(p => {
    if (!p.is_playing) {
      p.selected_position = 'BN';
      benchedStarters.add(p.player_key);
      changes.push(`Moved ${p.name.full} (inactive) to Bench.`);
    }
  });

  const activeBenchPlayers = newRoster.filter(p => p.selected_position === 'BN' && p.is_playing);
  const emptySlots = getEmptyRosterSlots(newRoster.filter(p => !benchedStarters.has(p.player_key)));
  const filledSlots = new Set<string>();

  const positionPriority = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'Util'];
  activeBenchPlayers.forEach(player => {
    for (const position of positionPriority) {
        if (player.eligible_positions.includes(position) && emptySlots[position] > 0 && !filledSlots.has(player.player_key)) {
            player.selected_position = position;
            emptySlots[position]--;
            filledSlots.add(player.player_key);
            changes.push(`Moved ${player.name.full} (active) from Bench to ${position}.`);
            break;
        }
    }
  });
  
  const playersToUpdate = newRoster
    .filter(p => currentRoster.find(cp => cp.player_key === p.player_key)?.selected_position !== p.selected_position)
    .map(p => ({ player_key: p.player_key, position: p.selected_position }));

  if (playersToUpdate.length > 0) {
      console.log('Sending roster update to Yahoo:', playersToUpdate);
      const xmlPayload = generateRosterUpdateXml(playersToUpdate);
      await makeApiRequest(`/team/${teamKey}/roster`, {
          method: 'PUT',
          body: xmlPayload,
          headers: { 'Content-Type': 'application/xml;charset=utf-8' }
      });
      console.log('Successfully updated roster on Yahoo.');
  } else {
      changes.push('No lineup changes were necessary.');
  }

  return { newRoster, changes };
};
