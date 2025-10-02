import { useState } from 'react';
import '../styles/cer.css';

export default function Cer() {
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const levels = ['X5', 'X4', 'X3', 'X2', 'X1'];
  const domains = ['Résaux & Infra', 'Génie-logiciel', 'Gestion de projet', 'Sécurité', 'Data'];

  const cers = [
    {
      id: 1,
      image: '/MS.jpg',
      imageClass: 'img-style-6c14cff',
      author: 'Sadjo Mamadou',
      title: 'Prosit 3.2 Annuaire Active Directory',
      description: "L'Annuaire Active Directory (AD) est un service de gestion des identités et des accès utilisé principalement dans les environnements Windows. Il permet de...."
    },
    {
      id: 2,
      image: '/UML.png',
      imageClass: 'img-style-205297c2',
      author: 'Pauline lock',
      title: 'Prosit 2.2 Modélisation UML',
      titleClass: 'p-style-be637875',
      description: "Le Langage de Modélisation Unifié, de l'anglais Unified Modeling Language, est un langage de modélisation graphique à base de pictogrammes conçu comme..."
    },
    {
      id: 3,
      image: '/API.jpg',
      imageClass: 'img-style-6c14cff',
      author: 'Daryl Noupik',
      title: 'Prosit 3.3 API et Webservice',
      titleClass: 'p-style-be637875',
      description: "Les API sont principalement axées sur la communication entre applications pour l'accès aux fonctionnalités. L'EDI se concentre sur l'échange de documents..."
    },
    {
      id: 4,
      image: '/Program.jpg',
      imageClass: 'img-style-c1842054',
      author: 'Providence Djekoun.',
      title: 'Prosit 4.1 Développement avancé',
      description: 'dvance Web Development fait référence au processus de création de sites Web dynamiques et interactifs qui vont au-delà des pages Web statique....',
      containerClass: 'div-style-a0ffc2d0',
      contentClass: 'div-style-c4281d48'
    },
    {
      id: 5,
      image: '/microservices.png',
      imageClass: 'img-style-6c14cff',
      author: 'Providence Djekoun.',
      authorClass: 'p-style-4296be21',
      title: 'Prosit 4.5 Architecture microservices',
      description: "Une architecture de microservices est un type d'architecture d'application dans laquelle l'application est développée sous la forme d'un ensemble de services...."
    },
    {
      id: 6,
      image: '/ai.jpg',
      imageClass: 'img-style-6c14cff',
      author: 'Sadjo Mamadou',
      title: 'Prosit 4.5 Architecture distrubée',
      description: "L'architecture distribuée ou l'informatique distribuée désigne un système d'information ou un réseau pour lequel l'ensemble des ressources disponibles ne se trouvent..."
    }
  ];

  const handleLevelToggle = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const handleDomainToggle = (domain) => {
    setSelectedDomains(prev =>
      prev.includes(domain) ? prev.filter(d => d !== domain) : [...prev, domain]
    );
  };

  // Filter CERs based on search query, levels, and domains
  const filteredCers = cers.filter((cer) => {
    const matchesSearch = searchQuery === '' || 
      cer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cer.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(cer.level);
    const matchesDomain = selectedDomains.length === 0 || selectedDomains.some(domain => cer.title.includes(domain));
    
    return matchesSearch && matchesLevel && matchesDomain;
  });

  return (
    <main style={{ background: '#f7f7f8' }}>
      <section className="div-style-910934d2">
        {/* Sidebar Filters */}
        <aside className="div-style-4a5dc7a">
          <p className="p-style-505c94a5">{filteredCers.length} CERs au total</p>
          <div className="div-style-3ec05b14">
            {/* Niveaux Filter */}
            <div className="div-style-68a8c191">
              <p className="p-style-27f2566f">Niveaux</p>
              <div className="div-style-1a1599ec">
                {levels.map((level) => (
                  <label key={level} className="div-style-cc7dba96">
                    <input
                      type="checkbox"
                      className="level-checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelToggle(level)}
                    />
                    <span className="p-style-21c40680">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Domaines Filter */}
            <div className="div-style-68a8c191" style={{ marginTop: '20px' }}>
              <p className="p-style-27f2566f">Domaines de spécialité</p>
              <div className="div-style-1a1599ec">
                {domains.map((domain) => (
                  <label key={domain} className="div-style-cc7dba96">
                    <input
                      type="checkbox"
                      className="level-checkbox"
                      checked={selectedDomains.includes(domain)}
                      onChange={() => handleDomainToggle(domain)}
                    />
                    <span className="p-style-21c40680">{domain}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="div-style-5206259">
          <div className="div-style-ffe77f7f">
            {/* Search Bar */}
            <div className="div-style-15b80536">
              <input
                type="text"
                placeholder="Rechercher un CER"
                className="p-style-44cc4d0c"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '16px',
                  padding: '0'
                }}
              />
              <div className="div-style-c0bd2c27">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="clip3_24_79">
                      <rect width="20" height="20" fill="white" transform="translate(0, 0)" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#clip3_24_79)">
                    <rect width="20" height="20" transform="translate(0, 0)" fill="white" />
                    <g>
                      <path d="M9.583,17.5c4.373,0 7.917,-3.544 7.917,-7.916c0,-4.373 -3.544,-7.917 -7.917,-7.917c-4.372,0 -7.916,3.544 -7.916,7.917c0,4.372 3.544,7.916 7.916,7.916z" stroke="#8E92BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M18.333,18.334l-1.666,-1.667" stroke="#8E92BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="div-style-e85b56d1">
              <div className="div-style-cc075497">
                <p className="p-style-815fb43e">Sort By:</p>
                <div className="div-style-a24b7e10">
                  <div className="div-style-3f571fe9">
                    <p className="p-style-c08be90e">Titre</p>
                    <div className="div-style-72672ed3">
                      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.6117,7.9413l-4.57,-4.547c-0.21,-0.234 -0.21,-0.586 0,-0.797l0.54,-0.539c0.21,-0.211 0.56,-0.211 0.8,0l3.63,3.61l3.61,-3.61c0.23,-0.211 0.59,-0.211 0.8,0l0.54,0.539c0.21,0.211 0.21,0.563 0,0.797l-4.58,4.547c-0.21,0.211 -0.56,0.211 -0.77,0z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-style-d9244a22">
                <div 
                  className="div-style-b901ddfd"
                  onClick={() => setViewMode('grid')}
                  style={{ opacity: viewMode === 'grid' ? 1 : 0.5 }}
                >
                  <i className="fa-solid fa-grip"></i>
                </div>
                <div 
                  className="div-style-1ee1e5f8"
                  onClick={() => setViewMode('list')}
                  style={{ opacity: viewMode === 'list' ? 1 : 0.5 }}
                >
                  <i className="fa-solid fa-list"></i>
                </div>
              </div>
            </div>
          </div>

          {/* CER Cards Grid */}
          <div className="div-style-3304bcc7">
            <div className="div-style-c0cfdaf4">
              {/* First Row - 2 cards */}
              <div className="div-style-2022d889">
                {filteredCers.slice(0, 2).map((cer) => (
                  <div key={cer.id} className="div-style-7a215e7b">
                    <div className="div-style-91742bf7">
                      <img src={cer.image} className={cer.imageClass} alt={cer.title} />
                      <div className="div-style-91742bf7">
                        <div className="div-style-94dc5836">
                          <img src="/Fav.png" className="img-style-fee4131e" alt="Favoris" />
                          <p className={cer.authorClass || 'p-style-4a77cf6b'}>par {cer.author}</p>
                        </div>
                        <div className="div-style-3b216671">
                          <p className={cer.titleClass || 'p-style-5037e162'}>{cer.title}</p>
                          <p className="p-style-ce721625">{cer.description}</p>
                        </div>
                      </div>
                    </div>
                    <button className="button-style-8988048b">Consulter le CER</button>
                  </div>
                ))}
              </div>

              {/* Second Row - 2 cards */}
              <div className="div-style-2022d889">
                {filteredCers.slice(2, 4).map((cer) => (
                  <div key={cer.id} className="div-style-7a215e7b">
                    <div className={cer.containerClass || 'div-style-91742bf7'}>
                      <img src={cer.image} className={cer.imageClass} alt={cer.title} />
                      <div className={cer.contentClass || 'div-style-91742bf7'}>
                        <div className="div-style-94dc5836">
                          <img src="/Fav.png" className="img-style-fee4131e" alt="Favoris" />
                          <p className={cer.authorClass || 'p-style-4a77cf6b'}>par {cer.author}</p>
                        </div>
                        <div className="div-style-3b216671">
                          <p className={cer.titleClass || 'p-style-5037e162'}>{cer.title}</p>
                          <p className="p-style-ce721625">{cer.description}</p>
                        </div>
                      </div>
                    </div>
                    <button className="button-style-8988048b">Consulter le CER</button>
                  </div>
                ))}
              </div>

              {/* Third Row - 2 cards */}
              <div className="div-style-2022d889">
                {filteredCers.slice(4, 6).map((cer) => (
                  <div key={cer.id} className="div-style-7a215e7b">
                    <div className="div-style-91742bf7">
                      <img src={cer.image} className={cer.imageClass} alt={cer.title} />
                      <div className="div-style-91742bf7">
                        <div className="div-style-94dc5836">
                          <img src="/Fav.png" className="img-style-fee4131e" alt="Favoris" />
                          <p className={cer.authorClass || 'p-style-4a77cf6b'}>par {cer.author}</p>
                        </div>
                        <div className="div-style-3b216671">
                          <p className={cer.titleClass || 'p-style-5037e162'}>{cer.title}</p>
                          <p className="p-style-ce721625">{cer.description}</p>
                        </div>
                      </div>
                    </div>
                    <button className="button-style-8988048b">Consulter le CER</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="div-style-b01d361d">
              <div 
                className="div-style-48efbd17"
                onClick={() => setCurrentPage(1)}
              >
                <p className="p-style-44dc1633">1</p>
              </div>
              <div 
                className="div-style-ecbd4441"
                onClick={() => setCurrentPage(2)}
              >
                <p className="p-style-c19facdb">2</p>
              </div>
              <div 
                className="div-style-ecbd4441"
                onClick={() => setCurrentPage(3)}
              >
                <p className="p-style-c19facdb">3</p>
              </div>
              <div 
                className="div-style-ecbd4441"
                onClick={() => setCurrentPage(4)}
              >
                <p className="p-style-c19facdb">4</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
