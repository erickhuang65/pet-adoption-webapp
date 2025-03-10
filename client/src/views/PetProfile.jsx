import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import '../static/PetProfile.css'
import MapComponent from '../components/MapComponent.jsx'


const PetProfile = (props) => {

  // grabs pet id from the URL
  // destructure pet type
  const { id } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [dog, setDog] = useState([]);
  const [dogProfile, setDogProfile] = useState([]);
  const [coordinate, setCoordinate] = useState({});
  const [loaded, setLoaded] = useState(false)

  const navigate = useNavigate();

  const fetchSinglePet = async () => {
    try {
      console.log("Fetching pet with: ", id)
      const response = await axios.get('http://localhost:9999/api/pets/' + id);
      console.log("Fetch response", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching pet profile:', error);
      throw error;
    }
  }

  useEffect(() => {
    const getSinglePet = async () => {
      try {
        const serverRes = await fetchSinglePet();
        console.log('Server response data', serverRes.data);
        console.log('"Included data:', serverRes.included);

        const includedData = serverRes.included;
        const includedArr = includedData.filter(item => item.type === 'pictures').map(item => item.id);
        const lat = includedData.filter(item => item.type === 'locations').map(item => item.attributes.lat);
        const lng = includedData.filter(item => item.type === 'locations').map(item => item.attributes.lon);
        const latLng = {
          'lat': lat[0],
          'lng': lng[0],
        };
        console.log(latLng);

        setCoordinate(latLng);
        setDogProfile(includedArr);
        setDog(serverRes.data);
        setLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    getSinglePet();
  }, []);

  return (
    <div className='profile-main'>
      <div className='profile-container'>
        <div className='profile-left-container'>
          <MapComponent center={coordinate} />
          <div>
          <ul style={{ listStyleType: 'none'}}>
            {
              (loaded) ?
                dog.map(onedog => {
                  return (
                    <li key={onedog.attributes.id}>
                      <h3>{onedog.attributes.name}</h3>
                      <p>Characteristics: {onedog.attributes.qualities[0]}</p>
                      <p>House trained: {onedog.attributes.isHousetrained ? 'Yes': 'No'}</p>
                      <p>Fine with cats: {onedog.attributes.isCatsOk ? 'Yes': 'No'}</p>
                      <p>Obedience Training: {onedog.attributes.obedienceTraining}</p>
                    </li>
                  )
                }) : <></>
            }
          </ul>
          </div>
        </div>
        <div className='profile-right-container'>
          <ul style={{ listStyleType: 'none'}} >
            {
              (loaded) ?
                dog.map(onedog => {
                  return (
                    <li key={onedog.attributes.id}>
                      <img style={{ width: '400px', height: 'auto' }} src={onedog.attributes.pictureThumbnailUrl} />
                      <p><strong>Name: </strong> {onedog.attributes.name}</p>
                      <p><strong>Breed: </strong> {onedog.attributes.breedPrimary}</p>
                      <p><strong>Sex: </strong> {onedog.attributes.sex} </p>
                      <p><strong>Age: </strong> {onedog.attributes.ageString} </p>
                      <p><strong>Size: </strong> {onedog.attributes.sizeGroup} </p>
                    </li>
                  )
                }) : <></>
             }
          </ul>
        </div>
      </div>
    </div >
  )
}

export default PetProfile