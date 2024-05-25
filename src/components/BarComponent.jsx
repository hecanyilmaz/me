import { Link } from "react-router-dom"

export default function BarComponent() {
    return (
        <div className="bar-component">
            <ul role="menu-bar">
                <li role="menu-item" tabindex="0" aria-haspopup="false">
                    <a><Link to={"/"} className="mylink">Home</Link></a>
                </li>
                <li role="menu-item" tabindex="0" aria-haspopup="true">
                    Explore
                    <ul role="menu">
                        <li role="menu-item"><a><Link to={"/soon"} className="mylink">Technologies</Link></a></li>
                        <li role="menu-item"><a><Link to={"/soon"} className="mylink">Projects</Link></a></li>
                        <li role="menu-item"><a><Link to={"/soon"} className="mylink">Hobbies</Link></a></li>
                        <li role="menu-item"><a><Link to={"/contact"} className="mylink">Contact</Link></a></li>
                    </ul>
                </li>
                <li role="menu-item" tabindex="0" aria-haspopup="true">
                    Connect
                    <ul role="menu">
                        <li role="menu-item">
                            <a href="https://github.com/hecanyilmaz" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </li>
                        <li role="menu-item">
                            <a href="https://www.linkedin.com/in/hecanyilmaz/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </li>
                        <li role="menu-item">
                            <a>
                                <Link to={"/soon"} className="mylink">Medium</Link>
                            </a>
                        </li>
                    </ul>
                </li>
                <li role="menu-item" tabindex="0" aria-haspopup="true">
                    Photos
                    <ul role="menu">
                        <li role="menu-item"><a><Link to={"/soon"} className="mylink">Me</Link></a></li>
                        <li role="menu-item"><a ><Link to={"/soon"} className="mylink">Other</Link></a></li>
                    </ul>
                </li>
            </ul>
                <hr></hr>
        </div>
    );
} 