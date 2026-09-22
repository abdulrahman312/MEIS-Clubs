export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * MEIS Club Registration Google Sheet Web App
 * 
 * Target Google Sheet Columns:
 * Column A: Grade Level
 * Column B: Student Name
 * Column C: Grade
 * Column D: Section
 * Column E: Selected Club
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other submissions to finish
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Use the sheet named 'Table1' if present, otherwise the first sheet
    var sheet = ss.getSheetByName('Table1') || ss.getSheets()[0];

    // Ensure header row exists if sheet is completely empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Grade Level', 'Student Name', 'Grade', 'Section', 'Selected Club']);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Extract the 5 form fields
    var gradeLevel = data.gradeLevel || data['Grade Level'] || '';
    var studentName = data.studentName || data['Student Name'] || '';
    var grade = data.grade || data['Grade'] || '';
    var section = data.section || data['Section'] || '';
    var selectedClub = data.selectedClub || data['Selected Club'] || '';

    // Append the row matching the 5 columns exactly
    sheet.appendRow([gradeLevel, studentName, grade, section, selectedClub]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Student preference recorded successfully',
      data: {
        gradeLevel: gradeLevel,
        studentName: studentName,
        grade: grade,
        section: section,
        selectedClub: selectedClub
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    message: 'MEIS Club Registration Apps Script service is operational.'
  })).setMimeType(ContentService.MimeType.JSON);
}
`;

export const APPS_SCRIPT_INSTRUCTIONS = [
  {
    step: 1,
    title: 'Open your Google Sheet',
    desc: 'Open your Google Sheet containing the table with columns: Grade Level, Student Name, Grade, Section, Selected Club.'
  },
  {
    step: 2,
    title: 'Open Apps Script Editor',
    desc: 'In the top menu of your Google Sheet, click on "Extensions" → "Apps Script".'
  },
  {
    step: 3,
    title: 'Paste the Script Code',
    desc: 'Delete any existing code in Code.gs, paste the script code provided below, and click the Save icon (💾).'
  },
  {
    step: 4,
    title: 'Deploy as Web App',
    desc: 'Click on the blue "Deploy" button at top right → "New deployment". Select type "Web app" (click the gear icon ⚙️ if needed).'
  },
  {
    step: 5,
    title: 'Configure Web App Permissions',
    desc: 'Set "Execute as" to "Me (your email)" and set "Who has access" to "Anyone". Then click "Deploy".'
  },
  {
    step: 6,
    title: 'Copy & Paste Web App URL',
    desc: 'Copy the generated Web App URL (ending in /exec) and paste it into the "Google Sheet Webhook URL" field in this app.'
  }
];
