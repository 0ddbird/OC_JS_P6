# P6 Fisheye

<style>
    backtotop {
        background-color: #2d2d2d;
        padding: .5rem 0 .5rem .5rem;
}
</style>

## <a id="index">Index</a>
###[1 - Liens utiles](#links)

###[2 - Briefing](#2)

####[2.1 - Prototype des fonctionnalités](#2.1)

####[2.2 - Contraintes techniques additionnelles](#2.2)

####[2.3 - Livrables](#2.3)

###[3 - Etude de la maquette](#3)

###[4 - Etude de la codebase originale](#4)

####[4.1 - HTML](#4.1)

####[4.2 - CSS](#4.2)

####[4.3 - JS](#4.3)

####[4.4 - JSON](#4.4)

####[4.5 - Synthèse de la codebase](#4.5)

###[5 - Concepts à apprendre](#5)

___

## <a id="links">1 - Liens utiles</a>

[Repo GitHub original](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye)
[Maquette Figma](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR)

___

## <a id="2"> 2 - Briefing</a>

**Entreprise :**
Site web de photographes freelances.
“Nos clients prennent de super photos, mais ils n’y connaissent rien en développement web. C'est pourquoi nous proposons une plateforme unique pour montrer leurs photos sur une belle page et les contacter pour des événements ou des tirages.  
Nous sommes l'un des plus grands sites de photographie en freelance, avec un énorme réseau de photographes.”

**Objectif :**
Leur site est obsolète et a besoin d'être remanié.  
"Notre site a été construit il y a plus de dix ans, et nous n'avons pas eu l'occasion de le mettre à jour jusqu'à présent. Nous venons de lever des fonds et nous aimerions que votre équipe le transforme d'un site statique à un site dynamique".

### <a id="2.1">2.1 - Prototype des fonctionnalités</a>

Nous devons créer les pages suivantes pour le prototype :

**Page d'accueil :**

- Liste de tous les photographes avec leur nom, leur slogan, leur localisation, leur prix/heure, leurs tags et une image miniature de leur choix.  
- En cliquant sur une étiquette (tag) dans la barre de navigation, la liste des photographes est filtrée pour n'afficher que ceux qui correspondent à cette étiquette.  
- Lorsque l'utilisateur clique sur la vignette d'un photographe, il est amené à sa page.  

**Pages des photographes** (une pour chaque photographe échantillon) :

- Affiche une galerie des travaux du photographe.
- Les photographes peuvent montrer à la fois des photos et des vidéos.
- Dans le cas des vidéos, montrer une image miniature dans la galerie.
- Chaque média comprend un titre et un nombre de likes.
- Lorsque l'utilisateur clique sur l'icône "Like", le nombre de likes affiché est incrémenté.
- Le nombre de likes total d’un photographe doit correspondre à la somme des likes de chacun de ses médias.
- Les médias peuvent être triés par popularité ou par titre.
- Lorsque l'utilisateur clique sur un média, celui-ci doit s’ouvrir dans une lightbox :
- Lorsque la lightbox est affichée, il y a une croix dans le coin pour fermer la fenêtre.
- Des boutons de navigation permettent de passer d'un élément média à l'autre (les utilisateurs peuvent cliquer sur ces boutons pour naviguer).
- Les touches fléchées permettent également de naviguer entre les médias.
- Afficher un bouton pour contacter le photographe.
- Le formulaire de contact est une modale qui s'affiche par-dessus le reste.
- Il comprend des champs pour les noms, l'adresse électronique et le message.
- Plus tard, le bouton de contact enverra un message au photographe. Pour l'instant, seulement afficher le contenu des trois champs dans les logs de la console.

**Responsive design**
“Pour cette itération, pas besoin que le site soit responsive sur mobile.”

**Accessibilité**
Il est très important que notre site soit accessible aux utilisateurs malvoyants.  
Toutes nos photos doivent comporter des descriptions textuelles, et vous devez les inclure dans la page.  
De plus, l'utilisateur doit pouvoir utiliser les commandes du clavier pour naviguer sur le site, comme les touches fléchées de la lightbox"

- Utilisez des éléments HTML "sémantiques" qui décrivent leur intention autant que possible, au lieu de mettre des éléments <div> et <span> partout.
- Lorsque vous devez créer un élément personnalisé, ajoutez des attributs ARIA pour décrire ce qu'il fait.
- Le code devrait passer les tests AChecker sans “known issue” (afin qu'il soit conforme aux WCAG).
- Toute la gestion des événements (par exemple, les clics et les pressions au clavier) doit être configurée (utilisez KeyboardEvent.key ou KeyboardEvent.code.).
- Utilisez un lecteur d'écran gratuit pour vous faire une idée de ce que représente l'utilisation du site pour une personne malvoyante.

### <a id="2.2"> 2.2 - Contraintes techniques additionnelles</a>

- Le code est séparé en différents fichiers (HTML, CSS, JavaScript).
- ESLint est utilisé (avec les paramètres par défaut) pour garantir que le code est robuste. Ceci est particulièrement facile à intégrer avec l'IDE VSCode.
- Une version moderne (ES6 ou supérieure) de JavaScript est utilisée et les fonctionnalités obsolètes ne sont pas utilisées.
- Le code est lisible. Il faudra s'assurer que les variables et fonctions ont un nom qui ont un sens, et commenter le code lorsque le nom n'indique pas explicitement ce qu'il se passe.

### <a id="2.3">2.3 - Livrables</a>

- Un dépôt de code sur GitHub avec des fichiers HTML, CSS et JavaScript.
- Une version mise à jour du JSON (avec alt-text).

<backtotop>[:top: Retour à l'index](#index)<backtotop>

___

## <a id="3">3 - Etude de la maquette</a>

[Maquette Figma](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR)

### <a id="3.1">3.1 - Page d'accueil</a>

Un header, un main, pas de footer.

**Header :** Un logo, un heading

**Main :** une galerie de photographes (grid CSS)

Un ``<article>`` ***photographe***, répliqué

- Une photo
- Un nom
- Une localisation (ville, pays)
- Une citation
- Un tarif journalier

### <a id="3.2">3.2 - Page photographe</a>

Un header, un main, pas de footer.

**Header :** un logo

**Main :**

- 1 ``<section>`` ***photographe*** (même composant que dans la page d'accueil)
- 1 bouton "Contactez-moi" qui ouvre une modale
- 1 `<section>` ***galerie***
- 1 `<select>` pour trier la galerie
- Des `<articles>` comprenant : 1 image, 1 titre, 1 compteur de like, 1 bouton like, 1 lien vers une modale
- 1 widget comprenant : 1 compteur du total des likes, 1 icône *like*, le tarif journalier

**Modale *Contactez-moi***

Un formulaire avec :

- 1 heading
- 4 `<input type="text>`
- 1 bouton *envoyer*
- 1 bouton *fermer*

**Modale *Lightbox***

- 1 image
- 1 titre
- 2 boutons de navigation
- 1 bouton *fermer*

<backtotop>[:top: Retour à l'index](#index)<backtotop>

___

## <a id="4">4 - Etude de la codebase originale</a>

### <a id="4.1">4.1 - HTML</a>

Page d'accueil - index.html

```html
<body>
    <header>
        <img>
        <h1>
    </header>
    <main>
        <div class="photographer_section">
    </main>

</body>

```

Page photographe - photographer.html

```html
<body>
    <header>
        <img>
    </header>
    <main>
        <div class="photograph-header">
            <button>
        </div>
    </main>
    <div id="contact-modal">
    <form>
</body>

```

### <a id="4.2">4.2 - CSS</a>

Toutes les pages HTML importent style.css

**photographer.css**

- #contact_modal
- .photograph-header
- .contact_button
- .modal
- .modal header
- .modal header img
- .modal header h2
- form
- form label
- form div
- form input

**style.css**

`@import photographer.css`

- Body
- Header
- h1
- .logo
- .photographer_section
- .photographer_section article
- .photographer_section article h2
- .photographer_section article img

### <a id="4.3">4.3 - JavaScript</a>

#### index.js

Appelle `init()`

```javascript

    async function getPhotographers() {
        const photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }
```
Récupère les données du JSON et retourne une liste de quelque chose (??)

```js

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };
}
```

Ne retourne rien (modifie le DOM)
Prend un argument `photographers` (liste générée par `getPhotographers()`)
Récupère l'adresse de `.photographer_section` dans l'HTML.
Crée une variable `photographerModal` dont la valeur est le résultat de `photographerFactory(photographer)`
La valeur de cette variable a le format `{name, picture, getUserCardDOM()}`
Ajoute un enfant dont la valeur est `userCardDOM` à `photographerSection`

```js
    async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getPhotographers();
            displayData(photographers);
        };
```

- Crée un objet `photographers` qui contient les données des photographes
- = await ?
- Appelle la fonction `displayData(photographers)`

#### photographer.js

**/factories/photographer.js**

```js
function photographerFactory(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
```

- photographerFactory prend 1 argument
- crée un objet avec deux keys {name, portrait} dont les valeurs respectives viennent de data
- possède une fonction getUserCardDOM()
- retourne un objet avec `{name, picture, le résultat de getUserCardDOM}`

La fonction getUserCardDom :

- Injecte un article dans le HTML
- Injecte une image dans le HTML
- Définit un attribut source à la balise `<img>` et une valeur = la valeur de la variable `picture`
- Injecte un h2
- Ajoute la valeur de la variable `name` en texte dans le h2
- Ajoute l'image et le h2 à l'article
- `return` l'article

#### /utils/contactForm.js

### <a id="4.4">4.4 - JSON</a>

***photographers.json*** contient 2 objets :

- photographers, une liste de 6 objets
- media : une liste de 59 objets


2 fonctions pour ouvrir et fermer la modale du formulaire.

### <a id="4.5">4.5 - Synthèse de la codebase</a>

To do

<backtotop>[:top: Retour à l'index](#index)<backtotop>

## <a id="5">5 - Concepts à apprendre</a>

**Rest parameter, Spread operator**
[MDN | Paramètres du reste / Rest parameter](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters)
[MDN | Syntaxe de décomposition / Spread operator](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
[Mindsers | Rest parameter et spread operator](https://mindsers.blog/fr/post/rest-parameter-et-spread-operator-en-javascript/)

**JS Promises, async, await**
[MDN | Faciliter la programmation asynchrone avec async et await](https://developer.mozilla.org/fr/docs/Learn/JavaScript/)
[MDN | Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[MDN | Asynchrone](https://developer.mozilla.org/fr/docs/Glossary/Asynchronous/Asynchronous/Async_await)
[MDN | Async](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)

**Design patterns**
[MDN | Factory pattern in JavaScript](https://www.dofactory.com/javascript/design-patterns/factory-method)

**CSS**
[MDN | CSS Grid](https://developer.mozilla.org/fr/docs/Web/CSS/grid)

<backtotop>[:top: Retour à l'index](#index)<backtotop>