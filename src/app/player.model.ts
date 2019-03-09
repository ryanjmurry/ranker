export class Player {
  public mfsId: string;
  public firstName: string;
  public lastName: string;
  public jerseyNumber?: string;
  public position: string;
  public img?: string;
  public team: {
    id?: string;
    city?: string;
    name?: string;
    abbreviation?: string;
    logo?: string;
  };
  public overall: {
    wins: number;
    losses: number;
  };
  public rebounder: {
    wins: number;
    losses: number;
  };
  public defender: {
    wins: number;
    losses: number;
  };
  public shooter: {
    wins: number;
    losses: number;
  };
  public scorer: {
    wins: number;
    losses: number;
  };
  public passer: {
    wins: number;
    losses: number;
  };
}
