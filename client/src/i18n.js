import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Upload } from "@mui/icons-material";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: "Login",
          minimalUI: "Minimal UI",
          
          Blog: "Blog",
          Dashboard: "Dashboard",
          videoUpload: "Upload Video",
          videoList: "List Video",
          whiteboardTemplates: "Whiteboard Templates By Industry Leaders",
          cybertruckTrailer:
            "Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!",
          teslaFansTagline: "Designify Agency Landing Page Design",
          whatIsDone: "✨What is Done is Done ✨",
          freshPrince: "Fresh Prince",
          welcomeBack: "Hi, Welcome Back!",
          newPost: "New Post",
          new_post: "New Post",
          amharic: "Amharic",
          english: "English",
          website_visits: "Website Visits",
          current_visits: "Current Visits",
          conversion_rates: "Conversion Rates",
          current_subject: "Current Subject",
          news_update: "News Update",
          order_timeline: "Order Timeline",
          traffic_by_site: "Traffic by Site",
          tasks: "Tasks",
          sign_in: "Sign in to Minimal",
          no_account: "Don’t have an account? ",
          getStarted: "Get started",
          email_address: "Email Address",
          password: "Password",
          forgot_password: "Forgot Password",
          sixSocksStudio: "Six Socks Studio",
          vincenzoShowcase:
            "Vincenzo De Cotiis’ crossing over showcases a research on contamination",
          videoTutorial:
            "Simple, Great Looking Animations in Your Project | Video Tutorial",
          serifFonts: "40 Free Serif Fonts for Digital Designers",
          webClientEvolution:
            "Examining the Evolution of the Typical Web Design Client",
          katieGriffin: "Katie Griffin loves making that homey art",
          americanDream:
            "The American Dream retold through mid-century railroad graphics",
          illustrationSystem: "Illustration System Design",
          carZioApp: "CarZio-Delivery Driver App SignIn/SignUp",
          jamstackTutorial:
            "How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna",
          tylkoOrganise: "Tylko Organise effortlessly - 3D & Motion Design",
          rayoFestival: "RAYO – An expanded visual arts festival identity",
          burrillDiprose:
            "Anthony Burrill and Wired mag’s Andrew Diprose discuss the January ‘Change Everything’ cover",
          samuelDayMind: "Inside the Mind of Samuel Day",
          portfolioReview: "Portfolio Review: Is This Portfolio Too Creative?",
          akkersVanMargraten: "Akkers van Margraten",
          gradientTicket: "Gradient Ticket icon",
          dysonMotorcycle:
            "Here’s a Dyson motorcycle concept that doesn’t ‘suck’!",
          svgAnimation: "How to Animate an SVG with border-image",
        },
      },
      am: {
        translation: {
          minimalUI: "ቀላል ተጠቃሚ ቅርፅ",
          
          blog: "መጽሐፍ ወቅታዊ",
          Blog: "መጽሐፍ ወቅታዊ",
          dashboard: "መሪ ገጽ",
          user: "ተጠቃሚ",
          product: "ምርት",
          videos: "ቪዲዮዎች",
          Blogs: "መጽሐፍ ወቅታዊ",
          List: "ዝርዝር",
          upload: "አውርድ",
          video: "ቪዲዮ",
          videoUpload: "ቪዲዮ ስቀል",
          videoList: "ቪዲዮ ዝርዝር",
          whiteboardTemplates: "በኢንዱስትሪ መሪዎች የታሰሩ የዊትቦርድ አብነቶች",
          cybertruckTrailer: "በቴስላ ሳይበርትራክ የተነጠለ የመጓጓዣ ታነክ",
          teslaFansTagline: "ተመናግሮች ትራኩን እስካጠቡ የማይችሉ የቴስላ አመራሮች ይዘን!",
          landingPageDesign: "የDesignify ወኪል የመመገቢያ ገፅ ዲዛይን",
          whatIsDone: "✨ የተደረገ ተደርጓል ✨",
          freshPrince: "ወተሃደረ አለቃ",
          sixSocksStudio: "ስይክስ ሶክስ ስቱዲዮ",
          vincenzoShowcase: "ቪንቼንዞ ዴ ኮቲይስ የተበተነውን እየተገለጸ ያሳያል",
          videoTutorial: "በፕሮጀክትዎ ውስጥ አማራጭ፣ የሚያምሩ አኒሜሽኖች | ቪዲዮ መማሪያ",
          serifFonts: "ለዲጂታል አርቲስቶች 40 ነፃ የሰሪፍ ፎንቶች",
          webClientEvolution: "የዌብ አባል የተለመደውን ለውጥ ማጥናት",
          katieGriffin: "ኬቲ ግሪፊን የቤትን ስነ-ጥበብ ማድረግን ወደዳለች",
          americanDream: "የአሜሪካን ሕልም በመካከለኛው ክፍለ ዘመን ባትረክ ግራፊክስ በአዲስ እይታ",
          illustrationSystem: "የምስል አስደሳች ሥርዓት ንድፍ",
          carZioApp: "ካርዚዮ – የመጫኛ አፕሊኬሽን ማስመዝገቢያ / መግቢያ",
          jamstackTutorial: "የጀምስታክ መተግበሪያ በNetlify, Gatsby እና Fauna ማቅረብ",
          tylkoOrganise: "Tylko – በቀላሉ አከባበር | 3D እና እንቅስቃሴ ዲዛይን",
          rayoFestival: "RAYO – የተሰፋፋ የዓይነ አርት በዓል መታወቂያ",
          burrillDiprose:
            "አንቶኒ በሪል እና Andrew Diprose ለ“Change Everything” ኮቨር እንዴት እንደሠሩ ይናገራሉ",
          samuelDayMind: "የሳሙኤል ዴይ አስተሳሰብ ውስጥ",
          portfolioReview: "የፖርትፎሊዮ እይታ: ይህ ፖርትፎሊዮ በጣም ፈጣን ነው?",
          akkersVanMargraten: "አካርስ ቫን ማርግራተን",
          gradientTicket: "የግራዲየንት ቲኬት አዶ",
          dysonMotorcycle: "ይህ የዳይሰን የሞተርሳይክል ህልውና እንደ 'አይትርፍ' አይደለም!",
          svgAnimation: "ኤስቪጂን በborder-image እንዴት ማንዝረግ",
          welcomeBack: "ሰላም፣ እንኳን በደህና ተመለሱ",
          newPost: "",
          new_post: "አዲስ ልጥፍ",
          amharic: "አማርኛ",
          english: "እንግሊዝኛ",
          website_visits: "የድህረገፅ ጉብኝቶች",
          current_visits: "የአሁኑ ጊዜ ጉብኝቶች",
          conversion_rates: "የቀያይር መጠኖች",
          current_subject: "አሁን ያለው ርዕስ",
          news_update: "የዜና አዳዲስ መረጃ",
          order_timeline: "የትዕዛዝ ዘመን መስመር",
          traffic_by_site: "በድህረ ገፅ ትራፊክ",
          tasks: "ተግባሮች",
          sign_in: "ይግቡ",
          no_account: "መለያ የለዎትም? ",
          getStarted: "ይጀምሩ",
          email_address: "ኢሜይል አድራሻ",
          password: "የይለፍ ቃል",
          forgot_password: "የይለፍ ቃልዎን ረሱ?",
          login: "ግባ",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
