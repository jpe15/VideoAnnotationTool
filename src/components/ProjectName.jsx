import { useProjectName } from "./AppContext";

const ProjectName = () => {

    const [projName] = useProjectName();

    return ( 
        <p>{projName}</p>
     );
}
 
export default ProjectName;