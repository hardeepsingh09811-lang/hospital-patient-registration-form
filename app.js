const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

const patientSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    dateOfAdmission: { type: String, required: true },
    rollno: { type: String, required: true }
});

const Patient = mongoose.model("Patient", patientSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", async (req, res) => {
    try {
        const newPatient = new Patient({
            studentName: req.body.studentName,
            dateOfAdmission: req.body.dateOfAdmission,
            rollno: req.body.rollno
        });

        await newPatient.save();
        
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Success</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', system-ui, sans-serif; 
                        background: linear-gradient(135deg, #e0e7ff 0%, #fef3c7 50%, #fce7f3 100%); 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        margin:0; 
                        color: #1e293b; 
                    }
                    .glass-card { 
                        background: rgba(255, 255, 255, 0.45); 
                        backdrop-filter: blur(14px); 
                        -webkit-backdrop-filter: blur(14px);
                        padding: 40px; 
                        border-radius: 24px; 
                        border: 1px solid rgba(255, 255, 255, 0.6); 
                        text-align: center; 
                        max-width: 420px; 
                        width: 90%; 
                        box-shadow: 0 20px 40px rgba(31, 38, 135, 0.06); 
                    }
                    .icon { 
                        font-size: 55px; 
                        color: #059669; 
                        margin-bottom: 15px; 
                        background: rgba(255, 255, 255, 0.6);
                        width: 80px;
                        height: 80px;
                        line-height: 80px;
                        border-radius: 50%;
                        margin: 0 auto 20px auto;
                        box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
                    }
                    h2 { margin: 0 0 10px 0; color: #0f172a; font-weight: 700; font-size: 24px; }
                    p { color: #475569; font-size: 15px; margin-bottom: 30px; line-height: 1.5; }
                    a { 
                        display: inline-block; 
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
                        color: white; 
                        text-decoration: none; 
                        font-weight: 600; 
                        padding: 14px 28px; 
                        border-radius: 12px; 
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                        box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
                    }
                    a:hover { 
                        transform: translateY(-2px); 
                        box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); 
                    }
                </style>
            </head>
            <body>
                <div class="glass-card">
                    <div class="icon">✓</div>
                    <h2>Successfully Registered</h2>
                    <p>Patient <b>${req.body.studentName}</b> has been securely synced to the live MongoDB Cluster.</p>
                    <a href="/">← Registry Form</a>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("Error saving data to database: " + err.message);
    }
});

app.get("/students", async (req, res) => {
    try {
        const patients = await Patient.find({});
        
        let rows = "";
        patients.forEach((p, index) => {
            rows += `
                <tr>
                    <td><span class="serial-no">${index + 1}</span></td>
                    <td>
                        <div class="patient-profile">
                            <div class="avatar">${p.studentName.charAt(0).toUpperCase()}</div>
                            <span class="p-name">${p.studentName}</span>
                        </div>
                    </td>
                    <td><span class="badge-date">${p.dateOfAdmission}</span></td>
                    <td><span class="badge-illness">${p.rollno}</span></td>
                </tr>
            `;
        });

        if (patients.length === 0) {
            rows = `<tr><td colspan="4" class="no-data">No active records found in the database.</td></tr>`;
        }

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Database Dashboard</title>
                <style>
                    body { 
                        font-family: 'Segoe UI', system-ui, sans-serif; 
                        background: linear-gradient(135deg, #e0e7ff 0%, #fef3c7 50%, #fce7f3 100%); 
                        margin: 0; 
                        padding: 40px 20px; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        min-height: 100vh; 
                        box-sizing: border-box; 
                        color: #1e293b; 
                    }
                    .glass-dashboard { 
                        background: rgba(255, 255, 255, 0.4); 
                        backdrop-filter: blur(16px); 
                        -webkit-backdrop-filter: blur(16px);
                        padding: 40px; 
                        border-radius: 28px; 
                        border: 1px solid rgba(255, 255, 255, 0.6); 
                        max-width: 950px; 
                        width: 100%; 
                        box-shadow: 0 25px 50px rgba(31, 38, 135, 0.05); 
                    }
                    .header-area { 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        border-bottom: 1px solid rgba(255, 255, 255, 0.4); 
                        padding-bottom: 22px; 
                        margin-bottom: 30px; 
                    }
                    h2 { 
                        margin: 0; 
                        font-size: 26px; 
                        font-weight: 700; 
                        color: #1e3a8a; 
                        letter-spacing: -0.5px;
                    }
                    .btn-back { 
                        background: rgba(255, 255, 255, 0.6); 
                        color: #2563eb; 
                        text-decoration: none; 
                        padding: 12px 22px; 
                        border-radius: 12px; 
                        font-weight: 600; 
                        font-size: 14px; 
                        border: 1px solid rgba(255, 255, 255, 0.7); 
                        transition: all 0.3s ease; 
                    }
                    .btn-back:hover { 
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
                        color: white; 
                        border-color: transparent;
                        transform: translateY(-2px); 
                        box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); 
                    }
                    .table-container { overflow-x: auto; }
                    table { width: 100%; border-collapse: collapse; text-align: left; }
                    th { 
                        color: #475569; 
                        font-size: 13px; 
                        font-weight: 700; 
                        padding: 18px 16px; 
                        border-bottom: 2px solid rgba(255, 255, 255, 0.5); 
                        text-transform: uppercase; 
                        letter-spacing: 0.7px; 
                        background: rgba(255, 255, 255, 0.3);
                    }
                    td { padding: 18px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.3); color: #334155; font-size: 15px; }
                    tr:hover td { background: rgba(255, 255, 255, 0.25); }
                    .patient-profile { display: flex; align-items: center; gap: 14px; }
                    .avatar { 
                        width: 36px; 
                        height: 36px; 
                        background: linear-gradient(135deg, #60a5fa, #2563eb); 
                        color: white; 
                        border-radius: 50%; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        font-weight: 700; 
                        font-size: 15px; 
                        box-shadow: 0 4px 10px rgba(37, 99, 235, 0.15);
                    }
                    .p-name { font-weight: 600; color: #0f172a; }
                    .serial-no { color: #64748b; font-weight: 600; }
                    .badge-date { 
                        background: rgba(255, 255, 255, 0.6); 
                        border: 1px solid rgba(255, 255, 255, 0.8); 
                        color: #334155; 
                        padding: 6px 14px; 
                        border-radius: 8px; 
                        font-size: 13px; 
                        font-weight: 500;
                    }
                    .badge-illness { 
                        background: rgba(239, 68, 68, 0.08); 
                        border: 1px solid rgba(239, 68, 68, 0.2); 
                        color: #b91c1c; 
                        padding: 6px 16px; 
                        border-radius: 50px; 
                        font-size: 13px; 
                        font-weight: 600; 
                        display: inline-block; 
                    }
                    .no-data { text-align: center; color: #64748b; padding: 50px 0; font-style: italic; }
                </style>
            </head>
            <body>
                <div class="glass-dashboard">
                    <div class="header-area">
                        <h2>🏥 Live Registry Management Dashboard</h2>
                        <a href="/" class="btn-back">+ Add New Patient</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 8%">S.No</th>
                                    <th style="width: 42%">Patient Name</th>
                                    <th style="width: 25%">Admission Date</th>
                                    <th style="width: 25%">Condition</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("Error retrieving data: " + err.message);
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
