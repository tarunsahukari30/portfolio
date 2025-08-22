import React, { useState } from 'react';

const Projects = () => {
  const [flippedCards, setFlippedCards] = React.useState({});

  const handleCardClick = (projectId) => {
    setFlippedCards(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  const projects = [
    {
      id: 1,
      title: "Smart Waste Object Detection & Recycling System",
      image: "https://images.pexels.com/photos/2682683/pexels-photo-2682683.jpeg", 
      description: "Engineered a TensorFlow-based ResNet-50 CNN to detect and localize 10 waste categories from 19K+ images. Integrated a rule-based engine to automate recycling recommendations, enabling smart disposal guidance for environmental sustainability.",
      techStack: "TensorFlow, ResNet-50, Python, CNN",

    },
    {
      id: 2,
      title: "Food Classification and Calorie Estimation",
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      description: "Developed an AI-powered system that identifies food items and predicts their calorie content from images using InceptionV3 and Mask R-CNN. This system promotes smarter dietary choices through advanced visual analysis and machine learning.",
      techStack: "InceptionV3, Mask R-CNN, Python, TensorFlow",

    },
    {
      id: 3,
      title: "Restaurant Database Management System",
      image: "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg", 
      description: "Built a comprehensive Restaurant Management System using C# and .NET Framework. Features include order processing, automated billing, customer data storage, menu display, and complete restaurant operations management.",
      techStack: "C#, .NET Framework, Database Management",

    }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className={`project-card ${flippedCards[project.id] ? 'flipped' : ''}`}
            onClick={() => handleCardClick(project.id)}
          >
            <div className="card-inner">
              {/* Front of the card - Image */}
              <div className="card-front">
                <img 
                  src={project.image} 
                  alt={project.title}
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=Project+${project.id}`;
                  }}
                />
                <div className="card-overlay">
                  <h3>{project.title}</h3>
                </div>
              </div>
              
              {/* Back of the card - Details */}
              <div className="card-back">
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    <strong>Tech Stack:</strong> {project.techStack}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
