import UploadUtil from "../core/util/fileUpload";
import send from "koa-send";
import { resourcePath, uploadPath } from "../core/context/sys_context";
const path = require("path");

const router = require("koa-router")();

router.post("/", UploadUtil.single("file"), (ctx, next) => {
  // throw new BusinessException();
  ctx.body = ctx.file;
});
router.post("/download", async (ctx) => {
  await send(ctx, "file-1863068dc84.jpg", {
    root: resourcePath,
  });
});
router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

export default router;
