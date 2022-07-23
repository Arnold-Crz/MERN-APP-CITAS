import { useState } from 'react';
import { Form, ListPacientes } from '../../components/ui';

export function AdminPatients() {
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="flex flex-col md:flex-row">
      <button
        className="bg-indigo-600 font-bold text-white uppercase py-5 rounded-md w-60 mx-auto mb-10  md:hidden "
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>
      <article
        className={`${
          showForm ? 'block' : 'hidden'
        } md:block  md:w-1/2 lg:w-2/5 `}
      >
        <Form />
      </article>
      <article className="md:w-1/2 lg:w-3/5 ">
        <ListPacientes />
      </article>
    </section>
  );
}
