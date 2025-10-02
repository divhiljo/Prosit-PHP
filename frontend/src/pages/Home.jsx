import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/home.css';
import { cerService } from '../services/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cers, setCers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadCers() {
      try {
        const response = await cerService.getAll();
        if (response.ok) {
          // Adapter les données de l'API au format attendu par l'interface
          const adaptedCers = response.data.map(cer => ({
            id: cer.id,
            image: cer.image_url,
            imageClass: 'img-style-6c14cff', // Classe par défaut
            author: cer.author,
            authorClass: 'p-style-4a77cf6b', // Classe par défaut
            title: cer.title,
            description: cer.description
          }));
          setCers(adaptedCers);
        } else {
          setError('Erreur lors du chargement des CERs');
        }
      } catch (error) {
        console.error('Erreur:', error);
        setError('Impossible de charger les CERs');
      } finally {
        setLoading(false);
      }
    }
    loadCers();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  // Filter CERs based on search query
  const filteredCers = cers.filter((cer) => {
    if (searchQuery === '') return true;
    return cer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           cer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           cer.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <section className="div-style-9de913c2">
        <div className="div-style-d7968d1a">
          <div className="div-style-1c7e83ee">
            <div className="div-style-99ea8a9c">
              <div className="div-style-aecb3706">...</div>
              <input
                type="text"
                placeholder="Rechercher un CER"
                className="p-style-9fe2e2f1"
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
            </div>
            <div className="div-style-57b89d47">
              <div className="div-style-48e78868">
                <div className="div-style-561e0c46">
                  <p className="p-style-52c62e20">
                    {user 
                      ? `Bienvenue ${user.prenom} ${user.nom} sur Archiva` 
                      : 'Bienvenue sur Archiva, votre espace'}
                  </p>
                </div>
                <div className="div-style-a83fbfbc">
                  <p className="p-style-ef454021">Espace d&apos;archivage d&apos;anciens CERs</p>
                  <p className="p-style-37443380">L&apos;homme n&apos;est rien sans son bord</p>
                </div>
              </div>
              <div className="div-style-68b91ee8">
                <button className="button-style-a8bd1f5">Explorer plus de CER</button>
                <button className="button-style-3546551e">Tous les CERs</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best CERs Section */}
      <section className="div-style-6d61f5aa">
        <div className="div-style-17f12542">
          <div className="div-style-8a58adb1">
            <p className="p-style-12be88f3">Les meilleurs CERs du moment</p>
            <p className="p-style-fab9b46b">
              Découvrez ci-dessous les&nbsp; CERs les plus appréciés par notre communauté d&apos;utilisateurs. 
              Ces CERs ont été sélectionnés et évalués par nos membres en fonction de leur qualité, pertinence et utilité.
            </p>
          </div>
          <button className="button-style-ac529be4">Voir plus</button>
        </div>
        
        <div className="div-style-374de174">
          <div className="div-style-24c0d969">
            {filteredCers.slice(0, 3).map((cer) => (
              <div key={cer.id} className="div-style-736a2b01">
                <div className="div-style-91742bf7">
                  <img src={cer.image} className={cer.imageClass} alt={cer.title} />
                  <div className="div-style-91742bf7">
                    <div className="div-style-94dc5836">
                      <img src="/Fav.png" className="img-style-fee4131e" alt="Favoris" />
                      <p className={cer.authorClass}>par {cer.author}</p>
                    </div>
                    <div className="div-style-3b216671">
                      <p className="p-style-5037e162">{cer.title}</p>
                      <p className="p-style-5779c908">{cer.description}</p>
                    </div>
                  </div>
                </div>
                <button className="button-style-81ebd197">Consulter le CER</button>
              </div>
            ))}
          </div>
        </div>

        <div className="div-style-280f7b0c">
          <div className="div-style-24c0d969">
            {filteredCers.slice(3, 6).map((cer) => (
              <div key={cer.id} className="div-style-736a2b01">
                <div className="div-style-91742bf7">
                  <img src={cer.image} className={cer.imageClass} alt={cer.title} />
                  <div className="div-style-91742bf7">
                    <div className="div-style-94dc5836">
                      <img src="/Fav.png" className="img-style-fee4131e" alt="Favoris" />
                      <p className={cer.authorClass}>par {cer.author}</p>
                    </div>
                    <div className="div-style-3b216671">
                      <p className="p-style-5037e162">{cer.title}</p>
                      <p className="p-style-5779c908">{cer.description}</p>
                    </div>
                  </div>
                </div>
                <button className="button-style-81ebd197">Consulter le CER</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
