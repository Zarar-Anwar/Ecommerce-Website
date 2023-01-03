import express from "express";
import controller from "../controller/controller.js";

const router=express.Router()

router.get('/api/products',controller.showData)
export default router