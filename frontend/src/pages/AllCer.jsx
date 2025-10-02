import { useState } from 'react';
import '../styles/all_cer.css';

export default function AllCer() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    level: 'X4',
    specialties: {
      'Gestion de projet': false,
      'Génie-logiciel': true,
      'Résaux & Infra': false,
      'Sécurité': false,
      'Data': true
    },
    description: ''
  });

  const cers = [
    {
      id: 1,
      title: 'Prosit 3.2 - Annuaire Active Directoty',
      specialty: 'Resaux et Infra; Sécurité',
      level: 'X3',
      date: '11/07/2024'
    },
    {
      id: 2,
      title: 'Prosit 1.2 - Les réseaux LAN',
      specialty: 'Resaux et Infra; Sécurité',
      level: 'X1',
      date: '13/02/2024'
    },
    {
      id: 3,
      title: "Prosit 4.2 - Charte d'un projet",
      specialty: 'Gestion de projet',
      level: 'X4',
      date: '01/07/2024'
    },
    {
      id: 4,
      title: 'Prosit 4.2 - Base de données analytique',
      specialty: 'Data',
      level: 'X3',
      date: '11/07/2024'
    },
    {
      id: 5,
      title: 'Prosit 1.2 - IHM intituives',
      specialty: 'Génie-logiciel',
      level: 'X1',
      date: '11/07/2024'
    },
    {
      id: 6,
      title: 'SAM Gestion des ressources humaines',
      specialty: 'Gestion de projet',
      level: 'X5',
      date: '11/09/2024'
    },
    {
      id: 7,
      title: 'Prosit 4.3 - Investigation numérique',
      specialty: 'Sécurité',
      level: 'X3',
      date: '11/07/2024'
    }
  ];

  const handleSpecialtyChange = (specialty) => {
    setFormData({
      ...formData,
      specialties: {
        ...formData.specialties,
        [specialty]: !formData.specialties[specialty]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowModal(false);
    // TODO: Implement API call to save CER
  };

  return (
    <>
      <div style={{ background: '#f7f7f8' }}>
        <div className="div-style-22dcaa64">
          <p className="p-style-ab8716ee">Gérer mes CERs</p>
        </div>
      </div>

      <div style={{ background: 'white' }}>
        <div className="div-style-c768765f">
          <div className="div-style-7d83ddb5">
            <div className="div-style-cc7dba96">
              <p className="p-style-51ccdda7 span-style-b06b7552 span-style-4a31c549 span-style-feb41531">
                <span>Filtrer: </span>
                <span>Tous</span>
              </p>
              <div className="div-style-57e81394">
                <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.0004,8.0612l-4.335,-4.592h8.669z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="div-style-9dbb45fd" onClick={() => setShowModal(true)}>
              <p className="p-style-84da2483">Ajouter un CER</p>
            </div>
          </div>

          {/* Table */}
          <div className="div-style-dbdf79d2">
            <div className="div-style-33ed3309">
              <div className="div-style-c07555d8">
                {/* Table Header */}
                <div className="div-style-8329db55">
                  <div className="div-style-9500a5da">
                    <div className="div-style-220ed6e0">
                      <p className="p-style-ac6f1a4a">Titre</p>
                    </div>
                    <div className="div-style-e9dbfae1">
                      <p className="p-style-ac6f1a4a">Spécialité</p>
                    </div>
                    <div className="div-style-506401fd">
                      <p className="p-style-ac6f1a4a">Niveaux</p>
                    </div>
                    <div className="div-style-d7866f85">
                      <div className="div-style-8fb1a1a">
                        <p className="p-style-7846071">Date</p>
                        <p className="p-style-b1471ed4">↑</p>
                      </div>
                    </div>
                    <div className="div-style-82d86f60">
                      <p className="p-style-ac6f1a4a">Action</p>
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                {cers.map((cer) => (
                  <div key={cer.id} className="div-style-c8cad111">
                    <div className="div-style-c72d55b6">
                      <p className="p-style-c32035d1">{cer.title}</p>
                    </div>
                    <div className="div-style-d8d45b92">
                      <p className="p-style-c32035d1">{cer.specialty}</p>
                    </div>
                    <div className="div-style-3f321c2b">
                      <p className="p-style-c32035d1">{cer.level}</p>
                    </div>
                    <div className="div-style-e20e782a">
                      <p className="p-style-ab5f2d38">{cer.date}</p>
                    </div>
                    <div className="div-style-fafceee6">
                      <div className="div-style-2289e262">
                        <div className="div-style-f196f149">
                          <p className="p-style-d6fa11ba">Editer</p>
                        </div>
                      </div>
                      <div className="div-style-ffb2764b">
                        <div className="div-style-f196f149">
                          <p className="p-style-d6fa11ba">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            
            <form className="cer-form" onSubmit={handleSubmit}>
              <h2>Ajouter un nouveau CER</h2>

              <div className="form-group">
                <label htmlFor="cer-title">Titre du CER</label>
                <input
                  type="text"
                  id="cer-title"
                  placeholder="Exemple: Prosit 4.3 - Recherche Opérationnelle"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cer-level">Niveaux</label>
                <select
                  id="cer-level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                >
                  <option>X1</option>
                  <option>X2</option>
                  <option>X3</option>
                  <option>X4</option>
                  <option>X5</option>
                </select>
              </div>

              <div className="form-group">
                <label>Domaines de spécialité</label>
                <div className="checkbox-group">
                  {Object.keys(formData.specialties).map((specialty) => (
                    <div key={specialty} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`spec-${specialty}`}
                        checked={formData.specialties[specialty]}
                        onChange={() => handleSpecialtyChange(specialty)}
                      />
                      <label htmlFor={`spec-${specialty}`}>{specialty}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cer-description">Description du CER</label>
                <textarea
                  id="cer-description"
                  placeholder="Entrez ici la description ou un résumé de votre CER"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Fichiers du CER</label>
                <div className="file-upload-area">
                  <img src="/assets/image_8cb7d462.png" alt="Upload icon" />
                  <p>Cliquez ici pour attacher le fichier du CER (.pdf ou.docx)</p>
                </div>
              </div>

              <div className="form-actions">
                <div className="div-style-c6ddb174" onClick={handleSubmit}>
                  <p className="p-style-1c195a11">Enregistrer</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
