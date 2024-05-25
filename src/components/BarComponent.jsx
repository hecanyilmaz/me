export default function BarComponent() {
    return (
        <div className="bar-component">
            <ul role="menu-bar">
                <li role="menu-item" tabindex="0" aria-haspopup="false">
                    <a href="/">Home</a>
                </li>
                <li role="menu-item" tabindex="0" aria-haspopup="true">
                    Explore
                    <ul role="menu">
                        <li role="menu-item"><a href="/soon">Technologies</a></li>
                        <li role="menu-item"><a href="/soon">Projects</a></li>
                        <li role="menu-item"><a href="/soon">Hobbies</a></li>
                        <li role="menu-item"><a href="/contact">Contact</a></li>
                        {/* ADD "style={{textDecoration: 'none'}}" INTO THE ITEMS */}
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
                            <a href="/soon">Medium</a>
                        </li>
                    </ul>
                </li>
                <li role="menu-item" tabindex="0" aria-haspopup="true">
                    Photos
                    <ul role="menu">
                        <li role="menu-item"><a href="/soon">Me</a></li>
                        <li role="menu-item"><a href="/soon">Other</a></li>
                    </ul>
                </li>
            </ul>
                <hr></hr>
        </div>
    );
} 