import { getGsAuth } from './googleAuth.js'

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

async function deleteGsSheet(spreadsheetId, workName) {
  try {
    const metadata = await getSheetMetadata(spreadsheetId);
    const sheet = metadata?.sheets?.find(s => s.properties.title === workName);

    if (!sheet) {
      console.log(`Sheet "${workName}" not found, skipping deletion.`);
      return;
    }

    const numericSheetId = sheet.properties.sheetId;
    const gsapi = await getGsAuth();
    const deleteOpt = {
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            deleteSheet: {
              sheetId: numericSheetId,
            },
          },
        ],
      },
    };
    await gsapi.spreadsheets.batchUpdate(deleteOpt);
    console.log(`Sheet "${workName}" deleted successfully.`);
  } catch (err) {
    console.log(`Error in deleteGsSheet: ${err.message}`);
  }
}

async function createGsSheet(sheetId, workName) {
  try {
    const metadata = await getSheetMetadata(sheetId);
    const sheetExists = metadata?.sheets?.some(sheet => sheet.properties.title === workName);

    if (sheetExists) {
      console.log(`Sheet "${workName}" already exists, skipping creation.`);
      return;
    }

    const gsapi = await getGsAuth();
    const createOpt = {
      spreadsheetId: sheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                sheetId: Math.floor(Math.random() * 1000000), // Better to use a large random range or let Google assign it
                title: workName,
              },
            },
          },
        ],
      },
    };
    await gsapi.spreadsheets.batchUpdate(createOpt);
    console.log(`Sheet "${workName}" created successfully.`);
  } catch (err) {
    console.log(`Error in createGsSheet: ${err.message}`);
  }
}

async function getSheetMetadata(sheetId) {
  try {
    const gsapi = await getGsAuth();
    const response = await gsapi.spreadsheets.get({
      spreadsheetId: sheetId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function clearGsSheet(sheetId, range) {
  const gsapi = await getGsAuth();
  const clearOptions = {
    spreadsheetId: sheetId,
    range: range,
  };
  await gsapi.spreadsheets.values.clear(clearOptions);
}

export { createGsSheet, deleteGsSheet, updateGsSheet, getSheetMetadata, clearGsSheet };
