import React from 'react';

const PageContainer = (props) => {
  return <div className='w-2/3 my-8 mx-auto'>{props.children}</div>;
};

export default PageContainer;
