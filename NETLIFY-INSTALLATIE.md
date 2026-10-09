# HelderBijles publiceren met Netlify

## 1. Plaats de website op GitHub

Maak een nieuw privé of publiek GitHub-repository aan en upload de volledige inhoud van deze map. Laat de bestandsstructuur ongewijzigd.

## 2. Publiceer op Netlify

1. Ga naar https://app.netlify.com en maak een gratis account.
2. Kies **Add new site** en daarna **Import an existing project**.
3. Koppel het GitHub-repository en publiceer met de standaardinstellingen. De publicatiemap is `.`.

## 3. Laat formulierberichten naar paulmdesmet@telenet.be sturen

Na de eerste publicatie:

1. Open in Netlify **Forms** en controleer of het formulier **contact** zichtbaar is.
2. Kies **Form notifications** > **Add notification** > **Email notification**.
3. Vul `paulmdesmet@telenet.be` in en bevestig de verificatiemail die Netlify stuurt.

Daarna komt elke geldige inzending van het contactformulier in die mailbox terecht.

## 4. Beheerpagina voor blogs en testimonials activeren

1. Open in Netlify **Integrations** en installeer **Netlify Identity**.
2. Open **Identity** > **Enable Identity** en zet registratie op **Invite only**.
3. Open **Identity** > **Services** en activeer **Git Gateway**.
4. Nodig jezelf uit via **Invite users**.
5. Ga naar `https://jouw-site.netlify.app/admin/` en log in.

Daar kun je testimonials en blogkaartjes toevoegen, wijzigen of verwijderen. Na **Publish** publiceert Netlify automatisch de nieuwe inhoud.

## Belangrijk

Het contactformulier verzendt pas echt nadat de website op Netlify staat. Lokaal opent het formulier enkel de bedanktpagina.
