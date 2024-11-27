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
  
  const handleUpdateName = (kebabId, newName) => {
    axiosClient
      .put(`/kebabs/${kebabId}/name`, { name: newName })
      .then((response) => {
        console.log('Name updated:', response.data);
        setKebabs((prevKebabs) =>
          prevKebabs.map((kebab) =>
            kebab.id === kebabId ? { ...kebab, name: newName } : kebab
          )
        );
      })
      .catch((error) => console.error('Error updating name:', error));
  };
  
  const handleLogoUpload = (file) => {
    const formData = new FormData();
    formData.append('logo', file);
  
    axiosClient
      .put(`/kebabs/${selectedKebab.id}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Logo updated:', response.data);
        setSelectedKebab({ ...selectedKebab, logo: response.data.logo });
        setKebabs((prevKebabs) =>
          prevKebabs.map((kebab) =>
            kebab.id === selectedKebab.id ? { ...kebab, logo: response.data.logo } : kebab
          )
        );
      })
      .catch((error) => {
        console.error('Error updating logo:', error);
      });
  };

  const handleUpdateAddress = (kebabId, newAddress) => {
    axiosClient
      .put(`/kebabs/${kebabId}/address`, { address: newAddress })
      .then((response) => {
        console.log('Address updated:', response.data);
        setSelectedKebab({ ...selectedKebab, address: newAddress });
        setKebabs((prevKebabs) =>
          prevKebabs.map((kebab) =>
            kebab.id === kebabId ? { ...kebab, address: newAddress } : kebab
          )
        );
      })
      .catch((error) => {
        console.error('Error updating address:', error);
      });
  };

  const handleUpdateCoordinates = (kebabId, newCoordinates) => {
    axiosClient
      .put(`/kebabs/${kebabId}/coordinates`, { coordinates: newCoordinates })
      .then((response) => {
        console.log('Coordinates updated:', response.data);
        setSelectedKebab({ ...selectedKebab, coordinates: newCoordinates });
        setKebabs((prevKebabs) =>
          prevKebabs.map((kebab) =>
            kebab.id === kebabId
              ? { ...kebab, coordinates: newCoordinates }
              : kebab
          )
        );
      })
      .catch((error) => {
        console.error('Error updating coordinates:', error);
      });
  };

  const handleToggleSauce = (sauce) => {
    const isAdding = !selectedKebab.sauces.includes(sauce);
    axiosClient[isAdding ? 'post' : 'delete'](`/kebabs/${selectedKebab.id}/sauce`, { sauce })
      .then(() => {
        setSelectedKebab((prev) => ({
          ...prev,
          sauces: isAdding
            ? [...prev.sauces, sauce]
            : prev.sauces.filter((s) => s !== sauce),
        }));
      })
      .catch((error) => console.error(`Error toggling sauce:`, error));
  };
  
  const handleToggleMeat = (meat) => {
    const isAdding = !selectedKebab.meats.includes(meat);
    axiosClient[isAdding ? 'post' : 'delete'](`/kebabs/${selectedKebab.id}/meat`, { meat })
      .then(() => {
        setSelectedKebab((prev) => ({
          ...prev,
          meats: isAdding
            ? [...prev.meats, meat]
            : prev.meats.filter((m) => m !== meat),
        }));
      })
      .catch((error) => console.error(`Error toggling meat:`, error));
  };

  const handleStatusChange = (newStatus) => {
    axiosClient
      .put(`/kebabs/${selectedKebab.id}/status`, { status: newStatus })
      .then(() => {
        setSelectedKebab((prev) => ({ ...prev, status: newStatus }));
        setKebabs((prev) =>
          prev.map((kebab) =>
            kebab.id === selectedKebab.id ? { ...kebab, status: newStatus } : kebab
          )
        );
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  const [localSauces, setLocalSauces] = useState([]);
  const [localMeats, setLocalMeats] = useState([]);
  const [localStatus, setLocalStatus] = useState('');

  const openKebabModal = (kebab) => {
    setSelectedKebab(kebab);
    setLocalSauces([...kebab.sauces]);
    setLocalMeats([...kebab.meats]);
    setLocalStatus(kebab.status);
    setIsKebabModalOpen(true);
  };
  
  const closeKebabModal = () => {
    setSelectedKebab(null);
    setIsKebabModalOpen(false);
  };
  
  const saveKebabChanges = () => {
    const kebabId = selectedKebab.id;
  
    if (selectedKebab.logo !== initialKebab.logo) {
      axiosClient.put(`/kebabs/${kebabId}/logo`, { logo: selectedKebab.logo })
        .then(() => console.log('Logo zapisane pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu logo:', error));
    }
  
    if (selectedKebab.name !== initialKebab.name) {
      axiosClient.put(`/kebabs/${kebabId}/name`, { name: selectedKebab.name })
        .then(() => console.log('Nazwa zapisana pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu nazwy:', error));
    }
  
    if (selectedKebab.address !== initialKebab.address) {
      axiosClient.put(`/kebabs/${kebabId}/address`, { address: selectedKebab.address })
        .then(() => console.log('Adres zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu adresu:', error));
    }
  
    if (
      selectedKebab.coordinates.latitude !== initialKebab.coordinates.latitude ||
      selectedKebab.coordinates.longitude !== initialKebab.coordinates.longitude
    ) {
      axiosClient.put(`/kebabs/${kebabId}/coordinates`, { coordinates: selectedKebab.coordinates })
        .then(() => console.log('Koordynaty zapisane pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu koordynatów:', error));
    }
  
    if (JSON.stringify(localSauces) !== JSON.stringify(initialKebab.sauces)) {
      axiosClient.put(`/kebabs/${kebabId}/sauces`, { sauces: localSauces })
        .then(() => console.log('Sosy zapisane pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu sosów:', error));
    }
  
    if (JSON.stringify(localMeats) !== JSON.stringify(initialKebab.meats)) {
      axiosClient.put(`/kebabs/${kebabId}/meats`, { meats: localMeats })
        .then(() => console.log('Mięsa zapisane pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu mięs:', error));
    }
  
    if (selectedKebab.status !== initialKebab.status) {
      axiosClient.put(`/kebabs/${kebabId}/status`, { status: selectedKebab.status })
        .then(() => console.log('Status zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu statusu:', error));
    }

    setIsKebabModalOpen(false);
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
    axiosClient
      .delete(`/kebabs/${selectedKebab.id}`)
      .then(() => {
        setKebabs((prevKebabs) =>
          prevKebabs.filter((kebab) => kebab.id !== selectedKebab.id)
        );
        closeKebabDeleteConfirm();
      })
      .catch((error) => {
        console.error('Error deleting kebab:', error);
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
        {isKebabModalOpen && selectedKebab && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Edytuj Kebab</h2>

              {/* Zmiana logo */}
              <div className="mb-4">
                <label className="font-bold block">Logo:</label>
                <img
                  src={selectedKebab.logo}
                  alt="Logo kebaba"
                  className="h-24 w-24 object-cover rounded-full mb-4"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e.target.files[0])}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
              </div>

              {/* Zmiana nazwy */}
              <div className="mb-4">
                <label className="font-bold block">Nazwa:</label>
                <input
                  type="text"
                  value={selectedKebab.name}
                  onChange={(e) =>
                    setSelectedKebab({ ...selectedKebab, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              {/* Zmiana adresu */}
              <div className="mb-4">
                <label className="font-bold block">Adres:</label>
                <input
                  type="text"
                  value={selectedKebab.address}
                  onChange={(e) =>
                    setSelectedKebab({ ...selectedKebab, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              {/* Zmiana sosów */}
              <div className="mb-4">
                <label className="font-bold block">Sosy:</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedKebab?.sauces.map((sauce) => (
                    <label key={sauce} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={localSauces.includes(sauce)}
                        onChange={() => {
                          setLocalSauces((prev) =>
                            prev.includes(sauce)
                              ? prev.filter((s) => s !== sauce)
                              : [...prev, sauce]
                          );
                        }}
                        className="w-4 h-4"
                      />
                      <span>{sauce}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Zmiana mięsa */}
              <div className="mb-4">
                <label className="font-bold block">Mięsa:</label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedKebab?.meats.map((meat) => (
                    <label key={meat} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={localMeats.includes(meat)}
                        onChange={() => {
                          setLocalMeats((prev) =>
                            prev.includes(meat)
                              ? prev.filter((m) => m !== meat)
                              : [...prev, meat]
                          );
                        }}
                        className="w-4 h-4"
                      />
                      <span>{meat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Zmiana statusu */}
                <div className="mb-4">
                  <label className="font-bold block">Status kebaba:</label>
                  <select
                    value={selectedKebab?.status}
                    onChange={(e) => setSelectedKebab((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-2 border rounded"
                  >
                    <option value="exists">Istnieje</option>
                    <option value="closed">Zamknięty</option>
                    <option value="planned">Planowany</option>
                  </select>
                </div>

              {/* Przyciski akcji */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsKebabModalOpen(false)}
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

        {/* Panel usunięcia kebaba */}
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
