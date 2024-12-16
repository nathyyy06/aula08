import {useParams} from "react-router-dom";
import default function Alterar() {

    const { id } = useParams();
    return(
        
        <h1>Página Alterar {id} </h1>
    );
}