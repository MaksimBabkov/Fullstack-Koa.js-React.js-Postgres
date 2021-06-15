import React from 'react';
import styled from 'styled-components';

import CreateVideoImg from './components/Create_Video_Img'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 
export const About = () => (
  <GridWrapper>
   <CreateVideoImg/>
  </GridWrapper>
)