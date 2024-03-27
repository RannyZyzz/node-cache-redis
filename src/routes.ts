import { Router } from "express";
import { authentication } from "./middleware/auth";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginUserController } from "./controllers/LoginUsersControllers";
import { GetUserInfoController } from "./controllers/GetUserInfoController";


const router = Router();

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const getUserInfoController = new GetUserInfoController()

router.get('/', (request, response) => {
    response.send("I'm ok")
})

router.post('/users', createUserController.handle)
router.post('/login', loginUserController.handle)
router.get('/users/profile', authentication, getUserInfoController.handle)

export default router