import { Router } from "express";
import { getAllCats, getAllDogs, getAllPets, getSingleDog } from "../controllers/api.controller.js";

const router = Router();

router.route("/allpets")
    .get(getAllPets)

router.route("/dogs")
    .get(getAllDogs)

router.route("/cats")
    .get(getAllCats)

// router.route("/pets/:species/:id")
router.route("/pets/:id")
    .get(getSingleDog)

export default router;

