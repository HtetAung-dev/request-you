import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    let data = req.body;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        data = {};
      }
    }
    data = data || {};

    const user = process.env.MAIL_USER || 'fredrickgeorge.dev@gmail.com';
    const pass = process.env.MAIL_PASS || 'pyanzwbwgdycvjzd';
    let from = process.env.MAIL_FROM || `"Ko gyi kalaylay" <noreply@heart.com.mm>`;
    if (!from.includes('@')) {
      from = `"Ko gyi kalaylay" <noreply@heart.com.mm>`;
    }
    const to = process.env.RECIPIENT_EMAIL || 'htetaung.dev@gmail.com';

    // Directly use nodemailer Gmail service - rock-solid and immune to host typos like mtp.gmail.com
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass
      }
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
          <p style="margin: 10px 0 0; opacity: 0.95; font-size: 16px;">ကလေးဆီက အဖြေကို အောင်မြင်စွာ လက်ခံရရှိပါသည်</p>
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

    console.log('Email sent successfully via Gmail Service to', to, 'ID:', info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Failed to send email via Vercel Function:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
