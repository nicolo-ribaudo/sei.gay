function r(html: string, raw: string = html) {
  return { html, raw };
}

export const en = {
  "You are gay": r("You are gay"),
  "Open me": r("Open me"),
  Congratulations: "Congratulations",
  "Now you are": "Now you are",
  "Write a custom letter": "Write a custom letter",
  Name: "Name",
  Flag: "Flag",
  Cancel: "Cancel",
  Create: "Create",
  _postFlag: null as null | string,
};

export const it: typeof en = {
  "You are gay": r("Sei gay"),
  "Open me": r("Aprimi"),
  Congratulations: "Congratulazioni",
  "Now you are": "D'ora in poi sarai",
  "Write a custom letter": "Crea una lettera personalizzata",
  Name: "Nome",
  Flag: "Flag",
  Cancel: "Annulla",
  Create: "Crea",
  _postFlag: null,
};

export const de: typeof en = {
  "You are gay": r("Du bist gay"),
  "Open me": r("Öffne Mich"),
  Congratulations: "Glückwunsch",
  "Now you are": "Ab jetzt bist du",
  "Write a custom letter": "Erstelle einen eignen Brief",
  Name: "Name",
  Flag: "Flagge",
  Cancel: "Abbrechen",
  Create: "Erstellen",
  _postFlag: null,
};

export const nl: typeof en = {
  "You are gay": r("Jij bent gay"),
  "Open me": r("Open mij"),
  Congratulations: "Gefeliciteerd",
  "Now you are": "Vanaf nu ben je",
  "Write a custom letter": "Maak je eigen brief",
  Name: "Naam",
  Flag: "Vlag",
  Cancel: "Afbreken",
  Create: "Maak",
  _postFlag: null,
};

export const pt: typeof en = {
  "You are gay": r("Você é gay"),
  "Open me": r("Abra-me"),
  Congratulations: "Parabéns",
  "Now you are": "Agora você é",
  "Write a custom letter": "Escreva uma carta customizada",
  Name: "Nome",
  Flag: "Bandeira",
  Cancel: "Cancelar",
  Create: "Criar",
  _postFlag: null,
};

export const es: typeof en = {
  "You are gay": r("¡Eres gay"),
  "Open me": r("¡Abrir"),
  Congratulations: "¡Felicitaciones",
  "Now you are": "Ahora eres",
  "Write a custom letter": "¡Escribe una carta personalizada",
  Name: "Nombre",
  Flag: "Bandera",
  Cancel: "Cancelar",
  Create: "Crear",
  _postFlag: null,
};

export const af: typeof en = {
  "You are gay": r("Jy is gay"),
  "Open me": r("Maak my oop"),
  Congratulations: "Geluk",
  "Now you are": "Nou is jy",
  "Write a custom letter": "Skryf 'n persoonlike brief",
  Name: "Naam",
  Flag: "Vlag",
  Cancel: "Kanseleer",
  Create: "Skep",
  _postFlag: null,
};

import { turkishLowercaseI } from "./dictionary.ts";

export const tr: typeof en = {
  "You are gay": r(turkishLowercaseI("Geysin"), "Geysin"),
  "Open me": r(turkishLowercaseI("Beni aç"), "Beni aç"),
  Congratulations: turkishLowercaseI("Tebrikler"),
  "Now you are": turkishLowercaseI("Bundan böyle sen"),
  "Write a custom letter": turkishLowercaseI("Özel bir mektup yaz"),
  Name: turkishLowercaseI("İsim"),
  Flag: turkishLowercaseI("Etiket"),
  Cancel: turkishLowercaseI("İptal"),
  Create: turkishLowercaseI("Oluştur"),
  _postFlag: turkishLowercaseI("'sin"),
};
