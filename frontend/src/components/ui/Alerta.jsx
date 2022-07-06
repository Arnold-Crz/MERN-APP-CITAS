export const Alerta = ({ alerta }) => {
  return (
    <h5
      className={`${
        alerta.error ? 'from-red-500 to-red-600' : 'from-green-500 to-green-700'
      } bg-gradient-to-r text-xl  text-center p-3 rounded-lg text-white `}
    >
      {alerta.msg}
    </h5>
  );
};
