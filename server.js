import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5173;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle SMTP email sending
  if (req.url === '/api/send-email' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');

        const host = process.env.MAIL_HOST || 'smtp.gmail.com';
        const port = Number(process.env.MAIL_PORT) || 587;
        const secure = process.env.MAIL_SECURE === 'true';
        const user = process.env.MAIL_USER || 'fredrickgeorge.dev@gmail.com';
        const pass = process.env.MAIL_PASS || 'pyanzwbwgdycvjzd';
        let from = process.env.MAIL_FROM || `"LMS Support" <noreply@amuze.com.mm>`;
        if (!from.includes('@')) {
          from = `"${from}" <noreply@amuze.com.mm>`;
        }
        const to = process.env.RECIPIENT_EMAIL || 'htetaung.dev@gmail.com';

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass }
        });

        const timestamp = new Date().toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'medium'
        });

        const evasionCount = data.evasionCount || 0;

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #ffd6e0; overflow: hidden; box-shadow: 0 4px 20px rgba(255, 75, 114, 0.15);">
            <div style="background: linear-gradient(135deg, #ff3366 0%, #ff5e62 100%); padding: 30px 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 26px;">💖 အဖြေရရှိပါပြီ: YES! 🎉</h1>
              <p style="margin: 10px 0 0; opacity: 0.95; font-size: 16px;">မင်းလေးဆီက အဖြေကို အောင်မြင်စွာ လက်ခံရရှိပါသည်</p>
            </div>
            <div style="padding: 24px;">
              <div style="background: #fff0f3; border-radius: 12px; padding: 18px; margin-bottom: 20px; border-left: 4px solid #ff3366;">
                <p style="margin: 0 0 10px; font-size: 16px; color: #2d131a;"><b>❓ မေးခွန်း:</b> အကို့ကိုရွေးချယ်မှာလား?</p>
                <p style="margin: 0 0 10px; font-size: 18px; color: #ff3366;"><b>💌 အဖြေ:</b> ဟုတ် (YES) ❤️</p>
                <p style="margin: 0 0 10px; font-size: 14px; color: #666;"><b>⏱️ အချိန်:</b> ${timestamp}</p>
                <p style="margin: 0; font-size: 14px; color: #666;"><b>🙈 ဟင့်အင်းကို ရှောင်တိမ်းခဲ့သည့်အကြိမ်:</b> ${evasionCount} ကြိမ်</p>
              </div>
              <p style="font-size: 15px; color: #444; line-height: 1.6; text-align: center;">
                ကလေးလေးက "ဟုတ်" လို့ ရွေးချယ်ပေးလိုက်ပါပြီခင်ဗျာ! 🥰<br/>
                ချစ်သူနှစ်ဦး ထာဝရ ပျော်ရွှင်ချမ်းမြေ့စွာ လက်တွဲသွားနိုင်ပါစေနော်! 💕
              </p>
            </div>
          </div>
        `;

        const info = await transporter.sendMail({
          from,
          to,
          subject: `💖 ကောင်မလေးဆီက အဖြေရရှိပါပြီ: YES! 🎉`,
          text: `ကောင်မလေးဆီက အဖြေရရှိပါပြီ: YES! ကလေးလေးက 'ဟုတ်' လို့ ရွေးချယ်ပေးလိုက်ပါပြီ! (${timestamp})`,
          html: htmlContent
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, messageId: info.messageId }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // Serve static dist files
  let safePath = path.normalize(req.url.split('?')[0]);
  if (safePath === '/') safePath = '/index.html';

  let filePath = path.join(DIST_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
