import img from '../image4.jpg';

export default function MeComponent() {
    return (
        <div className='component-me'>
            <div className='photo-me'>
                <div className='pic'>
                    <img src={img} alt='me'/>
                </div>
            </div>
            <div className='about-me'>
                <h1 className='welcome-1'>
                    Huseyin Can
                </h1> 
                <h1 className='welcome-1'>
                    Yilmaz
                </h1> 
                <p className='paragraph-1'>
                Hey there! I'm a senior computer engineering student at Hacettepe University. When I'm not buried in code you can find me glued to the screen watching motorsports or car documentaries. Join me on my journey through the world of technology and the thrill of the race track!
                </p>
            </div>
        </div>
    );
}
