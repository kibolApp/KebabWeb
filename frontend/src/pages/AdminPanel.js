import React, { useState } from 'react';
import Header from '../components/Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye} from '@fortawesome/free-solid-svg-icons';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@example.com', password: '******', role: 'Admin' },
    { id: 2, name: 'Anna Nowak', email: 'anna.nowak@example.com', password: '******', role: 'User' },
    { id: 3, name: 'Piotr Wiśniewski', email: 'piotr.wisniewski@example.com', password: '******', role: 'Editor' },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const openModal = (user) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const saveChanges = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      )
    );
    closeModal();
  };

  const openDeleteConfirm = (user) => {
    setSelectedUser(user);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setSelectedUser(null);
    setIsDeleteConfirmOpen(false);
  };

  const deleteUser = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
    closeDeleteConfirm();
  };

  const [kebabs, setKebabs] = useState([
    {
      id: 1,
      name: 'Kebab Express',
      address: 'Legnica, ul. Główna 10',
      gps: '51.207, 16.155',
    },
    {
      id: 2,
      name: 'Turkish Delight',
      address: 'Legnica, ul. Kwiatowa 5',
      gps: '51.205, 16.150',
    },
  ]);
  const [selectedKebab, setSelectedKebab] = useState(null);
  const [isKebabModalOpen, setIsKebabModalOpen] = useState(false);
  const [isKebabDeleteConfirmOpen, setIsKebabDeleteConfirmOpen] = useState(false);
  
  const openKebabModal = (kebab) => {
    setSelectedKebab({ ...kebab });
    setIsKebabModalOpen(true);
  };
  
  const closeKebabModal = () => {
    setSelectedKebab(null);
    setIsKebabModalOpen(false);
  };
  
  const saveKebabChanges = () => {
    setKebabs((prevKebabs) =>
      prevKebabs.map((k) => (k.id === selectedKebab.id ? selectedKebab : k))
    );
    closeKebabModal();
  };
  
  const openKebabDeleteConfirm = (kebab) => {
    setSelectedKebab(kebab);
    setIsKebabDeleteConfirmOpen(true);
  };
  
  const closeKebabDeleteConfirm = () => {
    setSelectedKebab(null);
    setIsKebabDeleteConfirmOpen(false);
  };
  
  const deleteKebab = () => {
    setKebabs((prevKebabs) => prevKebabs.filter((k) => k.id !== selectedKebab.id));
    closeKebabDeleteConfirm();
  };
  
  const [suggestions, setSuggestions] = useState([
    { id: 1, user: 'Jan Kowalski', text: 'Dodajcie więcej sosów.' },
    { id: 2, user: 'Anna Nowak', text: 'Wprowadźcie opcję zamówień online.' },
    { id: 3, user: 'Piotr Wiśniewski', text: 'Można by dodać promocje na weekend.' },
  ]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);
  const [isSuggestionDeleteConfirmOpen, setIsSuggestionDeleteConfirmOpen] = useState(false);
  
  const openSuggestionModal = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsSuggestionModalOpen(true);
  };
  
  const closeSuggestionModal = () => {
    setSelectedSuggestion(null);
    setIsSuggestionModalOpen(false);
  };
  
  const openSuggestionDeleteConfirm = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsSuggestionDeleteConfirmOpen(true);
  };
  
  const closeSuggestionDeleteConfirm = () => {
    setSelectedSuggestion(null);
    setIsSuggestionDeleteConfirmOpen(false);
  };
  
  const deleteSuggestion = () => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.filter((s) => s.id !== selectedSuggestion.id)
    );
    closeSuggestionDeleteConfirm();
  };
  

  return (
    <div className="min-h-screen bg-lightGrayish relative">
      <Header />
      <div className="flex">
        {/* Panel boczny */}
        <aside className="w-1/5 min-h-[calc(100vh-6rem)] bg-darkGreen text-white p-4 flex flex-col items-center">
          <h2 className="text-lg font-bold mb-4 text-center">Panel Administratora</h2>
          <ul className="space-y-4 w-full">
            <li>
              <button onClick={() => setActiveTab('users')} className={`w-full text-left py-2 px-4 rounded ${activeTab === 'users' ? 'bg-oliveGreen' : 'hover:bg-oliveGreen'}`}>
                Użytkownicy
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('kebabs')} className={`w-full text-left py-2 px-4 rounded ${activeTab === 'kebabs' ? 'bg-oliveGreen' : 'hover:bg-oliveGreen'}`}>
                Kebaby
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('suggestions')} className={`w-full text-left py-2 px-4 rounded ${activeTab === 'suggestions' ? 'bg-oliveGreen' : 'hover:bg-oliveGreen'}`}>
                Sugestie
              </button>
            </li>
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
        {!activeTab && (
            <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
              <h1 className="text-2xl font-bold text-darkGreen text-center">
                Witaj w Panelu Administratora
              </h1>
            </div>
        )}
        {/* Tabela users */}
        {activeTab === 'users' && (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-darkGreen mb-6">Użytkownicy</h1>
            <table className="w-full table-auto bg-white rounded-lg shadow-md">
              <thead className="bg-darkGreen text-white">
                <tr>
                  <th className="px-4 py-2 text-center">Imię i nazwisko</th>
                  <th className="px-4 py-2 text-center">Email</th>
                  <th className="px-4 py-2 text-center">Hasło</th>
                  <th className="px-4 py-2 text-center">Rola</th>
                  <th className="px-4 py-2 text-center">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t text-center">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.password}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 flex justify-center space-x-4">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => openModal(user)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openDeleteConfirm(user)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Tabela kebabs */}
        {activeTab === 'kebabs' && (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-darkGreen mb-6">Kebaby</h1>
            <table className="w-full table-auto bg-white rounded-lg shadow-md">
              <thead className="bg-darkGreen text-white">
                <tr>
                  <th className="px-4 py-2 text-center">Nazwa</th>
                  <th className="px-4 py-2 text-center">Adres</th>
                  <th className="px-4 py-2 text-center">GPS</th>
                  <th className="px-4 py-2 text-center">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {kebabs.map((kebab) => (
                  <tr key={kebab.id} className="border-t text-center">
                    <td className="px-4 py-2">{kebab.name}</td>
                    <td className="px-4 py-2">{kebab.address}</td>
                    <td className="px-4 py-2">{kebab.gps}</td>
                    <td className="px-4 py-2 flex justify-center space-x-4">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => openKebabModal(kebab)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openKebabDeleteConfirm(kebab)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Tabela suggestions */}
        {activeTab === 'suggestions' && (
          <div className="w-full">
            <h1 className="text-2xl font-bold text-darkGreen mb-6">Sugestie</h1>
            <table className="w-full table-auto bg-white rounded-lg shadow-md">
              <thead className="bg-darkGreen text-white">
                <tr>
                  <th className="px-4 py-2 text-center">Użytkownik</th>
                  <th className="px-4 py-2 text-center">Tekst</th>
                  <th className="px-4 py-2 text-center">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((suggestion) => (
                  <tr key={suggestion.id} className="border-t text-center">
                    <td className="px-4 py-2">{suggestion.user}</td>
                    <td className="px-4 py-2">{suggestion.text}</td>
                    <td className="px-4 py-2 flex justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openSuggestionModal(suggestion)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openSuggestionDeleteConfirm(suggestion)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Panel edycji użytkownika */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Edytuj Użytkownika</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Imię i nazwisko</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Hasło</label>
                <input
                  type="password"
                  value={selectedUser.password}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel usunięcia użytkownika*/}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Czy na pewno chcesz usunąć?</h2>
              <p className="mb-6">
                Użytkownik: <span className="font-bold">{selectedUser?.name}</span>
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  onClick={deleteUser}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel edycji kebaba */}
        {isKebabModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Edytuj Kebab</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nazwa</label>
                <input
                  type="text"
                  value={selectedKebab.name}
                  onChange={(e) =>
                    setSelectedKebab({ ...selectedKebab, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Adres</label>
                <input
                  type="text"
                  value={selectedKebab.address}
                  onChange={(e) =>
                    setSelectedKebab({ ...selectedKebab, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">GPS</label>
                <input
                  type="text"
                  value={selectedKebab.gps}
                  onChange={(e) =>
                    setSelectedKebab({ ...selectedKebab, gps: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeKebabModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  onClick={saveKebabChanges}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel usunięcia kebaba*/}
        {isKebabDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Czy na pewno chcesz usunąć?</h2>
              <p className="mb-6">
                Kebab: <span className="font-bold">{selectedKebab?.name}</span>
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeKebabDeleteConfirm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  onClick={deleteKebab}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel widoku sugestii */}
        {isSuggestionModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Szczegóły Sugestii</h2>
              <p className="mb-4">
                <span className="font-bold">Użytkownik:</span> {selectedSuggestion?.user}
              </p>
              <p className="mb-6">
                <span className="font-bold">Tekst:</span> {selectedSuggestion?.text}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeSuggestionModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel usunięcia sugestii*/}
        {isSuggestionDeleteConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">Czy na pewno chcesz usunąć?</h2>
              <p className="mb-6">
                Sugestia: <span className="font-bold">{selectedSuggestion?.text}</span>
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeSuggestionDeleteConfirm}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Anuluj
                </button>
                <button
                  onClick={deleteSuggestion}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Usuń
                </button>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
}
