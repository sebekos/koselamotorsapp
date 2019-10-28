import React from 'react';
import EditModal from '../modal/EditModal';
import AddGallery from './AddGallery';

const Dashboard = () => {
  return (
    <section className='dashboard'>
      <div className='container'>
        <div className='instructions'>
          <h1>Edit Text</h1>
          <p>Go to any page, double click on any text box then save.</p>
        </div>
        <div className='instructions'>
          <h1>Photo Tools</h1>
          <AddGallery />
        </div>
        <EditModal />
      </div>
    </section>
  );
};

export default Dashboard;
