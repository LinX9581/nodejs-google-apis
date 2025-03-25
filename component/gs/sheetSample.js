import * as googleApis from "../../api/googleApis/gsCustom";

// sheetSample();
export async function sheetSample() {
  try {
    await googleApis.updateGsSheet(config.sheetId.test, "Sheet1" + "!A1", [["1asdasd"]]);

    // sheetId,workTitle , workId must int (random num)
    await googleApis.createGsSheet(config.sheetId.test, "123");
    console.log("更新完成");
  } catch (error) {
    console.log(error);
  }
}
