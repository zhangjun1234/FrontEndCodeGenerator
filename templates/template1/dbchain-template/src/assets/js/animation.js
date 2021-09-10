import { add } from "./animationJson/add";
import { save } from "./animationJson/save";
import { send } from "./animationJson/send";
import { create } from "./animationJson/create";
import { search } from "./animationJson/search";
import { update } from "./animationJson/update";
import { del } from "./animationJson/del";
import { upload } from "./animationJson/upload";

// let url = `https://dazhonghua-xiaoyao.oss-cn-guangzhou.aliyuncs.com/dbchain_web/animationImg/`;
export const animationJSON = {
  save: save,
  send: send,
  create: create,
  search: search,
  add: add,
  update: update,
  del: del,
  upload: upload,
};
