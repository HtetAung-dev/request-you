import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

function smtpEmailPlugin() {
  return {
    name: 'smtp-email-plugin',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res, next) => {
        if (req.method !== 'POST') {
          return next()
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}')
            const env = loadEnv('', process.cwd(), '')

            const host = env.MAIL_HOST || 'smtp.gmail.com'
            const port = Number(env.MAIL_PORT) || 587
            const secure = env.MAIL_SECURE === 'true'
            const user = env.MAIL_USER || 'fredrickgeorge.dev@gmail.com'
            const pass = env.MAIL_PASS || 'pyanzwbwgdycvjzd'
            let from = env.MAIL_FROM || `"Ko gyi kalaylay" <noreply@heart.com.mm>`
            if (!from.includes('@')) {
              from = `"Ko gyi kalaylay" <noreply@heart.com.mm>`
            }
            const to = env.RECIPIENT_EMAIL || 'htetaung.dev@gmail.com'

            const transporter = nodemailer.createTransport({
              host,
              port,
              secure,
              auth: {
                user,
                pass
              }
            })

            const timestamp = new Date().toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'medium'
            })

            const evasionCount = data.evasionCount || 0

            const htmlContent = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #ffd6e0; overflow: hidden; box-shadow: 0 4px 20px rgba(255, 75, 114, 0.15);">
                <div style="background: linear-gradient(135deg, #ff3366 0%, #ff5e62 100%); padding: 30px 20px; text-align: center; color: white;">
                  <h1 style="margin: 0; font-size: 26px;">💖 ကောင်မလေးဆီက အဖြေရရှိပါပြီ: YES! 🎉</h1>
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
            `

            const info = await transporter.sendMail({
              from,
              to,
              subject: `💖 ကောင်မလေးဆီက အဖြေရရှိပါပြီ: YES! 🎉`,
              text: `ကောင်မလေးဆီက အဖြေရရှိပါပြီ: YES! ကလေးလေးက 'ဟုတ်' လို့ ရွေးချယ်ပေးလိုက်ပါပြီ! (${timestamp})`,
              html: htmlContent
            })

            console.log('Email sent successfully via Gmail SMTP to', to, 'ID:', info.messageId)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, messageId: info.messageId }))
          } catch (err) {
            console.error('Failed to send email via SMTP:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), smtpEmailPlugin()]
})
