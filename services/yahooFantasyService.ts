
import type { Team, Player } from '../types';
import { ROSTER_POSITIONS } from '../constants';

const MOCK_TEAMS: Team[] = [
  {
    team_key: '428.l.12345.t.1',
    name: 'Steph Infection',
    team_logos: [{ team_logo: { url: 'https://picsum.photos/seed/team1/100' } }],
    roster: [
      { player_key: '399.p.6027', name: { full: 'Stephen Curry' }, editorial_team_abbr: 'GS', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'PG', is_playing: true, image_url: 'https://picsum.photos/seed/curry/128' },
      { player_key: '399.p.5833', name: { full: 'Kevin Durant' }, editorial_team_abbr: 'PHX', display_position: 'SF,PF', eligible_positions: ['SF', 'PF'], selected_position: 'SF', is_playing: true, image_url: 'https://picsum.photos/seed/durant/128' },
      { player_key: '399.p.5471', name: { full: 'Anthony Davis' }, editorial_team_abbr: 'LAL', display_position: 'PF,C', eligible_positions: ['PF', 'C'], selected_position: 'C', is_playing: true, image_url: 'https://picsum.photos/seed/davis/128' },
      { player_key: '399.p.7121', name: { full: 'Trae Young' }, editorial_team_abbr: 'ATL', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'G', is_playing: false, image_url: 'https://picsum.photos/seed/young/128' },
      { player_key: '399.p.6606', name: { full: 'Donovan Mitchell' }, editorial_team_abbr: 'CLE', display_position: 'SG', eligible_positions: ['SG'], selected_position: 'SG', is_playing: false, image_url: 'https://picsum.photos/seed/mitchell/128' },
      { player_key: '399.p.6583', name: { full: 'Jayson Tatum' }, editorial_team_abbr: 'BOS', display_position: 'SF,PF', eligible_positions: ['SF', 'PF'], selected_position: 'PF', is_playing: true, image_url: 'https://picsum.photos/seed/tatum/128' },
      { player_key: '399.p.6610', name: { full: 'Bam Adebayo' }, editorial_team_abbr: 'MIA', display_position: 'C', eligible_positions: ['C'], selected_position: 'Util', is_playing: true, image_url: 'https://picsum.photos/seed/adebayo/128' },
      { player_key: '399.p.7513', name: { full: 'Tyrese Haliburton' }, editorial_team_abbr: 'IND', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'BN', is_playing: true, image_url: 'https://picsum.photos/seed/haliburton/128' },
      { player_key: '399.p.6619', name: { full: 'De\'Aaron Fox' }, editorial_team_abbr: 'SAC', display_position: 'PG', eligible_positions: ['PG'], selected_position: 'BN', is_playing: true, image_url: 'https://picsum.photos/seed/fox/128' },
      { player_key: '399.p.7032', name: { full: 'Zion Williamson' }, editorial_team_abbr: 'NO', display_position: 'PF', eligible_positions: ['PF'], selected_position: 'BN', is_playing: false, image_url: 'https://picsum.photos/seed/zion/128' },
      { player_key: '399.p.5855', name: { full: 'Klay Thompson' }, editorial_team_abbr: 'GS', display_position: 'SG,SF', eligible_positions: ['SG', 'SF'], selected_position: 'BN', is_playing: true, image_url: 'https://picsum.photos/seed/klay/128' },
      { player_key: '399.p.4718', name: { full: 'LeBron James' }, editorial_team_abbr: 'LAL', display_position: 'SF', eligible_positions: ['SF'], selected_position: 'IL', is_playing: false, image_url: 'https://picsum.photos/seed/lebron/128' },
    ],
  },
  {
    team_key: '428.l.12345.t.2',
    name: 'Jokic\'s Day Off',
    team_logos: [{ team_logo: { url: 'https://picsum.photos/seed/team2/100' } }],
    roster: [], // Roster can be populated with more mock data if needed
  }
];

// Mocks a network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getTeams = async (): Promise<Team[]> => {
  console.log('Fetching user\'s teams...');
  await delay(800); // Simulate API call
  console.log('Fetched teams:', MOCK_TEAMS);
  return MOCK_TEAMS;
};

export const getRoster = async (teamKey: string): Promise<Player[]> => {
    console.log(`Fetching roster for team ${teamKey}...`);
    await delay(500);
    const team = MOCK_TEAMS.find(t => t.team_key === teamKey);
    if (!team) throw new Error('Team not found');
    console.log('Fetched roster:', team.roster);
    return team.roster;
}

const getEmptyRosterSlots = (roster: Player[]): Record<string, number> => {
    // This is a simplified version. A real app would need to fetch league settings
    // to know the exact number of slots for each position (e.g., PG, SG, C, Util, Util).
    const slots: Record<string, number> = { 'PG': 1, 'SG': 1, 'G': 1, 'SF': 1, 'PF': 1, 'F': 1, 'C': 1, 'Util': 2 };
    
    roster.forEach(player => {
        if(ROSTER_POSITIONS.STARTING.includes(player.selected_position)) {
            if(slots[player.selected_position] > 0) {
                slots[player.selected_position]--;
            }
            // Handle generic positions
            if(player.eligible_positions.includes('PG') && slots['G'] > 0) slots['G']--;
            else if(player.eligible_positions.includes('SG') && slots['G'] > 0) slots['G']--;

            if(player.eligible_positions.includes('SF') && slots['F'] > 0) slots['F']--;
            else if(player.eligible_positions.includes('PF') && slots['F'] > 0) slots['F']--;
        }
    });

    return slots;
}

export const setOptimalLineup = async (teamKey: string): Promise<{ newRoster: Player[], changes: string[] }> => {
  console.log('Optimizing lineup for team:', teamKey);
  await delay(1500);

  const team = MOCK_TEAMS.find(t => t.team_key === teamKey);
  if (!team) throw new Error('Team not found');

  // Deep copy to avoid mutating the mock data directly
  const currentRoster: Player[] = JSON.parse(JSON.stringify(team.roster));
  const changes: string[] = [];

  // 1. Move inactive starters to bench
  const starters = currentRoster.filter(p => ROSTER_POSITIONS.STARTING.includes(p.selected_position));
  const benchedStarters = new Set<string>();

  for (const player of starters) {
    if (!player.is_playing) {
      player.selected_position = 'BN';
      benchedStarters.add(player.player_key);
      changes.push(`Moved ${player.name.full} (inactive) to Bench.`);
    }
  }

  // 2. Get active players on bench
  const activeBenchPlayers = currentRoster.filter(p => p.selected_position === 'BN' && p.is_playing);

  // 3. Find empty slots and fill them
  const emptySlots = getEmptyRosterSlots(currentRoster.filter(p => !benchedStarters.has(p.player_key)));
  const filledSlots = new Set<string>();

  const tryFillSlot = (player: Player, slot: string) => {
    if (player.eligible_positions.includes(slot) && emptySlots[slot] > 0 && !filledSlots.has(player.player_key)) {
      player.selected_position = slot;
      emptySlots[slot]--;
      filledSlots.add(player.player_key);
      changes.push(`Moved ${player.name.full} (active) from Bench to ${slot}.`);
      return true;
    }
    return false;
  };
  
  // Prioritize specific positions first, then generic/util
  const positionPriority = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'Util'];
  
  for (const player of activeBenchPlayers) {
    for (const position of positionPriority) {
      if (tryFillSlot(player, position)) {
        break; // Player has been placed, move to next player
      }
    }
  }

  console.log('Optimization complete. New Roster:', currentRoster, 'Changes:', changes);
  // In a real app, you would now make a PUT request to the Yahoo API with the new roster positions.
  
  // For the mock, we'll update the "database"
  const teamIndex = MOCK_TEAMS.findIndex(t => t.team_key === teamKey);
  if (teamIndex !== -1) {
    MOCK_TEAMS[teamIndex].roster = currentRoster;
  }

  return { newRoster: currentRoster, changes };
};
