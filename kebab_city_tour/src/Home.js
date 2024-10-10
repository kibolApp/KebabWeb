import './index.css';
import kebab_logo from './img/kebab_logo.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <header className="h-36"></header>
      <div className="flex items-center justify-center flex-grow">
        <div className="bg-gradient-to-b from-orange-300 to-white-100 p-32 rounded-lg shadow-2xl w-full max-w-7xl relative mx-12 mb-16">  {/* <---- Change colour here  */}
          <div className="flex justify-center mb-12">
            <img src={kebab_logo} alt="Legnica Kebab Logo" className="h-72 absolute top-[-8rem]" />
          </div>
          <h1 className="text-7xl font-semibold text-center text-gray-800 mb-10">
            LEGNICA KEBAB CITY TOUR
          </h1>
          <p className="text-gray-600 text-center mb-16 text-xl">
            Legnica Kebab City Tour jest to aplikacja oraz witryna internetowa służąca pomocą w odnalezieniu lokalizacji wszystkich dostępnych, w planach oraz zamkniętych punktów gastronomicznych serwujących słynne Kebaby. Poniższe przyciski pokierują Cię dalej. Wybierz przycisk "Mapa" aby bezpośrednio odnaleźć Kebaby rozsiane po Legnicy. Możesz też utworzyć konto lub zalogować się aby dodać Twojego ulubionego Kebaba do zakładki "Ulubione", dzięki czemu łatwiej go odnajdziesz!!
          </p>
          <div className="flex justify-center space-x-10">
          <button className="bg-blue-500 text-white py-6 w-40 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl">
              MAPA
            </button>
            <button className="bg-blue-500 text-white py-6 px-12 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xl">
              LOGOWANIE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}