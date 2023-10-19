# NAV-IT-kodeoppgave

## How to run

Make sure to have node installed on your machine. If not, you can download it [here](https://nodejs.org/en/download/). I am using LTS version 18.18.0 for this project with Node Version Manager (nvm).

```bash
$ git clone https://github.com/michaelbrusegard/NAV-IT-kodeoppgave
```

```bash
$ cd NAV-IT-kodeoppgave
```

Install all dependencies (axios) with either bun or npm (or any other package manager). I am using bun because it is faster than npm and I want to try it out.

```bash
$ bun install # or npm install
```

To run the tests, use the following command:

```bash
$ bun runTests # or npm runTests
```

To run the function with a custom command line input, use the following command:

```bash
$ bun input # or npm input
```

The main function for the assignment is called `calculateDagpenger()` (in `calculateDagpenger.js`) and takes an integer array with the last three years of income as input. The function returns an object with the boolean `eligibleForDagpenger` and an integer `dagsatsen` if the user is eligible for dagpenger else dagsatsen is set to null. The function will throw an error if the input is invalid. Tests can be found in `calculateDagpengerTest.js`. And the command line input can be found in `userInput.js`.

## Assignment

I denne oppgaven skal du finne ut om en bruker kan få dagpenger, og hvor mye. Reglene er basert på de ekte dagpengereglene, men forenklet til å passe til oppgaven. Dagpenger er en ytelse man kan få hvis man har mistet jobben eller er permittert. For å være kvalifisert til å få dagpenger, må man ha hatt arbeidsinntekt minst det siste kalenderåret.

Når en bruker søker om dagpenger trenger de å vite om de har rett til dagpenger. Hvis de får det innvilget, trenger de også å vite hvor mye de får per dag, kalt dagsatsen. For å få innvilget dagpenger må man enten ha tjent til sammen over 3G de siste 3 kalenderårene, eller ha tjent over 1.5G forrige kalenderår. Grunnbeløpet, kalt G, brukes til å beregne mange av NAVs ytelser. Grunnbeløpet justeres 1. mai hvert år og blir fastsatt etter trygdeoppgjøret.

Hvis man har tjent nok til å få dagpenger, er det et nytt regnestykke for å finne grunnlaget vi trenger for å beregne dagsatsen. Dette dagpengegrunnlaget er også basert på inntekten de siste tre årene. Dagpengegrunnlaget er den høyeste verdien av enten inntekten siste kalenderåret, eller gjennomsnittsinntekten de siste tre kalenderårene. Dagpengegrunnlaget kan ikke være høyere enn 6G.

For å finne dagsatsen deler man dagpengegrunnlaget på antall arbeidsdager i året, rundet opp. I NAV har vi definert antall arbeidsdager i et år til å være 260.

Oppgaven er:

- Ta imot tre år med inntekt, og returnere om bruker har rett på dagpenger. Inntekten er én sum per kalenderår.
- Hvis brukeren har rett på dagpenger skal du også returnere dagsatsen.
- Bruk enten Java, JavaScript eller Kotlin, det er ingen krav om UI.
- Besvarelsen skal inneholde tester.

Eksempel:
Hvis man har tjent dette:
2022: 500000
2021: 450000
2020: 400000
så ville man hatt rett på dagpenger, og man får en dagsats på kr 1924kr.

Innlevering:
Oppgaven skal leveres i form av en URL til et private repo via GitHub (https://github.com)
Gi følgende brukere tilgang til ditt private repo: taniaholst.
Det er Tania og noen flere av våre utviklere som vil se koden din.
Dersom andre trenger tilgang, sier vi i fra til deg.
På GitHub gir du oss tilgang under innstillingen "Collaborators".

Innleveringsfrist er onsdag 11. oktober kl. 12.00. Send oss gjerne en mail når du er ferdig!
