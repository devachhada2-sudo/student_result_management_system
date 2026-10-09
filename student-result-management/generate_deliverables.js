const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const REPORT_DIR = path.join(__dirname, 'report');
const PRESENTATION_DIR = path.join(__dirname, 'presentation');

if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });
if (!fs.existsSync(PRESENTATION_DIR)) fs.mkdirSync(PRESENTATION_DIR, { recursive: true });

function getBase64Image(filename) {
  const p = path.join(__dirname, 'screenshots', filename);
  if (fs.existsSync(p)) {
    const data = fs.readFileSync(p);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

const ssLanding = getBase64Image('01_landing_page.png');
const ssLogin = getBase64Image('02_login_page.png');
const ssDash = getBase64Image('03_dashboard.png');
const ssStudents = getBase64Image('04_manage_students.png');
const ssAddStudent = getBase64Image('05_add_student.png');
const ssResults = getBase64Image('06_manage_results.png');
const ssAddResult = getBase64Image('07_add_result.png');
const ssViewResult = getBase64Image('08_view_result.png');
const ssSearch = getBase64Image('09_search_result.png');
const ssReport = getBase64Image('10_result_report.png');

// Build HTML for 18-page Project Report
const reportHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Student Result Management System - Project Report</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: A4 portrait;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 13.5px;
    line-height: 1.6;
  }
  .page {
    width: 210mm;
    height: 297mm;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    padding: 22mm 20mm 20mm 20mm;
    background: #ffffff;
    overflow: hidden;
  }
  
  /* Header & Footer on Inner Pages */
  .page-header {
    position: absolute;
    top: 10mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748b;
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 5px;
    font-weight: 600;
  }
  .page-footer {
    position: absolute;
    bottom: 10mm;
    left: 20mm;
    right: 20mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    color: #94a3b8;
    border-top: 1.5px solid #e2e8f0;
    padding-top: 6px;
  }
  .page-footer .num {
    font-weight: 700;
    color: #4338ca;
  }

  /* Cover Page Styling */
  .cover-page {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%);
    color: #ffffff;
    position: relative;
  }
  .cover-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%);
  }
  .cover-top {
    position: relative;
    z-index: 2;
    padding: 24mm 22mm 0 22mm;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 18mm;
  }
  .badge-tag {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(99, 102, 241, 0.25);
    border: 1px solid rgba(165, 180, 252, 0.35);
    color: #c7d2fe;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .cover-title {
    font-size: 34px;
    font-weight: 800;
    line-height: 1.18;
    color: #ffffff;
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #ffffff 40%, #c7d2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .cover-subtitle {
    font-size: 15px;
    color: #cbd5e1;
    font-weight: 400;
    max-width: 90%;
    margin: 0;
    line-height: 1.5;
  }
  .cover-middle {
    position: relative;
    z-index: 2;
    padding: 0 22mm;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .info-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 14px 18px;
  }
  .info-card h4 {
    margin: 0 0 4px 0;
    font-size: 10.5px;
    color: #a5b4fc;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .info-card p {
    margin: 0;
    font-size: 13.5px;
    font-weight: 600;
    color: #f8fafc;
  }
  .cover-bottom {
    position: relative;
    z-index: 2;
    padding: 16mm 22mm 20mm 22mm;
    background: rgba(15, 23, 42, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .author-block h3 {
    margin: 0 0 4px 0;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
  }
  .author-block p {
    margin: 0;
    font-size: 12px;
    color: #94a3b8;
  }

  /* Typography & Layout for Chapters */
  h1.chapter-title {
    font-size: 22px;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 4px 0;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .chapter-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #ffffff;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 800;
  }
  .chapter-sub {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 18px;
    border-bottom: 2px solid #f1f5f9;
    padding-bottom: 8px;
  }
  h2.section-heading {
    font-size: 15px;
    font-weight: 700;
    color: #1e293b;
    margin: 14px 0 6px 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  h2.section-heading::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 14px;
    background: #6366f1;
    border-radius: 2px;
  }
  p {
    margin: 0 0 10px 0;
    text-align: justify;
    color: #334155;
  }
  
  /* Modern Tables */
  table.custom-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 10px 0 14px 0;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    font-size: 11.5px;
  }
  table.custom-table th {
    background: #f8fafc;
    color: #1e293b;
    font-weight: 700;
    padding: 8px 10px;
    border-bottom: 1.5px solid #cbd5e1;
    text-align: left;
  }
  table.custom-table td {
    padding: 7px 10px;
    border-bottom: 1px solid #f1f5f9;
    color: #475569;
  }
  table.custom-table tr:last-child td {
    border-bottom: none;
  }
  table.custom-table tr:nth-child(even) td {
    background: #fafafa;
  }

  /* Cards & Callouts */
  .callout {
    background: #f8fafc;
    border-left: 4px solid #4f46e5;
    padding: 10px 14px;
    border-radius: 0 8px 8px 0;
    margin: 10px 0;
    font-size: 12px;
  }
  .callout-success {
    border-left-color: #10b981;
    background: #f0fdf4;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin: 10px 0;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
  }
  .card-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  }
  .card-box h4 {
    margin: 0 0 6px 0;
    font-size: 12.5px;
    font-weight: 700;
    color: #1e1b4b;
  }
  .card-box p {
    font-size: 11.5px;
    margin: 0;
    color: #64748b;
  }

  /* Code snippet styling */
  .code-block {
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 10px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    line-height: 1.45;
    margin: 10px 0;
    overflow: hidden;
    border: 1px solid #334155;
  }
  .code-title {
    background: #1e293b;
    color: #94a3b8;
    padding: 4px 10px;
    font-size: 10px;
    font-weight: 600;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom: 1px solid #334155;
    margin: -10px -12px 8px -12px;
    display: flex;
    justify-content: space-between;
  }

  /* Screenshot Showcase Container */
  .ss-container {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px;
    margin: 10px 0 14px 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  .ss-img {
    width: 100%;
    height: auto;
    max-height: 185mm;
    object-fit: contain;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    display: block;
  }
  .ss-caption {
    font-size: 10.5px;
    color: #64748b;
    margin-top: 6px;
    text-align: center;
    font-weight: 600;
  }

  /* Architecture / Diagram Box */
  .diagram-box {
    background: #f8fafc;
    border: 1.5px dashed #cbd5e1;
    border-radius: 8px;
    padding: 12px;
    margin: 10px 0;
  }

  ul, ol {
    margin: 4px 0 10px 18px;
    padding: 0;
  }
  li {
    margin-bottom: 4px;
    color: #334155;
  }
</style>
</head>
<body>

<!-- ================= PAGE 1: COVER PAGE ================= -->
<div class="page cover-page">
  <div class="cover-overlay"></div>
  <div class="cover-top">
    <div class="badge-tag">Academic Project Report • ALA 5</div>
    <h1 class="cover-title">Student Result<br>Management System</h1>
    <p class="cover-subtitle">A Comprehensive Full-Stack Web Application for Automated Marks Processing, Student Lifecycle Management, Dynamic Analytics, and Transcript Generation.</p>
  </div>
  
  <div class="cover-middle">
    <div class="info-card">
      <h4>Course & Specialization</h4>
      <p>Bachelor of Computer Applications (BCA)</p>
    </div>
    <div class="info-card">
      <h4>Subject / Module</h4>
      <p>BCAXX15320 • Web Dev Using PHP</p>
    </div>
    <div class="info-card">
      <h4>Technology Stack</h4>
      <p>PHP 8 • MySQL • Bootstrap 5 • Chart.js</p>
    </div>
    <div class="info-card">
      <h4>Academic Year / Term</h4>
      <p>Semester 5 • 2026</p>
    </div>
  </div>

  <div class="cover-bottom">
    <div class="author-block">
      <h3>Dev Achhada</h3>
      <p>Enrollment No: <b>240503020001</b> | Class A</p>
    </div>
    <div style="text-align: right;">
      <p style="margin:0; font-size: 11px; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.08em;">Status</p>
      <p style="margin:0; font-size: 13px; font-weight: 700; color: #34d399;">Fully Deployed & Tested</p>
    </div>
  </div>
</div>

<!-- ================= PAGE 2: CERTIFICATE & DECLARATION ================= -->
<div class="page">
  <div class="page-header">
    <span>Student Result Management System</span>
    <span>Certificate & Declaration</span>
  </div>

  <h1 class="chapter-title" style="margin-top: 10mm;"><span class="chapter-num">✓</span> Certificate of Authenticity</h1>
  <div class="chapter-sub">Official Academic Submission Verification</div>

  <p>This is to certify that the project report entitled <b>"Student Result Management System (SRMS)"</b> submitted by <b>Dev Achhada</b> (Enrollment No: <b>240503020001</b>) in partial fulfillment of the requirements for the award of the degree of <b>Bachelor of Computer Applications (BCA - Semester 5)</b> in the subject <b>Web Development Using PHP (BCAXX15320)</b> is an authentic record of independent work carried out under standard academic guidelines.</p>

  <div class="grid-2" style="margin: 25mm 0 20mm 0;">
    <div style="border-top: 1.5px solid #0f172a; padding-top: 6px; text-align: center;">
      <b>Internal Faculty Guide</b><br>
      <span style="font-size: 11px; color: #64748b;">Department of Computer Applications</span>
    </div>
    <div style="border-top: 1.5px solid #0f172a; padding-top: 6px; text-align: center;">
      <b>Head of Department / Examiner</b><br>
      <span style="font-size: 11px; color: #64748b;">Faculty of Information Technology</span>
    </div>
  </div>

  <h1 class="chapter-title" style="margin-top: 10mm;"><span class="chapter-num">✎</span> Candidate Declaration</h1>
  <div class="chapter-sub">Student Statement of Originality</div>

  <p>I hereby declare that the software application and documentation presented in this project report entitled <b>"Student Result Management System"</b> is entirely my own original work developed using PHP, MySQL, Apache, and Bootstrap. No part of this project has been plagiarized or submitted previously for any other diploma, degree, or evaluation.</p>

  <div style="margin-top: 25mm; text-align: right;">
    <b>Dev Achhada</b><br>
    <span style="font-size: 12px; color: #64748b;">Enrollment No: 240503020001</span><br>
    <span style="font-size: 11px; color: #94a3b8;">BCA Sem 5 • Year 2026</span>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 2</span>
  </div>
</div>

<!-- ================= PAGE 3: ACKNOWLEDGEMENT & ABSTRACT ================= -->
<div class="page">
  <div class="page-header">
    <span>Student Result Management System</span>
    <span>Abstract & Acknowledgements</span>
  </div>

  <h1 class="chapter-title" style="margin-top: 5mm;"><span class="chapter-num">❤</span> Acknowledgements</h1>
  <div class="chapter-sub">Gratitude and Appreciation</div>
  
  <p>I would like to express my profound gratitude to my faculty mentors, lab instructors, and the university administration for providing me with the infrastructure, guidance, and continuous encouragement needed to develop this project successfully.</p>
  <p>Special thanks to open-source contributors of PHP, MySQL, Bootstrap, and Chart.js whose robust toolsets made it possible to build an intuitive, efficient, and visually stunning web application.</p>

  <h1 class="chapter-title" style="margin-top: 10mm;"><span class="chapter-num">⚡</span> Executive Summary / Abstract</h1>
  <div class="chapter-sub">Project Overview & Key Highlights</div>

  <p>The <b>Student Result Management System (SRMS)</b> is a robust, dynamic web-based enterprise solution engineered to replace error-prone, traditional manual academic grading with an automated, highly secure digital infrastructure.</p>
  
  <div class="callout callout-success">
    <b>Key Project Objective:</b> To streamline the end-to-end academic evaluation cycle—from student enrollment and subject mark entry to real-time grade calculations, visual performance analytics, and instant printable marksheet generation.
  </div>

  <div class="grid-3" style="margin-top: 14px;">
    <div class="card-box">
      <h4>⚡ Instant Calculation</h4>
      <p>Automated summation, percentage computation, and dynamic letter grade assignment (A+ to F) without manual recalculation.</p>
    </div>
    <div class="card-box">
      <h4>📊 Live Visual Analytics</h4>
      <p>Interactive Chart.js visual distribution showing class averages, top performers, and subject-wise score benchmarks.</p>
    </div>
    <div class="card-box">
      <h4>🔒 Enterprise Security</h4>
      <p>Equipped with CSRF tokens, PDO/MySQLi Prepared Statements, BCRYPT password hashing, and XSS sanitization filters.</p>
    </div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 3</span>
  </div>
</div>

<!-- ================= PAGE 4: TABLE OF CONTENTS ================= -->
<div class="page">
  <div class="page-header">
    <span>Student Result Management System</span>
    <span>Table of Contents</span>
  </div>

  <h1 class="chapter-title" style="margin-top: 5mm;"><span class="chapter-num">📑</span> Table of Contents</h1>
  <div class="chapter-sub">Index of Chapters, Design Modules, and Documentation</div>

  <table class="custom-table" style="margin-top: 10px; font-size: 12px;">
    <thead>
      <tr>
        <th style="width: 15%;">Chapter</th>
        <th style="width: 70%;">Title / Topic Description</th>
        <th style="width: 15%; text-align: right;">Page No.</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>—</td><td><b>Certificate of Authenticity & Candidate Declaration</b></td><td style="text-align: right;">2</td></tr>
      <tr><td>—</td><td><b>Acknowledgements & Executive Summary</b></td><td style="text-align: right;">3</td></tr>
      <tr><td><b>Chapter 1</b></td><td><b>Introduction & Problem Formulation</b> (Background, Scope, Objectives)</td><td style="text-align: right;">5</td></tr>
      <tr><td><b>Chapter 2</b></td><td><b>Requirement Analysis & Feasibility Study</b> (Hardware, Software, Operational)</td><td style="text-align: right;">6</td></tr>
      <tr><td><b>Chapter 3</b></td><td><b>System Architecture & Technology Stack</b> (Multi-tier Structure, Technologies)</td><td style="text-align: right;">7</td></tr>
      <tr><td><b>Chapter 4</b></td><td><b>Database Design & Data Dictionary</b> (ER Diagram, Schema, Relational Integrity)</td><td style="text-align: right;">8</td></tr>
      <tr><td><b>Chapter 5</b></td><td><b>System Design & Process Flow</b> (DFD Diagrams, Use Cases, Activity Flow)</td><td style="text-align: right;">9</td></tr>
      <tr><td><b>Chapter 6</b></td><td><b>Core Functional Modules</b> (Auth, Student Registry, Live Marks Engine, Search)</td><td style="text-align: right;">10</td></tr>
      <tr><td><b>Chapter 7</b></td><td><b>Security Engineering & Implementation</b> (CSRF, Prepared Statements, Hashing)</td><td style="text-align: right;">11</td></tr>
      <tr><td><b>Chapter 8</b></td><td><b>User Interface Showcase: Part 1</b> (Landing Page, Login Portal, Dashboard)</td><td style="text-align: right;">12</td></tr>
      <tr><td><b>Chapter 8</b></td><td><b>User Interface Showcase: Part 2</b> (Student Management, Add/Edit Registry)</td><td style="text-align: right;">13</td></tr>
      <tr><td><b>Chapter 8</b></td><td><b>User Interface Showcase: Part 3</b> (Result Evaluation, Live Preview, Marksheet)</td><td style="text-align: right;">14</td></tr>
      <tr><td><b>Chapter 9</b></td><td><b>Source Code Architecture & Core Algorithms</b> (Grade Logic, Live Calculation)</td><td style="text-align: right;">15</td></tr>
      <tr><td><b>Chapter 10</b></td><td><b>Testing Strategy & Verification Test Cases</b> (Unit, Integration, Security)</td><td style="text-align: right;">16</td></tr>
      <tr><td><b>Chapter 11</b></td><td><b>Deployment & Local Execution Guide</b> (XAMPP / PHP Server, Migration)</td><td style="text-align: right;">17</td></tr>
      <tr><td><b>Chapter 12</b></td><td><b>Conclusion & Future Enhancements</b> (Summary, Scalability, Scope)</td><td style="text-align: right;">18</td></tr>
      <tr><td>—</td><td><b>References & Academic Bibliography</b></td><td style="text-align: right;">19</td></tr>
    </tbody>
  </table>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 4</span>
  </div>
</div>

<!-- ================= PAGE 5: CHAPTER 1 - INTRODUCTION ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 1</span>
    <span>Introduction & Problem Formulation</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">01</span> Introduction & Problem Formulation</h1>
  <div class="chapter-sub">Background, Limitations of Legacy Systems, and Proposed Solution</div>

  <h2 class="section-heading">1.1 Background & Context</h2>
  <p>Educational institutions regularly manage examinations, continuous evaluations, and semester grading for hundreds of enrolled students. Traditionally, this process involved physical ledger entries, spreadsheets, or disjointed manual calculations. Such legacy systems are fraught with critical vulnerabilities: arithmetic calculation mistakes, duplicate entry conflicts, prolonged publication delays, and high physical storage costs.</p>

  <h2 class="section-heading">1.2 Limitations of Traditional Grading Systems</h2>
  <ul>
    <li><b>High Error Rates:</b> Manual summation of multi-subject marks often leads to calculation discrepancies.</li>
    <li><b>Data Redundancy & Inconsistency:</b> Student records scattered across disparate spreadsheets result in un-synchronized records.</li>
    <li><b>Lack of Data Security:</b> Spreadsheets and paper records lack granular access control, audit logs, and CSRF protection.</li>
    <li><b>Delayed Results:</b> Students and guardians experience substantial wait times before obtaining verified transcripts.</li>
  </ul>

  <h2 class="section-heading">1.3 Proposed System & Core Objectives</h2>
  <p>The <b>Student Result Management System</b> provides a centralized, authenticated web portal allowing administrators to manage the complete student grading lifecycle with real-time feedback and high visual fidelity.</p>

  <div class="grid-2">
    <div class="card-box">
      <h4>🎯 Primary Goals</h4>
      <ul>
        <li>100% automated calculation of Total, Percentage, Grade, and Result Status.</li>
        <li>Instant search portal by Enrollment No. and Student Name.</li>
        <li>One-click printable official grade report generation.</li>
      </ul>
    </div>
    <div class="card-box">
      <h4>💡 Key Innovations</h4>
      <ul>
        <li>Live client-side calculation preview while entering subject scores.</li>
        <li>Interactive Chart.js data visualization on the admin dashboard.</li>
        <li>Clean, responsive modern Glassmorphism UI using Bootstrap 5.</li>
      </ul>
    </div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 5</span>
  </div>
</div>

<!-- ================= PAGE 6: CHAPTER 2 - REQUIREMENT ANALYSIS ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 2</span>
    <span>Requirement Analysis & Feasibility Study</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">02</span> Requirement Analysis & Feasibility</h1>
  <div class="chapter-sub">System Specifications, User Roles, and Multi-Dimensional Feasibility</div>

  <h2 class="section-heading">2.1 Hardware Requirements</h2>
  <table class="custom-table">
    <tr><th>Component</th><th>Minimum Requirement</th><th>Recommended Specification</th></tr>
    <tr><td><b>Processor</b></td><td>Dual Core 2.0 GHz</td><td>Quad Core / Apple Silicon / Intel i5/i7</td></tr>
    <tr><td><b>RAM (Memory)</b></td><td>2 GB</td><td>8 GB or higher</td></tr>
    <tr><td><b>Storage</b></td><td>500 MB free space</td><td>SSD with 2 GB+ space</td></tr>
    <tr><td><b>Display</b></td><td>1024 x 768 Resolution</td><td>Full HD (1920 x 1080) / Retina Display</td></tr>
  </table>

  <h2 class="section-heading">2.2 Software Requirements</h2>
  <table class="custom-table">
    <tr><th>Component</th><th>Technology / Version</th><th>Purpose</th></tr>
    <tr><td><b>Operating System</b></td><td>macOS / Linux / Windows 10/11</td><td>Host Development & Server Environment</td></tr>
    <tr><td><b>Backend Language</b></td><td>PHP 8.x (PHP 8.2 / 8.5)</td><td>Server-Side Logic & Database Connectivity</td></tr>
    <tr><td><b>Database Engine</b></td><td>MySQL 8.0+ / MariaDB</td><td>Relational Data Persistence & Foreign Keys</td></tr>
    <tr><td><b>Web Server</b></td><td>Apache (XAMPP / PHP Built-in Server)</td><td>HTTP Request Dispatcher</td></tr>
    <tr><td><b>Frontend Framework</b></td><td>Bootstrap 5.3 + Vanilla CSS3</td><td>Responsive UI & Modern Aesthetics</td></tr>
    <tr><td><b>Charting Library</b></td><td>Chart.js 4.x CDN</td><td>Dynamic Visual Analytics & Score Plots</td></tr>
  </table>

  <h2 class="section-heading">2.3 Feasibility Study</h2>
  <div class="grid-3">
    <div class="card-box">
      <h4>Technical Feasibility</h4>
      <p>Built using industry-standard PHP & MySQL with zero heavy proprietary dependencies. Lightweight, open-source, and readily hostable on standard cloud or on-premise servers.</p>
    </div>
    <div class="card-box">
      <h4>Economic Feasibility</h4>
      <p>100% open-source software stack (PHP, MySQL, Apache, Bootstrap, CDN assets). Zero software licensing overhead, delivering maximal return on investment.</p>
    </div>
    <div class="card-box">
      <h4>Operational Feasibility</h4>
      <p>Intuitive user interface requiring virtually zero training. Clear form feedback, auto-calculations, and search filters streamline daily university operations.</p>
    </div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 6</span>
  </div>
</div>

<!-- ================= PAGE 7: CHAPTER 3 - SYSTEM ARCHITECTURE ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 3</span>
    <span>System Architecture & Tech Stack</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">03</span> System Architecture & Tech Stack</h1>
  <div class="chapter-sub">Multi-Tier Architecture, Layered Communication, and Component Layout</div>

  <h2 class="section-heading">3.1 3-Tier Architectural Model</h2>
  <p>The system follows a classical, highly robust <b>3-Tier Web Architecture</b> that decouples Presentation, Application Business Logic, and Data Persistence layers.</p>

  <div class="diagram-box" style="text-align: center;">
    <div style="display: flex; justify-content: space-around; align-items: center; gap: 8px;">
      <div style="background: #e0e7ff; border: 1.5px solid #6366f1; border-radius: 8px; padding: 12px; width: 30%;">
        <b style="color: #312e81;">Presentation Tier</b><br>
        <span style="font-size: 11px; color: #4338ca;">HTML5, Bootstrap 5.3<br>CSS3 Glassmorphism, Chart.js</span>
      </div>
      <div style="font-size: 18px; color: #6366f1;">⇄</div>
      <div style="background: #fef3c7; border: 1.5px solid #f59e0b; border-radius: 8px; padding: 12px; width: 30%;">
        <b style="color: #78350f;">Application / Logic Tier</b><br>
        <span style="font-size: 11px; color: #92400e;">PHP 8 Engine<br>Auth, CSRF, Grade Engine</span>
      </div>
      <div style="font-size: 18px; color: #6366f1;">⇄</div>
      <div style="background: #dcfce7; border: 1.5px solid #10b981; border-radius: 8px; padding: 12px; width: 30%;">
        <b style="color: #064e3b;">Data Persistence Tier</b><br>
        <span style="font-size: 11px; color: #047857;">MySQL 8.0 Engine<br>Relational Schema & Cascade</span>
      </div>
    </div>
  </div>

  <h2 class="section-heading">3.2 Technology Highlights & Design Choices</h2>
  <ul>
    <li><b>PHP 8 Modern Runtime:</b> Delivers high execution speed, strict type checking, and native password hashing primitives.</li>
    <li><b>MySQL Relational Engine:</b> Enforces relational data integrity using foreign keys with \`ON DELETE CASCADE\`.</li>
    <li><b>Bootstrap 5 CDN:</b> Provides responsive grid systems, accessible form components, and rapid responsive styling without heavy node bundle bloat.</li>
    <li><b>Chart.js Analytics:</b> Renders interactive HTML5 Canvas graphs on the client side without taxing the server.</li>
  </ul>

  <div class="callout">
    <b>Responsive Design Principle:</b> The user interface utilizes responsive viewport meta tags and flexible flexbox containers, ensuring seamless rendering across desktop monitors, laptops, iPads, and mobile smartphones.
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 7</span>
  </div>
</div>

<!-- ================= PAGE 8: CHAPTER 4 - DATABASE DESIGN ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 4</span>
    <span>Database Design & Data Dictionary</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">04</span> Database Design & Data Dictionary</h1>
  <div class="chapter-sub">Entity Relationship Model, Relational Schema, and Table Specifications</div>

  <h2 class="section-heading">4.1 Entity Relationship (ER) Model Overview</h2>
  <p>The database schema is structured around three core normalized entities: <b>Admins</b>, <b>Students</b>, and <b>Results</b>. A 1-to-1 strict relational constraint links every student to their official exam result sheet.</p>

  <h2 class="section-heading">4.2 Table: \`students\`</h2>
  <table class="custom-table">
    <tr><th>Field Name</th><th>Data Type</th><th>Key / Constraint</th><th>Description</th></tr>
    <tr><td><code>id</code></td><td>INT AUTO_INCREMENT</td><td>PRIMARY KEY</td><td>Unique Student Record Identifier</td></tr>
    <tr><td><code>enrollment_no</code></td><td>VARCHAR(20)</td><td>UNIQUE NOT NULL</td><td>Official University Roll / Enrollment Number</td></tr>
    <tr><td><code>student_name</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Full Name of Student</td></tr>
    <tr><td><code>email</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Student Email Address</td></tr>
    <tr><td><code>phone</code></td><td>VARCHAR(20)</td><td>NULL</td><td>Contact Telephone Number</td></tr>
    <tr><td><code>course</code></td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Degree Program (e.g. BCA)</td></tr>
    <tr><td><code>semester</code></td><td>VARCHAR(20)</td><td>NOT NULL</td><td>Academic Term (e.g. Sem 5)</td></tr>
    <tr><td><code>section</code></td><td>VARCHAR(20)</td><td>NULL</td><td>Class / Section Identifier (e.g. Class A)</td></tr>
  </table>

  <h2 class="section-heading">4.3 Table: \`results\`</h2>
  <table class="custom-table">
    <tr><th>Field Name</th><th>Data Type</th><th>Key / Constraint</th><th>Description</th></tr>
    <tr><td><code>id</code></td><td>INT AUTO_INCREMENT</td><td>PRIMARY KEY</td><td>Unique Result ID</td></tr>
    <tr><td><code>student_id</code></td><td>INT</td><td>UNIQUE, FOREIGN KEY</td><td>References <code>students(id) ON DELETE CASCADE</code></td></tr>
    <tr><td><code>web_development</code></td><td>INT (0–100)</td><td>NOT NULL</td><td>Score in PHP & Web Development</td></tr>
    <tr><td><code>database_management</code></td><td>INT (0–100)</td><td>NOT NULL</td><td>Score in DBMS & SQL</td></tr>
    <tr><td><code>software_engineering</code></td><td>INT (0–100)</td><td>NOT NULL</td><td>Score in Software Engineering</td></tr>
    <tr><td><code>cyber_security</code></td><td>INT (0–100)</td><td>NOT NULL</td><td>Score in Cyber Security</td></tr>
    <tr><td><code>computer_networks</code></td><td>INT (0–100)</td><td>NOT NULL</td><td>Score in Computer Networks</td></tr>
    <tr><td><code>total_marks</code></td><td>INT</td><td>DEFAULT 0</td><td>Calculated Aggregate Score (out of 500)</td></tr>
    <tr><td><code>percentage</code></td><td>DECIMAL(5,2)</td><td>DEFAULT 0.00</td><td>Calculated Percentage (%)</td></tr>
    <tr><td><code>grade</code></td><td>VARCHAR(3)</td><td>NULL</td><td>Assigned Grade (A+, A, B+, B, C, D, F)</td></tr>
    <tr><td><code>result_status</code></td><td>VARCHAR(4)</td><td>NULL</td><td>PASS or FAIL evaluation</td></tr>
  </table>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 8</span>
  </div>
</div>

<!-- ================= PAGE 9: CHAPTER 5 - SYSTEM PROCESS FLOW ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 5</span>
    <span>System Design & Workflow Process</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">05</span> System Design & Workflow</h1>
  <div class="chapter-sub">Data Flow Diagrams (DFD), Process Lifecycle, and Use Case Models</div>

  <h2 class="section-heading">5.1 Data Flow Diagram (DFD Level 0 & 1)</h2>
  <p>The Data Flow Diagram represents the logical flow of data between external entities (Admin / Student) and internal storage.</p>

  <div class="diagram-box">
    <div style="font-size: 11.5px; line-height: 1.6; color: #1e293b;">
      <b>1. Admin Authentication Flow:</b> Admin enters credentials ➔ System verifies BCRYPT hash ➔ Session Initialized.<br>
      <b>2. Student Registration Flow:</b> Admin enters student metadata ➔ System checks unique enrollment ➔ Record stored in <code>students</code>.<br>
      <b>3. Marks Entry & Auto-Grading:</b> Admin inputs subject marks ➔ JavaScript renders live preview ➔ PHP computes aggregate total, percentage, grade, status ➔ Upserted in <code>results</code>.<br>
      <b>4. Result Generation & Export:</b> User queries enrollment ➔ System queries joined tables (<code>students + results</code>) ➔ Digital Transcript rendered.
    </div>
  </div>

  <h2 class="section-heading">5.2 Use Case Diagram Summary</h2>
  <div class="grid-2">
    <div class="card-box">
      <h4>Administrator Actions</h4>
      <ul>
        <li>Secure Login & Session Logout</li>
        <li>View Dashboard Metrics & Performance Graph</li>
        <li>Register New Students / Update Profiles</li>
        <li>Input and Edit Subject Marks</li>
        <li>Generate and Print Class Reports</li>
      </ul>
    </div>
    <div class="card-box">
      <h4>Student / Public Actions</h4>
      <ul>
        <li>Access Public Result Search Portal</li>
        <li>Search Result by Enrollment Number or Name</li>
        <li>View Digital Verified Marksheet</li>
        <li>Print / Save Official Result Card as PDF</li>
      </ul>
    </div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 9</span>
  </div>
</div>

<!-- ================= PAGE 10: CHAPTER 6 - CORE FUNCTIONAL MODULES ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 6</span>
    <span>Core Functional Modules</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">06</span> Core Functional Modules</h1>
  <div class="chapter-sub">Detailed Analysis of System Capabilities and Subsystems</div>

  <h2 class="section-heading">6.1 Authentication & Session Management Subsystem</h2>
  <p>Ensures that sensitive administrative actions (marks entry, student deletion, report generation) are strictly gated behind authenticated sessions. Automatically regenerates session IDs upon login to thwart session fixation attacks.</p>

  <h2 class="section-heading">6.2 Student Lifecycle Registry</h2>
  <p>Provides full CRUD (Create, Read, Update, Delete) management for student profiles. Features instant search filtering and badge indicators for registration status.</p>

  <h2 class="section-heading">6.3 Live Marks Calculation Engine</h2>
  <p>An innovative client-side calculation script calculates total score, percentage, progress bar width, and expected grade in real-time as the admin types numbers into the mark fields.</p>

  <h2 class="section-heading">6.4 Visual Analytics & Charting Module</h2>
  <p>The dashboard leverages Chart.js to plot student performance across all 5 key subjects (Web Development, DBMS, Software Engineering, Cyber Security, and Computer Networks), providing faculty with immediate insight into academic trends.</p>

  <h2 class="section-heading">6.5 Search & Digital Marksheet Generator</h2>
  <p>A fast search interface allows lookup by partial student name or enrollment number, instantly retrieving the full marks breakdown, credit status, and official university grade card.</p>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 10</span>
  </div>
</div>

<!-- ================= PAGE 11: CHAPTER 7 - SECURITY ENGINEERING ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 7</span>
    <span>Security Engineering & Implementation</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">07</span> Security Engineering & Protection</h1>
  <div class="chapter-sub">Defense-in-Depth Strategy, OWASP Compliance, and Secure Coding</div>

  <h2 class="section-heading">7.1 Cross-Site Request Forgery (CSRF) Mitigation</h2>
  <p>Every administrative form submission includes a cryptographically secure, randomized 32-character hexadecimal token stored in the session and verified on POST submission using timing-attack resistant comparison:</p>
  
  <div class="code-block">
    <div class="code-title"><span>CSRF Protection Helper</span><span>database.php</span></div>
function csrf() {
    if (empty($_SESSION['t'])) $_SESSION['t'] = bin2hex(random_bytes(16));
    return $_SESSION['t'];
}
function chk() {
    if (!hash_equals($_SESSION['t'] ?? '', $_POST['t'] ?? '')) {
        die('Invalid CSRF token');
    }
}
  </div>

  <h2 class="section-heading">7.2 SQL Injection (SQLi) Prevention via Prepared Statements</h2>
  <p>All database queries involving user input strictly utilize parameterized prepared statements via PHP MySQLi, rendering SQL injection vulnerabilities completely impossible.</p>

  <h2 class="section-heading">7.3 XSS Output Encoding & Password Hashing</h2>
  <ul>
    <li><b>XSS Filtering:</b> All user-generated text is encoded using <code>htmlspecialchars($str, ENT_QUOTES, 'UTF-8')</code> before rendering.</li>
    <li><b>Password Hashing:</b> Passwords are protected using standard <code>password_hash(..., PASSWORD_DEFAULT)</code> utilizing BCRYPT with adaptive salt.</li>
  </ul>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 11</span>
  </div>
</div>

<!-- ================= PAGE 12: CHAPTER 8 - UI SHOWCASE PART 1 ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 8</span>
    <span>User Interface Showcase (Part 1)</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">08</span> User Interface Showcase (Part 1)</h1>
  <div class="chapter-sub">Screenshots: Public Landing Page & Admin Authentication</div>

  <h2 class="section-heading">8.1 Modern Public Landing Page</h2>
  <div class="ss-container">
    <img src="${ssLanding}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.1: Landing Page featuring Glassmorphism, Animated Hero, and Quick Features</div>
  </div>

  <h2 class="section-heading">8.2 Admin Login Portal</h2>
  <div class="ss-container">
    <img src="${ssLogin}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.2: Secure Administrative Login Interface with CSRF Protection</div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 12</span>
  </div>
</div>

<!-- ================= PAGE 13: CHAPTER 8 - UI SHOWCASE PART 2 ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 8</span>
    <span>User Interface Showcase (Part 2)</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">08</span> User Interface Showcase (Part 2)</h1>
  <div class="chapter-sub">Screenshots: Executive Dashboard & Student Registry Management</div>

  <h2 class="section-heading">8.3 Interactive Dashboard with Chart.js Analytics</h2>
  <div class="ss-container">
    <img src="${ssDash}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.3: Admin Dashboard with Quick Stats Cards and Visual Grade Performance Bar Chart</div>
  </div>

  <h2 class="section-heading">8.4 Manage Students Directory</h2>
  <div class="ss-container">
    <img src="${ssStudents}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.4: Student Registry Table with Edit/Delete Actions and Search</div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 13</span>
  </div>
</div>

<!-- ================= PAGE 14: CHAPTER 8 - UI SHOWCASE PART 3 ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 8</span>
    <span>User Interface Showcase (Part 3)</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">08</span> User Interface Showcase (Part 3)</h1>
  <div class="chapter-sub">Screenshots: Marks Entry with Live Preview & Official Result Sheet</div>

  <h2 class="section-heading">8.5 Add Marks with Live Real-time Preview Calculation</h2>
  <div class="ss-container">
    <img src="${ssAddResult}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.5: Live Calculation Widget updating Percentage & Grade dynamically</div>
  </div>

  <h2 class="section-heading">8.6 Official Student Result Card (Dev Achhada)</h2>
  <div class="ss-container">
    <img src="${ssViewResult}" class="ss-img" style="max-height: 85mm;">
    <div class="ss-caption">Figure 8.6: Comprehensive Student Marksheet with Grade Badge and Print Action</div>
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 14</span>
  </div>
</div>

<!-- ================= PAGE 15: CHAPTER 9 - SOURCE CODE ARCHITECTURE ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 9</span>
    <span>Source Code Architecture & Algorithms</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">09</span> Source Code & Core Logic</h1>
  <div class="chapter-sub">Key Algorithmic Implementations and Business Logic</div>

  <h2 class="section-heading">9.1 Grade Assignment Algorithm (PHP)</h2>
  <div class="code-block">
    <div class="code-title"><span>Grade Evaluation Function</span><span>database.php</span></div>
function grade($percentage) {
    if ($percentage >= 90) return 'A+';
    if ($percentage >= 80) return 'A';
    if ($percentage >= 70) return 'B+';
    if ($percentage >= 60) return 'B';
    if ($percentage >= 50) return 'C';
    if ($percentage >= 40) return 'D';
    return 'F';
}
  </div>

  <h2 class="section-heading">9.2 Live Client-Side Calculator (JavaScript)</h2>
  <div class="code-block">
    <div class="code-title"><span>Interactive Preview Calculator</span><span>assets/js/app.js</span></div>
document.querySelectorAll('.mk').forEach(input => {
  input.addEventListener('input', () => {
    let total = 0, count = 0;
    document.querySelectorAll('.mk').forEach(i => {
      let val = parseFloat(i.value) || 0;
      total += Math.min(100, Math.max(0, val));
      count++;
    });
    let percentage = (total / (count * 100)) * 100;
    document.getElementById('pTot').innerText = total + ' / 500';
    document.getElementById('pPer').innerText = percentage.toFixed(2) + '%';
    document.getElementById('pBar').style.width = percentage + '%';
    document.getElementById('pGr').innerText = getGrade(percentage);
  });
});
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 15</span>
  </div>
</div>

<!-- ================= PAGE 16: CHAPTER 10 - TESTING & QA ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 10</span>
    <span>Testing Strategy & Test Cases</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">10</span> Testing Strategy & QA</h1>
  <div class="chapter-sub">Validation Test Cases, Test Matrix, and Verification Results</div>

  <h2 class="section-heading">10.1 Formal Test Matrix</h2>
  <table class="custom-table">
    <tr><th>Test ID</th><th>Feature Tested</th><th>Input / Test Vector</th><th>Expected Outcome</th><th>Status</th></tr>
    <tr><td><b>TC-01</b></td><td>Admin Login</td><td>User: admin, Pass: admin123</td><td>Successful login & redirect to dashboard</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-02</b></td><td>Invalid Login</td><td>User: admin, Pass: wrongpass</td><td>Display error: "Invalid credentials"</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-03</b></td><td>Student Registration</td><td>New Roll No: 240503020011</td><td>Record inserted in database</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-04</b></td><td>Duplicate Roll No</td><td>Existing Roll: 240503020001</td><td>Duplicate Key error trapped safely</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-05</b></td><td>Marks Validation</td><td>Input: 105 or negative marks</td><td>Form rejects values outside 0–100</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-06</b></td><td>Grade Calculation</td><td>Scores: 95, 92, 94, 91, 93</td><td>Total: 465/500, 93%, Grade: A+, PASS</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-07</b></td><td>Search Result</td><td>Query: "Dev Achhada"</td><td>Displays Dev's Result card link</td><td><b style="color:green;">PASS</b></td></tr>
    <tr><td><b>TC-08</b></td><td>CSRF Attack Test</td><td>Submit POST with missing token</td><td>Immediate execution halt: "Invalid CSRF"</td><td><b style="color:green;">PASS</b></td></tr>
  </table>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 16</span>
  </div>
</div>

<!-- ================= PAGE 17: CHAPTER 11 - DEPLOYMENT & USER GUIDE ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 11</span>
    <span>Deployment & Installation Guide</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">11</span> Deployment & Setup Guide</h1>
  <div class="chapter-sub">Step-by-step Installation Instructions for Local & Cloud Environments</div>

  <h2 class="section-heading">11.1 XAMPP / Apache Deployment</h2>
  <ol>
    <li>Copy the project directory to your web root: <code>/Applications/XAMPP/xamppfiles/htdocs/student-result-management</code>.</li>
    <li>Launch XAMPP Control Panel and start <b>Apache Web Server</b> and <b>MySQL Database</b>.</li>
    <li>Open <b>phpMyAdmin</b> at <code>http://localhost/phpmyadmin</code>.</li>
    <li>Create database <code>student_result_management</code> and import <code>database/student_result_management.sql</code>.</li>
    <li>Open browser and access: <code>http://localhost/student-result-management/</code>.</li>
  </ol>

  <h2 class="section-heading">11.2 Standalone PHP Server Execution</h2>
  <div class="code-block">
    <div class="code-title"><span>Terminal Execution</span><span>bash</span></div>
# 1. Start MySQL Server
brew services start mysql

# 2. Launch Built-in Web Server
cd /path/to/student-result-management
php -S 127.0.0.1:8000

# 3. Access in Browser
open http://127.0.0.1:8000/
  </div>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 17</span>
  </div>
</div>

<!-- ================= PAGE 18: CHAPTER 12 - CONCLUSION & REFERENCES ================= -->
<div class="page">
  <div class="page-header">
    <span>Chapter 12</span>
    <span>Conclusion & Academic References</span>
  </div>

  <h1 class="chapter-title"><span class="chapter-num">12</span> Conclusion & Future Scope</h1>
  <div class="chapter-sub">Project Summary, Impact, and Academic Bibliography</div>

  <h2 class="section-heading">12.1 Project Conclusion</h2>
  <p>The <b>Student Result Management System (SRMS)</b> successfully accomplishes all stated objectives for the <b>ALA 5 Web Development Using PHP</b> module. By uniting modern server-side scripting with responsive client-side UI and relational database persistence, the system eliminates human calculation errors and offers a streamlined evaluation portal for universities.</p>

  <h2 class="section-heading">12.2 Future Enhancements</h2>
  <ul>
    <li><b>Role-Based Multi-Tier Auth:</b> Separate portals for Students, Faculty Evaluators, and Super Administrators.</li>
    <li><b>Automated SMS / Email Notifications:</b> Instant notification to students upon result publication.</li>
    <li><b>Direct PDF Marksheet Export:</b> Server-side dynamic PDF certificate generation with cryptographic QR verification.</li>
  </ul>

  <h2 class="section-heading">12.3 Academic References & Bibliography</h2>
  <table class="custom-table" style="font-size: 11px;">
    <tr><th>Ref #</th><th>Source / Documentation Title</th><th>Link / Publisher</th></tr>
    <tr><td>[1]</td><td>PHP 8 Documentation & Security Manual</td><td>Official PHP Group • php.net</td></tr>
    <tr><td>[2]</td><td>MySQL 8.0 Reference Manual (Prepared Statements)</td><td>Oracle Corporation • dev.mysql.com</td></tr>
    <tr><td>[3]</td><td>Bootstrap 5.3 Framework Guide & Component Tokens</td><td>Bootstrap Core Team • getbootstrap.com</td></tr>
    <tr><td>[4]</td><td>OWASP Top 10 Web Application Security Risks</td><td>OWASP Foundation • owasp.org</td></tr>
    <tr><td>[5]</td><td>Chart.js Dynamic Canvas Visualizations</td><td>Chart.js Open Source • chartjs.org</td></tr>
  </table>

  <div class="page-footer">
    <span>Academic Project Report</span>
    <span class="num">Page 18</span>
  </div>
</div>

</body>
</html>
`;

// Build HTML for 7-slide Presentation Deck
const presentationHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Student Result Management System - Presentation</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  @page {
    size: 16in 9in landscape;
    margin: 0;
  }
  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    background: #0f172a;
    color: #f8fafc;
  }
  .slide {
    width: 16in;
    height: 9in;
    page-break-after: always;
    page-break-inside: avoid;
    position: relative;
    padding: 0.8in 1in;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
  }
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 0.25in;
  }
  .slide-title {
    font-size: 34px;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .slide-tag {
    background: rgba(99, 102, 241, 0.25);
    border: 1px solid rgba(165, 180, 252, 0.4);
    color: #c7d2fe;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .slide-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.3in 0;
  }
  .slide-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid rgba(255, 255, 255, 0.12);
    padding-top: 0.2in;
    font-size: 14px;
    color: #94a3b8;
  }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.4in;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.3in;
  }
  .card-glass {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    padding: 0.3in;
  }
  .card-glass h3 {
    margin: 0 0 10px 0;
    font-size: 22px;
    font-weight: 700;
    color: #a5b4fc;
  }
  .card-glass p {
    font-size: 16px;
    color: #cbd5e1;
    line-height: 1.5;
    margin: 0;
  }
  .card-glass ul {
    margin: 10px 0 0 20px;
    padding: 0;
    color: #cbd5e1;
    font-size: 15px;
  }
  .card-glass li {
    margin-bottom: 8px;
  }
  .hero-title {
    font-size: 56px;
    font-weight: 800;
    line-height: 1.15;
    background: linear-gradient(135deg, #ffffff 40%, #c7d2fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 16px 0;
  }
</style>
</head>
<body>

<!-- SLIDE 1: TITLE SLIDE -->
<div class="slide">
  <div class="slide-header">
    <span class="slide-tag">ALA 5 • Project Presentation</span>
    <span style="font-size: 16px; color: #94a3b8;">BCA Semester 5 • 2026</span>
  </div>
  <div class="slide-body">
    <h1 class="hero-title">Student Result<br>Management System</h1>
    <p style="font-size: 22px; color: #cbd5e1; max-width: 80%; margin: 0 0 30px 0;">A modern, full-stack automated academic grading, visual analytics, and digital marksheet portal.</p>
    
    <div style="display: flex; gap: 30px; align-items: center;">
      <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(165, 180, 252, 0.3); border-radius: 12px; padding: 14px 24px;">
        <span style="font-size: 13px; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.08em;">Student Presenter</span>
        <div style="font-size: 20px; font-weight: 700; color: #ffffff;">Dev Achhada</div>
        <div style="font-size: 14px; color: #cbd5e1;">Roll No: 240503020001</div>
      </div>
      <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 14px 24px;">
        <span style="font-size: 13px; color: #a5b4fc; text-transform: uppercase; letter-spacing: 0.08em;">Course & Subject</span>
        <div style="font-size: 20px; font-weight: 700; color: #ffffff;">BCAXX15320 • Web Dev Using PHP</div>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Department of Computer Applications</span>
    <span>Slide 1 of 7</span>
  </div>
</div>

<!-- SLIDE 2: PROBLEM & OBJECTIVE -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Problem Statement & Proposed Solution</h2>
    <span class="slide-tag">Project Motivation</span>
  </div>
  <div class="slide-body">
    <div class="grid-2">
      <div class="card-glass" style="border-left: 4px solid #ef4444;">
        <h3>⚠️ Challenges of Legacy Grading</h3>
        <ul>
          <li><b>Manual Arithmetic Errors:</b> Recalculating hundreds of scores manually leads to grade discrepancy.</li>
          <li><b>Data Inconsistency:</b> Spreadsheets risk accidental row deletion and lack foreign key validation.</li>
          <li><b>Publication Latency:</b> Transcripts take weeks to format, verify, and print physically.</li>
          <li><b>Zero Security Controls:</b> Plain files have no session auth or CSRF defense.</li>
        </ul>
      </div>
      <div class="card-glass" style="border-left: 4px solid #10b981;">
        <h3>✨ The SRMS Digital Solution</h3>
        <ul>
          <li><b>Automated Engine:</b> Instant total, percentage, grade, and pass/fail calculations.</li>
          <li><b>Live Client-Side Preview:</b> Visual progress bar and score tracker while entering marks.</li>
          <li><b>Interactive Analytics:</b> Real-time Chart.js visual charts on admin dashboard.</li>
          <li><b>Instant Verified Search:</b> Students can view and print authenticated marksheets immediately.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System</span>
    <span>Slide 2 of 7</span>
  </div>
</div>

<!-- SLIDE 3: SYSTEM ARCHITECTURE & TECH STACK -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">System Architecture & Tech Stack</h2>
    <span class="slide-tag">3-Tier Architecture</span>
  </div>
  <div class="slide-body">
    <div class="grid-3">
      <div class="card-glass">
        <h3>🎨 Frontend Tier</h3>
        <p><b>Bootstrap 5.3 + Glassmorphism CSS</b></p>
        <ul>
          <li>Responsive flexbox layout</li>
          <li>Bootstrap Icons (1.11)</li>
          <li>Chart.js interactive data canvas</li>
          <li>Google Fonts (Poppins / Plus Jakarta)</li>
        </ul>
      </div>
      <div class="card-glass">
        <h3>⚙️ Logic & Server Tier</h3>
        <p><b>PHP 8 Runtime Engine</b></p>
        <ul>
          <li>Session-based admin authentication</li>
          <li>CSRF token verification system</li>
          <li>Prepared statement execution</li>
          <li>Dynamic grade calculation engine</li>
        </ul>
      </div>
      <div class="card-glass">
        <h3>🗄️ Persistence Tier</h3>
        <p><b>MySQL 8 Relational Database</b></p>
        <ul>
          <li>ACID compliant transaction engine</li>
          <li>Foreign key constraints (CASCADE)</li>
          <li>UTF8mb4 character encoding</li>
          <li>Indexed enrollment search queries</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System</span>
    <span>Slide 3 of 7</span>
  </div>
</div>

<!-- SLIDE 4: CORE MODULES & FEATURES -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Key Modules & Functional Highlights</h2>
    <span class="slide-tag">System Features</span>
  </div>
  <div class="slide-body">
    <div class="grid-2">
      <div class="card-glass">
        <h3>👥 Student Registry Module</h3>
        <p>Full lifecycle management allowing faculty to add, modify, search, and delete student records with unique university enrollment validation.</p>
      </div>
      <div class="card-glass">
        <h3>⚡ Live Marks Evaluation Engine</h3>
        <p>Real-time calculation widget calculating aggregate total marks (500), percentage, grade tier (A+ to F), and pass/fail evaluation as values are typed.</p>
      </div>
      <div class="card-glass">
        <h3>📊 Executive Analytics Dashboard</h3>
        <p>Comprehensive overview displaying total students, average class percentage, pass rates, and visual subject performance bar charts.</p>
      </div>
      <div class="card-glass">
        <h3>📜 Digital Marksheet Portal</h3>
        <p>Fast public search portal allowing instant lookup by roll number, generating a print-ready official university grade sheet.</p>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System</span>
    <span>Slide 4 of 7</span>
  </div>
</div>

<!-- SLIDE 5: DATABASE SCHEMA -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Relational Database Design</h2>
    <span class="slide-tag">Database Schema</span>
  </div>
  <div class="slide-body">
    <div class="grid-3">
      <div class="card-glass">
        <h3>\`admins\` Table</h3>
        <ul>
          <li><code>id</code> (PK, AUTO_INCREMENT)</li>
          <li><code>username</code> (VARCHAR 50, UNIQUE)</li>
          <li><code>password</code> (VARCHAR 255, Hashed)</li>
          <li><code>created_at</code> (TIMESTAMP)</li>
        </ul>
      </div>
      <div class="card-glass">
        <h3>\`students\` Table</h3>
        <ul>
          <li><code>id</code> (PK, AUTO_INCREMENT)</li>
          <li><code>enrollment_no</code> (VARCHAR 20, UNIQUE)</li>
          <li><code>student_name</code>, <code>email</code></li>
          <li><code>course</code>, <code>semester</code>, <code>section</code></li>
        </ul>
      </div>
      <div class="card-glass">
        <h3>\`results\` Table</h3>
        <ul>
          <li><code>id</code> (PK), <code>student_id</code> (FK)</li>
          <li>5 Subject Marks (0–100)</li>
          <li><code>total_marks</code>, <code>percentage</code></li>
          <li><code>grade</code>, <code>result_status</code></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System</span>
    <span>Slide 5 of 7</span>
  </div>
</div>

<!-- SLIDE 6: APPLICATION UI SHOWCASE -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Live Application Showcase</h2>
    <span class="slide-tag">UI / UX Gallery</span>
  </div>
  <div class="slide-body">
    <div class="grid-2" style="align-items: center;">
      <div class="card-glass" style="padding: 10px;">
        <img src="${ssDash}" style="width: 100%; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);">
        <p style="font-size: 13px; text-align: center; margin-top: 6px; color: #a5b4fc;">Interactive Dashboard & Visual Performance Charts</p>
      </div>
      <div class="card-glass" style="padding: 10px;">
        <img src="${ssViewResult}" style="width: 100%; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2);">
        <p style="font-size: 13px; text-align: center; margin-top: 6px; color: #a5b4fc;">Official Student Result Sheet & Verification Card</p>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System</span>
    <span>Slide 6 of 7</span>
  </div>
</div>

<!-- SLIDE 7: SECURITY & CONCLUSION -->
<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Security, Conclusion & Future Scope</h2>
    <span class="slide-tag">Summary</span>
  </div>
  <div class="slide-body">
    <div class="grid-2">
      <div class="card-glass">
        <h3>🔒 Robust Security Protocols</h3>
        <ul>
          <li><b>CSRF Token Protection:</b> Cryptographic session tokens on all mutating POST forms.</li>
          <li><b>SQL Injection Prevention:</b> Strict prepared statements with parameter binding.</li>
          <li><b>XSS Sanitization:</b> Universal <code>htmlspecialchars()</code> output encoding.</li>
          <li><b>BCRYPT Password Hashing:</b> Secure key derivation for admin accounts.</li>
        </ul>
      </div>
      <div class="card-glass">
        <h3>🚀 Future Roadmap & Conclusion</h3>
        <ul>
          <li><b>Multi-Role System:</b> Dedicated logins for Students & Evaluators.</li>
          <li><b>Automated Alerts:</b> Instant SMS & Email result notifications.</li>
          <li><b>QR Code Verification:</b> Digital verification of printed transcripts.</li>
          <li><b>Conclusion:</b> Successfully delivers a modern, reliable, and secure result management system.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="slide-footer">
    <span>Student Result Management System • Thank You!</span>
    <span>Slide 7 of 7</span>
  </div>
</div>

</body>
</html>
`;

fs.writeFileSync(path.join(REPORT_DIR, 'report.html'), reportHtml);
fs.writeFileSync(path.join(PRESENTATION_DIR, 'presentation.html'), presentationHtml);

async function generatePdfs() {
  console.log('Launching headless browser to compile PDFs...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('1. Generating 18-Page Academic Project Report PDF...');
  await page.setContent(reportHtml, { waitUntil: 'load' });
  await page.pdf({
    path: path.join(REPORT_DIR, 'Student_Result_Management_System_Report.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log('2. Generating 7-Slide Presentation Deck PDF...');
  await page.setContent(presentationHtml, { waitUntil: 'load' });
  await page.pdf({
    path: path.join(PRESENTATION_DIR, 'Student_Result_Management_System_Presentation.pdf'),
    width: '16in',
    height: '9in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('✅ Generated Report PDF and Presentation PDF successfully!');
}

generatePdfs().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
