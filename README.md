# OpenClassrooms - Parcours Développeur Front-end

## Projet 6 - Fisheye

Fisheye est une plateforme de photographes freelance.
La plateforme permet aux photographes d'afficher leur portfolio et aux utilisateurs de les consulter/liker.
___

## Liens

Lien vers la [GitHub Page](https://okuspo.github.io/OC_P6_Fisheye/)  
Lien vers le [diagramme des fonctions](https://whimsical.com/p6-v3-9AFQhqD5Um8mHJavxmGz6L)
___

## Fonctionnalités demandées

Sur base d'un fichier json content des photographes et des photos :

```json
{
	"photographers": [
		{
			"name": "Mimi Keel",
			"id": 243,
			"city": "London",
			"country": "UK",
			"tagline": "Voir le beau dans le quotidien",
			"price": 400,
			"portrait": "MimiKeel.jpg"
		},
        ...
        ],

	"media": [
		{
			"id": 342550,
			"photographerId": 82,
			"title": "Fashion Yellow Beach",
			"image": "Fashion_Yellow_Beach.jpg",
			"likes": 62,
			"date": "2011-12-08",
			"price": 55
		},
        ...
        ]
}
```

### Site

- Accessibilité : permettre la navigation au clavier (tab et keyboard events pour éléments HTML personnalisés)
- Utilisations d'attributs Aria

### Page d'accueil

- Injecter 1 article par photographe avec un lien vers la page profil
- Navigation au clavier avec tabindex

### Page profil photographe

- Injecter les données du photographe
- Injecter la galerie relative au photographe

- Les médias (articles) de la galerie peuvent être triés par popularité, date, titre.
- Les utilisateurs doivent pouvoir cliquer sur les likes.
- Le utilisateurs doivent pouvoir afficher la photo en plein écran dans une modale (lightbox) au clic sur l'article.
- Dans la lightbox on peut naviguer entre les médias.

## Fonctionnalités supplémentaires

### Likes
Les likes sont persistants (sessionStorage) ce qui permet de :

- Conserver le compte des likes de chaque photographe même après refresh/changement de page.
- Permettre à fonction de tri par Popularité de s'appuyer sur les nouvelles valeurs

### Vidéos
Les médias de type vidéo possèdent un attribut `poster` avec un lien vers une vignette jpg, et sont paramétrés en `preload="metadata"` ce qui permet d'accélérer l'injection dans le DOM.

### Images
Ajout d'attributs `srcset` vers une version plus petite prévue pour chaque image.
Les images étant très grandes (~ 3000px * 5000px) et lourdes (~5Mo pour certaines), c'est leur version "light" qui s'affiche dans la galerie, et leur source originale dans la lightbox.

Même principe pour les photos de profil des photographes (profile.html et index.html) qui disposent de 2 sourcesets (light et x-light).

### Prévu mais non implémenté
Ajout de 2 fichiers HTML : media.html et photographer.html qui contiendront des templates.

L'objectif est d'éviter trop de :

- `document.createElement('element')`
- `document.classlist.add('className')`

et de raccourcir le code.

```html
<template id="photographer-template">
    <a>
        <article class="photographer-article">
            <img class="photographer-article__picture">
            <h2 class="photographer-article__name"></h2>
            <span class="photographer-article__location"></span>
            <span class="photographer-article__tagline"></span>
            <span class="photographer-article__price"></span>
        </article>
    </a>
</template>
```

___
Versions antérieures :

- [Diagramme des fonctions - Codebase initiale](https://whimsical.com/p6-default-codebase-NmtiyYW4fcZdGe7scF4N9h)
- [Diagramme des fonctions - v1](https://whimsical.com/p6-v1-2UpNeXviK4t4p4QTr451iv)
- [Diagramme des fonctions - v2](https://whimsical.com/p6-v2-A87joBVZsNk5HMAfs7Wg3E)
___