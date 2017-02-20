//# Usando funciones
/*var dogSentence = "dogs are the bane of my existence";

dogSentence.replace('dogs', 'those blasted dogs');

console.log(dogSentence); */

//# Creando nuevas funciones

var string = "Hello, yes this is a cat"

string + "!!!!";

console.log(string);

	function makeMoreExciting(string)
	{
		return string + '!!!!';
	}

	console.log(makeMoreExciting('lounging'));

	var sentence = "time for a nap";
	console.log(makeMoreExciting(sentence));

var excitedSentence = makeMoreExciting(sentence);

console.log(excitedSentence);

function yellIt(string)
{
	string.toUpperCase();
	string = makeMoreExciting(string);
	console.log(string);
}

var sentence = "i fear no humans";

yellIt(sentence);

var loudSentence = yellIt(sentence);

