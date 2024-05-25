import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";


export default function BlankComponent() {
    return(
        <div className="blank-component">
            <LeftComponent/>
            <RightComponent/>
        </div>
    );
}