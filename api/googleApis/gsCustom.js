import { getGsAuth } from "./googleAuth.js";

async function updateGsSheet(sheetId, range, values) {
  try {
    const gsapi = await getGsAuth();
    const updateOptions = {
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: { values: values },
    };
    await gsapi.spreadsheets.values.update(updateOptions);
  } catch (error) {
    console.log(error);
  }
}

async function deleteGsSheet(sheetId) {
  const gsapi = await getGsAuth();
  const createOpt = {
    spreadsheetId: sheetId,
    resource: {
      requests: [
        {
          deleteSheet: {
            sheetId: sheetId,
          },
        },
      ],
    },
  };
  gsapi.spreadsheets.batchUpdate(createOpt, (err) => {
    console.log("sheet was delete");
    if (err) {
      console.log(err);
    }
  });
}

async function createGsSheet(sheetId, workName) {
  try {
    const gsapi = await getGsAuth();
    const createOpt = {
      spreadsheetId: sheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                sheetId: Math.floor(Math.random() * 1000000), // 增加範圍避免衝突
                title: workName,
              },
            },
          },
        ],
      },
    };
    await gsapi.spreadsheets.batchUpdate(createOpt);
    console.log(`worksheet "${workName}" 建立成功`);
  } catch (err) {
    // 如果 worksheet 已存在，會報錯但不影響後續寫入
    if (err.message && err.message.includes("already exists")) {
      console.log(`worksheet "${workName}" 已存在，跳過建立`);
    } else {
      console.log(`createGsSheet error for "${workName}":`, err.message);
    }
  }
}

export { createGsSheet, deleteGsSheet, updateGsSheet };
