import React from 'react';
import Header from '../components/Header';
import PageContainer from '../components/PageContainer';
import Grid from '../components/Grid';
import FormContainer from '../components/FormContainer';
import UiStates from '../components/UiStates';
import { useAtom } from 'jotai';
import {
  generateGridAtom,
  generateInitialGridAtom,
} from '../components/formContainer.atoms';

const MainPage = () => {
  const [generateGrid] = useAtom(generateGridAtom);
  const [generateInitialGrid] = useAtom(generateInitialGridAtom);
  return (
    <div className='App'>
      <PageContainer>
        <Header />
        <FormContainer />
        <Grid />
        {generateGrid || generateInitialGrid ? <UiStates /> : ''}
      </PageContainer>
    </div>
  );
};

export default MainPage;
