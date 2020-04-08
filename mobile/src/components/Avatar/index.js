import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Avatar({name, url, small}) {
  const resumeName = useMemo(() => {
    const arrayName = name.split(' ');
    const firstLetter = arrayName[0].charAt(0);
    const lastLetter =
      arrayName.length > 1 ? arrayName[arrayName.length - 1].charAt(0) : '';

    return firstLetter + lastLetter;
  }, [name]);

  return url ? (
    <S.Avatar source={{uri: url}} small={small} />
  ) : (
    <S.NullState small={small}>
      <S.NullStateText small={small}>{resumeName}</S.NullStateText>
    </S.NullState>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  small: PropTypes.bool,
};

Avatar.defaultProps = {
  url: '',
  small: false,
};
