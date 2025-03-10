// define all API logic: RescueGroup API & Google Maps
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();
const REST_ROUTE = "https://api.rescuegroups.org/v5";
const RESCUE_API_KEY = process.env.RESCUE_API_KEY

const rescueGroupAPI = axios.create({
    baseURL: REST_ROUTE,
    headers: {
        'Content-Type': 'application/vnd.api+json',
        'Authorization':  RESCUE_API_KEY ,
    }
});

async function getAllPets(req  , res) {
    try {
        const response = await rescueGroupAPI.get('/public/animals/search/available' ,{
            params: {
                apiKey:  RESCUE_API_KEY, 
            }
        });
        res.json(response.data);
        console.log('API response: ', response.data);
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};

async function getAllDogs(req  , res) {
    try {
        const response = await rescueGroupAPI.get('/public/animals/search/available/dogs' ,{
            params: {
                apiKey:  RESCUE_API_KEY, 
            }
        });
        res.json(response.data);
        console.log('API response: ', response.data);
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
};

async function getAllCats(req, res) {
    try {
        const response = await rescueGroupAPI.get('/public/animals/search/available/cats' ,{
            params: {
                apiKey:  RESCUE_API_KEY,
            }
        });
        res.json(response.data);
        console.log('API response: ', response.data);
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
}

async function getSingleDog(req, res) {
    try {
        const animalId = req.params.id;
        const response = await rescueGroupAPI.post('/public/animals/search/available/dogs/haspic/', {
            data: {
                filters: [
                    {
                        fieldName: "animals.id",  // Filtering by specific animal ID
                        operation: "equals",
                        criteria: animalId
                    }
                    ]
                }, 
            params: {
                apiKey: RESCUE_API_KEY,
                'include': 'breeds, locations, pictures',
                'sort': 'random',
                'limit': 1
            }
        });
        res.json(response.data);
        console.log("Single  dog response: ", response.data);
    } catch (error) {
        console.error("Error fetching dog: ", error);
        throw error;
    }
}

// async function getSinglePet(req, res) {
//     try {

//     }
// };


export {
    getAllPets,
    getAllDogs,
    getAllCats,
    getSingleDog
};