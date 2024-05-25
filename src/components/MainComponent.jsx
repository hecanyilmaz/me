import BarComponent from "./BarComponent";
import BlankComponent from "./BlankComponent";

export default function MainComponent() {
    return (
        <div className="main-component">
            <div className="window">
                <BarComponent></BarComponent>
                <BlankComponent></BlankComponent>
            </div>
        </div>
    );
} 