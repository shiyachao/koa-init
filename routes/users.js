import {
  addUser,
  delUser,
  editUser,
  getUser,
} from "../server/controller/user.controller";

const router = require("koa-router")();

router.prefix("/user");

router.get("/", getUser);
router.post("/", addUser);
router.put("/:id", editUser);
router.delete("/:id", delUser);

export default router;
