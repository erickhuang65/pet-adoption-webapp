import { useState } from "react";

const ImageSlider = ( {slides} ) => {

    // create a current index and set index to move the slides
    const[currentIndex, setcurrentIndex] = useState(0);

    const sliderStyles = {
        height: '100%',
        margin: "2px",
        position: 'relative'
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].URL})`
    }

    const leftArrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '100px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    }; 

    const rightArrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '100px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    }; 

    const goToPrevious = () => {
        // add a checker to see if its the first slide
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setcurrentIndex(newIndex); 
    }

    const goToNext =() => {
        // add a checker to see if there are more index to move to
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setcurrentIndex(newIndex)
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrow} onClick={goToPrevious}>&#x2770;</div>
            <div style={rightArrow} onClick={goToNext}>&#x2771;</div>
            <div style={slideStyles}></div>
        </div>
    )
};

export default ImageSlider;