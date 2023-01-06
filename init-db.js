const Anuncios = require('./models/anuncio');
const anuncionsJSON = require('./anuncios.json');

async function main() {
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
