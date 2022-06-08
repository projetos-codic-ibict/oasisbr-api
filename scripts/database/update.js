// remove dados de janeiro e fevereiro de 2022
db.getCollection('evolution_indicators').remove({ createdAt: { $gte: ISODate("2022-01-01T00:00:00.000Z") } });

// janeiro
db.evolution_indicators.insert({ 'sourceType': 'Biblioteca Digital de Teses e Dissertações', 'numberOfNetworks': 60, 'numberOfDocuments': 298181, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Revista Científica', 'numberOfNetworks': 1014, 'numberOfDocuments': 649156, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Biblioteca Digital de Monografias', 'numberOfNetworks': 2, 'numberOfDocuments': 35932, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Portal Agregador', 'numberOfNetworks': 1, 'numberOfDocuments': 403077, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Portal de Livros', 'numberOfNetworks': 2, 'numberOfDocuments': 1018, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Repositório de Dados de Pesquisa', 'numberOfNetworks': 6, 'numberOfDocuments': 323, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Repositório de Publicações', 'numberOfNetworks': 94, 'numberOfDocuments': 1130406, 'createdAt': new ISODate('2022-01-02'), '__v': 0 });

// fevereiro
db.evolution_indicators.insert({ 'sourceType': 'Biblioteca Digital de Teses e Dissertações', 'numberOfNetworks': 60, 'numberOfDocuments': 298181, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Revista Científica', 'numberOfNetworks': 1014, 'numberOfDocuments': 649156, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Biblioteca Digital de Monografias', 'numberOfNetworks': 2, 'numberOfDocuments': 35932, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Portal Agregador', 'numberOfNetworks': 1, 'numberOfDocuments': 403077, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Portal de Livros', 'numberOfNetworks': 2, 'numberOfDocuments': 1018, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Repositório de Dados de Pesquisa', 'numberOfNetworks': 6, 'numberOfDocuments': 323, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
db.evolution_indicators.insert({ 'sourceType': 'Repositório de Publicações', 'numberOfNetworks': 94, 'numberOfDocuments': 1130406, 'createdAt': new ISODate('2022-02-02'), '__v': 0 });
