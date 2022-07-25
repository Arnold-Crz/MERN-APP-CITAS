export const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat('es-Es', { dateStyle: 'long' }).format(
    newDate
  );
};
