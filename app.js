var films = [{
        name: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        name: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        name: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        name: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

// TODO

var table = document.getElementById('tableau');
var btnAjouter = document.getElementById('ajouter');
var inputTitre = document.getElementById('titre');
var inputAnnee = document.getElementById('annee');
var inputAuteur = document.getElementById('auteur');
var formulaire = document.getElementById('newContent');
var btnSave = document.getElementById('saver');
var erreur = document.getElementById('infobulle');
//
/*Ajoute la variable films à la table html */

creaTable(films);

function creaTable(e) {

    for (var i = 0; i < e.length; i++) {
        var row = `<tr>
                        <td>${e[i].name}</td>
                        <td>${e[i].years}</td>
                        <td>${e[i].authors}</td>
                        <td><button class="supprime">Supprimer</button></td>
                  </tr>`
        table.innerHTML += row
    }
}

//Bouton ajouter --> Input

btnAjouter.addEventListener('click', function () {
    btnAjouter.style.display = "none";
    formulaire.style.display = "block";

})

//Bouton Save Verifie les conditions

btnSave.addEventListener('click', function () {
    let errTitre = document.getElementById('errTitre');
    let errAuteur = document.getElementById('errAuteur');
    let errAnnee = document.getElementById('errAnnee');
    /*taille de Titre > 2 */

    if (inputTitre.value.length < 2) {
        erreur.style.display = "block";
        errTitre.style.display = "block";
        setTimeout(function () {
            erreur.style.display = "none";
            errTitre.style.display = "none";
        }, 3000);
    } else {
        var conditionTitre = true;
    }

    /*Taille de Auteur > 5 */

    if (inputAuteur.value.length < 5) {
        erreur.style.display = "block";
        errAuteur.style.display = "block";
        setTimeout(function () {
            erreur.style.display = "none";
            errAuteur.style.display = "none";
        }, 3000);
    } else {
        var conditionAuteur = true;
    }

    /*Annee strictement = a 4 et > 1899 */

    if (inputAnnee.value.length == 4 && inputAnnee.value > 1899) {

        var conditionAnnee = true;
    } else {
        erreur.style.display = "block";
        errAnnee.style.display = "block";
        setTimeout(function () {
            erreur.style.display = "none";
            errTitre.style.display = "none";
        }, 3000);
    }

    /*Si toutes les conditions sont réunis ont ajoutes une nouvelle ligne de 4 collones à la "table" */

    if (conditionTitre == true && conditionAuteur == true && conditionAnnee == true) {
        var nouvelleLigne = table.insertRow(4);

        var col1 = nouvelleLigne.insertCell(0);
        var col2 = nouvelleLigne.insertCell(1);
        var col3 = nouvelleLigne.insertCell(2);
        var col4 = nouvelleLigne.insertCell(3);

        /*Les valeurs entrées prennent une majuscule à la premiere lettre */

        col1.innerHTML = inputTitre.value.charAt(0).toUpperCase() + inputTitre.value.substr(1);
        col2.innerHTML = inputAnnee.value.charAt(0).toUpperCase() + inputAnnee.value.substr(1);
        col3.innerHTML = inputAuteur.value.charAt(0).toUpperCase() + inputAuteur.value.substr(1);

        /*On ajoute un bouton Supprimer à notre ligne*/

        let newButton = document.createElement('button');
        newButton.className = "supprime";
        let t = document.createTextNode('Supprimer');
        col4.appendChild(newButton);
        newButton.appendChild(t);


        /*Declenche une pop up de succés pendant 3sec */

        let sucess = document.getElementById('sucess');
        sucess.style.visibility = "visible";
        setTimeout(function () {
            sucess.style.visibility = "hidden";
        }, 3000);

        /*Les inputs text du formulaires disparaissent et le bouton ajouter reprend la place */

        btnAjouter.style.display = "block";
        formulaire.style.display = "none";
    }
})


/*Filtre par Titre*/

var filteTitre = document.getElementById('filtreTitre');
filteTitre.addEventListener('click',
    function sortTable() {
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("tableau");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 0; i < (rows.length - 1); i++) {
                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[0];
                y = rows[i + 1].getElementsByTagName("td")[0];

                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
)

/*Filtre par Annee */

var filtreAnnee = document.getElementById('filtreAnnee');
filtreAnnee.addEventListener('click', function sortAge() {
    document.getElementById('filtreAnnee');
    films.sort(function (a, b) {
        return a.years - b.years;
    });
    display(intro);
})

/*Bouton Supprimer, suprime la ligne avec confirmation */

let btnSuppr = document.getElementsByClassName('supprime');
var controleSupp = document.getElementById('controleSupp');
for (let i = 0; i < btnSuppr.length; i++) {
    let tSupp = btnSuppr[i];
    tSupp.addEventListener('click', function () {

        controleSupp.style.display = "block";
    })
}

/*Bouton Nop du controle supression */

let btnNo = document.getElementById('btnNo');
btnNo.addEventListener('click', function () {
    controleSupp.style.display = "none";
})

/*Bouton Oui du controle supression */
var index, table = document.getElementById('tableau');
let btnYes = document.getElementById('btnYes');


btnYes.addEventListener('click', function () {
    index = table.childNodes;
    table.deleteRow(index);


    controleSupp.style.display = "none";
})


introJs().start();
/*
introJs()
    .setOptions({
            steps: [{
                element: document.querySelector('.header-nav'),
                intro: 'Bienvenue dans la Médiatèque !',
                position: 'right'
              },
              {
                element: document.querySelector('.newContent'),
                intro: "Par ici, c'est pour ajouter des films mais pas n'importe quels films !",
                position: 'left'
              },
              {
                element: document.querySelector('.controleSupp'),
                intro: 'Ici , trier les films que nous proposons .',
                position: 'bottom'
              },
              {
                element: document.querySelector('.tableau'),
                intro: "Un film de Bruce Lee montre Chuck Norris se faire battre par Bruce Lee. C'est là l'effet spécial le plus cher de toute l'histoire du cinéma",
                position: 'top'
              }]
            }).start();*/