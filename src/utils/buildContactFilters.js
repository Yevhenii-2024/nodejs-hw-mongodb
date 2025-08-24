export const buildContactFilters = (query) => {
  return {
    type: query.type,
    isFavorite: query.isFavorite,
  };
};
