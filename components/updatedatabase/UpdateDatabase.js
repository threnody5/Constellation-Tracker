import { database } from "../../FireBaseConfig";
import { ref, set } from  'firebase/database';
import SetLocation from "../location/SetLocation";

export default function UpdateDatabase(props) {
    SetLocation();
    const { haveSeen, test } = props;

    console.log(test);

}
