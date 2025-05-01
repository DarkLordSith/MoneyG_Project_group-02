const BASE_COLORS = [
  '#FED057', '#FFD8D0', '#FD9498', '#C5BAFF', '#6E78E8',
  '#4A56E2', '#81E1FF', '#24CCA7', '#00AD84', '#D35400'
];

const getColorByCategory = (name) => {
  if (!name) return '#ccc';
  // Простой хеш по строке
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % BASE_COLORS.length;
  return BASE_COLORS[index];
};

export { getColorByCategory, BASE_COLORS };