1. Autentificare (Profesor)

Metodă

Rută

Descriere

POST

/api/auth/register

Înregistrare cont nou profesor.

POST

/api/auth/login

Logare profesor (creare sesiune).

POST

/api/auth/logout

Delogare.

GET

/api/users/me

Detalii despre utilizatorul curent.

2. Gestiune Activități (Profesor)

Aceste rute necesită autentificare.

Metodă

Rută

Descriere

POST

/api/activities

Creează o activitate nouă (generează cod acces).

GET

/api/activities

Returnează istoricul activităților profesorului.

GET

/api/activities/:id

Detalii despre o activitate specifică.

PUT

/api/activities/:id

Editează descrierea sau durata.

DELETE

/api/activities/:id

Șterge activitatea și feedback-ul asociat.

PATCH

/api/activities/:id/stop

Oprește forțat activitatea.

3. Participare (Studenți - Public)

Metodă

Rută

Descriere

POST

/api/join

Intrare în sesiune cu cod unic. Returnează token acces.

GET

/api/activities/:id/status

Verificare status activitate (Polling).

4. Feedback (Core)

Rute imbricate (Nested Routes) conform principiilor REST.

Trimite Reacție

POST /api/activities/:activityID/feedbacks

Studentul trimite o reacție.
Body:

{
  "reaction": "smiley"
}


Valori acceptate: "smiley", "frowny", "surprised", "confused"

Vizualizare Reacții (Profesor)

GET /api/activities/:activityID/feedbacks

Returnează lista tuturor reacțiilor pentru o activitate, pentru a popula graficele în timp real.

⚙️ Instalare și Configurare

Clonează repository-ul:

git clone [https://github.com/userul-tau/nume-proiect.git](https://github.com/userul-tau/nume-proiect.git)


Backend Setup:

cd backend
npm install
# Configurează fișierul .env cu datele bazei de date MySQL
npm start


Frontend Setup:

cd frontend
npm install
npm start