// Google Apps Script for capturing Identity Calculator leads into a Sheet.
//
// SETUP STEPS:
// 1. Create a new Google Sheet. Name it "Identity Calculator Leads" (or anything).
// 2. In that Sheet, click Extensions > Apps Script.
// 3. Delete any boilerplate code, paste this entire file in, then click Save.
// 4. Click Deploy > New deployment.
// 5. Click the gear icon next to "Select type" and choose "Web app".
// 6. Description: "Identity Calculator lead capture".
//    Execute as: "Me".
//    Who has access: "Anyone".
// 7. Click Deploy. Authorize when Google asks.
// 8. Copy the Web app URL it gives you.
// 9. Open /quiz.js, find CONFIG.SHEETS_ENDPOINT at the top, paste the URL there.
// 10. Test by completing the quiz once. A new row should appear in your sheet.
//
// To update the script later: Deploy > Manage deployments > pencil icon > New version.

const HEADERS = [
  'timestamp', 'name', 'email', 'instagram',
  'identityScore', 'coachabilityScore', 'archetype',
  'qualified', 'blockers',
  'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0a0a0a')
        .setFontColor('#c9a96e');
      sheet.setFrozenRows(1);
    }

    const row = HEADERS.map(h => data[h] !== undefined ? data[h] : '');
    sheet.appendRow(row);

    // Highlight qualified leads in gold
    if (data.qualified === 'YES') {
      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 1, 1, HEADERS.length)
        .setBackground('#fdf6e3');
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Identity Calculator endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
