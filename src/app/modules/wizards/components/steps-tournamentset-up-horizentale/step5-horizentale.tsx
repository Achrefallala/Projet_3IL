import { FC, useEffect } from "react";
import { ISetUpTournament } from "../../../wizards/components/SetUpTournamentWizardHelper";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";


const Step5Horizentale: FC = () => {

    const teams = useSelector((state: any) => state.teams.teams);
    const { values, setFieldValue, errors } = useFormikContext<ISetUpTournament>();

    useEffect(() => {
        handleSetValues();
    }, []);

    const handleSetValues = async () => {
        // const transformedTeams = await handleTeamsData();
        if (values?.teams === undefined) return;

        const teamsCopy = [...values?.teams].map((team: any) => {
            delete team.players;
            delete team.subtitutes;
        });
        setFieldValue('teams', teamsCopy);
        console.log('transformed teams here ', values);
    }



    async function handleTeamsData() {
        const transformedTeams = teams.map(async team => {
            // Filter the players and subtitutes and convert them to their IDs
            const transformedPlayers = team.players.filter(player => typeof player._id === "string").map(player => player._id);
            const transformedSubtitutes = team.subtitutes.filter(subtitute => typeof subtitute._id === "string").map(subtitute => subtitute._id);

            // Fetch the blob data from the blob URL
            const response = await fetch(team.logo);
            const blob = await response.blob();

            // Create a file from the blob
            const file = new File([blob], "logo.jpg", { type: "image/jpeg" });

            // Return a new team object with the transformed players and logo
            return {
                ...team,
                players: transformedPlayers,
                subtitutes: transformedSubtitutes,
                logo: file
            };
        });

        // Use Promise.all to wait for all the fetch promises to resolve
        const teamsPromise = await Promise.all(transformedTeams);

        // This is your transformed data
        const transformedData = {
            teamsPromise
        };

        return transformedData.teamsPromise;
    }



    return (
        <div>
            <button onClick={() => handleSetValues()}>set teams in fromik values</button>
            <h1>Step horizentale 5</h1>


            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            -----------------------------------------------------------------------------------------------------
            -----------------------------------------------------------------------------------------------------
            -----------------------------------------------------------------------------------------------------
            -----------------------------------------------------------------------------------------------------
            <h1>now formik values as whole </h1>
            <p>
                {JSON.stringify(values)}

            </p>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>

    )
}
export { Step5Horizentale };