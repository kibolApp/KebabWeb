import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient.js';
import Header from '../components/Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  
  {/* Users API */}
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (activeTab === 'users') {
      axiosClient
        .get('/getAllUsers')
        .then((response) => {
          if (response.data && Array.isArray(response.data)) {
            setUsers(response.data);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, [activeTab]);

  const saveChanges = () => {

  const openModal = (user) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

    const updatedUser = {
      newName: selectedUser.newName,
      newEmail: selectedUser.newEmail,
      newPassword: selectedUser.newPassword,
      confirmPassword: selectedUser.confirmPassword,
      isAdmin: Boolean(selectedUser.isAdmin),
    };
  
    if (updatedUser.newName) {
      axiosClient
        .put(`/changeName/${selectedUser.id}`, {
          newName: updatedUser.newName,
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? { ...user, name: updatedUser.newName } : user
            )
          );
        })
        .catch((error) => {
          console.error('Error updating name:', error);
        });
    }
  
    if (updatedUser.newEmail) {
      axiosClient
        .put(`/changeEmail/${selectedUser.id}`, {
          newEmail: updatedUser.newEmail,
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? { ...user, email: updatedUser.newEmail } : user
            )
          );
        })
        .catch((error) => {
          console.error('Error updating email:', error);
        });
    }
  
    if (updatedUser.newPassword && updatedUser.confirmPassword) {
      axiosClient
        .put(`/changePassword/${selectedUser.id}`, {
          newPassword: updatedUser.newPassword,
          confirmPassword: updatedUser.confirmPassword,
        })
        .then(() => {
          console.log('Password updated successfully');
        })
        .catch((error) => {
          console.error('Error updating password:', error);
        });
    }
  
    if (updatedUser.isAdmin !== undefined) {
      axiosClient
        .put(`/changeUserRole/${selectedUser.id}`, {
          isAdmin: updatedUser.isAdmin,
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? { ...user, isAdmin: updatedUser.isAdmin } : user
            )
          );
        })
        .catch((error) => {
          console.error('Error updating role:', error.response?.data || error.message);
        });
    }    
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
    axiosClient
      .delete(`/deleteUser/${selectedUser.id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
        closeDeleteConfirm();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };  

{/* Kebabs API */}
  const [kebabs, setKebabs] = useState([]);
    useEffect(() => {
      if (activeTab === 'kebabs') {
        axiosClient
          .get('/kebabs')
          .then((response) => {
            console.log('Kebaby z API:', response.data);
            setKebabs(response.data);
          })
          .catch((error) => {
            console.error('Błąd podczas pobierania kebabów:', error);
          });
      }
    }, [activeTab]);

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
  
  const handleDeleteKebab = (id) => {
    axiosClient
      .delete(`/kebabs/${id}`)
      .then(() => {
        setKebabs((prevKebabs) => prevKebabs.filter((kebab) => kebab.id !== id));
      })
      .catch((error) => {
        console.error('Błąd podczas usuwania kebaba:', error);
      });
  };
  
  {/* Suggestions API */}
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (activeTab === 'suggestions') {
      axiosClient
        .get('/suggestions')
        .then((response) => {
          if (response.data && Array.isArray(response.data.suggestions)) {
            setSuggestions(response.data.suggestions);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
        });
    }
  }, [activeTab]);

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
    axiosClient
      .delete(`/suggestions/${selectedSuggestion.id}`)
      .then(() => {
        setSuggestions((prevSuggestions) =>
          prevSuggestions.filter((s) => s.id !== selectedSuggestion.id)
        );
        closeSuggestionDeleteConfirm();
      })
      .catch((error) => {
        console.error('Error deleting suggestion:', error);
      });
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
                <th className="px-4 py-2 text-center">Użytkownik</th>
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
                  <td className="px-4 py-2">******</td>
                  <td className="px-4 py-2">{user.isAdmin ? 'Admin' : 'User'}</td>
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
                  <th className="px-4 py-2 text-center">Logo</th>
                  <th className="px-4 py-2 text-center">Nazwa</th>
                  <th className="px-4 py-2 text-center">Adres</th>
                  <th className="px-4 py-2 text-center">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {kebabs.map((kebab) => (
                  <tr key={kebab.id} className="border-t text-center">
                    <td className="px-4 py-2">
                      <img
                        src={kebab.logo}
                        alt={kebab.name}
                        className="h-12 w-12 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2">{kebab.name}</td>
                    <td className="px-4 py-2">{kebab.address}</td>
                    <td className="px-4 py-2 flex justify-center items-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEditKebab(kebab)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteKebab(kebab.id)}
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
                    <td className="px-4 py-2">{suggestion.contents}</td>
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
        {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
            <h2 className="text-lg font-bold mb-4">Edytuj użytkownika</h2>
            <div className="grid grid-cols-1 gap-4">

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nowa nazwa</label>
                <input
                  type="text"
                  value={selectedUser.newName || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, newName: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nowy email</label>
                <input
                  type="email"
                  value={selectedUser.newEmail || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, newEmail: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nowe hasło</label>
                <input
                  type="password"
                  value={selectedUser.newPassword || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, newPassword: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Potwierdź nowe hasło</label>
                <input
                  type="password"
                  value={selectedUser.confirmPassword || ''}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, confirmPassword: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Admin</label>
                <select
                  value={selectedUser.isAdmin ? 1 : 0}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, isAdmin: e.target.value === '1' })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="0">Nie</option>
                  <option value="1">Tak</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={closeModal}> 
                Anuluj
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveChanges}>
                Zapisz
              </button>
            </div>
          </div>
        </div>
        )}

        {/* Panel usunięcia użytkownika*/}
        {isDeleteConfirmOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Potwierdź usunięcie</h2>
            <p>Czy na pewno chcesz usunąć użytkownika {selectedUser.name}?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={closeDeleteConfirm}
              >
                Anuluj
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={deleteUser}
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
                <span className="font-bold">Tekst:</span> {selectedSuggestion?.contents}
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
