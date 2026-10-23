# 💖 Request You - Proposal Web Application

ကောင်မလေးဆီက အဖြေတောင်းရန်အတွက် အထူးပြုလုပ်ထားသော ချစ်စရာကောင်းသည့် React + Vite Proposal Website လေးဖြစ်ပါသည်။

---

## 🌟 အဓိက ပါဝင်သော Feature များ

1. **မေးခွန်းနှင့် အဖြေခလုတ်များ**:
   - မေးခွန်း: **"အကို့ကိုရွေးချယ်မှာလား?"**
   - ခလုတ်များ: **"ဟုတ်"** နှင့် **"ဟင့်အင်း"**

2. **"ဟင့်အင်း" ခလုတ်ကို နှိပ်မရအောင် အမြဲရှောင်ပြေးသည့် စနစ် (Runaway Engine)**:
   - ခလုတ်ကို ဖျောက်ပစ်ခြင်းမျိုးမဟုတ်ဘဲ pointer (mouse သို့မဟုတ် touch) ထောက်လိုက်သည်နှင့် ဖမ်းမမိအောင် မျက်နှာပြင်ပေါ်တွင် နေရာရွေ့သွားပါသည်။
   - အမြဲထင်ရှားစွာ ပေါ်နေမည်ဖြစ်ပြီး ခလုတ်စာသားများ ပြောင်းလဲသွားကာ ချစ်စရာ စနောက်စကားများ ဖော်ပြပေးပါသည်။
   - "ဟုတ်" ခလုတ်သည် တဖြည်းဖြည်း ပိုမိုကြီးမားလာပြီး အလင်းလက်နေပါမည်။

3. **"ဟုတ်" နှိပ်လိုက်ပါက**:
   - Gmail SMTP ဖြင့် **`htetaung.dev@gmail.com`** ထံသို့ **"Yes"** အဖြေကို အလိုအလျောက် ပို့ပေးပါသည်။
   - ချစ်စရာ ပျော်ရွှင်သော ဝက်ဝံရုပ်လေးနှင့် **"အများကြီးချစ်တယ်ကလေးလေး"** Alert Box ပေါ်လာပါမည်။
   - မျက်နှာပြင်အပြည့် Confetti အောင်ပွဲခံ မီးရှူးမီးပန်း အထူးပြုလုပ်ချက်နှင့် Romantic Melody မြည်ပါမည်။

4. **Inspect နှင့် Source Code မကြည့်နိုင်အောင် ပိတ်ဆို့ထားမှု (Anti-Inspect & Anti-DevTools)**:
   - **Right Click** ထောက်၍မရအောင် ပိတ်ထားပြီး သတိပေး Toast Box ပေါ်လာပါမည်။
   - **Shortcuts များအားလုံး ပိတ်ထားခြင်း**: `F12`, `Ctrl + Alt + I`, `Ctrl + Shift + I`, `Cmd + Option + I`, `Ctrl + Shift + J`, `Ctrl + Shift + C`, `Ctrl + U` (View Source), `Ctrl + S`။
   - စာသားများ copy ကူးမရအောင် `user-select: none` ပြုလုပ်ထားပါသည်။

---

## ⚙️ SMTP ဆက်တင်များ (.env)

အောက်ပါ SMTP configuration များကို `.env` တွင် ချိတ်ဆက်ထားပြီး ဖြစ်ပါသည်:

```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=yourmail@domain.com
MAIL_PASS=yourpassword
MAIL_FROM="Mail Sender <noreply@domain.com>"
RECIPIENT_EMAIL=yourmail@domain.com
```

---

## 🚀 စတင်အသုံးပြုပုံ

### ၁။ Development Server စတင်လည်ပတ်ခြင်း
```bash
npm run dev
```
Browser တွင် `http://localhost:5173` ကို ဖွင့်လှစ်ပြီး အသုံးပြုနိုင်ပါသည်။

### ၂။ Standalone Production Server ဖြင့် လည်ပတ်ခြင်း
```bash
npm run build
npm start
```
