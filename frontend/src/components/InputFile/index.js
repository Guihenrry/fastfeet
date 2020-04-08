import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as PhotoIcon } from '~/assets/photo.svg';

import * as S from './styles';

export default function InputFile({ setFile, setPreview, preview }) {
  function handlePreview(event) {
    const file = event.target.files?.[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setFile(file);
    } else {
      setPreview(null);
      setFile(null);
    }
  }

  return (
    <S.Label htmlFor="input" hasPreview={preview ? 1 : 0}>
      {preview ? (
        <S.Preview src={preview} alt="preview" />
      ) : (
        <>
          <PhotoIcon />
          <S.Text>Adicionar foto</S.Text>
        </>
      )}

      <S.Input type="file" id="input" onChange={handlePreview} />
    </S.Label>
  );
}

InputFile.defaultProps = {
  preview: null,
};

InputFile.propTypes = {
  setFile: PropTypes.func.isRequired,
  setPreview: PropTypes.func.isRequired,
  preview: PropTypes.string,
};
