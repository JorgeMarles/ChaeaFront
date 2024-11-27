import React, { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getRole, Roles } from '../../util/userUtils';

const Dashboard = () => {
  const user = useOutletContext(); // Obtén la información del usuario del contexto
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User:', user);

    if (user) {
      try {
        const role = getRole(user);
        console.log('User role:', role);

        switch(role) {
          case Roles.ESTUDIANTE_INACTIVO:
          case Roles.ESTUDIANTE_INCOMPLETO:
            navigate('/cuenta/actualizar-cuenta-estudiante');
            break;
          case Roles.PROFESOR_INACTIVO:
          case Roles.PROFESOR_INCOMPLETO:
            navigate('/cuenta/actualizar-cuenta-profesor');
            break;
          case Roles.PROFESOR_ACTIVO:
            navigate('/grupos');
            break;
          case Roles.ESTUDIANTE_ACTIVO:
            navigate('/cuestionarios');
            break;
          default:
            navigate('/');
            break;
        }
      } catch (error) {
        console.error('Error determining user role:', error);
        navigate('/');
      }
    }
  }, [user, navigate]);

  return (
    <div>
      {/* Contenido del dashboard (si es necesario) */}
    </div>
  );
};

export default Dashboard;
