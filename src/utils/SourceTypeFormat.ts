export const getUsefulNameSourceType = (sourceType: string) => {
  if (!sourceType) {
    return null;
  } else if (
    sourceType === 'Repositório de Dados' ||
    sourceType === 'Repositório de Dados de Pesquisa'
  ) {
    return 'Repositório de Dados de Pesquisa';
  } else if (
    sourceType === 'Repositório Comum' ||
    sourceType === 'Repositório Institucional' ||
    sourceType === 'Repositório Temático' ||
    sourceType === 'Repositório de Publicações'
  ) {
    return 'Repositório de Publicações';
  } else if (sourceType === 'Revista') {
    return 'Revista Científica';
  } else {
    return sourceType;
  }
};
