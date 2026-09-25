import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/Api";
import "./Versionpage.css"


interface VersionHyperLinkParams {
    folder: string;
    file: string;
}

function VersionHyperlink({ folder, file }: VersionHyperLinkParams) {
    return (
        <a href={`${api.url}/api/repositories/${folder}/${file}`}>{file}</a>
    )
}



export default function Versionpage() {
    const { programName = "" } = useParams();
    const [versions, setVersions] = useState<string[]>([]);
    

    useEffect(() => {
        let cancelled = false;
    
        api
            .getProgramVersions(programName.toLowerCase())
            .then((result) => {
              if (!cancelled) setVersions(result);
            })
            .catch((err) => console.error(err));

        return () => {
          cancelled = true;
        };
    }, [programName]);

    if (programName == "") {
        return (
            <p>Please enter a programname to search for in the version repository.</p>
        )
    } else if (versions.length == 0) {
        return (
            <p>This program has no available version repository.</p>
        )
    }

    return (
        <>
            <ul>
                {versions.map((file) => (
                    <li key={file}>
                        <VersionHyperlink folder={programName} file={file} />
                    </li>
                ))}
            </ul>
        </>
    )
}