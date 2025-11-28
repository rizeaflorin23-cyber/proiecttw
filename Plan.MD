### Tehnologii

Frontend: React.JS
Backend: Express.JS
Baza de Date: MySQL
Autentificare: Session(pentru profesori) / Token temporar(pentru sesiunea studenților)

### Baza de Date

Tabele:

- Users(Profesorii care creează activități)
- Activities (Conține: cod unic acces, descriere, data start, durata, status [activ/inactiv])
- Feedback (Conține: tipul reacției, timestamp-ul momentului, referință către Activities)

### Rute HTTP

### AUTH (Profesor)

`POST /api/auth/register` - înregistrare cont profesor
`POST /api/auth/login` - login profesor
`POST /api/auth/logout` - logout
`GET /api/users/me` - informații despre profesorul curent

### ACTIVITIES (Gestiune Activități - Profesor)

`POST /api/activities` - creează o nouă activitate (generează automat codul unic de acces și setează durata)
`GET /api/activities` - returnează lista tuturor activităților create de profesorul curent (istoric)
`GET /api/activities/:activityID` - detalii despre o activitate specifică, pentru profesor
`PUT /api/activities/:activityID` - editează descrierea sau durata activității
`DELETE /api/activities/:activityID` - șterge o activitate
`PATCH /api/activities/:activityID/stop` - oprește forțat activitatea înainte de expirarea timpului
`GET /api/activities/:activityID/feedback` - returnează toate reacțiile pentru o activitate (pentru profesor).

### PARTICIPATION (Acces Studenți)

`POST /api/join` - rută publică unde studentul introduce codul unic. Returnează un token de acces temporar și ID-ul activității dacă codul este valid și activitatea este în desfășurare.
`GET /api/activities/:activityID/status` - verifică dacă activitatea la care participă studentul este încă activă (polling din frontend).

### FEEDBACK (Core Feature)

`POST /api/feedback/:activityID` - studentul trimite o reacție.
    -Body: { "reaction": "smiley" | "frowny" | "surprised" | "confused" }
    -Backend-ul va atașa automat timestamp-ul curent server-side.
