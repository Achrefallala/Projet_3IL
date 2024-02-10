import * as Yup from 'yup';

export interface ISetUpTournament {
    tournamentType: string
   
}

const SetUpTournamentschemas = [
    Yup.object({
            tournamentType: Yup.string().required().label('Tournament Type'),
    }),
    Yup.object({

    }),
    Yup.object({

    }),
    Yup.object({

    }),

]

const initsSetUp: ISetUpTournament = {
     tournamentType: 'singlematch',

}

export { SetUpTournamentschemas, initsSetUp }