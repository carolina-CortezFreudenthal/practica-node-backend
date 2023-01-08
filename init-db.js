const readline = require('readline');

const Anuncios = require('./models/anuncio');
const anuncionsJSON = require('./anuncios.json');

async function main() {
  // preguntar al usuario si está seguro
  const continuar = await preguntaSiNo(
      'Estas seguro que quieres borrar la base de datos? [si/no]',
  );

  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connect-mongoose');
  // inicializar la colección de Anuncios
  await initAnuncios();
  // desconectamos de la base de datos
  connection.close();
}

main().catch((err) => console.log('Error!', err));

async function initAnuncios() {
  // borrar todos los documentos
  const result = await Anuncios.deleteMany();
  console.log(`${result.deletedCount} Anuncios Eliminados.`);

  // Crear Anuncios iniciales
  const inserted = await Anuncios.insertMany(anuncionsJSON.anuncios);
  console.log(`${inserted.length} Anuncios Creados.`);
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    interface.question(texto, (respuesta) => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
