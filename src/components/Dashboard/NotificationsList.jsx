import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const NotificationsList = ({ notifications }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Notificações</h2>
    {notifications.map((notification) => (
      <AlertDialog.Root key={notification.id}>
        <AlertDialog.Trigger asChild>
          <button className="text-sm text-blue-600 hover:underline mb-2">
            {notification.message}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <AlertDialog.Title className="text-lg font-semibold">
              Notificação
            </AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-600 mb-4">
              {notification.message}
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <Button
                text="Fechar"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              />
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    ))}
  </div>
);

NotificationsList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotificationsList;
