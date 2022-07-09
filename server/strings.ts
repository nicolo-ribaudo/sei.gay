export const en = {
  "You are gay": "You are gay",
  "Open me": "Open me",
  Congratulations: "Congratulations",
  "Now you are": "Now you are",
  "Write a custom letter": "Write a custom letter",
  Name: "Name",
  Flag: "Flag",
  Cancel: "Cancel",
  Create: "Create",
  _postFlag: null as null | string,
  _title: null as null | string,
};

export const it: typeof en = {
  "You are gay": "Sei gay",
  "Open me": "Aprimi",
  Congratulations: "Congratulazioni",
  "Now you are": "D'ora in poi sarai",
  "Write a custom letter": "Crea una lettera personalizzata",
  Name: "Nome",
  Flag: "Flag",
  Cancel: "Annulla",
  Create: "Crea",
  _postFlag: null,
  _title: null,
};

export const de: typeof en = {
  "You are gay": "Du bist gay",
  "Open me": "Öffne Mich",
  Congratulations: "Glückwunsch",
  "Now you are": "Ab jetzt bist du",
  "Write a custom letter": "Erstelle einen eignen Brief",
  Name: "Name",
  Flag: "Flagge",
  Cancel: "Abbrechen",
  Create: "Erstellen",
  _postFlag: null,
  _title: null,
};

export const nl: typeof en = {
  "You are gay": "Jij bent gay",
  "Open me": "Open mij",
  Congratulations: "Gefeliciteerd",
  "Now you are": "Vanaf nu ben je",
  "Write a custom letter": "Maak je eigen brief",
  Name: "Naam",
  Flag: "Vlag",
  Cancel: "Afbreken",
  Create: "Maak",
  _postFlag: null,
  _title: null,
};

export const pt: typeof en = {
  "You are gay": "Você é gay",
  "Open me": "Abra-me",
  Congratulations: "Parabéns",
  "Now you are": "Agora você é",
  "Write a custom letter": "Escreva uma carta customizada",
  Name: "Nome",
  Flag: "Bandeira",
  Cancel: "Cancelar",
  Create: "Criar",
  _postFlag: null,
  _title: null,
};

export const es: typeof en = {
  "You are gay": "¡Eres gay",
  "Open me": "¡Abrir",
  Congratulations: "¡Felicitaciones",
  "Now you are": "Ahora eres",
  "Write a custom letter": "¡Escribe una carta personalizada",
  Name: "Nombre",
  Flag: "Bandera",
  Cancel: "Cancelar",
  Create: "Crear",
  _postFlag: null,
  _title: null,
};

import { turkishLowercaseI } from "./dictionary.ts";

export const tr: typeof en = mapObj(
  {
    "You are gay": "Geysin",
    "Open me": "Beni aç",
    Congratulations: "Tebrikler",
    "Now you are": "Bundan böyle sen",
    "Write a custom letter": "Özel bir mektup yaz",
    Name: "İsim",
    Flag: "Etiket",
    Cancel: "İptal",
    Create: "Oluştur",
    _postFlag: "'sin",
    _title: "Geysin",
  },
  (v, k) => (k === "_title" ? v : turkishLowercaseI(v))
);

function mapObj<Obj>(
  obj: Obj,
  fn: <K extends keyof Obj>(value: Obj[K], key: K) => Obj[K]
) {
  const res = {} as Obj;
  for (const key of Object.keys(obj) as Array<keyof Obj>) {
    res[key] = fn(obj[key], key);
  }
  return res;
}
