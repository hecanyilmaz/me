import ComingSoonComponent from "./ComingSoonComponent";
import ContactComponent from "./ContactComponent";
import QuoteComponent from "./QuoteComponent";
import { Route, Routes} from 'react-router-dom';

export default function RightComponent() {
    return(
        <div className="right-component">
            <Routes>
                <Route path="*" element={<QuoteComponent/>}></Route>
                <Route path="/" exact element={<QuoteComponent/>}></Route>
                <Route path="/home" exact element={<QuoteComponent/>}></Route>
                <Route path="/contact" exact element={<ContactComponent/>}></Route>
                <Route path="/soon" exact element={<ComingSoonComponent/>}></Route>
            </Routes>
        </div>
    );
}