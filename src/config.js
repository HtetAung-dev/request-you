/**
 * 💌 Configuration for "Request You" Proposal Website
 */

export const CONFIG = {
  // Recipient email to receive the confession response
  recipientEmail: "htetaung.dev@gmail.com",

  // Question & texts in Burmese
  question: "အကို့ကိုရွေးချယ်မှာလား?",
  subQuestion: "ကလေးရဲ့ အဖြေလေးကို ရင်ခုန်စွာနဲ့ စောင့်နေတယ်နော်...",
  yesButtonText: "ဟုတ်",
  noButtonText: "ဟင့်အင်း",

  // Alert message shown when "Yes" is clicked
  alertMessage: "အများကြီးချစ်တယ်ကလေးလေး",
  alertSubMessage: "အကို့ဘဝထဲကို ဝင်လာပေးလို့ ကျေးဇူးအများကြီးတင်ပါတယ် ကလေးလေးရေ... ❤️ ကလေးလေးကို တစ်သက်လုံး တန်ဖိုးထားချစ်သွားပါ့မယ်နော် 🥰",

  // Playful evasion texts when she tries to hover or touch "ဟင့်အင်း"
  evasionTexts: [
    "ဟင့်အင်း",
    "သေချာလို့လား? 🥺",
    "ပြန်စဉ်းစားပါဦးနော် 🥺",
    "ဖမ်းမမိပါဘူး 😝",
    "မနှိပ်နဲ့နော် ချစ်တယ်ဆို...",
    "မရပါဘူး ဟုတ် ပဲနှိပ်နော် 💕",
    "အကို့ကို မချစ်ဘူးလားဟင် 🥺",
    "အကို့ကို မသနားဘူးလား 🥺",
    "ရွေးချယ်ပါတော့နော် ကလေးလေး 🥺",
    "ဟုတ် ကိုပဲ နှိပ်လိုက်ပါတော့နော် ❤️"
  ],

  // Security features (Anti-inspect)
  antiInspect: {
    disableRightClick: true,
    disableShortcuts: true,
    disableSelection: true,
    showWarningToast: true,
    toastMessage: "ဒီထဲက လျှို့ဝှက်ချက်တွေကို inspect လုပ်ကြည့်လို့ မရပါဘူးနော် 😜💖"
  }
};
