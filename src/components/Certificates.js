import React, { useState } from 'react';

const Certificates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample certificate data - Replace with your actual certificates
  const certificates = [
    {
      id: 1,
      name: "Google Cloud Certified: Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "June 2025",
      icon: "☁️",
      link: "https://www.credly.com/badges/33ed9f06-7950-480e-a3e1-61c10e20adf1/public_url"
    },
    
    {
      id: 2,
      name: "AWS Academy Graduate - Machine Learning Foundations",
      issuer: "Amazon Web Services Training and Certification",
      date: "2025",
      icon: "☁️",
      link: "https://www.credly.com/badges/7b75645a-dfb0-4baa-b8a2-51092c145c85"

    },
    {
      id: 3,
      name: "AWS Academy Graduate - Cloud Foundations",
      issuer: "Amazon Web Services Training and Certification",
      date: "2025",
      icon: "☁️",
      link: "https://www.credly.com/badges/571f581d-bc82-4099-9b51-09e96ce1ed4d"

    },
    {
        id:4,
        name: "Java Programming Fundamentals",
        issuer: "GalileoX (Universidad Galileo)",
        date: "May 2024",
        icon: "☕",
        link: "https://courses.edx.org/certificates/90e234843a7943588a7bc621e0b690b0?_gl=1*elctll*_gcl_au*ODUzMDMxNjc4LjE3NTI4NTY4MTI.*_ga*MTY2ODk4NjQ5OC4xNzQxOTMwNDA1*_ga_D3KS4KMDT0*czE3NTU2OTg2NzMkbzUkZzEkdDE3NTU2OTg3NjEkajM4JGww",

    },
    {
      id:5,
      name: "DBMS and MySQL Complete Course Beginner to Advance",
      issuer: "Udemy",
      date: "April 2024",
      icon: "🗄️",
      link: "https://www.udemy.com/certificate/UC-46d564f3-59d4-4153-b888-688185e86a1e/"

    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  const viewCertificate = (link) => {
    if (link !== '#') {
      window.open(link, '_blank');
    } else {
      alert('Certificate link not available');
    }
  };

  // Handle escape key press
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section id="certifications" className="certificates-section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">Professional achievements and continuous learning</p>
        
        <button className="view-certificates-btn" onClick={openModal}>
          🏆 View Certificates
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
          onClick={(e) => {
            if (e.target.classList.contains('modal-overlay')) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">My Certifications</h2>
              <p className="modal-subtitle">Professional achievements and continuous learning journey</p>
            </div>

            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <div 
                  key={cert.id} 
                  className="certificate-card"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="certificate-icon">{cert.icon}</div>
                  <h3 className="certificate-name">{cert.name}</h3>
                  <p className="certificate-issuer">Issued by: {cert.issuer}</p>
                  <p className="certificate-date">{cert.date}</p>
                  <span className="certificate-badge">{cert.badge}</span>
                  <br />
                  <button 
                    className="view-cert-btn" 
                    onClick={() => viewCertificate(cert.link)}
                  >
                    View Certificate
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;