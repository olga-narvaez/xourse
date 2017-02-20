/*var foto = descargar('http://foo-chan.com/images/sp.jpg')
subirTweetConFoto(foto, '@maxogden') */

function medirVelocidadCiclo() {
  var contador = 0
  function sumaUno() { contador = contador + 1 }

  // Date.now() Retorna un número grande que representa la cantidad de
  // milisegundos que pasaron desde el 1 de Enero de 1970
  var ahora = Date.now()

  // Cicla hasta que Date.now() es 1000 milisegundos (1 segundo) o más
  // en el futuro respecto del comienzo del ciclado. En cada ciclo, llama a sumaUno
  while (Date.now() - ahora < 1000) sumaUno()

  // Finalmente pasaron >= 1000ms, entonces vamos a imprimir el total
  console.log(contador)
}

medirVelocidadCiclo()