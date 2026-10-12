const SHEET_ID = "1EvJjBI6VicrcWkmpPgdPWUHdtDvp3sn2ogOloaqew48";
const SHEET_NAME = "Sheet1";
const WEBHOOK_SECRET = "CHANGE_ME_TO_A_PRIVATE_RANDOM_VALUE";

function doPost(event) {
  try {
    const body = JSON.parse(event.postData.contents || "{}");

    if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
      return jsonResponse({ ok: false, message: "Unauthorized" }, 401);
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const lock = LockService.getScriptLock();

    lock.waitLock(10000);
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.fullName || "",
      body.email || "",
      body.phone || "",
      body.city || "",
      body.state || "",
    ]);
    lock.releaseLock();

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, message: String(error) }, 500);
  }
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
