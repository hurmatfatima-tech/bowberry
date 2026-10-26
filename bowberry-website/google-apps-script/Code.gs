/**
 * Bowberry orders -> Google Sheet
 * Paste this whole file into Extensions > Apps Script of your "Bowberry Orders" sheet.
 * Then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 */
const SHEET_NAME = "Orders";
const TIMEZONE = "Asia/Karachi";
const NOTIFY_BY_EMAIL = true; // sends you an email for every new order
const HEADERS = ["Order #", "Date", "Status", "Name", "Phone", "City", "Address", "Items", "Total (Rs.)", "Payment", "Note", "Phone model"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);

    // Hidden field that only bots fill in: pretend success and save nothing
    if (data.website) return reply({ ok: true, orderNumber: 0 });

    const name = clean(data.name), phone = clean(data.phone), city = clean(data.city);
    const address = clean(data.address), note = clean(data.note), payment = clean(data.payment);
    const phoneModel = clean(data.phoneModel);
    const items = Array.isArray(data.items) ? data.items.slice(0, 30) : [];
    if (!name || !phone || !city || !address || items.length === 0) {
      return reply({ ok: false, error: "Missing details" });
    }

    const itemsText = items.map(function (i) {
      return clean(i.name) + " (" + clean(i.color) + ") x " + Number(i.qty) + " = " + (Number(i.price) * Number(i.qty));
    }).join("\n");
    const total = items.reduce(function (sum, i) { return sum + Number(i.price) * Number(i.qty); }, 0);

    const sheet = getSheet();
    const orderNumber = 1000 + sheet.getLastRow(); // first order is #1001
    const date = Utilities.formatDate(new Date(), TIMEZONE, "dd MMM yyyy, hh:mm a");

    sheet.appendRow([orderNumber, date, "New", name, phone, city, address, itemsText, total, payment, note, phoneModel]);

    if (NOTIFY_BY_EMAIL) {
      try {
        MailApp.sendEmail(
          Session.getEffectiveUser().getEmail(),
          "New Bowberry order #" + orderNumber,
          "Order #" + orderNumber + "\n\n" + itemsText + "\n\nTotal: Rs. " + total +
          "\nPayment: " + payment + "\n\nName: " + name + "\nPhone: " + phone +
          "\nCity: " + city + "\nAddress: " + address + (phoneModel ? "\nPhone model: " + phoneModel : "") + (note ? "\nNote: " + note : "")
        );
      } catch (mailErr) { /* the order is already saved, so ignore email problems */ }
    }
    return reply({ ok: true, orderNumber: orderNumber });
  } catch (err) {
    return reply({ ok: false, error: "Could not save the order" });
  } finally {
    lock.releaseLock();
  }
}

// Opening the web app link in a browser just shows this message
function doGet() {
  return reply({ ok: true, message: "Bowberry orders are working." });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#F7DEDF");
    sheet.getRange("E:E").setNumberFormat("@"); // keep the leading 0 in phone numbers
    sheet.setColumnWidth(7, 260);
    sheet.setColumnWidth(8, 300);
  }
  return sheet;
}

// Trim, limit the length, and stop text from being read as a spreadsheet formula
function clean(v) {
  let s = String(v === undefined || v === null ? "" : v).trim().slice(0, 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
