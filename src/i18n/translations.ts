export const translations = {
  cs: {
    home: {
      title: "Můj kurník",
      subtitle: "Přehled slepic a dnešní snůšky",

      chickens: "Počet slepic",
      chickensEdit: "Uprav počet slepic v kurníku",
      chickensCount: "{{count}} slepic",
      saveChickens: "Uložit počet slepic",

      todayRecord: "Dnešní záznam",
      editToday: "Upravit dnešní záznam",

      logout: "Odhlásit se",

      alerts: {
        savedTitle: "Uloženo",
        savedMessage: "Počet slepic byl uložen.",
        errorTitle: "Chyba",
        errorMessage: "Nepodařilo se uložit data"
      }
    },
    //KARTA NASTAVENÍ
    settings: {
      title: "Nastavení",
      subtitle: "Správa aplikace, dat a budoucích funkcí",

      data: "Data",
      exportCsv: "Export statistik do CSV",
      exportCsvSubtitle: "Stáhne a nasdílí všechny záznamy vajec",

      app: "Aplikace",
      appLanguage: "Jazyk aplikace",
      languageCs: "🇨🇿 Čeština",
      languageEn: "🇬🇧 English",

      notifications: "Upozornění",
      dailyReminder: "Denní připomenutí",
      dailyReminderSubtitle:
        "Připomene zapsání vajec, pokud dnešní záznam chybí",

      about: "O aplikaci",
      appVersion: "Verze aplikace",

      alerts: {
        notificationsDeniedTitle: "Notifikace nejsou povolené",
        notificationsDeniedMessage:
          "Povol notifikace v systému, aby připomenutí fungovalo.",
        done: "Hotovo",
        reminderEnabled: "Připomenutí bylo nastaveno.",
        reminderDisabled: "Připomenutí bylo vypnuto.",
      },
      goBackButton: "Zpět",
    },
    // KALENDÁŘ
    calendar: {
      title: "Kalendář",
      subtitle: "Vyber den a uprav záznam vajec",
      textTip: "Tip",
      subtextTip: "Klepni na libovolný den v kalendáři a můžeš upravit počet snesených vajec pro dané datum.",
      textOver: "Přehled",
      subtextOver: "Barva dne ukazuje intenzitu snůšky. Čím tmavší pole, tím více vajec bylo ten den zapsáno.",
    },
    //NAVIGACE
    navigation: {
      home: "Domů",
      calendar: "Kalendář",
      stats: "Statistiky",
      settings: "Nastavení",
    },
    //KARTA STATISTIKY
    stats: {
      title: "Statistiky",
      subtitle: "Přehled produkce vajec",

      filters: {
        week: "Týden",
        month: "Měsíc",
        year: "Rok",
      },

      cards: {
        totalEggs: "Celkem vajec",
        totalDays: "Počet dnů záznamů",
        productivity: "Produktivita slepic",
        avgPerChicken: "Průměr na slepici",
      },

      chart: {
        title: "Produkce vajec",
        subtitle: "Graf podle zvoleného období",
      },

      extra: {
        title: "Další statistiky",
        subtitle: "Roční přehled a nejlepší výsledky",

        bestDay: "📈 Nejlepší den",
        worstDay: "📉 Nejhorší den",
        bestWeek: "🏆 Nejlepší týden",
        bestMonth: "🗓️ Nejlepší měsíc",
        weeklyTrend: "📈 Týdenní trend",
        monthlyTrend: "📊 Měsíční trend",

        noData: "Žádná data",
        eggsSuffix: "vajec",
      },
    },
    // KARTA PŘIDÁVÁNÍ VAJEC
    addEggs: {
      title: "Záznam vajec",
      subtitle: "Přidej nebo uprav snůšku pro vybraný den",

      selectedDay: "Vybraný den",
      selectedDaySubtitle: "Nastav počet snesených vajec",

      eggCount: "Počet vajec",

      save: "Uložit záznam",
      back: "Zpět",

      alerts: {
        savedTitle: "Uloženo",
        savedMessage: "Datum: {{date}}\nPočet vajec: {{count}}",
        errorTitle: "Chyba",
        errorMessage: "Nepodařilo se uložit data",
      },
    },
    // NOTIFIKACE
    notifications: {
      channelName: "Připomenutí vajec",
      reminderTitle: "Egg Tracker",
      reminderBody: "Nezapomeň zapsat dnešní vejce 🥚",
    },
    // TLACITKO - PRIRUCKY
    common: {
      backHome: "Zpět na hlavní stránku",
    },
    // PŘÍRUČKA SLEPICE
    chickenGuide: {
      title: "Chov slepic",
      subtitle: "Základní informace o kurníku, výběhu a snášce",
      sections: {
        coop: {
          title: "Kurník a výběh",
          items: {
            spaceTitle: "Vnitřní prostor",
            spaceText:
              "Počítejte s plochou 1 m² na 3–4 slepice. Pokud mají slepice velký celodenní výběh, může stačit i méně prostoru (až 7 slepic na 1 m²), ale v zimě se budou v těsnějším prostoru více stresovat.",
            runTitle: "Výběh",
            runText:
              "Ideální je dopřát každé slepici alespoň 4–5 m² venkovního prostoru, zabezpečeného pletivem vysokým alespoň 1,8 m.",
            entryTitle: "Bezpečí a mikroklima",
            entryText:
              "Kurník musí mít větrací otvory (v létě klidně jen pletivo), ale nesmí v něm táhnout přímo na hřady. Vlhkost a výpary z trusu jsou pro slepice nebezpečnější než mráz.",
          },
        },
        laying: {
          title: "Klíčové faktory pro vysokou snášku",
          items: {
            spaceTitle: "Snáška",
            spaceText:
              "Snáška je u slepic ovlivněna především kombinací světla, krmiva a teploty. Zatímco moderní hybridní nosnice (např. Lohmann nebo ISA Brown) mohou snést až 300–350 vajec ročně, u čistokrevných plemen v malochovech je to obvykle méně a produkce více závisí na ročním období.",
            runTitle: "Krmivo",
            runText:
              "Pro tvorbu vajec jsou nezbytné bílkoviny a vápník. Zdrojem bílkovin může být sója, hrách, vojtěška nebo tvaroh. Jejich nedostatek může vést k tomu, že slepice začnou požírat vlastní vejce. Vápník je klíčový pro pevnou skořápku – vhodné jsou drcené a převařené nebo vysušené vaječné skořápky či krmný vápenec.",
            entryTitle: "Teplota",
            entryText:
              "Nejvíce vajec slepice snášejí při teplotě kolem 18–21 °C. Extrémní horka (nad 30 °C) i silné mrazy (pod -10 °C) snášku výrazně omezují.",
          },
        },
        tips: {
          title: "Praktické tipy pro začátečníky",
          items: {
            spaceTitle: "Podkladky",
            spaceText:
              "Do hnízd vložte umělá vejce (sádrová nebo plastová). Slepice tak pochopí, kam mají snášet, a nebudou vejce zanášet a schovávat v kopřivách nebo koutech.",
            runTitle: "Pravidelný sběr",
            runText:
              "Vejce sbírejte denně, ideálně odpoledne. Zabráníte tím jejich znečištění, náhodnému rozbití i rozvoji zlozvyku klování do vajec.",
            entryTitle: "Věk slepic",
            entryText:
              "Nejvyšší snášku mají slepice v prvním roce, respektive v první snáškové sezóně. S každým dalším rokem produkce obvykle klesá o 10–20 %, ale vejce bývají o něco větší.",
          },
        },
      },
    },

    // PŘÍRUČKA VEJCE
    eggGuide: {
      title: "Vejce",
      subtitle: "Základní informace o skladování a čerstvosti",
      sections: {
        storage: {
          title: "Zásady správného skladování vajec",
          items: {
            spaceTitle: "Teplota",
            spaceText:
              "Vajíčka vyžadují stabilní teplotu v rozmezí 5 až 18 °C, přičemž pro delší trvanlivost je ideální chladnička s teplotou 5–8 °C. Důležité je vyhnout se kolísání teplot, které způsobuje orosení skořápky a narušuje její přirozenou ochrannou bariéru. Přestože výrobci často umisťují držáky do dveří lednice, právě tam dochází při otevírání k největším teplotním výkyvům. Vhodnější je vnitřní police.",
            runTitle: "Vejce neomývejte",
            runText:
              "Omytím odstraníte ochrannou vrstvu zvanou kutikula, a tím usnadníte průnik bakterií (například salmonely) dovnitř vejce.",
            entryTitle: "Ukládání",
            entryText:
              "Vejce ukládejte tupým koncem nahoru. Na tupém konci jsou póry, kterými vejce přijímá kyslík, a vzduchová bublina v této poloze netlačí na vnitřní blány.",
          },
        },
        fresh: {
          title: "Trvanlivost a čerstvost",
          items: {
            spaceTitle: "Čerstvá a vařená vejce",
            spaceText:
              "Trvanlivost čerstvých vajec v chladu se udává až 2 měsíce, při stabilní pokojové teplotě maximálně 3 týdny. Vařená vajíčka ve skořápce vydrží v chladu nejvýše 7 dní.",
            runTitle: "Skladování",
            runText:
              "Vajíčka skladujte ideálně v kartonu nebo uzavíratelném boxu, který je chrání před pachy z ostatních potravin. Ty by totiž mohla skrze póry ve skořápce nasát.",
            entryTitle: "Test čerstvosti",
            entryText:
              "Jednoduchý test s vodou: čerstvé vejce zůstane u dna a leží na boku. Starší vejce se staví na špičku nebo plave na hladině, protože se s věkem zvětšuje vzduchová bublina uvnitř.",
          },
        },
        eggTips: {
          title: "Přínosy pro zdraví a zajímavosti",
          items: {
            spaceTitle: "Přírodní multivitamin",
            spaceText:
              "Vejce mají velmi vyvážené složení aminokyselin a patří mezi nejlepší zdroje kvalitních bílkovin pro růst svalů i regeneraci tkání. Jsou bohatá na vitaminy A, B12, B2 a B5 a také na selen, který podporuje imunitu a správnou funkci štítné žlázy. Jako jedna z mála potravin obsahují i přirozený vitamin D. Žloutek je navíc výborným zdrojem cholinu, který je důležitý pro buněčné membrány i správnou činnost mozku.",
            runTitle: "Kvalita",
            runText:
              "Barva žloutku (světle žlutá nebo sytě oranžová) závisí především na krmivu, konkrétně na obsahu karotenoidů, a ne nutně na množství vitaminů. U domácích slepic však oranžovější žloutek často signalizuje pestřejší stravu z výběhu.",
            entryTitle: "Cholesterol",
            entryText:
              "Dřívější obavy z cholesterolu jsou dnes z velké části vědecky překonané. Většinu cholesterolu v krvi si tělo vytváří samo v játrech. U zdravého člověka konzumace vajec (přibližně 1–2 denně) hladinu „špatného“ LDL cholesterolu u většiny lidí zásadně nezvyšuje. Naopak může přispívat ke zvýšení „hodného“ HDL cholesterolu.",
          },
        },
      },
    },
    //LOGIN ALERTS
    login: {
      subtitleLogin: "Přihlas se do svého kurníku",
      subtitleRegister: "Vytvoř si nový účet",
    
      emailPlaceholder: "Email",
      passwordPlaceholder: "Heslo",
    
      loading: "Načítám...",
      loginButton: "Přihlásit se",
      registerButton: "Vytvořit účet",
    
      switchToRegister: "Nemáš účet? Zaregistruj se",
      switchToLogin: "Už máš účet? Přihlas se",
    
      alerts: {
        errorTitle: "Chyba přihlášení",
        errorMessage: "Přihlášení se nezdařilo. Zkus to znovu.",
      },
    
      errors: {
        invalidEmail: "Zadaný email není platný.",
        userNotFound: "Uživatel s tímto emailem neexistuje.",
        wrongPassword: "Zadané heslo není správné.",
        emailInUse: "Tento email je už zaregistrovaný.",
        weakPassword: "Heslo je příliš slabé.",
        invalidCredential: "Neplatné přihlašovací údaje.",
        missingPassword: "Zadej heslo.",
        tooManyRequests: "Bylo provedeno příliš mnoho pokusů. Zkus to prosím později.",
      },
    }
  },

  en: {
    home: {
      title: "My coop",
      subtitle: "Overview of chickens and today's eggs",

      chickens: "Number of chickens",
      chickensEdit: "Adjust the number of chickens in the coop",
      chickensCount: "{{count}} chickens",
      saveChickens: "Save chicken count",

      todayRecord: "Today's record",
      editToday: "Edit today's entry",

      logout: "Log out",

      alerts: {
        savedTitle: "Saved",
        savedMessage: "Chicken count has been saved.",
        errorTitle: "Error",
        errorMessage: "Failed to save data"
      }
    },

    settings: {
      title: "Settings",
      subtitle: "Manage app, data and future features",

      data: "Data",
      exportCsv: "Export statistics to CSV",
      exportCsvSubtitle: "Downloads and shares all egg entries",

      app: "App",
      appLanguage: "App language",
      languageCs: "🇨🇿 Čeština",
      languageEn: "🇬🇧 English",

      notifications: "Notifications",
      dailyReminder: "Daily reminder",
      dailyReminderSubtitle:
        "Reminds you to save eggs if today’s entry is missing",

      about: "About app",
      appVersion: "App version",

      alerts: {
        notificationsDeniedTitle: "Notifications are not allowed",
        notificationsDeniedMessage:
          "Enable notifications in system settings so reminders can work.",
        done: "Done",
        reminderEnabled: "Reminder has been enabled.",
        reminderDisabled: "Reminder has been disabled.",
      },
      goBackButton: "Go Back",
    },

    calendar: {
      title: "Calendar",
      subtitle: "Select a day and edit the egg record",
      textTip: "Tip",
      subtextTip: "Tap any day on the calendar and you can adjust the number of eggs laid for that date.",
      textOver: "Overview",
      subtextOver: "The color of the day indicates the intensity of the clutch. The darker the field, the more eggs were recorded that day.",
    },

    navigation: {
      home: "Home",
      calendar: "Calendar",
      stats: "Statistics",
      settings: "Settings",
    },

    stats: {
      title: "Statistics",
      subtitle: "Egg production overview",

      filters: {
        week: "Week",
        month: "Month",
        year: "Year",
      },

      cards: {
        totalEggs: "Total eggs",
        totalDays: "Recorded days",
        productivity: "Chicken productivity",
        avgPerChicken: "Average per chicken",
      },

      chart: {
        title: "Egg production",
        subtitle: "Chart for the selected period",
      },

      extra: {
        title: "More statistics",
        subtitle: "Yearly overview and best results",

        bestDay: "📈 Best day",
        worstDay: "📉 Worst day",
        bestWeek: "🏆 Best week",
        bestMonth: "🗓️ Best month",
        weeklyTrend: "📈 Weekly trend",
        monthlyTrend: "📊 Monthly trend",

        noData: "No data",
        eggsSuffix: "eggs",
      },
    },

    addEggs: {
      title: "Egg entry",
      subtitle: "Add or edit egg production for the selected day",

      selectedDay: "Selected day",
      selectedDaySubtitle: "Set the number of eggs laid",

      eggCount: "Egg count",

      save: "Save entry",
      back: "Back",

      alerts: {
        savedTitle: "Saved",
        savedMessage: "Date: {{date}}\nEgg count: {{count}}",
        errorTitle: "Error",
        errorMessage: "Failed to save data",
      },
    },

    notifications: {
      channelName: "Egg reminders",
      reminderTitle: "Egg Tracker",
      reminderBody: "Don't forget to record today's eggs 🥚",
    },

    common: {
      backHome: "Back to home",
    },

    // CHICKEN GUIDE
    chickenGuide: {
      title: "Chicken keeping",
      subtitle: "Basic information about coop space, outdoor run and egg laying",
      sections: {
        coop: {
          title: "Coop and outdoor run",
          items: {
            spaceTitle: "Indoor space",
            spaceText:
              "Allow about 1 m² for 3–4 chickens. If the hens have access to a large outdoor run throughout the day, slightly less space may be enough (up to 7 chickens per 1 m²), but in winter they may become more stressed in cramped conditions.",
            runTitle: "Outdoor run",
            runText:
              "Ideally, each hen should have at least 4–5 m² of outdoor space secured with fencing at least 1.8 m high.",
            entryTitle: "Safety and microclimate",
            entryText:
              "The coop must have ventilation openings (in summer, wire mesh is often enough), but there should be no direct draft blowing onto the perches. Dampness and fumes from droppings are more dangerous to chickens than frost.",
          },
        },
        laying: {
          title: "Key factors for high egg production",
          items: {
            spaceTitle: "Egg laying",
            spaceText:
              "Egg production in chickens is mainly influenced by the combination of light, feed and temperature. Modern hybrid laying hens (such as Lohmann or ISA Brown) can lay up to 300–350 eggs per year, while pure breeds kept in small backyard flocks usually produce fewer eggs and are more affected by the seasons.",
            runTitle: "Feed",
            runText:
              "Protein and calcium are essential for egg production. Good protein sources include soy, peas, alfalfa and cottage cheese. A lack of protein may lead hens to start eating their own eggs. Calcium is crucial for a strong shell — crushed and boiled or dried eggshells or feed-grade limestone are suitable sources.",
            entryTitle: "Temperature",
            entryText:
              "Hens lay the most eggs at temperatures around 18–21 °C. Extreme heat (above 30 °C) as well as severe frost (below -10 °C) significantly reduce egg production.",
          },
        },
        tips: {
          title: "Practical tips for beginners",
          items: {
            spaceTitle: "Dummy eggs",
            spaceText:
              "Place artificial eggs (plaster or plastic) in the nesting boxes. This helps hens understand where they should lay and prevents them from hiding eggs in nettles, bushes or corners.",
            runTitle: "Regular collection",
            runText:
              "Collect eggs every day, ideally in the afternoon. This helps prevent dirt, accidental breakage and the bad habit of pecking at eggs.",
            entryTitle: "Age of hens",
            entryText:
              "Hens usually have their highest egg production in the first year, or more precisely during their first laying season. With each following year, production typically drops by 10–20%, although the eggs may become slightly larger.",
          },
        },
      },
    },

    // EGG GUIDE
    eggGuide: {
      title: "Eggs",
      subtitle: "Basic information about storage and freshness",
      sections: {
        storage: {
          title: "Rules for proper egg storage",
          items: {
            spaceTitle: "Temperature",
            spaceText:
              "Eggs require a stable temperature between 5 and 18 °C, while a refrigerator at 5–8 °C is ideal for longer shelf life. It is important to avoid temperature fluctuations, which can cause condensation on the shell and damage its natural protective barrier. Although manufacturers often place egg holders in the fridge door, that area experiences the greatest temperature changes when the fridge is opened. An inner shelf is a better choice.",
            runTitle: "Do not wash eggs",
            runText:
              "Washing removes the protective layer called the cuticle, making it easier for bacteria (for example salmonella) to enter the egg.",
            entryTitle: "Storage position",
            entryText:
              "Store eggs with the blunt end facing upward. The blunt end contains pores through which the egg takes in oxygen, and in this position the air cell does not press against the inner membranes.",
          },
        },
        fresh: {
          title: "Shelf life and freshness",
          items: {
            spaceTitle: "Fresh and boiled eggs",
            spaceText:
              "Fresh eggs can last up to 2 months when kept cold, while at a stable room temperature they last up to 3 weeks. Hard-boiled eggs in the shell keep for up to 7 days in the refrigerator.",
            runTitle: "Storage",
            runText:
              "Ideally, keep eggs in a carton or a sealed container that protects them from absorbing odors from other foods through the pores in the shell.",
            entryTitle: "Freshness test",
            entryText:
              "A simple water test: a fresh egg stays at the bottom and lies flat on its side. An older egg stands upright or floats because the air cell inside gets larger with age.",
          },
        },
        eggTips: {
          title: "Health benefits and interesting facts",
          items: {
            spaceTitle: "A natural multivitamin",
            spaceText:
              "Eggs have a very balanced amino acid profile and are one of the best sources of high-quality protein for muscle growth and tissue repair. They are rich in vitamins A, B12, B2 and B5, and also contain selenium, which supports immunity and healthy thyroid function. Eggs are also one of the few natural food sources of vitamin D. In addition, egg yolk is an excellent source of choline, which is important for cell membranes and proper brain function.",
            runTitle: "Quality",
            runText:
              "The color of the yolk (pale yellow or deep orange) mainly depends on feed, especially its carotenoid content, and not necessarily on vitamin levels. In backyard hens, however, a deeper orange yolk often indicates a more varied diet from free ranging.",
            entryTitle: "Cholesterol",
            entryText:
              "Older concerns about cholesterol are now largely considered outdated. Most of the cholesterol in the blood is produced by the body itself in the liver. In a healthy person, eating eggs (about 1–2 per day) does not significantly increase “bad” LDL cholesterol in most people. On the contrary, it may help raise “good” HDL cholesterol.",
          },
        },
      },
    },
    login: {
      subtitleLogin: "Sign in to your coop",
      subtitleRegister: "Create a new account",
    
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
    
      loading: "Loading...",
      loginButton: "Sign in",
      registerButton: "Create account",
    
      switchToRegister: "Don't have an account? Register",
      switchToLogin: "Already have an account? Sign in",
    
      alerts: {
        errorTitle: "Login error",
        errorMessage: "Login failed. Please try again.",
      },
    
      errors: {
        invalidEmail: "The email address is invalid.",
        userNotFound: "No account was found with this email.",
        wrongPassword: "The password is incorrect.",
        emailInUse: "This email is already registered.",
        weakPassword: "The password is too weak.",
        invalidCredential: "Invalid login credentials.",
        missingPassword: "Please enter your password.",
        tooManyRequests: "Too many attempts were made. Please try again later.",
      },
    }
  },
} as const;