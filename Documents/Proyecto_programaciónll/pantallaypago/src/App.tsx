import React, { useState } from 'react';
import { Cliente } from '../componentes/Cliente';
import { Pago } from '../componentes/Pago';
import './App.css';

const App: React.FC = () => {
  const [pantallaActiva, setPantallaActiva] = useState<'clientes' | 'pagos'>('clientes');
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nombre: 'Juana Martel', telefono: '3555-1234', correo: 'juana@gmail.com' }
  ]);
  const [pagos, setPagos] = useState<Pago[]>([
    { id: 1, cliente: 'Juana Martel', monto: '125,000.00', fecha: '20/08/2025' }
  ]);
  const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id'>>({ 
    nombre: '', telefono: '', correo: '' 
  });
  const [nuevoPago, setNuevoPago] = useState<Omit<Pago, 'id'>>({ 
    cliente: '', monto: '', fecha: '' 
  });

  const agregarCliente = (): void => {
    if (nuevoCliente.nombre && nuevoCliente.telefono && nuevoCliente.correo) {
      setClientes([...clientes, { id: Date.now(), ...nuevoCliente }]);
      setNuevoCliente({ nombre: '', telefono: '', correo: '' });
    }
  };

  const agregarPago = (): void => {
    if (nuevoPago.cliente && nuevoPago.monto && nuevoPago.fecha) {
      setPagos([...pagos, { id: Date.now(), ...nuevoPago }]);
      setNuevoPago({ cliente: '', monto: '', fecha: '' });
    }
  };

  const eliminarCliente = (id: number): void => {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  const eliminarPago = (id: number): void => {
    setPagos(pagos.filter(pago => pago.id !== id));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h1>ROBLES DE LA LAGUNA</h1>
        <p className="subtitle">Gestión de venta de Propiedades</p>
        
        <div className="menu">
          <div className="menu-item">
            <span className="checkbox">☐</span> Dashboard
          </div>
          <div 
            className={`menu-item ${pantallaActiva === 'clientes' ? 'active' : ''}`}
            onClick={() => setPantallaActiva('clientes')}
          >
            <span className="checkbox">☑</span> Clientes
          </div>
          <div className="menu-item">
            <span className="checkbox">☐</span> Citas
          </div>
          <div 
            className={`menu-item ${pantallaActiva === 'pagos' ? 'active' : ''}`}
            onClick={() => setPantallaActiva('pagos')}
          >
            <span className="checkbox">☒</span> Pagos
          </div>
        </div>
        
        <div className="reportes-section">
          <h3>Reportes</h3>
          <button className="cerrar-sesion">Cerrar Sesión</button>
        </div>
      </div>

      <div className="main-content">
        {pantallaActiva === 'clientes' && (
          <div className="clientes">
            <h2>Clientes</h2>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>TELEFONO</th>
                  <th>CORREO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map(cliente => (
                  <tr key={cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.correo}</td>
                    <td>
                      <button className="btn-editar">Editar</button>
                      <button 
                        className="btn-eliminar" 
                        onClick={() => eliminarCliente(cliente.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="formulario">
              <h3>Registrar Nuevo Cliente</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nuevoCliente.nombre}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={nuevoCliente.telefono}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Correo"
                  value={nuevoCliente.correo}
                  onChange={(e) => setNuevoCliente({...nuevoCliente, correo: e.target.value})}
                />
                <button onClick={agregarCliente}>Agregar Cliente</button>
              </div>
            </div>
          </div>
        )}

        {pantallaActiva === 'pagos' && (
          <div className="pagos">
            <h1>ROBLES DE LA LAGUNA</h1>
            <p className="subtitle">Gestión de venta de Propiedades</p>
            
            <ul className="menu-lista">
              <li>Dashboard</li>
              <li>Clientes</li>
              <li>Citas</li>
              <li>Pagos</li>
            </ul>
            
            <hr />
            
            <div className="pages-section">
              <h2>Pages</h2>
              
              <table className="data-table">
                <thead>
                  <tr>
                    <th>CLIENTE</th>
                    <th>MONTO</th>
                    <th>FECHA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map(pago => (
                    <tr key={pago.id}>
                      <td>{pago.cliente}</td>
                      <td>${pago.monto}</td>
                      <td>{pago.fecha}</td>
                      <td>
                        <button 
                          className="btn-eliminar" 
                          onClick={() => eliminarPago(pago.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <hr />
              
              <div className="formulario">
                <h3>Registrar Nuevo Pago</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Cliente"
                    value={nuevoPago.cliente}
                    onChange={(e) => setNuevoPago({...nuevoPago, cliente: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Monto"
                    value={nuevoPago.monto}
                    onChange={(e) => setNuevoPago({...nuevoPago, monto: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Fecha (dd/mm/aaaa)"
                    value={nuevoPago.fecha}
                    onChange={(e) => setNuevoPago({...nuevoPago, fecha: e.target.value})}
                  />
                  <button onClick={agregarPago}>Agregar Pago</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;