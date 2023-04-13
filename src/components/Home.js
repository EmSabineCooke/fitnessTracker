import React from 'react';
import { useNavigate } from 'react-router';

const HomePage = () => {

  const navigate = useNavigate();

  const routinesClick = () => {
    navigate('/routines');
  }

  const activitiesClick = () => {
    navigate('/activities')
  }


  return (
    <React.Fragment>
      <h1>Welcome to Fitness Trackr!</h1>
      <h3>Login or sign up to view your fitness routines and activities</h3>
      <nav>
        <button id='allRoutines' onClick={routinesClick}>Routines</button>
        <button id='allActivities' onClick={activitiesClick}>Activities</button>
      </nav>

    </React.Fragment>

  )
}

export default HomePage;