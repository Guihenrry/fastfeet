import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

function stringToHslColor(str, s, l) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash < 5) - hash);
  }

  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function Avatar({ name, url }) {
  const nameResume = useMemo(() => {
    const nameArray = name.split(' ');
    const firstLetter = nameArray[0].charAt(0);
    const lastLetter =
      nameArray.length > 1 ? nameArray[nameArray.length - 1].charAt(0) : '';

    return firstLetter + lastLetter;
  }, [name]);

  const backgroundColor = useMemo(() => {
    return stringToHslColor(name, 30, 90);
  }, [name]);

  const color = useMemo(() => {
    return stringToHslColor(name, 30, 60);
  }, [name]);

  return url ? (
    <S.Avatar src={url} />
  ) : (
    <S.NullState backgroundColor={backgroundColor} color={color}>
      {nameResume}
    </S.NullState>
  );
}

Avatar.defaultProps = {
  url: '',
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};
