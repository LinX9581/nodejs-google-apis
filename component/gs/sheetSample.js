import * as googleApis from "../../api/googleApis/gsCustom.js";
import config from "../../config.js";

// createSheet()
async function createSheet() {
  try {
    await googleApis.createGsSheet(config.sheetId.test, "123");
    console.log("更新完成");
  } catch (error) {
    console.log(error);
  }
}

// updateSheet();
async function updateSheet() {
  try {
    await googleApis.updateGsSheet(config.sheetId.test, "123" + "!A1", [["1asdasd"]]);
    console.log("更新完成");
  } catch (error) {
    console.log(error);
  }
}

// clearSheet();
async function clearSheet() {
  try {
    await googleApis.clearGsSheet(config.sheetId.test, "123" + "!A1");
    console.log("更新完成");
  } catch (error) {
    console.log(error);
  }
}

// deleteSheet();
async function deleteSheet() {
  try {
    await googleApis.deleteGsSheet(config.sheetId.test, '123');
    console.log("更新完成");
  } catch (error) {
    console.log(error);
  }
}