/* =====================================================================
   دماغ عليا — ملف المحتوى
   ---------------------------------------------------------------------
   كل محتوى الموقع هنا. عدّلي في الملف ده بس، والموقع كله يتحدّث.

   ➕ إزاي أضيف مشروع جديد؟
   الشغل كله جاي من Behance. ارفعي المشروع على Behance الأول، وبعدين
   زوّدي سطر في PROJECTS تحت (فوق خالص لو هو الأحدث):
      id       ← اسم قصير بالإنجليزي من غير مسافات
      cat      ← "identity" أو "campaign" أو "social" أو "print"
      behance  ← BE + آخر جزء من لينك المشروع (بعد /gallery/)
      cover    ← BC + مكان صورة الغلاف على Behance
      en / ar  ← t = الاسم، sec = المجال
      del      ← (اختياري) إنتي عملتي إيه في المشروع
   الكارت بيفتح المشروع على Behance على طول.

   ⚠️ خلي بالك من الفواصل ( , ) وعلامات التنصيص ( " ) — لو واحدة نقصت الصفحة مش هتفتح.
   ===================================================================== */


// الشغل كله من Behance — زي ما هو على البروفايل وبنفس الترتيب. كل كارت بيفتح المشروع على Behance على طول.
// مشروع جديد؟ زوّدي سطر فوق: id (اسم إنجليزي من غير مسافات)، cat (identity / campaign / social / print)، لينك المشروع، والكوفر.
const BE = "https://www.behance.net/gallery/", BC = "https://mir-s3-cdn-cf.behance.net/";
const PROJECTS = [
 { id:"syaaraat", cat:"campaign", behance:BE+"259046911/syaaraatcom", cover:BC+"project_modules/1400/646164259046911.6b0785ddeb12b.png",
   en:{t:"Syaaraat.com", sec:"Automotive finance · KSA"}, ar:{t:"سيارات.كوم", sec:"تمويل سيارات · السعودية"},
   del:{en:["Ad campaigns","Social media","Motion"], ar:["حملات إعلانية","سوشيال ميديا","موشن"]} },
 { id:"arena", cat:"print", behance:BE+"258875995/Arena-cafe", cover:BC+"project_modules/1400/653950258875995.6b03868d1a792.png",
   en:{t:"Arena Restaurant & Cafe", sec:"Brand book & menu"}, ar:{t:"أرينا ريستورانت وكافيه", sec:"براند بوك ومنيو"},
   del:{en:["Art direction","Menu","Print"], ar:["آرت دايركشن","منيو","مطبوعات"]} },
 { id:"arib", cat:"campaign", behance:BE+"237445675/Arib", cover:BC+"project_modules/1400/20a465237445675.6900d899cd7da.png",
   en:{t:"ARIB · Finance campaign", sec:"Fintech campaign"}, ar:{t:"أريب · حملة تمويل", sec:"حملة فينتك"},
   del:{en:["Campaign","Key visuals","App"], ar:["حملة","كي فيجوالز","تطبيق"]} },
 { id:"budgetly", cat:"identity", behance:BE+"258803329/Budgetly-Smart-Smarter-Future", cover:BC+"project_modules/1400/1356ab258803329.6b00d6d04accd.jpg",
   en:{t:"Budgetly", sec:"Fintech app"}, ar:{t:"Budgetly", sec:"تطبيق فينتك"},
   del:{en:["Brand identity", "UI/UX", "Landing page"], ar:["هوية بصرية", "UI/UX", "لاندينج بيدج"]} },
 { id:"jadayil-profile", cat:"print", behance:BE+"258801623/Jadayil-Dhahab", cover:BC+"project_modules/1400/141c37258801623.6b00c2e5f0e93.jpg",
   en:{t:"Jadayil Dhahab · Company Profile", sec:"Beauty"}, ar:{t:"جدايل ذهب · بروفايل الشركة", sec:"التجميل"},
   del:{en:["Company profile", "Editorial", "Print"], ar:["بروفايل شركة", "إديتوريال", "مطبوعات"]} },
 { id:"hadota", cat:"identity", behance:BE+"258673689/Hadota-Cafe-Jordan", cover:BC+"project_modules/1400/18f8b1258673689.6afd815e40ca2.jpg",
   en:{t:"Hadota Café", sec:"F&B · Jordan"}, ar:{t:"حدوتة كافيه", sec:"كافيهات · الأردن"},
   del:{en:["Brand identity", "Art direction"], ar:["هوية بصرية", "إدارة فنية"]} },
 { id:"jadayil-gold", cat:"campaign", behance:BE+"258672521/Jadayil-Dhahab", cover:BC+"project_modules/1400/fd4654258672521.6afd7a5f62622.jpg",
   en:{t:"Jadayil Dhahab", sec:"Beauty"}, ar:{t:"جدايل ذهب", sec:"التجميل"},
   del:{en:["Art direction", "Social media", "Retail"], ar:["إدارة فنية", "سوشيال ميديا", "ريتيل"]} },
 { id:"saudi-national-day", cat:"campaign", behance:BE+"256140015/_", cover:BC+"project_modules/1400/d26428256140015.6ab3db538d2dc.jpg",
   en:{t:"Saudi National Day", sec:"Syaaraat & ARIB"}, ar:{t:"اليوم الوطني السعودي", sec:"سيارات وأريب"},
   del:{en:["Campaign", "Key visuals"], ar:["حملة", "Key visuals"]} },
 { id:"maad-gate", cat:"identity", behance:BE+"250634425/MAAD-GATE-", cover:BC+"project_modules/1400/1947a1250634425.6a2394bd8fc2b.jpg",
   en:{t:"MA'AD GATE", sec:"Real estate"}, ar:{t:"بوابة مَعاد", sec:"العقارات"},
   del:{en:["Brand identity", "Visual system"], ar:["هوية بصرية", "نظام بصري"]} },
 { id:"arib-home-finance", cat:"campaign", behance:BE+"237300437/_", cover:BC+"project_modules/1400/2fa757237300437.6900d23e03607.png",
   en:{t:"ARIB · Your finance is now ARIB", sec:"Fintech"}, ar:{t:"تمويلك صار أريب", sec:"فينتك"},
   del:{en:["Campaign", "Social media"], ar:["حملة", "سوشيال ميديا"]} },
 { id:"arib-ready", cat:"campaign", behance:BE+"237400125/_", cover:BC+"project_modules/hd/b57fea237400125.69009bc84cc8a.png",
   en:{t:"ARIB · Your finance is ready", sec:"Fintech"}, ar:{t:"أريب تمويلك جاهز", sec:"فينتك"},
   del:{en:["Campaign", "Key visuals"], ar:["حملة", "Key visuals"]} },
 { id:"ezzena", cat:"campaign", behance:BE+"237380815/_", cover:BC+"project_modules/1400/8d4893237380815.68ffaa65722a5.png",
   en:{t:"Ezzena Betabena", sec:"National Day"}, ar:{t:"عزنا بطبعنا", sec:"اليوم الوطني"},
   del:{en:["Campaign", "Key visuals"], ar:["حملة", "Key visuals"]} },
 { id:"esports-wave", cat:"identity", behance:BE+"220162919/ESORTS-for-wave-media", cover:BC+"projects/max_808/48bb0d220162919.Y3JvcCwyNTU2LDIwMDAsMCww.jpg",
   en:{t:"ESPORTS for Wave Media", sec:"Esports"}, ar:{t:"إي سبورتس · ويف ميديا", sec:"رياضات إلكترونية"} },
 { id:"hemma-foundation", cat:"identity", behance:BE+"239107411/HDF-Hemma-Development-Foundation", cover:BC+"project_modules/1400/df251c239107411.6922718ee2307.jpg",
   en:{t:"HDF Hemma Development Foundation", sec:"Non-profit"}, ar:{t:"مؤسسة همّة للتنمية", sec:"مؤسسات تنموية"} },
 { id:"coconut", cat:"identity", behance:BE+"217384539/COCONUT-restaurant-lounge", cover:BC+"projects/max_808/3b1d07217384539.Y3JvcCwyNjY0LDIwODQsMCwxOTE.jpg",
   en:{t:"COCONUT Restaurant & Lounge", sec:"F&B"}, ar:{t:"كوكونت ريستورانت ولاونج", sec:"مطاعم"} },
 { id:"amyal", cat:"identity", behance:BE+"177551709/amyal-Branding-Identity", cover:BC+"projects/max_808/82be94177551709.Y3JvcCwzNDU0LDI3MDIsMzY3LDA.png",
   en:{t:"Amyal", sec:"Car brand identity"}, ar:{t:"أميال", sec:"هوية براند عربيات"},
   del:{en:["Logo","Brand identity"], ar:["لوجو","هوية بصرية"]} },
 { id:"beirut-beauty", cat:"social", behance:BE+"173237163/Beirut-beauty-clinic", cover:BC+"project_modules/1400/e4d375173237163.648c850b2213d.png",
   en:{t:"Beirut Beauty Clinic", sec:"Beauty"}, ar:{t:"عيادة بيروت للتجميل", sec:"التجميل"} },
 { id:"delano", cat:"identity", behance:BE+"220161391/Delano-Resturant", cover:BC+"project_modules/1400/e2461b220161391.67be2e5abbadf.jpg",
   en:{t:"Delano Restaurant", sec:"F&B"}, ar:{t:"مطعم ديلانو", sec:"مطاعم"} },
 { id:"ns3a", cat:"identity", behance:BE+"185418347/ns3a", cover:BC+"project_modules/1400/b14f60185418347.6563e63adbe92.jpg",
   en:{t:"ns3a", sec:"Marketing"}, ar:{t:"ns3a", sec:"تسويق"},
   del:{en:["Brand guidelines", "Social media"], ar:["دليل الهوية", "سوشيال ميديا"]} },
 { id:"sea-program", cat:"campaign", behance:BE+"197136397/_", cover:BC+"project_modules/1400/b3d526197136397.662b05ebbb782.jpg",
   en:{t:"Sea Dwellers Program", sec:"Program"}, ar:{t:"برنامج سكان البحر", sec:"برنامج"} },
 { id:"arabian-travelers", cat:"identity", behance:BE+"149786101/Arabian-Company-For-Travelers-Services", cover:BC+"project_modules/1400/bd16b1149786101.62ed6c3e31d81.png",
   en:{t:"Arabian Company for Travelers Services", sec:"Travel"}, ar:{t:"الشركة العربية لخدمات المسافرين", sec:"سفر"} },
 { id:"unit-furniture", cat:"social", behance:BE+"184898415/unit-furniture", cover:BC+"project_modules/1400/c9ac77184898415.655a8fe3eb6e0.jpg",
   en:{t:"Unit Furniture", sec:"Furniture"}, ar:{t:"يونت للأثاث", sec:"أثاث"} },
 { id:"xo-nursery", cat:"social", behance:BE+"173233853/XO-nursery", cover:BC+"project_modules/hd/97f28a173233853.648c7e940da95.png",
   en:{t:"XO Nursery", sec:"Kids"}, ar:{t:"حضانة XO", sec:"أطفال"} },
 { id:"amarylis", cat:"identity", behance:BE+"185410061/amarylis-", cover:BC+"project_modules/1400/5aff88185410061.6563ac21f3338.jpg",
   en:{t:"Amarylis", sec:"Brand"}, ar:{t:"أمارلس", sec:"براند"} },
 { id:"zomex", cat:"social", behance:BE+"167486813/ZomEx-social-media-for-shipping", cover:BC+"project_modules/1400/7d2621167486813.642a2747985cc.jpg",
   en:{t:"ZomEx", sec:"Shipping"}, ar:{t:"زوم إكس", sec:"شحن"} },
 { id:"alrosha", cat:"identity", behance:BE+"155037961/Alrosha-lounge-Restaurant-", cover:BC+"project_modules/1400/27b225155037961.634e9c330b9be.png",
   en:{t:"Alrosha Lounge Restaurant", sec:"F&B"}, ar:{t:"مطعم الروشة لاونج", sec:"مطاعم"} },
 { id:"brand-identity-design", cat:"print", behance:BE+"147187827/BRAND-IDENTITY-DESIGN", cover:BC+"project_modules/1400/813ec1147187827.62bda75797eab.jpg",
   en:{t:"Brand Identity Designs", sec:"Identity collection"}, ar:{t:"تصاميم هوية بصرية", sec:"مجموعة هويات"} },
 { id:"media-guide", cat:"identity", behance:BE+"147166271/Media-Guide", cover:BC+"projects/max_808/54fdf1147166271.Y3JvcCw5NzAsNzU4LDAsMTIxOQ.jpg",
   en:{t:"Media Guide", sec:"Media"}, ar:{t:"ميديا جايد", sec:"ميديا"} },
 { id:"jewelry-ksa", cat:"social", behance:BE+"125634669/Jewelry-store-Social-Media-Ksa", cover:BC+"projects/max_808/ea15ad125634669.613a8f2876840.png",
   en:{t:"Jewelry Store · KSA", sec:"Jewelry"}, ar:{t:"محل مجوهرات · السعودية", sec:"مجوهرات"} }
];

const NOTES = [
 {k:"kids", en:["The kindergarten",["My first job: art teacher at a kindergarten.","Kids paint the sun purple — with total confidence — and nobody can tell them no.","That's where I learned imagination has no rules.","Work with me and you'll meet that little girl. She's still in here 🎨"]],
            ar:["الحضانة",["أول شغلانة ليا: مُدرّسة Art في حضانة.","عيال بترسم الشمس بنفسجي وهي واثقة جدًا… ومحدش يقدر يقولها لأ.","من هناك اتعلمت إن الخيال مالوش قواعد.","ولو اشتغلنا سوا، هتقابل الطفلة دي… لسه جوايا 🎨"]]},
 {k:"commerce", en:["Commerce?",["I studied commerce. Yes, commerce.","And every interview asks: “what does that have to do with design?”","I don't love numbers — but they taught me every design has a business behind it that needs to win.","And I passed. Out of pure stubbornness 😌"]],
            ar:["تجارة؟",["دخلت تجارة. آه والله، تجارة.","والسؤال اللي بيطلعلي في كل مقابلة: «وإيه علاقة ده بالتصميم؟»","أنا مش بحب الأرقام… بس فهمت منها إن ورا كل تصميم في بيزنس لازم يكسب.","ونجحت فيها. عِند بقى 😌"]]},
 {k:"graphic", en:["Graphic design",["In my second year of commerce, I started studying design on the side.","Accounting by day, Photoshop by night.","Finished both — and chose design, because that's where my heart kept running."]],
            ar:["جرافيك",["في سنة تانية تجارة، بدأت أدرس جرافيك جنب الكلية.","الصبح محاسبة… وبالليل فوتوشوب.","خلصت الاتنين، وفي الآخر اخترت الجرافيك. علشان ده اللي قلبي كان بيجري عليه."]]},
 {k:"digital", en:["Digital print",["I fell for the smell of paper and ink coming out of the machine still warm.","Something on a screen ending up in your hand — that was magic to me.","Since then I design for how it'll feel printed, not just how it glows on screen."]],
            ar:["مطبعة ديجيتال",["انبهرت بريحة الورق والحبر وهو طالع سخن من المكنة.","إن الحاجة اللي كانت على الشاشة تبقى في إيدك… دي كانت سحر بالنسبالي.","ومن ساعتها بصمم وأنا بفكر هتتلمس إزاي، مش بس هتلمع إزاي على الشاشة."]]},
 {k:"offset", en:["Offset press",["Then an offset press — because I love books.","There I learned one mistake in one file = thousands of wrong copies.","So now I care about every millimetre… and check three times before I hit send 😅"]],
            ar:["مطبعة أوفست",["بعدها مطبعة أوفست… علشان بحب الكتب.","وهناك اتعلمت إن غلطة في ملف واحد = آلاف النسخ غلط.","فبقيت بركّز في كل مليمتر… وبراجع تلات مرات قبل ما أبعت 😅"]]},
 {k:"ads", en:["Advertising",["Then I walked into advertising — and everything flipped.","An ad isn't a pretty picture. It's an idea that has three seconds to stop you.","Campaigns, key visuals, social, briefs that change at 2 a.m.","The big lesson: idea first. The look comes to serve it."]],
            ar:["الإعلانات",["وبعدين دخلت عالم الإعلانات… وهنا الدنيا اتقلبت.","الإعلان مش صورة حلوة وخلاص، ده فكرة قدامها تلات ثواني توقّفك.","حملات، Key visuals، سوشيال، وبريفات بتتغير الساعة ٢ بالليل.","وأهم درس: الفكرة الأول… والشكل ييجي يخدمها."]]},
 {k:"ideas", en:["Where do ideas come from?",["Not from the sky while I stare at a laptop.","They come on the metro, mid-film, in front of a 3,000-year-old statue, or from something a friend said by accident.","So I collect: screenshots, words, colours, anything that grabbed me.","When a brief lands, my brain opens the drawer and pulls out what it needs 🧠"]],
            ar:["الأفكار بتجيلي إزاي؟",["مش بتنزل عليا من السما وأنا قاعدة قدام اللابتوب.","بتجيلي في المترو، في نص فيلم، قدام تمثال عمره ٣ آلاف سنة، أو من جملة صاحبتي قالتها بالصدفة.","فأنا بجمّع: سكرين شوتس، كلام، ألوان، أي حاجة شدتني.","ولما ييجي بريف، الدماغ بتفتح الدرج وتطلّع اللي محتاجاه 🧠"]]},
 {k:"solve", cls:"hot", en:["I don't just design",["Nobody comes to me because they “want a nice design”.","They come with a problem: nobody notices them, people don't get what they sell, or the brand doesn't look like them.","So I ask first: why? who for? where do we want to go?","Then I design the solution — which happens to look good too 😉"]],
            ar:["أنا مش بس بصمم",["محدش بييجيلي علشان «عايز تصميم حلو».","بييجي ومعاه مشكلة: محدش واخد باله منه، الناس مش فاهمة هو بيبيع إيه، أو شكله مش شبهه.","فأنا بسأل الأول: ليه؟ لمين؟ وعايزين نوصل لفين؟","وبعدين أصمم الحل… اللي بيطلع حلو كمان 😉"]]},
 {k:"places", en:["Ancient places",["My favourite outing? A museum.","The Grand Egyptian Museum, Civilization, Ibn Tulun, the Canal museum, the Bar-Lev line… and the list keeps growing.","Every hieroglyph wall is a design thousands of years old that still works without a single word.","Our ancestors were the first designers. I'm just carrying on the job 🏛️"]],
            ar:["الأماكن الأثرية",["خروجتي المفضلة؟ متحف.","المتحف المصري الكبير، والحضارة، وابن طولون، ومتحف القناة، وخط بارليف… ولسه القايمة طويلة.","كل حيطة هيروغليفي تصميم عمره آلاف السنين، ولسه بيتفهم من غير ولا كلمة.","أجدادنا كانوا أول ديزاينرز… وأنا بس بكمّل الشغل 🏛️"]]},
 {k:"films", en:["Films",["I love films — especially Egyptian comedy, cartoons and fairy tales.","I watch with one eye on the colours, the framing, and how a poster tells the whole film in one picture.","A warm one like Wonder reminds me: the best design is the one that delivers a feeling.","My full list is in the Playground — go recommend me one 🎬"]],
            ar:["الأفلام",["بحب الأفلام… خصوصًا الكوميدي المصري والكرتون والحواديت.","وبتفرج وعيني على الألوان، والكادر، وإزاي البوستر قال الفيلم كله في صورة واحدة.","وفيلم بيدفّي القلب زي Wonder بيفكرني إن أحسن تصميم هو اللي بيوصّل إحساس.","الليستة كلها في الـ Playground… ادخل ورشحلي واحد 🎬"]]},
 {k:"countries", flags:[["eg","Egypt","مصر"],["sa","Saudi Arabia","السعودية"],["ae","UAE","الإمارات"],["jo","Jordan","الأردن"],["ye","Yemen","اليمن"],["qa","Qatar","قطر"]],
   en:["Six countries",["From Cairo… to Riyadh, Amman and Dubai.","Every country has its own taste, every audience its own language.","So I design knowing exactly who's looking."]],
   ar:["اشتغلت مع ٦ دول",["من القاهرة… لحد الرياض وعمّان ودبي.","كل بلد ليها ذوق، وكل جمهور ليه لغة.","فبصمم وأنا فاهمة مين اللي هيشوف."]]},
 {k:"games", cls:"games", en:["And games.",["Something you can't forget: I adore games. All of them.","UNO. Sudoku. Truth-or-dare. Movie trivia.","That's why this site has a whole Playground 🎲","Any game with an idea… count me in."]],
            ar:["والألعاب",["وفي حاجة ما ينفعش تتنسي: أنا بعشق الألعاب. كلها.","UNO. سودوكو. قول أو اعمل. أسئلة أفلام.","وعلشان كده الموقع ده فيه Playground كامل 🎲","أي لعبة فيها فكرة… أنا موجودة."]]}
];
const CARDS = [
 {en:"If you could erase one thing from your mind, what would it be?", ar:"لو عندك اختيار واحد بس تمسحه من دماغك… هيكون إيه؟"},
 {en:"A great idea with no execution — or a simple execution of an honest idea?", ar:"فكرة حلوة من غير تنفيذ… ولا تنفيذ بسيط لفكرة صادقة؟"},
 {en:"One color for your brand, forever. Which one?", ar:"لون واحد بس لبراندك طول العمر. هتختار إيه؟"},
 {en:"A logo you get at first glance — or one that makes you ask?", ar:"لوجو يتفهم من أول نظرة… ولا لوجو يخليك تسأل؟"},
 {en:"The last ad that stuck in your head — why did it?", ar:"آخر إعلان فضل في دماغك… ليه فضل؟"},
 {en:"If your brand were a game, which game would it be?", ar:"لو براندك لعبة… هيكون لعبة إيه؟"},
 {en:"A trend that spreads today — or an idea that lives for years?", ar:"تريند ينتشر النهارده… ولا فكرة تعيش سنين؟"},
 {en:"What's the one question you ask yourself before starting anything?", ar:"إيه السؤال اللي بتسأله لنفسك قبل ما تبدأ أي حاجة؟"},
 {en:"Truth or dare: name the last film you watched twice.", ar:"قول أو اعمل: قول آخر فيلم اتفرجت عليه مرتين."},
 {en:"Food that looks great and tastes okay — or looks okay and tastes amazing?", ar:"أكل شكله حلو وطعمه عادي… ولا شكله عادي وطعمه جامد؟"},
 {en:"Does travel change the way you think — or just make it clearer?", ar:"السفر بيغيّر التفكير… ولا بيوضّحه؟"},
 {en:"If your brain had a colour palette, what are its three colours?", ar:"لو دماغك ليها باليتة ألوان… إيه الـ ٣ ألوان؟"},
 {en:"What do people think you love… that you secretly can't stand?", ar:"إيه الحاجة اللي الناس فاكراك بتحبها… وإنت أصلًا مش طايقها؟"},
 {en:"If life had an undo button, where would you press it?", ar:"لو حياتك فيها زرار Undo… هتدوس عليه فين؟"},
 {en:"If your name were a brand, what's its slogan?", ar:"لو اسمك براند… السلوجن بتاعه هيبقى إيه؟"},
 {en:"Which font is most like you — and why?", ar:"أنهي فونت شبهك أكتر؟ وليه؟"},
 {en:"What tiny thing, if it disappeared, would ruin your whole day?", ar:"حاجة صغيرة في يومك لو اختفت… اليوم كله يبوظ؟"},
 {en:"A five-second ad for yourself: what do you say?", ar:"إعلان لنفسك في ٥ ثواني… هتقول فيه إيه؟"},
 {en:"The last time you changed your mind about something you were sure of?", ar:"آخر مرة غيّرت رأيك في حاجة كنت متأكد منها… كانت إيه؟"},
 {en:"If your mind were a room, what's the first thing you'd see when you open the door?", ar:"لو دماغك أوضة… أول حاجة هتشوفها لما تفتح الباب إيه؟"},
 {en:"Advice you ignored — that turned out to be right?", ar:"نصيحة سمعتها ومعملتهاش… وطلع عندها حق؟"},
 {en:"If today were a film title, what would it be?", ar:"لو النهارده اسم فيلم… هيبقى إيه؟"},
 {en:"The word you say so often it's become your signature?", ar:"الكلمة اللي بتقولها كتير لدرجة إنها بقت توقيعك؟"},
 {en:"Redesign one thing in your home — where do you start?", ar:"لو هتعمل ريديزاين لحاجة واحدة في بيتك… هتبدأ بإيه؟"}
];
const STEPS = [
 {en:["Look","The market, the people and the brand itself: where do we actually stand?"], ar:["أشوف","السوق، والناس، والبراند نفسه: إحنا واقفين فين؟"]},
 {en:["Decide","The goal leads the look — not the other way round. Not every idea gets made."], ar:["أقرر","الهدف هو اللي بيقود الشكل، مش العكس. ومش كل فكرة تتنفّذ."]},
 {en:["Make","Every piece has its time, its place and its channel."], ar:["أنفّذ","كل حاجة ليها وقتها، ومكانها، والقناة المناسبة ليها."]},
 {en:["Adjust","If something isn't working, it gets fixed — not worshipped."], ar:["أغيّر لو لزم","اللي مش شغال بيتعدّل… مش بيتقدّس."]}
];
const DIFF = {en:[["Execution","Thinking + execution"],["A look","A message"],["Following the trend","Taking a stand"],["Selling fast","Building value"]],
              ar:[["تنفيذ","تفكير + تنفيذ"],["شكل","رسالة"],["تريند","موقف"],["بيع مباشر","بناء قيمة"]]};
const EXTRA = {en:["Key visuals","Logo design","Creative direction","Presentation design","Retouching","Photo manipulation","Animated GIFs","Infographics"],
               ar:["Key visuals","تصميم اللوجو","الإدارة الإبداعية","تصميم البرزنتيشن","الريتاتش","Photo manipulation","Animated GIFs","الإنفوجرافيك"]};
const TEAMS = ["ARIB","Syaaraat.com","Aurora House","Khebrat","Media Guide","EngazMedia","Silver Print","Nina Prints"];
const BRANDS = {en:["LAMSA","Jadayil Dhahab","MA'AD GATE","Wave Media","Hemma Foundation","Coconut","Beirut Beauty Clinic","Delano","ns3a"],
                ar:["لمسة","جدايل ذهب","بوابة مَعاد","ويف ميديا","مؤسسة همّة","كوكونت","عيادة بيروت","ديلانو","ns3a"]};
const SERVICES = [
 {en:["Art direction","Setting the visual concept and keeping every piece of a campaign on one idea."], ar:["الإدارة الفنية","تحديد الفكرة البصرية والحفاظ على كل عناصر الحملة حول فكرة واحدة."]},
 {en:["Brand identity","Logos, color, type and guidelines a team can actually work with."], ar:["الهوية البصرية","شعارات وألوان وخطوط ودليل استخدام يستطيع الفريق العمل به فعلًا."]},
 {en:["Campaigns","Launches, offers and seasonal moments like National Day — across digital and print."], ar:["الحملات الإعلانية","إطلاقات وعروض ومناسبات موسمية كاليوم الوطني — رقميًا ومطبوعًا."]},
 {en:["Social media","Connected post systems with a clear rhythm, not one-off designs."], ar:["السوشيال ميديا","أنظمة منشورات مترابطة بإيقاع واضح، لا تصاميم منفصلة."]},
 {en:["Print, packaging & BTL","Production-ready files for print, packaging and in-store activations."], ar:["الطباعة والتغليف","ملفات جاهزة للإنتاج للمطبوعات والتغليف والتفعيلات داخل المتاجر."]},
 {en:["UI/UX design","App and web interfaces designed in Figma, from flow to final screens."], ar:["تصميم واجهات وتجربة المستخدم","واجهات تطبيقات ومواقع على Figma، من رحلة المستخدم حتى الشاشات النهائية."]},
 {en:["Motion, video & animation","Short videos, animated posts and motion graphics that move the brand on screen."], ar:["الموشن والفيديو والأنيميشن","فيديوهات قصيرة ومنشورات متحركة وموشن جرافيك تُحرّك العلامة على الشاشة."]},
 {en:["2D illustration & infographics","Flat art and clear infographics that explain a product at a glance."], ar:["الرسم ثنائي الأبعاد والإنفوجرافيك","رسوم مسطّحة وإنفوجرافيك واضح يشرح المنتج من النظرة الأولى."]}
];
// الخدمات متقسمة ٣ أعمدة: كل عمود له رقم واسم وجملة وشيبس بالحاجات اللي جواه
const PILLARS = [
 {en:["Idea & art direction","One clear idea first, then every piece follows it.",["Creative concept","Art direction","Key visuals","Visual storytelling","Presentation design"]],
  ar:["الفكرة والإدارة الفنية","فكرة واحدة واضحة الأول… وبعدها كل قطعة بتمشي وراها.",["تطوير الفكرة الإبداعية","الإدارة الفنية","Key visuals","السرد البصري","تصميم البرزنتيشن"]]},
 {en:["Brand identity","A brand that looks like itself — and a team that can actually use it.",["Logo design","Visual identity","Brand guidelines","Print & packaging","Brand applications"]],
  ar:["الهوية والبراند","براند شبه نفسه… وفريق يقدر يشتغل بيه فعلًا.",["تصميم اللوجو","الهوية البصرية","دليل الهوية","الطباعة والتغليف","تطبيقات العلامة"]]},
 {en:["Campaigns & content","Campaigns and post systems with a rhythm, not one-off designs.",["Advertising campaigns","National Day & seasons","Social media systems","Motion & video","Animated GIFs","2D illustration & infographics","Retouching & photo manipulation","UI/UX in Figma"]],
  ar:["الحملات والمحتوى","حملات وأنظمة منشورات ليها إيقاع، مش تصاميم منفصلة.",["الحملات الإعلانية","اليوم الوطني والمواسم","أنظمة السوشيال ميديا","الموشن والفيديو","Animated GIFs","الرسم 2D والإنفوجرافيك","الريتاتش و Photo manipulation","واجهات UI/UX على Figma"]]}
];
const SECTORS = {en:["Fintech","Automotive","Travel & aviation","Marketing","F&B","Beauty","Jewelry","Kids & nurseries","Furniture & home","Real estate","Government","Medical","Non-profit","Entertainment","Publishing","Consumer brands"],
                 ar:["التقنية المالية","السيارات","السفر والطيران","التسويق","المطاعم","التجميل","المجوهرات","الأطفال والحضانات","الأثاث والسجاد","العقارات","الجهات الحكومية","الطبي","القطاع غير الربحي","الترفيه","النشر","المنتجات الاستهلاكية"]};
const MARKETS = {en:["Egypt","Saudi Arabia","UAE","Yemen","Jordan","Qatar"], ar:["مصر","السعودية","الإمارات","اليمن","الأردن","قطر"]};
const MARQUEE = {en:["Brand identity","Creative campaigns","Art direction","Social media","Visual storytelling","Motion"],
                 ar:["الهوية البصرية","الحملات الإبداعية","الإدارة الفنية","السوشيال ميديا","السرد البصري","الموشن"]};
const JOBS = [
 {c:"Aurora House", now:true,
  en:["Freelance Graphic Designer","Jordan · Remote","May 2026","Marketing agency",["Social media content and campaign visuals for multiple client accounts.","Each piece adapted to the client's identity, on agency timelines."]],
  ar:["مصممة جرافيك (فريلانس)","الأردن · عن بُعد","مايو 2026","وكالة تسويق",["محتوى سوشيال ميديا وتصاميم حملات لعدة عملاء.","كل تصميم مُكيّف مع هوية العميل وضمن مواعيد الوكالة."]]},
 {c:"ARIB", now:true,
  en:["Senior Graphic Designer","Saudi Arabia","Dec 2022","Fintech licensed by the Saudi Central Bank",["Own all design output — social media, short videos, print and brand assets.","Built ARIB's visual presence on social media from launch."]],
  ar:["مصممة جرافيك أولى","السعودية","ديسمبر 2022","تقنية مالية مرخّصة من البنك المركزي السعودي",["مسؤولة عن كل مخرجات التصميم — السوشيال ميديا والفيديوهات القصيرة والمطبوعات وأصول العلامة.","بنيت الحضور البصري لأريب على السوشيال ميديا منذ الإطلاق."]]},
 {c:"Syaaraat.com", now:true,
  en:["Senior Graphic Designer","Saudi Arabia","Dec 2022","Automotive financing · ARIB subsidiary",["All design for the platform — campaigns, animations, listings and offers."]],
  ar:["مصممة جرافيك أولى","السعودية","ديسمبر 2022","تمويل سيارات · تابعة لأريب",["كل تصاميم المنصة — الحملات والأنيميشن والإعلانات والعروض."]]},
 {c:"Khebrat",
  en:["Senior Graphic Designer","Yemen / UAE","Aug 2021 — May 2023","",["Branding toolkits and visual identity systems for regional clients.","Campaign visuals, packaging and BTL materials."]],
  ar:["مصممة جرافيك أولى","اليمن / الإمارات","أغسطس 2021 — مايو 2023","",["أدوات هوية وأنظمة بصرية لعملاء في المنطقة.","تصاميم حملات وتغليف ومواد BTL."]]},
 {c:"Media Guide",
  en:["Mid-level Graphic Designer","Saudi Arabia","Oct 2020 — Dec 2022","",["Visual identity systems, online campaigns, packaging and BTL."]],
  ar:["مصممة جرافيك","السعودية","أكتوبر 2020 — ديسمبر 2022","",["أنظمة هوية بصرية وحملات رقمية وتغليف ومواد BTL."]]},
 {c:"EngazMedia",
  en:["Graphic Designer","Egypt","Mar 2020 — Oct 2020","",["Visual storytelling for social campaigns; branding kits and moodboards."]],
  ar:["مصممة جرافيك","مصر","مارس 2020 — أكتوبر 2020","",["سرد بصري لحملات السوشيال؛ أدوات هوية ولوحات إلهام."]]},
 {c:"Silver Print",
  en:["Graphic Designer","Egypt","Jul 2019 — Mar 2020","",["Campaign visuals, branding kits and visual direction materials."]],
  ar:["مصممة جرافيك","مصر","يوليو 2019 — مارس 2020","",["تصاميم حملات وأدوات هوية ومواد توجيه بصري."]]},
 {c:"Nina Prints",
  en:["Graphic Designer","Egypt","May 2018 — Jul 2019","",["Customized gifts, printed products and branded items."]],
  ar:["مصممة جرافيك","مصر","مايو 2018 — يوليو 2019","",["هدايا مخصصة ومنتجات مطبوعة ومنتجات تحمل العلامة."]]}
];
const COURSES = [
 {dip:1,en:"UI/UX Design Diploma",ar:"دبلومة تصميم واجهات وتجربة المستخدم",by:"Route Academy"},
 {dip:1,en:"Motion Graphics Diploma",ar:"دبلومة الموشن جرافيك",by:"Adobe Academy"},
 {dip:1,en:"Graphic Design Diploma",ar:"دبلومة التصميم الجرافيكي",by:"Russian Culture Center"},
 {en:"Figma Professional Training",ar:"تدريب Figma الاحترافي",by:"Route Academy"},
 {en:"How to Build a Strong Brand",ar:"كيف تبني علامة تجارية قوية",by:"Creato Academy"},
 {en:"Developing Ways of Thinking",ar:"تطوير طرق التفكير",by:"Creato Academy"},
 {en:"500% Zoom: Realistic Visual Art",ar:"Zoom 500%: الفن البصري الواقعي",by:"Creato Academy"},
 {en:"Graphic Camp",ar:"معسكر الجرافيك",by:"Graphic School"},
 {en:"Branding Workshop",ar:"ورشة البراندنج",by:"Simply Workshop"},
 {edu:1,en:"Bachelor of Commerce, Accounting — 2018",ar:"بكالوريوس التجارة، قسم المحاسبة — 2018",by:"Ain Shams University"}
];
const TOOLS = ["Photoshop","Illustrator","InDesign","Lightroom","Figma","After Effects","Premiere Pro"];
const AI = ["ChatGPT","Claude","Gemini","Adobe Firefly","Magnific","Flora","Runway","Figma AI","ElevenLabs","Freepik","Envato","Pitch"];


/* =====================================================================
   ملعب دماغ عليا — كل محتوى صفحة الملعب
   ===================================================================== */

// الكوتشينة: كل مجموعة كروت (deck) ليها اسم وكروت. زوّدي أو غيّري براحتك.
const DECKS = [
 { id:"brain", en:"Brain questions", ar:"أسئلة دماغ عليا", cards: CARDS },
 { id:"sayordo", en:"Say or do", ar:"قول أو اعمل", cards: [
   {en:"Say: the first colour that comes to mind when you hear “Monday”.", ar:"قول: أول لون بييجي في دماغك لما تسمع كلمة «الحد»."},
   {en:"Do: draw your mood right now in one line.", ar:"اعمل: ارسم مودك دلوقتي في خط واحد."},
   {en:"Say: a brand you'd redesign tomorrow if you could.", ar:"قول: براند نفسك تعمله ريديزاين بكرة."},
   {en:"Do: describe your favourite food in three words only.", ar:"اعمل: وصّف أكلتك المفضلة في 3 كلمات بس."},
   {en:"Say: the last thing that made you laugh out loud.", ar:"قول: آخر حاجة ضحكتك من قلبك."},
   {en:"Do: rename your job title — make it funnier.", ar:"اعمل: غيّر اسم وظيفتك لاسم أظرف."},
   {en:"Say: the food that tastes like Eid.", ar:"قول: الأكلة اللي طعمها عيد."},
   {en:"Do: draw your first initial in the air — the others guess it.", ar:"اعمل: ارسم أول حرف من اسمك في الهوا… والباقي يخمّن."},
   {en:"Say: the song that would make you get up and dance right now.", ar:"قول: الأغنية اللي لو اشتغلت دلوقتي هتقوم ترقص."},
   {en:"Do: act out a famous ad in ten seconds.", ar:"اعمل: مثّل إعلان مشهور في ١٠ ثواني."},
   {en:"Say: the last thing you bought and never used.", ar:"قول: آخر حاجة اشتريتها ومستخدمتهاش خالص."},
   {en:"Do: pitch the person next to you like a product on sale.", ar:"اعمل: اعرض اللي جنبك كأنه منتج عليه عرض."},
   {en:"Say: your most-used emoji — and what it says about you.", ar:"قول: الإيموجي اللي بتستخدمه أكتر… وبيقول عنك إيه؟"},
   {en:"Do: hum a song with “la la” only — the others guess it.", ar:"اعمل: دندن أغنية بـ«لا لا» بس… والباقي يخمّن."},
   {en:"Say: a brand you'd genuinely miss if it vanished tomorrow.", ar:"قول: ماركة لو اختفت بكرة هتزعل عليها بجد."},
   {en:"Do: strike your “the photo came out great” pose.", ar:"اعمل: البوز بتاعك لما الصورة تطلع حلوة."}
 ]},
 { id:"movies", en:"Movie night", ar:"أسئلة أفلام", cards: [
   {en:"The film you've watched more times than you'd admit?", ar:"الفيلم اللي اتفرجت عليه مرات أكتر ما تحب تعترف؟"},
   {en:"Tell a famous film in emojis only — the others guess.", ar:"احكي فيلم مشهور بالإيموجي بس… والباقي يخمّن."},
   {en:"A film poster you still remember — why that one?", ar:"بوستر فيلم لسه فاكره… ليه هو بالذات؟"},
   {en:"Cartoon from childhood you'd watch again today?", ar:"كارتون من طفولتك تتفرج عليه تاني النهارده؟"},
   {en:"If your life were a film, what genre would it be?", ar:"لو حياتك فيلم… هيكون نوعه إيه؟"},
   {en:"The soundtrack that lives in your head rent-free?", ar:"المزيكا التصويرية اللي ساكنة دماغك ببلاش؟"},
   {en:"A film character you'd stop in the street — what would you say?", ar:"شخصية من فيلم لو قابلتها في الشارع… هتقولها إيه؟"},
   {en:"A film ending you'd rewrite — how would it end?", ar:"فيلم نهايته مش عاجباك… هتخلّصه إزاي؟"},
   {en:"A film line you use in real life?", ar:"إفيه من فيلم بتقوله في حياتك العادية؟"},
   {en:"A film about your family: who's the hero, who's the villain?", ar:"لو اتعمل فيلم عن عيلتك… مين البطل ومين الشرير؟"},
   {en:"A cinema trip you still remember — who was with you?", ar:"خروجة سينما لسه فاكرها… مين كان معاك؟"},
   {en:"Your comfort film for bad days?", ar:"الفيلم اللي بتشغّله لما تكون متضايق؟"},
   {en:"Step into one cartoon world for a day — which one?", ar:"لو هتعيش يوم جوه عالم كرتون… هتختار أنهي عالم؟"},
   {en:"A film poster you'd redesign — what would you change?", ar:"بوستر فيلم لو إنت اللي مصممه… كنت هتغيّر فيه إيه؟"}
 ]},
 { id:"this", en:"This or that", ar:"ده ولا ده", cards: [
   {en:"Fast idea — or honest idea?", ar:"فكرة أسرع… ولا فكرة أصدق؟"},
   {en:"Safety — or ease?", ar:"الأمان… ولا السهولة؟"},
   {en:"A post that makes you laugh — or one that stays with you?", ar:"بوست يضحّك… ولا بوست يعلّم معاك؟"},
   {en:"Shine — or simplicity?", ar:"اللمعة… ولا البساطة؟"},
   {en:"Something that lasts — or something that dazzles?", ar:"الحاجة اللي تعيش… ولا الحاجة اللي تبهر؟"},
   {en:"Something for the shelf — or something you use every day?", ar:"حاجة تتحط على الرف… ولا حاجة تتستخدم كل يوم؟"},
   {en:"Morning person — or night owl?", ar:"بتصحى بدري… ولا بتسهر؟"},
   {en:"Tea — or coffee?", ar:"شاي… ولا قهوة؟"},
   {en:"Plan everything — or wing it?", ar:"تخطط لكل حاجة… ولا تمشيها بالبركة؟"},
   {en:"Voice note — or text?", ar:"فويس… ولا تكتب؟"},
   {en:"Famous — or at peace?", ar:"تبقى مشهور… ولا تبقى مرتاح؟"},
   {en:"Minimal and precise — or loud and bold?", ar:"تصميم بسيط ومظبوط… ولا مليان وجريء؟"},
   {en:"Sea — or mountains?", ar:"البحر… ولا الجبل؟"},
   {en:"Travel solo — or with the gang?", ar:"تسافر لوحدك… ولا مع الشلة؟"},
   {en:"An Arabic logo — or an English one?", ar:"اللوجو بالعربي… ولا بالإنجليزي؟"},
   {en:"Know the ending — or be surprised?", ar:"تعرف النهاية من الأول… ولا تتفاجئ؟"}
 ]}
];

// سودوكو 4×4 — كل لغز: puzzle (0 = خانة فاضية) و solution
const SUDOKU = [
 { puzzle:[1,2,0,4, 0,4,1,0, 0,1,4,0, 4,0,0,1], solution:[1,2,3,4, 3,4,1,2, 2,1,4,3, 4,3,2,1] },
 { puzzle:[0,3,0,2, 2,0,3,0, 0,4,0,3, 3,0,4,0], solution:[4,3,1,2, 2,1,3,4, 1,4,2,3, 3,2,4,1] },
 { puzzle:[2,0,0,0, 0,0,2,4, 4,3,0,0, 0,0,0,3], solution:[2,4,3,1, 3,1,2,4, 4,3,1,2, 1,2,4,3] }
];

// ملاحظات ديزاينر — الكارت بيتقلب: الوش = الكلمة، الضهر = الملاحظة
const DESIGN_NOTES = [
 {k:"Art direction", en:"Art direction isn't taste. It's a decision that keeps every element heading the same way.", ar:"الـ Art Direction مش ذوق. هو قرار… يخلي كل عنصر ماشي في نفس الاتجاه."},
 {k:"Concept", en:"Not “does it look good?” — but “what does it make you feel?”", ar:"السؤال مش: الشكل حلو؟ السؤال: الشكل ده بيحسّس بإيه؟"},
 {k:"Color", en:"Colours aren't picked. They're put to work. One wrong colour breaks a right feeling.", ar:"الألوان مش بتتختار… بتتوظّف. لون غلط يبوّظ إحساس صح."},
 {k:"Typography", en:"Type speaks, even when it's silent. Choosing a font is choosing a tone of voice.", ar:"الخط بيتكلم حتى لو ساكت. اختيار الخط = اختيار نبرة صوت."},
 {k:"Grid", en:"A grid isn't a prison. It protects the idea from chaos. Break it — knowingly.", ar:"الـ Grid مش سجن. بيحمي الفكرة من الفوضى. اكسره… بس وانت فاهم."},
 {k:"Focal point", en:"Something has to be seen first. Without it the eye gets tired and the message gets lost.", ar:"لازم حاجة تتشاف الأول. من غيرها العين بتتعب والرسالة بتضيع."},
 {k:"Negative space", en:"White space isn't empty. It's what makes the thing next to it visible.", ar:"الفراغ مش فاضي. هو اللي بيخلّي الحاجة اللي جنبه تبان."},
 {k:"Repetition", en:"Repetition isn't boring. It creates rhythm and fixes the idea in place.", ar:"التكرار مش ملل. بيعمل إيقاع… وبيثبّت الفكرة."},
 {k:"Hierarchy", en:"Not everything matters equally. Closeness says “these belong together” without a word.", ar:"مش كل حاجة مهمة بنفس الدرجة. وقُرب الحاجات من بعض بيقول إنهم مع بعض… من غير كلام."},
 {k:"Contrast", en:"If everything is loud, nothing is.", ar:"لو كل حاجة قوية… ولا حاجة قوية."},
 {k:"Alignment", en:"Anything off-alignment looks wrong — even if you can't say why. The eye knows.", ar:"أي حاجة مش Align بتبان غلط… حتى لو مش عارف ليه. العين ذكية."},
 {k:"Brand", en:"A brand isn't a logo. It's the idea everything turns around — and it's raised, not made.", ar:"البراند مش لوجو. هو الفكرة اللي كل حاجة بتلف حواليها… والبراند بيتربّى، مش بيتعمل."}
];

// رشّحلي وأنا أرشّحلك — الزوار بيبعتولك ترشيحاتهم، وانتي بتحطي ترشيحاتك في picks
// picks: اكتبي ترشيحاتك هنا، كل ترشيح {en:"...", ar:"..."} — لو فاضية بيظهر "ترشيحاتي في الطريق"
const RECS = [
 {id:"places", en:"A place I must visit", ar:"مكان لازم أروحه", picks:[]},
 {id:"movies", en:"A film I must watch", ar:"فيلم لازم أتفرج عليه", picks:[]},
 {id:"music",  en:"A song for my playlist", ar:"أغنية للبلاي ليست بتاعتي", picks:[]},
 {id:"books",  en:"A book I must read", ar:"كتاب لازم أقراه", picks:[]},
 {id:"happy",  en:"Something that makes you happy", ar:"حاجة بتفرّحك", picks:[]},
 {id:"other",  en:"Anything else", ar:"أي حاجة تانية", picks:[]}
];

// الستيكرز — 4 مجموعات (cat): words = كلامي، games = ألعابي، design = كلام ديزاينر، joy = طاقة إيجابية
// t = الكلام (\n = سطر جديد)، shape = الشكل، bg = الخلفية، fg = لون الكلام، ac = لون الزينة
// icon (اختياري): xo, dice, heart, sun, spark, smile, cursor, cards, bulb, pencil, star
// الأشكال: circle, square, arch, star, pill, bubble, ticket, flower, heart
const PINK="#fe6bc7", PURPLE="#9e82fe", ORANGE="#fe7919", LILAC="#c6b5fe", PEACH="#fae8dc", INK="#1a1917", CREAM="#fbf9f6";
const STICKERS = [
 // ——— كلامي ———
 {cat:"words", t:"دماغ\nعليا", shape:"flower", bg:PINK, fg:INK, ac:CREAM},
 {cat:"words", t:"بصراحة؟", shape:"bubble", bg:PURPLE, fg:INK, ac:CREAM},
 {cat:"words", t:"ليه؟\nولمين؟", shape:"circle", bg:INK, fg:PINK, ac:ORANGE, ring:true},
 {cat:"words", t:"فكرة\nقبل الشكل", shape:"square", bg:CREAM, fg:INK, ac:ORANGE, icon:"bulb"},
 {cat:"words", t:"زي ما هي", shape:"pill", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"words", t:"ببدأ\nمن السؤال", shape:"arch", bg:LILAC, fg:INK, ac:PINK, icon:"spark"},
 {cat:"words", t:"مش برتفوليو", shape:"ticket", bg:INK, fg:CREAM, ac:PINK},
 {cat:"words", t:"made with\nدماغ عليا", shape:"ticket", bg:PINK, fg:INK, ac:INK},
 // ——— ألعابي ———
 {cat:"games", t:"دورك!", shape:"square", bg:CREAM, fg:INK, ac:PINK, icon:"xo"},
 {cat:"games", t:"6!", shape:"circle", bg:ORANGE, fg:INK, ac:CREAM, icon:"dice"},
 {cat:"games", t:"+4\nأفكار", shape:"ticket", bg:PINK, fg:INK, ac:CREAM},
 {cat:"games", t:"قول\nأو اعمل", shape:"flower", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"games", t:"اسحب\nكارت", shape:"arch", bg:PURPLE, fg:INK, ac:CREAM, icon:"cards"},
 {cat:"games", t:"زهقت؟\nالعب", shape:"star", bg:LILAC, fg:INK, ac:PINK},
 {cat:"games", t:"game on", shape:"pill", bg:INK, fg:ORANGE, ac:PINK, icon:"star"},
 {cat:"games", t:"كش ملك", shape:"bubble", bg:PEACH, fg:INK, ac:ORANGE},
 // ——— كلام ديزاينر ———
 {cat:"design", t:"Ctrl+Z", shape:"pill", bg:CREAM, fg:INK, ac:PURPLE, icon:"cursor"},
 {cat:"design", t:"final_final\nv3", shape:"bubble", bg:PEACH, fg:INK, ac:PINK},
 {cat:"design", t:"Kerning\nمهم", shape:"square", bg:INK, fg:ORANGE, ac:PINK, ring:true},
 {cat:"design", t:"خلّيها\nAlign", shape:"arch", bg:LILAC, fg:INK, ac:ORANGE},
 {cat:"design", t:"Grid\nمش سجن", shape:"square", bg:PURPLE, fg:CREAM, ac:INK},
 {cat:"design", t:"الفراغ\nمش فاضي", shape:"circle", bg:CREAM, fg:INK, ac:PINK, ring:true},
 {cat:"design", t:"كبّر اللوجو\nشوية 🙃", shape:"bubble", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"design", t:"idea", shape:"star", bg:PINK, fg:INK, ac:CREAM, icon:"pencil"},
 // ——— طاقة إيجابية ———
 {cat:"joy", t:"إنت\nقدّها", shape:"heart", bg:PINK, fg:INK, ac:CREAM},
 {cat:"joy", t:"خطوة صغيرة\nبرضه خطوة", shape:"pill", bg:LILAC, fg:INK, ac:PINK},
 {cat:"joy", t:"النهارده\nيوم حلو", shape:"circle", bg:ORANGE, fg:INK, ac:CREAM, icon:"sun"},
 {cat:"joy", t:"اتنفّس…\nهتعدّي", shape:"arch", bg:CREAM, fg:INK, ac:PURPLE},
 {cat:"joy", t:"progress\nnot perfect", shape:"ticket", bg:PURPLE, fg:INK, ac:CREAM},
 {cat:"joy", t:"خليك لطيف\nمع نفسك", shape:"flower", bg:PEACH, fg:INK, ac:PINK, icon:"heart"},
 {cat:"joy", t:"you're doing\ngreat", shape:"star", bg:PINK, fg:INK, ac:CREAM},
 {cat:"joy", t:"ابتسم 🙂", shape:"circle", bg:INK, fg:CREAM, ac:ORANGE, icon:"smile", ring:true},
 // ——— زيادة ———
 {cat:"words", t:"البيزنس\nالأول", shape:"ticket", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"words", t:"اسأل\nقبل ما ترسم", shape:"bubble", bg:LILAC, fg:INK, ac:PINK, icon:"pencil"},
 {cat:"words", t:"مش أي\nكلام", shape:"star", bg:PURPLE, fg:CREAM, ac:PINK},
 {cat:"words", t:"شغل\nبدماغ", shape:"circle", bg:PINK, fg:INK, ac:CREAM, icon:"bulb"},
 {cat:"games", t:"خلّصت؟\nتاني!", shape:"square", bg:LILAC, fg:INK, ac:ORANGE, icon:"dice"},
 {cat:"games", t:"الدور\nعليك", shape:"heart", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"games", t:"jackpot", shape:"pill", bg:PINK, fg:INK, ac:CREAM, icon:"star"},
 {cat:"design", t:"مفيش\nبكسلة!", shape:"bubble", bg:CREAM, fg:INK, ac:ORANGE},
 {cat:"design", t:"الديدلاين\nبكرة 😅", shape:"ticket", bg:INK, fg:PINK, ac:ORANGE},
 {cat:"design", t:"بريف واضح\nشغل حلو", shape:"square", bg:ORANGE, fg:INK, ac:CREAM, ring:true},
 {cat:"design", t:"خليه\nيتنفّس", shape:"arch", bg:PEACH, fg:INK, ac:PURPLE, icon:"spark"},
 {cat:"joy", t:"شاي\nوفكرة", shape:"flower", bg:CREAM, fg:INK, ac:ORANGE, icon:"sun"},
 {cat:"joy", t:"كمّل،\nإنت قريب", shape:"pill", bg:PURPLE, fg:CREAM, ac:PINK},
 {cat:"joy", t:"إنت\nجامد", shape:"star", bg:ORANGE, fg:INK, ac:CREAM},
 {cat:"words", t:"فكّر برّه\nالصندوق", shape:"bubble", bg:PINK, fg:INK, ac:CREAM, icon:"bulb"},
 {cat:"games", t:"كش\nملك", shape:"square", bg:INK, fg:CREAM, ac:PINK, icon:"cards", ring:true},
 {cat:"design", t:"المسافات\nمهمة", shape:"ticket", bg:LILAC, fg:INK, ac:PURPLE},
 {cat:"joy", t:"يوم\nحلو", shape:"circle", bg:PEACH, fg:INK, ac:ORANGE, icon:"sun"}
];
const STICKER_CATS = [
 {id:"all", en:"All", ar:"الكل"},
 {id:"words", en:"My words", ar:"كلامي"},
 {id:"games", en:"My games", ar:"ألعابي"},
 {id:"design", en:"Designer talk", ar:"كلام ديزاينر"},
 {id:"joy", en:"Positive energy", ar:"طاقة إيجابية"}
];

// جمل شاشة التحميل — بتظهر عقبال ما الصفحة تفتح
const LOADER_QUOTES = [
 {en:"Loading good things…", ar:"بنحمّل حاجات حلوة…"},
 {en:"Breathe. It's almost here.", ar:"اتنفّس… خلاص قربت."},
 {en:"Shuffling the cards…", ar:"بنفنّط الكوتشينة…"},
 {en:"Aligning the pixels, one by one.", ar:"بنعمل Align للبكسلات واحدة واحدة."},
 {en:"Rolling the dice for you…", ar:"بنرمي الزهر عشانك…"},
 {en:"Today is a good day.", ar:"النهارده يوم حلو."}
];

/* =====================================================================
   🎉 رسالة الفوز — بتظهر لما حد يكسب XO أو لودو أو يحل السودوكو
   مفيش خصم ولا كود: المكسب الحقيقي إننا نشتغل سوا
   ===================================================================== */
const WIN = {
  whatsapp: "201093592555",
  en: { title: "You won! 🎉", body: "And the best win is still ahead — when we play together, we work together, and we both win.", msg: "Hi Alyaa! I just won in the دماغ عليا playground 🎉 Let's work together." },
  ar: { title: "كسبت! 🎉", body: "وأحلى مكسب لسه جاي… لما نلعب سوا ونشتغل سوا، هنكسب سوا.", msg: "أهلًا علياء! كسبت في ملعب دماغ عليا 🎉 يلا نشتغل سوا." }
};

/* Clients — logo files live in clients/<id>.webp. Add a line to add a brand. */
const CLIENTS = [
 {id:"arib",en:"ARIB",ar:"أريب",bg:"#ffffff"},
 {id:"amyal",en:"Amyal",ar:"أميال",bg:"#ffffff"},
 {id:"syaaraat",en:"Syaaraat",ar:"سيارات",bg:"#ffffff"},
 {id:"xo",en:"XO Nursery",ar:"XO Nursery",bg:"#ffffff"},
 {id:"emkan",en:"Emkan Home Furniture",ar:"إمكان للأثاث",bg:"#000000"},
 {id:"alrosha-lounge",en:"Alrosha Lounge",ar:"الروشة لاونج",bg:"#ffffff"},
 {id:"zomex",en:"ZomEx",ar:"زوم إكس",bg:"#009fe8"},
 {id:"arabian-travelers",en:"Arabian Travelers Services",ar:"الشركة العربية لخدمات المسافرين",bg:"#ffffff"},
 {id:"unit",en:"Unit Furniture",ar:"يونت للأثاث",bg:"#e8e8e8"},
 {id:"premium-event",en:"Premium Event Co",ar:"شركة الحدث المميز",bg:"#ffffff"},
 {id:"cabana",en:"Cabana",ar:"كابانا",bg:"#ffffff"},
 {id:"coconut",en:"Coconut",ar:"كوكونت",bg:"#273430"},
 {id:"media-guide",en:"Media Guide",ar:"الدليل الإعلامي",bg:"#ffffff"},
 {id:"royal-crepe",en:"The Royal Crepe",ar:"رويال كريب",bg:"#ffffff"},
 {id:"rawabi-najd",en:"Rawabi Najd Industrial",ar:"روابي نجد للصناعة",bg:"#ffffff"},
 {id:"beirut",en:"Beirut Beauty Clinic",ar:"بيروت بيوتي كلينك",bg:"#f5e4d3"},
 {id:"elegant",en:"Elegant Fabrics",ar:"الأنسجة الأنيقة",bg:"#ffffff"},
 {id:"alrosha",en:"Alrosha Restaurant",ar:"مطعم الروشة",bg:"#ffffff"},
 {id:"orax",en:"Orax Soft",ar:"أوراكس سوفت",bg:"#ffffff"},
 {id:"golden-assets",en:"Golden Assets Investment",ar:"الأصول الذهبية للاستثمار",bg:"#ffffff"},
 {id:"delano",en:"Delano",ar:"ديلانو",bg:"#212121"},
 {id:"rans",en:"Rans Cafe",ar:"رنس كافيه",bg:"#ffffff"},
 {id:"estqrar",en:"Estqrar",ar:"استقرار",bg:"#ffffff"},
 {id:"event-makers",en:"Event Makers",ar:"صناع الحدث",bg:"#ffffff"},
 {id:"imtiaz",en:"Al Imtiaz Schools",ar:"مدارس الامتياز",bg:"#ffffff"},
 {id:"festival",en:"Festival Carpet",ar:"فستيفال كاربت",bg:"#ffffff"},
 {id:"tegan",en:"Tegan Furniture",ar:"تيجان للأثاث",bg:"#ffffff"},
 {id:"alf-leila",en:"Alf Leila",ar:"ألف ليلة",bg:"#ffffff"},
 {id:"failet",en:"Failet",ar:"فيليت",bg:"#ffffff"},
 {id:"twaiq",en:"Twaiq National Schools",ar:"مدارس طويق الأهلية",bg:"#ffffff"},
 {id:"katakit",en:"Katakit 29",ar:"كتاكيت ٢٩",bg:"#fe0000"},
 {id:"petway",en:"PetWay Vet Clinic",ar:"بت واي",bg:"#ffffff"},
 {id:"cura",en:"Cura Veterinary Clinic",ar:"كيورا",bg:"#ffffff"},
 {id:"sn",en:"S.N Healthy Clinic",ar:"S.N كلينك",bg:"#c8b2fd"},
 {id:"bashair",en:"Al-Bashair Educational",ar:"البشائر التعليمية",bg:"#ffffff"},
 {id:"am",en:"AM Design Furniture",ar:"AM ديزاين",bg:"#ffffff"},
 {id:"hawaa",en:"Hawaa",ar:"حواء",bg:"#fefef6"},
 {id:"acacia",en:"Acacia",ar:"أكاسيا",bg:"#ffffff"},
 {id:"alfath",en:"Al Fath",ar:"الفتح",bg:"#ffffff"},
 {id:"alwaseet",en:"AlWaseet",ar:"الوسيط",bg:"#7b20bd"},
 {id:"whizzy",en:"Whizzy",ar:"ويزي",bg:"#ffffff"},
 {id:"colour-print",en:"Colour Print",ar:"كولور برنت",bg:"#ffffff"},
 {id:"valley-rose",en:"Valley Rose",ar:"فالي روز",bg:"#ffffff"},
 {id:"qatameesh",en:"Qatameesh 1919",ar:"قطاميش ١٩١٩",bg:"#ffffff"},
 {id:"arena",en:"Arena Restaurant & Cafe",ar:"أرينا ريستورانت",bg:"#fdfdfb"},
 {id:"koka",en:"Koka Brand",ar:"كوكا براند",bg:"#6b3439"},
 {id:"almazaq",en:"Almazaq",ar:"المذاق",bg:"#ffffff"},
 {id:"bin-alameed",en:"Bin Al Ameed",ar:"بن العميد",bg:"#ffffff"},
 {id:"lamsa",en:"Lamsa",ar:"لمسة",bg:"#ffffff"},
 {id:"alzara",en:"Alzara",ar:"الزارا",bg:"#ffffff"},
 {id:"hemma",en:"Hemma Development Foundation",ar:"مؤسسة همّة للتطوير",bg:"#ffffff"}
];

/* Motion — stills live in assets/img/motion/<vimeo id>.webp; each tile opens the video on Vimeo. */
const VIMEO = "https://vimeo.com/user181852872";
const MOTION = [
 {id:"877624030", d:"0:47", en:"Logo reveal",            ar:"لوجو ريفيل"},
 {id:"877821400", d:"0:18", en:"Syaaraat · Reel",        ar:"سيارات · ريلز"},
 {id:"877830039", d:"0:15", en:"Saudi Flag Day",          ar:"يوم العلم السعودي"},
 {id:"877822038", d:"0:02", en:"Syaaraat · Ramadan",     ar:"سيارات · رمضان"},
 {id:"878284200", d:"0:10", en:"ARIB · One-tap finance", ar:"أريب · تمويلك بنقرة"},
 {id:"850829948", d:"0:05", en:"Syaaraat · Travel",      ar:"سيارات · للسفر"}
];
