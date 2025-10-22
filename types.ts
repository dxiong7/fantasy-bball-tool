
export interface Player {
  player_key: string;
  name: {
    full: string;
  };
  editorial_team_abbr: string;
  display_position: string;
  eligible_positions: string[];
  selected_position: string;
  is_playing: boolean;
  image_url: string;
}

export interface Team {
  team_key: string;
  name: string;
  team_logos: {
    team_logo: {
      url: string;
    };
  }[];
  roster: Player[];
}

export interface User {
    guid: string;
    teams: Team[];
}
