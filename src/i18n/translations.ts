export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

export interface Translations {
  [locale: string]: TranslationObject;
}

export const translations: Translations = {
  en: {
    title: "How To Lose Money Fast",
    eurojackpot: {
      title: "EuroJackpot Number Checker",
      description: "Enter your EuroJackpot numbers to see if they match any historical draws.",
      mainNumbers: "Main Numbers (5 numbers from 1-50)",
      euroNumbers: "Euro Numbers (2 numbers from 1-12)",
      ticketPrice: "Ticket Price (€)",
      dateRange: "Date Range (Optional)",
      startDate: "Start Date",
      endDate: "End Date",
      saveCheck: "Save & Check Numbers",
      checkAgainstSaved: "Check Against Saved",
      savedNumbers: "Your Saved Numbers",
      noNumbersSaved: "No numbers saved yet.",
      results: "Results",
      set: "Set",
      check: "Check",
      delete: "Delete",
      bulkImport: "Bulk Import",
      bulkImportDescription: "Paste JSON array of number sets. Format: [[main1, main2, main3, main4, main5, euro1, euro2], ...]",
      bulkImportSuccess: "Successfully imported {count} number sets",
      bulkImportError: "Error importing numbers. Please check the format and try again.",
      cancel: "Cancel",
      import: "Import",
      comparing: "Comparing with",
      historicalDraws: "Historical Draws",
      savedNumbersLabel: "Saved Numbers",
      noMatches: "No matches found with your saved numbers.",
      matchesFound: "Found {count} match with your saved numbers!",
      matchesFoundPlural: "Found {count} matches with your saved numbers!",
      invalidNumbers: "Please enter valid EuroJackpot numbers: 5 unique numbers from 1-50 and 2 unique numbers from 1-12",
      totalChecked: "Total draws checked",
      winningDraws: "Winning draws",
      winPercentage: "Win rate",
      overallStats: "Overall Stats",
      totalTickets: "Total Tickets",
      totalSpent: "Total Spent",
      totalWon: "Total Won",
      netProfit: "Net Profit/Loss",
      bestWin: "Best Win",
      roi: "Return on Investment",
      noResults: "No results found."
    },
    moneyWasted: {
      title: "Money Wasted Tracker",
      description: "See how much money you've wasted on EuroJackpot tickets over time.",
      total: "Total money wasted:",
      totalProfit: "Total profit:",
      etfGrowth: "ETF Growth",
      etfTotal: "ETF Value:"
    },
    impressum: {
      title: "Impressum",
      content: "Legal information about the website owner"
    },
    privacy: {
      title: "Privacy Policy",
      content: "Information about data protection and privacy"
    },
    consent: {
      title: "Your Privacy Settings",
      description: "This website uses cookies and external services to enhance your experience. We use Google Analytics for statistics and Google Fonts for display. You can choose whether you want to enable these services.",
      necessary: "Necessary only",
      acceptAll: "Accept all",
      acceptAllText: "By clicking \"Accept all\", you consent to the use of ALL cookies and trackers.",
      necessaryText: "By clicking \"Necessary only\", only technically required cookies will be used.",
      moreInfo: "You can find more information in our Privacy Policy."
    },
    footer: {
      tutorial: "Tutorial",
      impressum: "Impressum",
      privacy: "Privacy Policy"
    },
    languageSelector: "Language"
  },
  de: {
    title: "Wie man schnell Geld verliert",
    eurojackpot: {
      title: "EuroJackpot Nummernprüfer",
      description: "Geben Sie Ihre EuroJackpot-Zahlen ein, um zu sehen, ob sie mit historischen Ziehungen übereinstimmen.",
      mainNumbers: "Hauptzahlen (5 Zahlen von 1-50)",
      euroNumbers: "Eurozahlen (2 Zahlen von 1-12)",
      ticketPrice: "Ticketpreis (€)",
      dateRange: "Datumsbereich (Optional)",
      startDate: "Startdatum",
      endDate: "Enddatum",
      saveCheck: "Speichern & Prüfen",
      checkAgainstSaved: "Mit gespeicherten vergleichen",
      savedNumbers: "Ihre gespeicherten Zahlen",
      noNumbersSaved: "Noch keine Zahlen gespeichert.",
      results: "Ergebnisse",
      set: "Satz",
      check: "Prüfen",
      delete: "Löschen",
      bulkImport: "Massenimport",
      bulkImportDescription: "Fügen Sie ein JSON-Array von Zahlensätzen ein. Format: [[haupt1, haupt2, haupt3, haupt4, haupt5, euro1, euro2], ...]",
      bulkImportSuccess: "{count} Zahlensätze erfolgreich importiert",
      bulkImportError: "Fehler beim Importieren der Zahlen. Bitte überprüfen Sie das Format und versuchen Sie es erneut.",
      cancel: "Abbrechen",
      import: "Importieren",
      comparing: "Vergleich mit",
      historicalDraws: "Historischen Ziehungen",
      savedNumbersLabel: "Gespeicherten Zahlen",
      noMatches: "Keine Übereinstimmungen mit Ihren gespeicherten Zahlen gefunden.",
      matchesFound: "{count} Übereinstimmung mit Ihren gespeicherten Zahlen gefunden!",
      matchesFoundPlural: "{count} Übereinstimmungen mit Ihren gespeicherten Zahlen gefunden!",
      invalidNumbers: "Bitte geben Sie gültige EuroJackpot-Zahlen ein: 5 eindeutige Zahlen von 1-50 und 2 eindeutige Zahlen von 1-12",
      totalChecked: "Geprüfte Ziehungen insgesamt",
      winningDraws: "Gewinnziehungen",
      winPercentage: "Gewinnrate",
      overallStats: "Gesamtstatistik",
      totalTickets: "Gesamtanzahl Tickets",
      totalSpent: "Gesamtausgaben",
      totalWon: "Gesamtgewinne",
      netProfit: "Nettogewinn/-verlust",
      bestWin: "Bester Gewinn",
      roi: "Kapitalrendite",
      noResults: "Keine Ergebnisse gefunden."
    },
    moneyWasted: {
      title: "Geldverschwendungs-Tracker",
      description: "Sehen Sie, wie viel Geld Sie im Laufe der Zeit für EuroJackpot-Tickets verschwendet haben.",
      total: "Insgesamt verschwendetes Geld:",
      totalProfit: "Gesamtgewinn:",
      etfGrowth: "ETF-Wachstum",
      etfTotal: "ETF-Wert:"
    },
    impressum: {
      title: "Impressum",
      content: "Rechtliche Informationen über den Website-Betreiber"
    },
    privacy: {
      title: "Datenschutzerklärung",
      content: "Informationen zum Datenschutz und zur Privatsphäre"
    },
    consent: {
      title: "Ihre Datenschutzeinstellungen",
      description: "Diese Website verwendet Cookies und externe Dienste, um Ihr Nutzererlebnis zu verbessern. Wir verwenden Google Analytics für Statistiken und Google Fonts für die Darstellung. Sie können wählen, ob Sie diese Dienste aktivieren möchten.",
      necessary: "Nur notwendige",
      acceptAll: "Alle akzeptieren",
      acceptAllText: "Durch Klicken auf \"Alle akzeptieren\" stimmen Sie der Verwendung ALLER Cookies und Tracker zu.",
      necessaryText: "Durch Klicken auf \"Nur notwendige\" werden nur technisch erforderliche Cookies verwendet.",
      moreInfo: "Weitere Informationen finden Sie in unserer Datenschutzerklärung."
    },
    footer: {
      tutorial: "Anleitung",
      impressum: "Impressum",
      privacy: "Datenschutzerklärung"
    },
    languageSelector: "Sprache"
  },
  es: {
    title: "Cómo perder dinero rápidamente",
    eurojackpot: {
      title: "Verificador de números de EuroJackpot",
      description: "Ingrese sus números de EuroJackpot para ver si coinciden con sorteos históricos.",
      mainNumbers: "Números principales (5 números del 1 al 50)",
      euroNumbers: "Números Euro (2 números del 1 al 12)",
      ticketPrice: "Precio del boleto (€)",
      dateRange: "Rango de fechas (Opcional)",
      startDate: "Fecha de inicio",
      endDate: "Fecha final",
      saveCheck: "Guardar y verificar",
      checkAgainstSaved: "Comparar con guardados",
      savedNumbers: "Sus números guardados",
      noNumbersSaved: "Aún no hay números guardados.",
      results: "Resultados",
      set: "Conjunto",
      check: "Verificar",
      delete: "Eliminar",
      bulkImport: "Importación masiva",
      bulkImportDescription: "Pegue un array JSON de conjuntos de números. Formato: [[principal1, principal2, principal3, principal4, principal5, euro1, euro2], ...]",
      bulkImportSuccess: "Se importaron con éxito {count} conjuntos de números",
      bulkImportError: "Error al importar números. Por favor, compruebe el formato e inténtelo de nuevo.",
      cancel: "Cancelar",
      import: "Importar",
      comparing: "Comparando con",
      historicalDraws: "Sorteos históricos",
      savedNumbersLabel: "Números guardados",
      noMatches: "No se encontraron coincidencias con sus números guardados.",
      matchesFound: "¡Se encontró {count} coincidencia con sus números guardados!",
      matchesFoundPlural: "¡Se encontraron {count} coincidencias con sus números guardados!",
      invalidNumbers: "Ingrese números válidos de EuroJackpot: 5 números únicos del 1 al 50 y 2 números únicos del 1 al 12",
      totalChecked: "Total de sorteos verificados",
      winningDraws: "Sorteos ganadores",
      winPercentage: "Tasa de ganancia",
      overallStats: "Estadísticas generales",
      totalTickets: "Total de boletos",
      totalSpent: "Total gastado",
      totalWon: "Total ganado",
      netProfit: "Beneficio/Pérdida neta",
      bestWin: "Mejor ganancia",
      roi: "Retorno de inversión",
      noResults: "No se encontraron resultados."
    },
    moneyWasted: {
      title: "Rastreador de dinero desperdiciado",
      description: "Vea cuánto dinero ha desperdiciado en boletos de EuroJackpot a lo largo del tiempo.",
      total: "Dinero total desperdiciado:",
      totalProfit: "Beneficio total:",
      etfGrowth: "Crecimiento ETF",
      etfTotal: "Valor ETF:"
    },
    impressum: {
      title: "Aviso Legal",
      content: "Información legal sobre el propietario del sitio web"
    },
    privacy: {
      title: "Política de Privacidad",
      content: "Información sobre protección de datos y privacidad"
    },
    consent: {
      title: "Su configuración de privacidad",
      description: "Este sitio web utiliza cookies y servicios externos para mejorar su experiencia. Utilizamos Google Analytics para estadísticas y Google Fonts para la visualización. Puede elegir si desea habilitar estos servicios.",
      necessary: "Solo necesarias",
      acceptAll: "Aceptar todas",
      acceptAllText: "Al hacer clic en \"Aceptar todas\", usted consiente el uso de TODAS las cookies y rastreadores.",
      necessaryText: "Al hacer clic en \"Solo necesarias\", solo se utilizarán las cookies técnicamente necesarias.",
      moreInfo: "Puede encontrar más información en nuestra Política de Privacidad."
    },
    footer: {
      tutorial: "Tutorial",
      impressum: "Aviso Legal",
      privacy: "Política de Privacidad"
    },
    languageSelector: "Idioma"
  }
}