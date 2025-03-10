import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../static/HomeStyles.css';
import Pic1 from '../static/shiba.jpg'
import Pic2 from '../static/kitten.jpg'

const slides = [
    {
        URL: Pic1
    },
    {
        URL: Pic2
    }
];

const fetchAnimals = async () => {
    try {
        const response = await axios.get('http://localhost:9999/api/allpets');
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error('Error fetching animals:', error);
        throw error;
    }
};


const Home = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animals, setAnimals] = useState([])
    const [species, setSpecies] = useState("")
    const [loaded, setLoaded] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const getAnimals = async () => {
            try {
                const serverRes = await fetchAnimals();
                console.log('Server response data', serverRes.data);
                console.log('Included Data: ', serverRes.included)
                const includedData = serverRes.included;

                // grab included data and render it to every animal. Then, grab the type and pass it to useParams
                const type = includedData
                .filter(item => item.type ===' species')
                .map(item => item.attributes.plural);
                console.log("Type: ", type);

                setAnimals(serverRes.data);
                setLoaded(true)
            } catch (error) {
                //setError(error); 
            } //finally {
            //setLoading(false);
            //}
        };
        getAnimals();
    }, []);


    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].URL})`,
        alignItems: 'center',
        justifyContent: 'center'
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        console.log("clicked previous")
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        console.log("clicked next")
        setCurrentIndex(newIndex);
    };

    const handleRightContainerClick = () => {
        console.log('clicked')
        navigate('/adoptapet/search')

    }; 

    const profileClick = (petID) => {
        console.log(`Animal clicked: ${petID}`);
        navigate(`/adoptapet/search/profile/${petID}`)
    }

    return (
        <div className='home-main'>
            <div className='container'>
                <div className='home-left-container'>
                    <div className='home-text-styles'>
                        <h2 style={{ color: '#FF7F50'}}>Where pets find a new home</h2>
                    </div>
                    <div className='home-text-styles'>
                        <p style={{ color: '#FF7F50'}}>Thousands of pets are waiting to be adopted near you!</p>
                    </div>
                    <div className='home-left-sub'>
                        <ul>
                            {
                                /* this ternary checks if fetching was succesful */
                                (loaded) ?
                                    animals.slice(0, 6).map(animal => {
                                        return (
                                            <button onClick={() => profileClick(animal.id)} style={{background: 'white'}}>
                                                <p  style={{ fontWeight: 'bold', color: '#FF7F50', alignItems: 'center'}}>{animal.attributes.name}</p>
                                                <img src={animal.attributes.pictureThumbnailUrl} />
                                            </button>
                                        )
                                    }) : <></>
                            }
                        </ul>
                    </div>
                </div>

                <div className='home-right-container'>
                    <div className='slideStyles'>
                        <div className='home-leftArrow' onClick={goToPrevious}>&#x2770;</div>
                        <div className='home-rightArrow' onClick={goToNext}>&#x2771;</div>
                        <div style={slideStyles} onClick={handleRightContainerClick}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
