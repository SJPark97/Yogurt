import React from 'react';

import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';

export default function CloseLive() {
  const navigate = useNavigate();

  const goOut = () => {
    navigate('/');
  };

  return <CloseIcon onClick={goOut} />;
}
