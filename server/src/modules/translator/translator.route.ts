
import { translate } from "./translator.controller.js";
import { Router } from "express"

const router = Router()

router.post("/translate", translate)

export default router