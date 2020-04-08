import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import getAddress from '~/services/getAddress';
import api from '~/services/api';

import Button from '~/components/Button';
import Input from '~/components/Input';

import * as S from './styles';

import { ReactComponent as Arrow } from '~/assets/arrow.svg';
import { ReactComponent as Save } from '~/assets/save.svg';

function RecipientsForm() {
  const { id } = useParams();
  const history = useHistory();

  const [saveLoading, setSaveLoading] = useState(false);

  const [name, setName] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo nome é obrigatorio.'),
  });

  const [zipCode, setZipCode] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo CEP é obrigatorio.'),
  });

  const [street, setStreet] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo rua é obrigatorio.'),
  });

  const [number, setNumber] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo numero é obrigatorio.'),
  });

  const [state, setState] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo estado é obrigatorio.'),
  });

  const [city, setCity] = useState({
    value: '',
    error: null,
    schema: Yup.string().required('O campo cidade é obrigatorio.'),
  });

  const [complement, setComplement] = useState({
    value: '',
    error: null,
    schema: Yup.string(),
  });

  useEffect(() => {
    async function loadRecipient() {
      const { data } = await api.get(`recipients/${id}`);

      setName({
        value: data.name,
        error: null,
        schema: Yup.string().required('O campo nome é obrigatorio.'),
      });

      setZipCode({
        value: data.zip_code,
        error: null,
        schema: Yup.string().required('O campo CEP é obrigatorio.'),
      });

      setStreet({
        value: data.street,
        error: null,
        schema: Yup.string().required('O campo rua é obrigatorio.'),
      });

      setNumber({
        value: data.number,
        error: null,
        schema: Yup.string().required('O campo numero é obrigatorio.'),
      });

      setState({
        value: data.state,
        error: null,
        schema: Yup.string().required('O campo estado é obrigatorio.'),
      });

      setCity({
        value: data.city,
        error: null,
        schema: Yup.string().required('O campo cidade é obrigatorio.'),
      });

      setComplement({
        value: data.complement,
        error: null,
        schema: Yup.string(),
      });
    }

    if (id) loadRecipient();
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

  async function handleSaveClick() {
    const validName = validateField(name, setName);
    const validZipCode = validateField(zipCode, setZipCode);
    const validStreet = validateField(street, setStreet);
    const validNumber = validateField(number, setNumber);
    const validState = validateField(state, setState);
    const validCity = validateField(city, setCity);
    const validComplement = validateField(complement, setComplement);

    if (
      validName &&
      validZipCode &&
      validStreet &&
      validNumber &&
      validNumber &&
      validState &&
      validCity &&
      validComplement
    ) {
      const data = {
        name: name.value,
        street: street.value,
        number: number.value,
        complement: complement.value,
        state: state.value,
        city: city.value,
        zip_code: zipCode.value,
      };

      setSaveLoading(true);

      try {
        if (id) {
          await api.put(`recipients/${id}`, data);
        } else {
          await api.post('recipients', data);

          toast.success(
            'Destinatário criado com sucesso 🎉. Você sera redirecionado',
            {
              onClose: () => history.push('/recipients'),
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

  async function getAddressByZipCode(zipCodeNumber) {
    const response = await getAddress(zipCodeNumber);

    const { logradouro, localidade, uf } = response.data;

    setStreet({ ...street, value: logradouro });
    setCity({ ...city, value: localidade });
    setState({ ...state, value: uf });
  }

  function handleZipCodeChange(event) {
    const zipCodeNumber = event.target.value.replace(/\D/g, '');

    if (zipCodeNumber.length === 8) getAddressByZipCode(zipCodeNumber);

    setZipCode({ ...zipCode, value: zipCodeNumber });
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title> {id ? 'Edição' : 'Cadastro'} de destinatário</S.Title>
        <S.Actions>
          <Button to="/recipients" icon={Arrow} secondary>
            Voltar
          </Button>

          <Button icon={Save} onClick={handleSaveClick} disabled={saveLoading}>
            Salvar
          </Button>
        </S.Actions>
      </S.Header>
      <S.Form>
        <S.FormRow>
          <Input
            type="text"
            label="Nome"
            value={name.value}
            helpText={name.error}
            invalid={!!name.error}
            onChange={event => setName({ ...name, value: event.target.value })}
          />
        </S.FormRow>
        <S.FormRow>
          <Input
            type="text"
            label="CEP"
            value={zipCode.value}
            helpText={zipCode.error}
            invalid={!!zipCode.error}
            onChange={handleZipCodeChange}
          />
          <Input
            type="text"
            label="Rua"
            value={street.value}
            helpText={street.error}
            invalid={!!street.error}
            onChange={event =>
              setStreet({ ...street, value: event.target.value })
            }
          />
          <Input
            type="text"
            label="Número"
            value={number.value}
            helpText={number.error}
            invalid={!!number.error}
            onChange={event =>
              setNumber({ ...number, value: event.target.value })
            }
          />
        </S.FormRow>
        <S.FormRow>
          <Input
            type="text"
            label="Cidade"
            value={city.value}
            helpText={city.error}
            invalid={!!city.error}
            onChange={event => setCity({ ...city, value: event.target.value })}
          />
          <Input
            type="text"
            label="Estado"
            value={state.value}
            helpText={state.error}
            invalid={!!state.error}
            onChange={event =>
              setState({ ...state, value: event.target.value })
            }
          />
          <Input
            type="text"
            label="Complemento"
            value={complement.value}
            helpText={complement.error}
            invalid={!!complement.error}
            onChange={event =>
              setComplement({ ...complement, value: event.target.value })
            }
          />
        </S.FormRow>
      </S.Form>
    </S.Container>
  );
}

export default RecipientsForm;
