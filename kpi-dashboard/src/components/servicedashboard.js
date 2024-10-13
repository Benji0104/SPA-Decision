import React, { useEffect, useState } from 'react';

const MiComponente = () => {
  const [tigoData, setTigoData] = useState(null);
  const [cwData, setcwData] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('tigo'); // Estado para seleccionar la empresa
  const [showComparison, setShowComparison] = useState(false); // Estado para mostrar u ocultar la comparación

  useEffect(() => {
    fetch(`/kpi-data/tigo`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTigoData(data))
      .catch(error => console.error('Error fetching Tigo data:', error));
  }, []);

  useEffect(() => {
    fetch(`/kpi-data/cable-&-wireless`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setcwData(data))
      .catch(error => console.error('Error fetching cw data:', error));
  }, []);

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value); // Actualiza la empresa seleccionada
    setShowComparison(false); // Oculta la comparación al cambiar de empresa
  };

  const compareKPI = () => {
    if (tigoData && cwData) {
      const tigoPerformance = tigoData.performance;
      const cwPerformance = cwData.performance;

      if (tigoPerformance > cwPerformance) {
        return 'Tigo tiene un mejor rendimiento.';
      } else if (tigoPerformance < cwPerformance) {
        return 'Cable & Wireless tiene un mejor rendimiento.';
      } else {
        return 'Ambas empresas tienen el mismo rendimiento.';
      }
    }
    return 'Cargando datos...';
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison); // Cambia el estado para mostrar/ocultar la comparación
  };

  return (
    <div>
      <h1>Datos de KPI</h1>
      
      {/* Selector para elegir la empresa */}
      <select onChange={handleCompanyChange} value={selectedCompany}>
        <option value="tigo">Tigo</option>
        <option value="cw">Cable & Wireless</option>
      </select>

      {/* Mostrar datos de la empresa seleccionada */}
      {selectedCompany === 'tigo' && tigoData && (
        <div>
          <h2>Datos de Tigo</h2>
          <pre>{JSON.stringify(tigoData, null, 2)}</pre>
        </div>
      )}

      {selectedCompany === 'cw' && cwData && (
        <div>
          <h2>Datos de Otra Empresa</h2>
          <pre>{JSON.stringify(cwData, null, 2)}</pre>
        </div>
      )}

      {/* Botón para mostrar/ocultar comparación */}
      <button onClick={toggleComparison}>
        {showComparison ? 'Ocultar Comparación' : 'Mostrar Comparación'}
      </button>

      {/* Comparación de KPI */}
      {showComparison && tigoData && cwData && (
        <div>
          <h2>Comparación de Rendimiento</h2>
          <p>{compareKPI()}</p>
        </div>
      )}
    </div>
  );
};

export default MiComponente;
