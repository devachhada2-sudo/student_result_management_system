const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://127.0.0.1:8000';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  console.log('1. Capturing Landing Page...');
  await page.goto(`${BASE_URL}/index.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_landing_page.png'), fullPage: false });

  console.log('2. Capturing Login Page...');
  await page.goto(`${BASE_URL}/login.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_login_page.png'), fullPage: false });

  console.log('3. Logging in as Admin...');
  await page.type('input[name="username"]', 'admin');
  await page.type('input[name="password"]', 'admin123');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
    page.click('button.btn-grad')
  ]);

  console.log('4. Capturing Dashboard...');
  await page.waitForSelector('canvas#perfChart', { timeout: 5000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1000)); // wait for chart animation
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_dashboard.png'), fullPage: false });

  console.log('5. Capturing Manage Students...');
  await page.goto(`${BASE_URL}/manage_students.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_manage_students.png'), fullPage: false });

  console.log('6. Capturing Add Student...');
  await page.goto(`${BASE_URL}/add_student.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_add_student.png'), fullPage: false });

  console.log('7. Capturing Manage Results...');
  await page.goto(`${BASE_URL}/manage_results.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_manage_results.png'), fullPage: false });

  console.log('8. Capturing Add Result (with live preview inputs)...');
  await page.goto(`${BASE_URL}/add_result.php`, { waitUntil: 'networkidle2' });
  await page.select('select[name="student_id"]', '1').catch(() => {});
  await page.type('input[name="web_development"]', '95');
  await page.type('input[name="database_management"]', '92');
  await page.type('input[name="software_engineering"]', '94');
  await page.type('input[name="cyber_security"]', '91');
  await page.type('input[name="computer_networks"]', '93');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_add_result.png'), fullPage: false });

  console.log('9. Capturing View Result Card...');
  await page.goto(`${BASE_URL}/view_result.php?id=1`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_view_result.png'), fullPage: false });

  console.log('10. Capturing Search Result Portal...');
  await page.goto(`${BASE_URL}/search_result.php`, { waitUntil: 'networkidle2' });
  await page.type('input[name="q"]', 'Dev Achhada');
  await page.keyboard.press('Enter');
  await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_search_result.png'), fullPage: false });

  console.log('11. Capturing Result Report Summary...');
  await page.goto(`${BASE_URL}/result_report.php`, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '10_result_report.png'), fullPage: false });

  await browser.close();
  console.log('✅ All screenshots captured successfully in /screenshots!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
