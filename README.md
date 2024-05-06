# Moment 4 i kursen DT207G, Backend-baserad webbutveckling

Detta är en en webbtjänst som hanterar säkerhet och autentisering genom registreing av användare, inloggning och användning av JWT för sessionshantering. Webbtjänsten är skapad med hjälp av NodeJs, Express, Mongoose och NoSQL-databasen MongoDB Atlas.

### Teknik
Lösenord är krypterade (hashade) i databasen.

### Kom igång

APIet är kopplat till en MongoDB Atlas-databas. För att komma igång, börja med att klona ned källkodsfilerna. Kör sedan kommandot "npm install" för att installera de nödvändiga npm-paketen. Slutligen, kör skriptet "npm run serve".

### Länk till API

https://moment41dt207g.onrender.com/api

### Användning av API

Nedan finns en beskriving av hur man kan nå APIet:

| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| POST | /register | Lägger till en ny användare |
| POST | /login | Loggar in en användare |
| GET | /protected | Exempel på en skyddad route |