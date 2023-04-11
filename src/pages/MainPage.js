import React from 'react';
import Header from '../components/Header';
import PageContainer from '../components/PageContainer';
import Grid from '../components/Grid';
import FormContainer from '../components/FormContainer';

const MainPage = () => {
  return (
    <div className='App'>
      <PageContainer>
        <Header />
        <FormContainer />
        <Grid />
      </PageContainer>
    </div>
  );
};

export default MainPage;
