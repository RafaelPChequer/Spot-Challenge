import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import PropTypes from 'prop-types';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = ({ onSubmit, error }) => (
  <div>
    <Form.Root onSubmit={onSubmit} className="space-y-4">
      <Form.Field name="username">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Usuário
        </Form.Label>
        <Form.Control asChild>
          <Input
            type="text"
            placeholder="Digite seu usuário"
            className="w-full p-2 border rounded-lg"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="password">
        <Form.Label className="block text-sm font-medium text-gray-700">
          Senha
        </Form.Label>
        <Form.Control asChild>
          <Input
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-2 border rounded-lg"
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          text="Entrar"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        />
      </Form.Submit>
    </Form.Root>

    {error && (
      <AlertDialog.Root defaultOpen>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <AlertDialog.Title className="text-lg font-semibold">
              Erro de Login
            </AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-600 mb-4">
              {error}
            </AlertDialog.Description>
            <AlertDialog.Action asChild>
              <Button
                text="OK"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              />
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    )}
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginForm;
