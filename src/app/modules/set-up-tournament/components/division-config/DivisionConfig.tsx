import { Horizontal } from "../../../wizards/components/Horizontal";
import { useParams } from "react-router-dom";


const DivisionConfig = () => {

    const { id } = useParams();
    console.log('id', id);
    return (
        <>
        
        <Horizontal/>
        </>
    )
};

export default DivisionConfig;