import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Button from '../common/Button';

const getIconForType = (type) => {
    switch (type) {
        case 'success':
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'error':
            return <AlertCircle className="w-5 h-5 text-red-500" />;
        default:
            return <Info className="w-5 h-5 text-blue-500" />;
    }
};

const NotificationsList = ({ notifications }) => {
    const [openNotifications, setOpenNotifications] = useState({});

    const toggleNotification = (id) => {
        setOpenNotifications((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-lg max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-800">Notificações</h2>
            </div>
            <AnimatePresence>
                {notifications.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-gray-500 text-center"
                    >
                        Nenhuma notificação no momento.
                    </motion.p>
                ) : (
                    notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 last:mb-0"
                        >
                            <AlertDialog.Root
                                open={openNotifications[notification.id]}
                                onOpenChange={() => toggleNotification(notification.id)}
                            >
                                <AlertDialog.Trigger asChild>
                                    <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        {getIconForType(notification.type)}
                                        <span className="text-sm text-gray-700 flex-1">
                      {notification.message}
                    </span>
                                        <span className="text-xs text-gray-400">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                                    </button>
                                </AlertDialog.Trigger>
                                <AlertDialog.Portal>
                                    <AlertDialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" />
                                    <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl max-w-md w-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            {getIconForType(notification.type)}
                                            <AlertDialog.Title className="text-lg font-semibold text-gray-800">
                                                {notification.title || 'Notificação'}
                                            </AlertDialog.Title>
                                        </div>
                                        <AlertDialog.Description className="text-sm text-gray-600 mb-6">
                                            {notification.message}
                                            {notification.details && (
                                                <p className="mt-2 text-xs text-gray-500">
                                                    {notification.details}
                                                </p>
                                            )}
                                        </AlertDialog.Description>
                                        <div className="flex justify-end gap-3">
                                            <AlertDialog.Cancel asChild>
                                                <Button
                                                    text="Fechar"
                                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                                                />
                                            </AlertDialog.Cancel>
                                            {notification.action && (
                                                <AlertDialog.Action asChild>
                                                    <Button
                                                        text={notification.action.label}
                                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                                    />
                                                </AlertDialog.Action>
                                            )}
                                        </div>
                                        <AlertDialog.Cancel asChild>
                                            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </AlertDialog.Cancel>
                                    </AlertDialog.Content>
                                </AlertDialog.Portal>
                            </AlertDialog.Root>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>
        </div>
    );
};

NotificationsList.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['info', 'success', 'error']),
            title: PropTypes.string,
            details: PropTypes.string,
            timestamp: PropTypes.string,
            action: PropTypes.shape({
                label: PropTypes.string,
                onClick: PropTypes.func,
            }),
        })
    ).isRequired,
};

NotificationsList.defaultProps = {
    notifications: [],
};

export default NotificationsList;