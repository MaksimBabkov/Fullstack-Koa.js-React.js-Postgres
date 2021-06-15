import React from 'react';

import User from './components/Get'

import styled from 'styled-components';
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const NoMatch = () => (
  <Wrapper>
    <h2>Все пользователи</h2>
    <User/>
  </Wrapper>
)