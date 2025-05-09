import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Search = () => {
  const { currentUser, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    promotion: "",
    location: "",
    company: "",
    sector: ""
  });
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Données factices des alumni
  const [alumni, setAlumni] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      promotion: "2020",
      location: "Paris",
      company: "Tech Solutions",
      position: "Développeur Frontend",
      sector: "Technologie",
      image: null
    },
    {
      id: 2,
      name: "Marie Laurent",
      promotion: "2019",
      location: "Lyon",
      company: "Marketing Pro",
      position: "Chef de Projet",
      sector: "Marketing",
      image: null
    },
    {
      id: 3,
      name: "Paul Martin",
      promotion: "2021",
      location: "Bordeaux",
      company: "Finance Plus",
      position: "Analyste Financier",
      sector: "Finance",
      image: null
    },
    {
      id: 4,
      name: "Sophie Bernard",
      promotion: "2018",
      location: "Paris",
      company: "Design Studio",
      position: "UI/UX Designer",
      sector: "Design",
      image: null
    },
    {
      id: 5,
      name: "Thomas Petit",
      promotion: "2020",
      location: "Marseille",
      company: "Tech Solutions",
      position: "Développeur Backend",
      sector: "Technologie",
      image: null
    }
  ]);
  
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  
  // Rediriger si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading]);
  
  // Filtrer les alumni
  useEffect(() => {
    let result = [...alumni];
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(alum => 
        alum.name.toLowerCase().includes(search) ||
        alum.company.toLowerCase().includes(search) ||
        alum.position.toLowerCase().includes(search)
      );
    }
    
    // Appliquer les filtres
    if (filters.promotion) {
      result = result.filter(alum => alum.promotion === filters.promotion);
    }
    
    if (filters.location) {
      result = result.filter(alum => alum.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    
    if (filters.company) {
      result = result.filter(alum => alum.company.toLowerCase().includes(filters.company.toLowerCase()));
    }
    
    if (filters.sector) {
      result = result.filter(alum => alum.sector.toLowerCase().includes(filters.sector.toLowerCase()));
    }
    
    setFilteredAlumni(result);
  }, [searchTerm, filters, alumni]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      promotion: "",
      location: "",
      company: "",
      sector: ""
    });
    setSearchTerm("");
  };
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkslategray-100"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Rechercher des alumni
          </h1>
          <p className="text-smi md:text-mini text-dimgray">
            Retrouvez vos anciens camarades et développez votre réseau
          </p>
        </div>
        
        {/* Barre de recherche */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 mb-6">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, entreprise, poste..."
              className="w-full px-4 py-3 pr-10 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-3 text-dimgray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="medium"
              onClick={toggleFilters}
              className="whitespace-nowrap"
            >
              {filtersVisible ? "Masquer les filtres" : "Afficher les filtres"}
            </Button>
            {(searchTerm || Object.values(filters).some(f => f)) && (
              <Button
                variant="secondary"
                size="medium"
                onClick={resetFilters}
                className="whitespace-nowrap"
              >
                Réinitialiser
              </Button>
            )}
          </div>
        </div>
        
        {/* Filtres */}
        {filtersVisible && (
          <div className="bg-whitesmoke rounded-xl p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-darkslategray-100 mb-1">
                  Promotion
                </label>
                <select
                  name="promotion"
                  value={filters.promotion}
                  onChange={handleFilterChange}
                  className="w-full p-2 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                >
                  <option value="">Toutes</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-darkslategray-100 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Paris, Lyon..."
                  className="w-full p-2 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkslategray-100 mb-1">
                  Entreprise
                </label>
                <input
                  type="text"
                  name="company"
                  value={filters.company}
                  onChange={handleFilterChange}
                  placeholder="Nom de l'entreprise"
                  className="w-full p-2 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkslategray-100 mb-1">
                  Secteur
                </label>
                <input
                  type="text"
                  name="sector"
                  value={filters.sector}
                  onChange={handleFilterChange}
                  placeholder="Technologie, Finance..."
                  className="w-full p-2 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Résultats */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-darkslategray-100">
              {filteredAlumni.length} résultat(s)
            </h2>
            <div className="text-sm text-dimgray">
              Tri par : <span className="font-medium">Date de graduation</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumni.map((alum) => (
              <div
                key={alum.id}
                className="bg-whitesmoke rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gainsboro-100 rounded-full flex items-center justify-center text-xl text-darkslategray-100 font-bold mr-3">
                      {alum.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-darkslategray-100">{alum.name}</h3>
                      <p className="text-sm text-dimgray">{alum.position}</p>
                      <p className="text-xs text-steelblue">Promotion {alum.promotion}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {alum.company}
                    </div>
                    <div className="flex items-center text-sm mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {alum.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-darkslategray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      {alum.sector}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => navigate(`/profile/${alum.id}`)}
                    >
                      Voir le profil
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => navigate(`/chats/${alum.id}`)}
                    >
                      Contacter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAlumni.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-darkslategray-100 mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-dimgray mb-6">
                Essayez d'ajuster vos critères de recherche ou de réinitialiser les filtres.
              </p>
              <Button variant="outline" size="medium" onClick={resetFilters}>
                Réinitialiser la recherche
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;