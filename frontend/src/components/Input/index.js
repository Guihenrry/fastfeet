import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Input({
  placeholder,
  label,
  type,
  value,
  onChange,
  invalid,
  helpText,
}) {
  return (
    <S.Label>
      {label}
      <S.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        invalid={invalid}
      />
      <S.HelpText>{helpText}</S.HelpText>
    </S.Label>
  );
}

Input.defaultProps = {
  placeholder: '',
  helpText: '',
  invalid: false,
};

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  helpText: PropTypes.string,
};
