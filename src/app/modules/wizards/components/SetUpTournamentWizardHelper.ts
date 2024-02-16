import * as Yup from 'yup';

export interface ISetUpTournament {
    tournamentType: string
    PlayerPerTeam: number | null
    ExtraTime: boolean
    NumberTeams: number | null
    MatchDuration: number | null
    teams?: { name: string, logo: string  , location : string}[]
   
}

const SetUpTournamentschemas = [
    Yup.object({
        tournamentType: Yup.string().required().label('Division Type'),
    }),
    Yup.object({
        PlayerPerTeam: Yup.number().min(3, 'Minimum 3 players are required per team').max(11, 'Maximum 11 players are allowed per team').required('Player Per Team is required').label('Player Per Team'),
        NumberTeams: Yup.number().min(2, 'Minimum 2 teams are required').test('is-even', 'The number of teams must be even', value => value ? value % 2 === 0 : false).required('Number of Teams is required'), 
        MatchDuration: Yup.number().min(1, 'Minimum 1 minute is required').max(120, 'Maximum 120 minutes are allowed').required('Match Duration is required').label('Match Duration'),}),
    Yup.object({

    }),
    Yup.object({

    }),

]

const initsSetUp: ISetUpTournament = {
        tournamentType: 'singlematch',
        PlayerPerTeam: null,
        ExtraTime:false,
        NumberTeams:null,
        MatchDuration: null,
        teams: []

}

export { SetUpTournamentschemas, initsSetUp }