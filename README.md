# OpenClassrooms - Parcours Développeur Front-end

## <a id="start">Projet 6 - Fisheye</a>

Fisheye est une plateforme de photographes freelance.
La plateforme permet aux photographes d'afficher leur portfolio et aux utilisateurs de les consulter/liker.
___

## Liens

Lien vers la [GitHub Page](https://okuspo.github.io/OC_P6_Fisheye/).  

Lien vers le [diagramme des fonctions](https://whimsical.com/p6-v4-PtWt93VBERWdH3PrCxM4Ey).  

Lien vers la [JSDoc](https://okuspo.github.io/OC_P6_Fisheye/scripts/out/)
___

## Fonctionnalités demandées

Développer un site sur base d'un fichier json contenant des photographes et des photos.

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
					{}
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
			{}
		]
}
```

### Objectifs du projet

- Apprendre le design pattern Factory
- Exploiter un fichier json avec JavaScript
- Accéder au DOM et le modifier avec JavaScript
- Rendre un site accessible (balises sémantiques, attributs aria, navigation au clavier, tabindex)
- Manipuler les event listeners (clics, navigation au clavier, focus)
- Trier des objets en utilisant la fonction sort()
- Pas d'attentes particulières sur la responsivité

### :one: Site

- Accessibilité : permettre la navigation au clavier (tab et keyboard events pour éléments HTML personnalisés)
- Utilisations d'attributs Aria

### :two: Page d'accueil

- Injecter 1 article par photographe avec un lien vers la page profil
- Navigation au clavier avec tabindex

### :three: Page profil photographe

- Injecter les données du photographe
- Injecter la galerie relative au photographe

- Les médias (articles) de la galerie peuvent être triés par popularité, date, titre.
- Les utilisateurs doivent pouvoir cliquer sur les likes.
- Le utilisateurs doivent pouvoir afficher la photo en plein écran dans une modale (lightbox) au clic sur l'article.
- Dans la lightbox on peut naviguer entre les médias.

### :sparkles: En bonus !

#### Likes

L'état de la galerie est persistant (stocké dans le sessionStorage) ce qui permet de :

- Conserver le compte des likes de chaque photographe même après refresh/changement de page.
- Permettre à fonction de tri par Popularité de s'appuyer sur les nouvelles valeurs

#### Vidéos

Les vidéos ont un attribut `poster` avec un lien vers une vignette jpg.  
Les vidéo ont un attribut `preload="metadata"` ce qui permet d'accélérer leur chargement dans le DOM.  
Les vidéos ont un attribut `"controls"` mais uniquement dans la lighbox.  

#### Images

Les images ont un attribut `srcset` vers une version plus petite prévue pour chaque image.  
Les images étant très grandes (~ 3000px * 5000px) et lourdes (~5Mo pour certaines), c'est leur version "light" qui s'affiche dans la galerie, et leur source originale dans la lightbox.  

Même principe pour les photos de profil des photographes (profile.html et index.html) qui disposent de 2 sourcesets (light et x-light).  

#### Galerie

Instanciation de l'intersection observer sur les médias de la galerie pour un affichage progressif.

#### MODALE Lightbox

Dans la v3, lorsqu'on faisait défiler les photos de la galerie, les event listeners pour les clics sur les flèches (ou les flèches du clavier) étaient rajoutés à chaque nouvelle photo.  
Cela posait de très gros problèmes de performance (freeze du navigateur).  
Ce problème est réglé dans la v4 (voir diagramme). Les event listeners sont ajoutés à l'ouverture de la lightbox, et retirés à la fermeture.  

Ajout d'un `<template>` pour la lightbox, avec une option de repli si les templates HTML ne sont pas supportés par le navigateur.  

#### Listbox

Support des touches Arrow Up, Arrow Down, Home et End pour naviguer dans la listbox.

#### Global

Découverte et ajout de la JSDoc.  

___

### Versions antérieures

- [Diagramme des fonctions - Codebase initiale](https://whimsical.com/p6-default-codebase-NmtiyYW4fcZdGe7scF4N9h)
- [Diagramme des fonctions - v1](https://whimsical.com/p6-v1-2UpNeXviK4t4p4QTr451iv)
- [Diagramme des fonctions - v2](https://whimsical.com/p6-v2-A87joBVZsNk5HMAfs7Wg3E)
- [Diagramme des fonctions - v3](https://whimsical.com/p6-v3-9AFQhqD5Um8mHJavxmGz6L)
___
[:top: Retour en haut de page](#start)