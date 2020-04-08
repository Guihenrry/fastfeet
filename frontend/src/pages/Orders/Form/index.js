import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Button from '~/components/Button';
import Input from '~/components/Input';

import { ReactComponent as Arrow } from '~/assets/arrow.svg';
import { ReactComponent as Save } from '~/assets/save.svg';

import * as S from './styles';

const selectStyle = {
  control: provided => ({
    ...provided,
    border: '1px solid #DDDDDD',
    padding: 4,
  }),
};

export default function OrdersFrom() {
  const { id } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const history = useHistory();

  const [product, setProduct] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo nome é obrigatorio'),
  });

  const [deliveryman, setDeliveryman] = useState(null);

  const [recipient, setRecipient] = useState(null);

  function validateField(field, setter) {
    try {
      field.schema.validateSync(field.value);

      setter({ ...field, error: null });
      return true;
    } catch (error) {
      setter({ ...field, error: error.errors[0] });
      return false;
    }
  }

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get(`/orders/${id}`);

      setProduct({
        value: data.product,
        error: null,
        schema: Yup.string().required('O campo nome é obrigatorio'),
      });

      setDeliveryman({
        value: data.deliveryman.id,
        label: data.deliveryman.name,
      });

      setRecipient({
        value: data.recipient.id,
        label: data.recipient.name,
      });
    }

    if (id) loadOrders();
  }, [id]);

  async function handleSaveClick() {
    if (!recipient || !deliveryman) {
      toast.error('O entregador e destinatário é obrigatorio');
      return;
    }

    const validProduct = validateField(product, setProduct);

    if (validProduct) {
      const data = {
        product: product.value,
        recipient_id: recipient.value,
        deliveryman_id: deliveryman.value,
      };

      setSaveLoading(true);

      try {
        if (id) {
          await api.put(`/orders/${id}`, data);

          toast.success('Encomendas atualizada com sucesso 🎉.');
        } else {
          await api.post('/orders', data);

          toast.success(
            'Encomendas criado com sucesso 🎉. Você será redirecionado',
            {
              onClose: () => history.push('/orders'),
              autoClose: 2000,
            }
          );
        }
      } catch (err) {
        console.tron.log(err);
        toast.error('😥 ocorreu um error, verifique seus dados!');
      }

      setSaveLoading(false);
    }
  }

  async function loadDeliverymanOptions(value, calback) {
    const response = await api.get(`/deliverymans?q=${value}`);

    const data = response.data.map(item => ({
      value: item.id,
      label: item.name,
    }));

    calback(data);
  }

  function handleDeliverymanChange(value) {
    setDeliveryman(value);
  }

  async function loadRecipientOptions(value, calback) {
    const response = await api.get(`/recipients?q=${value}`);

    const data = response.data.map(item => ({
      value: item.id,
      label: item.name,
    }));

    calback(data);
  }

  function handleRecipientChange(value) {
    setRecipient(value);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>{id ? 'Edição' : 'Cadastro'} de encomendas</S.Title>
        <S.Actions>
          <Button to="/orders" icon={Arrow} secondary>
            Voltar
          </Button>

          <Button icon={Save} onClick={handleSaveClick} disabled={saveLoading}>
            Salvar
          </Button>
        </S.Actions>
      </S.Header>

      <S.Form>
        <S.FormRow>
          <S.Label>
            <S.LabelText>Destinatário</S.LabelText>
            <AsyncSelect
              cacheOptions
              loadOptions={loadRecipientOptions}
              defaultOptions
              styles={selectStyle}
              onChange={handleRecipientChange}
              value={recipient}
            />
          </S.Label>
          <S.Label>
            <S.LabelText>Entregador</S.LabelText>
            <AsyncSelect
              cacheOptions
              loadOptions={loadDeliverymanOptions}
              defaultOptions
              onChange={handleDeliverymanChange}
              styles={selectStyle}
              value={deliveryman}
            />
          </S.Label>
        </S.FormRow>

        <Input
          type="text"
          label="Nome do produto"
          value={product.value}
          helpText={product.error}
          invalid={!!product.error}
          onChange={event =>
            setProduct({ ...product, value: event.target.value })
          }
        />
      </S.Form>
    </S.Container>
  );
}
