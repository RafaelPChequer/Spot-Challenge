import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const DashboardHeader = ({ username, onLogout }) => (
  <header className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">SpotMkt Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Bem-vindo, {username}</span>
        <Button
          text="Sair"
          onClick={onLogout}
          className="bg-blue-800 px-3 py-1 rounded-lg hover:bg-blue-900"
        />
      </div>
    </div>
  </header>
);

DashboardHeader.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardHeader;
