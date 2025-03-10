import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../static/SearchStyles.css'


const Search = (props) => {

    const [animals, setAnimals] = useState([])
    const [loaded, setLoaded] = useState(false)

    const fetchAllCats = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/cats');
            return response.data;
        } catch (error) {
            console.error('Error fetching pet profile:', error);
            throw error;
        }
    }

    useEffect(() => {
        const getAllCats = async() => {
            try {
                const serverRes = await fetchAllCats();
                console.log('Server response data', serverRes);
                console.log('"Included data:', serverRes.included);
                setAnimals(serverRes.data);
                setLoaded(true)
            } catch (error) {
                console.log(error);
            }
        };
        getAllCats();
    }, []); 

    // custom filter so user can filter the attributes

    return (
        <div className='search-main'>
            <div className='search-container'>
                <div className='search-left-container'>
                    <div>
                        <select name="speciies">
                            <option value="">Mammals</option>
                            <option value="">Birds</option>
                            <option value="">Reptiles</option>
                            <option value="">Amphibians</option>
                        </select>
                    </div>
                    <div>
                        <select name="breed">
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Rabbit">Rabbit</option>
                        </select>
                    </div>
                    <div>
                        <select name="age">
                            <option value=""> Less than a year</option>
                            <option value="">Age 1 - 5</option>
                            <option value="">Age 5 - 10</option>
                            <option value="">Age 10 and Up</option>
                        </select>
                    </div>
                    <div>
                        <select name="gender">
                            <option value="">Female</option>
                            <option value="">Male</option>
                        </select>
                    </div>
                    <div>
                        <select name="size">
                            <option value="">Small (less than 20lbs)</option>
                            <option value="">Medium (less than 40lbs)</option>
                            <option value="">Large (More than 40lbs)</option>
                        </select>
                    </div>
                    <div>
                        <select name="size">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                    <div>
                        <select name="size">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <div className='search-right-container'>
                    {animals.slice(0,24).map((animal, index) => (
                        <button  key={index} className='search-button'>
                            <img className='search-button-img' src={animal.attributes.pictureThumbnailUrl} alt={animal.name} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search