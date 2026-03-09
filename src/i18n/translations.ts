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
        eggs: "vajec",
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
      },
      // KALENDÁŘ
      calendar:{
        title:"Kalendář",
        subtitle: "Vyber den a uprav záznam vajec",
        textTip:"Tip",
        subtextTip:"Klepni na libovolný den v kalendáři a můžeš upravit počet snesených vajec pro dané datum.",
        textOver:"Přehled",
        subtextOver:"Barva dne ukazuje intenzitu snůšky. Čím tmavší pole, tím více vajec bylo ten den zapsáno.",
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
      //LOGIN KARTA
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
          errorTitle: "Chyba",
          errorMessage: "Něco se pokazilo"
        }
      },
      // NOTIFIKACE
      notifications: {
        channelName: "Připomenutí vajec",
        reminderTitle: "Egg Tracker",
        reminderBody: "Nezapomeň zapsat dnešní vejce 🥚",
      },
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
        eggs: "eggs",
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
      },

      calendar:{
        title:"Calendar",
        subtitle:"Select a day and edit the egg record",
        textTip:"Tip",
        subtextTip:"Tap any day on the calendar and you can adjust the number of eggs laid for that date.",
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
          errorTitle: "Error",
          errorMessage: "Something went wrong"
        }
      },

      notifications: {
        channelName: "Egg reminders",
        reminderTitle: "Egg Tracker",
        reminderBody: "Don't forget to record today's eggs 🥚",
      },
    },
  } as const;