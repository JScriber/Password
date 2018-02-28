// Fonction de lancement
function luncher(){
	var root = "images/fonds/";
	var image = "forest.jpg";


	var background = root+image;
	document.getElementById('secure').style.backgroundImage = "url('"+background+"')";
	document.getElementById('conteneur').style.backgroundImage = "url('"+background+"')";

	blured('.flou', background, {
		'blur': 9,
		'scale': 1.1,
		'opacity': 0.6,
		'color': '#fff'
	});

	navigation("#choices", background);
	deverouillage('P@ssword');
}
function deverouillage(password){
	var secureInput = document.getElementById('secureInput');
	var essais = 1;
	secureInput.addEventListener('keyup', function(e){
		if(e.which == 13){
			if(password == secureInput.value){
				var secure = document.getElementById('secure');
				document.body.removeChild(secure);
				document.getElementById('conteneur').style.display = "flex";
			}else{
				essais++;
				if(essais > 3){
					alert('Vous avez eu assez d\'essais.');
					window.close();
				}else{
					secureInput.value = "";
					alert('Le mot de passe entré est incorrect.');
				}
			}
		}
	});
}

function navigation(element, background){
	// On floute le menu
	blured(element, background, {
		'blur': 20,
		'scale': 1.4,
		'opacity': 0.6,
		'color': '#fff'
	});
	// On empeche le clique droit d'opérer
	var menu = document.querySelector(element);
	menu.addEventListener('contextmenu', function(e){
		e.preventDefault();
		return false;
	});


	// Makes the menu functionnal
	var choices = document.getElementById('choices');
	if(choices){
		choices.addEventListener('click', function(e){
			var target = e.target;
			var tagName = "LI";

			while(target.tagName != tagName && target != this){
				target = target.parentNode;
			}
			if(target.tagName == tagName){
				var link = target.getAttribute('data-lien');
				var realTarget = document.getElementById(link);
				if(realTarget){
					var boxes = document.querySelectorAll('#tabBox nav');
					for(var i = 0; i < boxes.length; i++){
						boxes[i].classList.remove('shown');
					}
					realTarget.classList.add('shown');

					var highlight = "highlight";
					var oldHighlight = e.currentTarget.querySelector('.'+highlight);
					if(oldHighlight){
						oldHighlight.classList.remove(highlight);
					}
					target.classList.add(highlight);
				}
			}
		});
	}
}

// ---> FONCTION PERMETTANT AU FLOU DE SE CREER
function blured(element, fond, data){
	/* Récupération des arguments */
	var flou, agrandissement, transparence, couleur;
	flou = data.blur;
	agrandissement = data.scale;
	transparence = data.opacity;
	couleur = data.color;
	/* Mise en place des élements */
	var objets = document.querySelectorAll(element);
	var nombreObjets = objets.length;
	for(var i = 0; i < nombreObjets; i++){
		var objet = objets[i];
		if(objet){
			objet.style.overflow = "hidden";

			var before = document.createElement('div');
			objet.appendChild(before);
			before.style.position = "absolute";
			before.style.top = "0px";
			before.style.bottom = "0px";
			before.style.right = "0px";
			before.style.left = "0px";
			before.style.overflow = "hidden";
			before.style.zIndex = "-5";

			var after = document.createElement('div');
			objet.appendChild(after);
			after.style.position = "absolute";
			after.style.top = "0px";
			after.style.bottom = "0px";
			after.style.right = "0px";
			after.style.left = "0px";
			after.style.zIndex = "-2";

			/* Mise en place des données */
			before.style.backgroundImage = "url('"+fond+"')";
			before.style.backgroundAttachment = "fixed";
			before.style.backgroundSize = "cover";
			before.style.backgroundRepeat = "no-repeat";
			before.style.filter = "blur("+flou+"px)";
			before.style.webkitFilter = "blur("+flou+"px)";
			before.style.transform = "scale("+agrandissement+")";
			before.style.webkitTransform = "scale("+agrandissement+")";

			after.style.backgroundColor = couleur;
			after.style.opacity = transparence;
		}else{
			console.warn('Element introuvable');
		}
	}
	return true;
}

window.addEventListener('load', luncher);
