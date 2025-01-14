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

  const openModal = (user) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
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
    const [localLogo, setLocalLogo] = useState(null);
    
    const [initialKebab, setInitialKebab] = useState(null);
    const [localSauces, setLocalSauces] = useState([]);
    const [localMeats, setLocalMeats] = useState([]);
    const [localStatus,setLocalStatus] = useState('');
    const [localOpeningHours, setLocalOpeningHours] = useState([]);
    const [localOrderingOptions, setLocalOrderingOptions] = useState([]);
    const [localPages, setLocalPages] = useState([]);

  const kebabId = selectedKebab?.id;

  const openKebabModal = (kebab) => {
        setSelectedKebab({
          ...kebab,
          opening_hours: kebab.opening_hours || {},
          ordering_options: Array.isArray(kebab.ordering_options)
            ? kebab.ordering_options
            : [],
          sauces: Array.isArray(kebab.sauces) ? kebab.sauces : [],
          page: Array.isArray(kebab.page) ? kebab.page : [],
        });
      
        setInitialKebab({
          ...kebab,
          opening_hours: kebab.opening_hours || {},
          ordering_options: Array.isArray(kebab.ordering_options)
            ? kebab.ordering_options
            : [],
          sauces: Array.isArray(kebab.sauces) ? kebab.sauces : [],
          page: Array.isArray(kebab.page) ? kebab.page : [],
        });
      
        setLocalSauces(Array.isArray(kebab.sauces) ? kebab.sauces : []);
        setLocalMeats([...kebab.meats]);
        setLocalStatus(kebab.status || "exists");
        setLocalOpeningHours(kebab.opening_hours || {});
        setLocalLogo(null);
        setLocalOrderingOptions(Array.isArray(kebab.ordering_options) ? kebab.ordering_options : []);
        setLocalPages(Array.isArray(kebab.page) ? kebab.page : []);
        setIsKebabModalOpen(true);
  };

  const handleLogoChange = (file) => {
    if (!file) {
        console.error("No file selected.");
        return;
    }

    if (!file.type.startsWith("image/")) {
        console.error("Invalid file format. Please upload an image.");
        return;
    }

    console.log("Selected file:", file);
    setLocalLogo(file);
  };
  
  const saveKebabChanges = () => {
    if (localLogo) {
      const reader = new FileReader();
      reader.onload = () => {
      const binaryLogo = reader.result;

      console.log("Binary Logo to send:", binaryLogo);

      axiosClient
        .put(`/kebabs/${kebabId}/logo`, binaryLogo)
        .then((response) => {
            console.log("Logo updated successfully:", response.data);
            setSelectedKebab((prev) => ({
                ...prev,
                logo: response.data.kebab.logo,
            }));
            setLocalLogo(null);
        })
        .catch((error) => {
            console.error("Error updating logo:", error.response?.data || error.message);
        });
      };
      reader.readAsArrayBuffer(localLogo);
    }
  
    if (selectedKebab.name !== initialKebab.name) {
      axiosClient
        .put(`/kebabs/${kebabId}/name`, { name: selectedKebab.name })
        .then(() => console.log('Nazwa zapisana pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu nazwy:', error));
    }
  
    if (selectedKebab.address !== initialKebab.address) {
      axiosClient
        .put(`/kebabs/${kebabId}/address`, { address: selectedKebab.address })
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
      const saucesToAdd = localSauces.filter((sauce) => !initialKebab.sauces.includes(sauce));
      const saucesToRemove = initialKebab.sauces.filter((sauce) => !localSauces.includes(sauce));
    
      saucesToAdd.forEach((sauce) => {
        console.log(`POST Payload for Sauce:`, { sauce });
        axiosClient
          .post(`/kebabs/${kebabId}/sauce`, { sauce })
          .then(() => console.log(`Sos ${sauce} dodany pomyślnie.`))
          .catch((error) => console.error(`Błąd przy dodawaniu sosu ${sauce}:`, error));
      });
    
      saucesToRemove.forEach((sauce) => {
        console.log(`DELETE Payload for Sauce:`, { sauce });
        axiosClient
          .delete(`/kebabs/${kebabId}/sauce`, { data: { sauce } })
          .then(() => console.log(`Sos ${sauce} usunięty pomyślnie.`))
          .catch((error) => console.error(`Błąd przy usuwaniu sosu ${sauce}:`, error));
      });
    }
  
    if (JSON.stringify(localMeats) !== JSON.stringify(initialKebab.meats)) {
      const meatsToAdd = localMeats.filter((meat) => !initialKebab.meats.includes(meat));
      const meatsToRemove = initialKebab.meats.filter((meat) => !localMeats.includes(meat));
    
      meatsToAdd.forEach((meat) => {
        console.log(`POST Payload for Meat:`, { meat });
        axiosClient
          .post(`/kebabs/${kebabId}/meat`, { meat })
          .then(() => console.log(`Mięso ${meat} dodane pomyślnie.`))
          .catch((error) => console.error(`Błąd przy dodawaniu mięsa ${meat}:`, error));
      });
    
      meatsToRemove.forEach((meat) => {
        console.log(`DELETE Payload for Meat:`, { meat });
        axiosClient
          .delete(`/kebabs/${kebabId}/meat`, { data: { meat } })
          .then(() => console.log(`Mięso ${meat} usunięte pomyślnie.`))
          .catch((error) => console.error(`Błąd przy usuwaniu mięsa ${meat}:`, error));
      });
    }
  
    if (localStatus !== initialKebab.status) {
      axiosClient
        .put(`/kebabs/${kebabId}/status`, { status: localStatus })
        .then(() => console.log('Status zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu statusu:', error));
    }

    if (JSON.stringify(localOpeningHours) !== JSON.stringify(initialKebab.opening_hours)) {
      const daysToUpdate = Object.entries(localOpeningHours).filter(
        ([day, hours]) =>
          !initialKebab.opening_hours[day] || initialKebab.opening_hours[day] !== hours
      );
      const daysToRemove = Object.keys(initialKebab.opening_hours).filter(
        (day) => !localOpeningHours[day]
      );
    
      daysToUpdate.forEach(([day, hours]) => {
        axiosClient
          .post(`/kebabs/${kebabId}/opening-hours`, { day, hours })
          .then(() => console.log(`Godziny otwarcia dla ${day} zapisane.`))
          .catch((error) => console.error('Błąd zapisywania godzin:', error));
      });
    
      daysToRemove.forEach((day) => {
        axiosClient
          .delete(`/kebabs/${kebabId}/opening-hours`, { data: { day } })
          .then(() => console.log(`Godziny otwarcia dla ${day} usunięte.`))
          .catch((error) => console.error('Błąd usuwania godzin:', error));
      });
    }
    
    if (selectedKebab.opening_year !== initialKebab.opening_year) {
      axiosClient.put(`/kebabs/${kebabId}/opening-year`, { opening_year: selectedKebab.opening_year })
        .then(() => console.log('Rok otwarcia zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu roku otwarcia:', error));
    }

    if (selectedKebab.closing_year !== initialKebab.closing_year) {
      axiosClient.put(`/kebabs/${kebabId}/closing-year`, { closing_year: selectedKebab.closing_year })
        .then(() => console.log('Rok zamknięcia zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu roku zamknięcia:', error));
    }

    if (selectedKebab.is_crafted !== initialKebab.is_crafted) {
      axiosClient.put(`/kebabs/${kebabId}/is-crafted`, { is_crafted: selectedKebab.is_crafted })
        .then(() => console.log('Rzemieślniczy zapisany pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu rzemieślniczego:', error));
    }

    if (selectedKebab.is_premises !== initialKebab.is_premises) {
      axiosClient.put(`/kebabs/${kebabId}/is-premises`, { is_premises: selectedKebab.is_premises })
        .then(() => console.log('Na miejscu zapisane pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu na miejscu:', error));
    }

    if (selectedKebab.is_chainstore !== initialKebab.is_chainstore) {
      axiosClient.put(`/kebabs/${kebabId}/is-chainstore`, { is_chainstore: selectedKebab.is_chainstore })
        .then(() => console.log('Sieciówka zapisana pomyślnie.'))
        .catch((error) => console.error('Błąd przy zapisywaniu sieciówki:', error));
    }

    if (JSON.stringify(localOrderingOptions) !== JSON.stringify(initialKebab.ordering_options)) {
      const optionsToAdd = localOrderingOptions.filter(
        (option) => !initialKebab.ordering_options?.includes(option)
      );
      const optionsToRemove = initialKebab.ordering_options?.filter(
        (option) => !localOrderingOptions.includes(option)
      );
    
      optionsToAdd.forEach((new_option) => {
        console.log(`POST Payload for Ordering Option:`, { new_option });
        axiosClient
          .post(`/kebabs/${kebabId}/ordering-options`, { new_option })
          .then(() => console.log(`Opcja zamówienia "${new_option}" dodana pomyślnie.`))
          .catch((error) =>
            console.error(`Błąd przy dodawaniu opcji zamówienia "${new_option}":`, error)
          );
      });
    
      optionsToRemove.forEach((option_to_remove) => {
        console.log(`DELETE Payload for Ordering Option:`, { option_to_remove });
        axiosClient
          .delete(`/kebabs/${kebabId}/ordering-options`, { data: { option_to_remove } })
          .then(() => console.log(`Opcja zamówienia "${option_to_remove}" usunięta pomyślnie.`))
          .catch((error) =>
            console.error(`Błąd przy usuwaniu opcji zamówienia "${option_to_remove}":`, error)
          );
      });
    }

    if (JSON.stringify(localPages) !== JSON.stringify(initialKebab.page)) {
      const pagesToAdd = localPages.filter((page) => !initialKebab.page?.includes(page));
      const pagesToRemove = initialKebab.pages?.filter((page) => !localPages.includes(page));
  
      pagesToAdd.forEach((new_page) => {
          axiosClient
              .post(`/kebabs/${kebabId}/pages`, { new_page })
              .then(() => console.log(`Dodano stronę: ${new_page}`))
              .catch((error) => console.error(`Błąd przy dodawaniu strony:`, error));
      });
  
      pagesToRemove.forEach((page_to_remove) => {
          axiosClient
              .delete(`/kebabs/${kebabId}/pages`, { data: { page_to_remove } })
              .then(() => console.log(`Usunięto stronę: ${page_to_remove}`))
              .catch((error) => console.error(`Błąd przy usuwaniu strony:`, error));
      });
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
                <th className="px-4 py-2 text-center">Rola</th>
                <th className="px-4 py-2 text-center">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t text-center">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
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
        {activeTab === "kebabs" && (
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
                      {kebab.logo ? (
                        <img
                          src={kebab.logo}
                          alt={kebab.name}
                          className="h-12 w-12 object-cover rounded-full mx-auto"
                        />
                      ) : (
                        <span className="text-gray-500 italic">Brak logo</span>
                      )}
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
                {localLogo ? (
                  <img
                    src={URL.createObjectURL(localLogo)}
                    alt="Podgląd logo"
                    className="h-24 w-24 object-cover rounded-full mb-4"
                  />
                ) : selectedKebab.logo ? (
                  <img
                    src={selectedKebab.logo}
                    alt="Aktualne logo"
                    className="h-24 w-24 object-cover rounded-full mb-4"
                  />
                ) : (
                  <span className="text-gray-500 italic">Brak logo</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange(e.target.files[0])}
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

              {/* Zmiana koordynatów */}
                <div className="mb-4">
                  <label className="font-bold block">Koordynaty:</label>
                  
                  {/* Szerokość Geo */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Szerokość (Latitude):</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={selectedKebab.coordinates.lat}
                      onChange={(e) =>
                        setSelectedKebab({
                          ...selectedKebab,
                          coordinates: {
                            ...selectedKebab.coordinates,
                            latitude: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="block w-full px-4 py-2 border rounded focus:outline-none"
                    />
                  </div>
                  
                  {/* Długość Geo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Długość (Longitude):</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={selectedKebab.coordinates.lng}
                      onChange={(e) =>
                        setSelectedKebab({
                          ...selectedKebab,
                          coordinates: {
                            ...selectedKebab.coordinates,
                            longitude: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="block w-full px-4 py-2 border rounded focus:outline-none"
                    />
                  </div>
                </div>

              {/* Zmiana sosów */}
              <div className="mb-4">
                <label className="font-bold block">Sosy:</label>
                {localSauces.map((sauce, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={sauce}
                      onChange={(e) => {
                        const updatedSauces = [...localSauces];
                        updatedSauces[index] = e.target.value.trim();
                        setLocalSauces(updatedSauces);
                      }}
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Wprowadź nazwę sosu"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSauces = localSauces.filter((_, i) => i !== index);
                        setLocalSauces(updatedSauces);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setLocalSauces([...localSauces, ""])}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Dodaj sos
                </button>
              </div>

              {/* Zmiana mięs */}
              <div className="mb-4">
                <label className="font-bold block">Mięsa:</label>
                {localMeats.map((meat, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={meat}
                      onChange={(e) => {
                        const updatedMeats = [...localMeats];
                        updatedMeats[index] = String(e.target.value);
                        setLocalMeats(updatedMeats);
                      }}
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Wprowadź rodzaj mięsa"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedMeats = localMeats.filter((_, i) => i !== index);
                        setLocalMeats(updatedMeats);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setLocalMeats([...localMeats, ""])}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Dodaj mięso
                </button>
              </div>

              {/* Zmiana statusu */}
              <div className="mb-4">
                <label className="font-bold block">Status kebaba:</label>
                <select
                  value={localStatus}
                  onChange={(e) => setLocalStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="exists">Istnieje</option>
                  <option value="closed">Zamknięty</option>
                  <option value="planned">Planowany</option>
                </select>
              </div>

              {/* Godziny otwarcia */}
              <div className="mb-4">
                <label className="font-bold block">Godziny otwarcia:</label>
                {Object.entries(selectedKebab?.opening_hours || {}).map(([day, hours], index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <select
                      value={day}
                      disabled
                      className="px-2 py-1 border rounded bg-gray-200"
                    >
                      <option>{day}</option>
                    </select>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => {
                        const updatedHours = { ...selectedKebab.opening_hours, [day]: e.target.value };
                        setSelectedKebab((prev) => ({ ...prev, opening_hours: updatedHours }));
                      }}
                      className="flex-1 px-2 py-1 border rounded"
                      placeholder="Wprowadź godziny, np. 10:00 - 22:00"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedHours = { ...selectedKebab.opening_hours };
                        delete updatedHours[day];
                        setSelectedKebab((prev) => ({ ...prev, opening_hours: updatedHours }));
                      }}
                      className="text-red-500"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    const availableDay = days.find((day) => !Object.keys(selectedKebab.opening_hours || {}).includes(day));
                    if (availableDay) {
                      setSelectedKebab((prev) => ({
                        ...prev,
                        opening_hours: { ...prev.opening_hours, [availableDay]: '' },
                      }));
                    } else {
                      alert('Wszystkie dni są już dodane.');
                    }
                  }}
                  className="text-green-500"
                >
                  Dodaj dzień
                </button>
              </div>

              {/* Rok otwarcia */}
              <div className="mb-4">
                <label className="font-bold block">Godziny otwarcia:</label>
                {Object.entries(localOpeningHours).map(([day, hours], index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <span className="w-1/4">{day}</span>
                    <input
                      type="text"
                      value={hours}
                      onChange={(e) => {
                        const updatedHours = { ...localOpeningHours, [day]: e.target.value };
                        setLocalOpeningHours(updatedHours);
                      }}
                      className="w-3/4 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => {
                        const updatedHours = { ...localOpeningHours };
                        delete updatedHours[day];
                        setLocalOpeningHours(updatedHours);
                      }}
                      className="text-red-500"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    const availableDay = days.find((day) => !localOpeningHours[day]);
                    if (availableDay) {
                      setLocalOpeningHours({ ...localOpeningHours, [availableDay]: '' });
                    } else {
                      alert('Wszystkie dni są już dodane.');
                    }
                  }}
                  className="text-green-500"
                >
                  Dodaj dzień
                </button>
              </div>

              {/* Rok zamknięcia */}
              <div className="mb-4">
                  <label className="font-bold block">Rok zamknięcia:</label>
                  <input
                    type="number"
                    value={selectedKebab?.closing_year || ''}
                    onChange={(e) =>
                      setSelectedKebab((prev) => ({
                        ...prev,
                        closing_year: e.target.value ? parseInt(e.target.value, 10) : null,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Wprowadź rok zamknięcia"
                  />
              </div>

              {/* Czy krafotwy*/}
              <div className="mb-4">
                <label className="font-bold block">Rzemieślniczy:</label>
                <input
                  type="checkbox"
                  checked={selectedKebab?.is_crafted || false}
                  onChange={(e) =>
                    setSelectedKebab((prev) => ({ ...prev, is_crafted: e.target.checked }))
                  }
                  className="w-4 h-4"
                />
              </div>

              {/* Czy buda */}
              <div className="mb-4">
                <label className="font-bold block">Na miejscu:</label>
                <input
                  type="checkbox"
                  checked={selectedKebab?.is_premises || false}
                  onChange={(e) =>
                    setSelectedKebab((prev) => ({ ...prev, is_premises: e.target.checked }))
                  }
                  className="w-4 h-4"
                />
              </div>

              {/* Czy sieciówka */}
              <div className="mb-4">
                <label className="font-bold block">Sieciówka:</label>
                <input
                  type="checkbox"
                  checked={selectedKebab?.is_chainstore || false}
                  onChange={(e) =>
                    setSelectedKebab((prev) => ({ ...prev, is_chainstore: e.target.checked }))
                  }
                  className="w-4 h-4"
                />
              </div>

              {/* Opcje zamówień */}
              <div className="mb-4">
                <label className="font-bold block">Opcje zamówień:</label>
                {Array.isArray(localOrderingOptions) &&
                  localOrderingOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...localOrderingOptions];
                          updatedOptions[index] = String(e.target.value);
                          setLocalOrderingOptions(updatedOptions);
                        }}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Wprowadź nową opcję zamówienia"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedOptions = localOrderingOptions.filter((_, i) => i !== index);
                          setLocalOrderingOptions(updatedOptions);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Usuń
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => setLocalOrderingOptions([...localOrderingOptions, ""])}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Dodaj opcję
                </button>
              </div>

              {/* Strona internetowa */}
              <div className="mb-4">
                <label className="font-bold block">Strony internetowe:</label>
                {Array.isArray(localPages) &&
                  localPages.map((page, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={page}
                        onChange={(e) => {
                          const updatedPages = [...localPages];
                          updatedPages[index] = e.target.value.trim();
                          setLocalPages(updatedPages);
                        }}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Wprowadź URL strony"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedPages = localPages.filter((_, i) => i !== index);
                          setLocalPages(updatedPages);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Usuń
                      </button>
                    </div>
                  ))}
                  <button
                      type="button"
                      onClick={() => setLocalPages([...localPages, ""])}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                      Dodaj stronę
                  </button>
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
