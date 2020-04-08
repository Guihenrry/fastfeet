import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Button from '~/components/Button';
import Input from '~/components/Input';
import InputFile from '~/components/InputFile';

import { ReactComponent as Arrow } from '~/assets/arrow.svg';
import { ReactComponent as Save } from '~/assets/save.svg';

import * as S from './styles';

export default function DeliverymansForm() {
  const { id } = useParams();
  const history = useHistory();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarId, setAvatarId] = useState(null);

  const [saveLoading, setSaveLoading] = useState(false);

  const [name, setName] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo nome é obrigatorio'),
  });

  const [email, setEmail] = useState({
    value: '',
    error: null,
    schema: Yup.string()
      .email('Ops parece que seu e-mail não esta correto.')
      .required('O campo email é obrigatorio'),
  });

  useEffect(() => {
    async function loadDeliveryman() {
      const { data } = await api.get(`/deliverymans/${id}`);

      setName({
        value: data.name,
        error: null,
        schema: Yup.string().required('O campo nome é obrigatorio'),
      });

      setEmail({
        value: data.email,
        error: null,
        schema: Yup.string()
          .email('Ops parece que seu e-mail não esta correto.')
          .required('O campo email é obrigatorio'),
      });

      setAvatarId(data.avatar_id);

      setAvatarPreview(data.avatar?.url);
    }

    if (id) loadDeliveryman();
  }, [id]);

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

  function changeAvatar(file) {
    setAvatarFile(file);
  }

  function changePreview(preview) {
    setAvatarPreview(preview);
  }

  async function handleSaveClick() {
    const validName = validateField(name, setName);
    const validEmail = validateField(email, setEmail);

    if ((validName, validEmail)) {
      let newAvatarId = avatarId;

      if (avatarPreview && avatarFile) {
        const data = new FormData();

        data.append('file', avatarFile);

        const response = await api.post('/files', data);

        await setAvatarPreview(response.data.url);
        await setAvatarId(response.data.id);
        newAvatarId = response.data.id;
      } else if (!avatarPreview) {
        await setAvatarId(null);
        newAvatarId = null;
      }

      const data = {
        name: name.value,
        email: email.value,
        avatar_id: newAvatarId,
      };

      setSaveLoading(true);

      try {
        if (id) {
          await api.put(`/deliverymans/${id}`, data);
        } else {
          await api.post('/deliverymans', data);

          toast.success(
            'Destinatário criado com sucesso 🎉. Você sera redirecionado',
            {
              onClose: () => history.push('/deliverymans'),
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

  return (
    <S.Container>
      <S.Header>
        <S.Title>{id ? 'Edição' : 'Cadastro'} de entregadores</S.Title>
        <S.Actions>
          <Button to="/deliverymans" icon={Arrow} secondary>
            Voltar
          </Button>

          <Button icon={Save} onClick={handleSaveClick} disabled={saveLoading}>
            Salvar
          </Button>
        </S.Actions>
      </S.Header>

      <S.Form>
        <InputFile
          setFile={changeAvatar}
          setPreview={changePreview}
          preview={avatarPreview}
        />

        <Input
          type="text"
          label="Name"
          value={name.value}
          helpText={name.error}
          invalid={!!name.error}
          onChange={event => setName({ ...name, value: event.target.value })}
        />
        <Input
          type="text"
          label="Email"
          value={email.value}
          helpText={email.error}
          invalid={!!email.error}
          onChange={event => setEmail({ ...email, value: event.target.value })}
        />
      </S.Form>
    </S.Container>
  );
}
