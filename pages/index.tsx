import Head from 'next/head';
import React from 'react';
import Layout from '../components/layout/Layout/Layout';
import CurrentLocation from '../components/weather/CurrentLocation/CurrentLocation';
import SavedLocations from '../components/weather/SavedLocations/SavedLocations';
import AddLocation from '../components/weather/AddLocation/AddLocation';
import SingleLocation from '../components/weather/SingleLocation/SingleLocation';

const Homepage = () => {
  return (
    <Layout>
      <Head>
        <title>Weather App</title>
        <meta
          name='description'
          content="A weather app that let's you find the weather for anywhere in the world"
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap'
          rel='stylesheet'
        />
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        ></script>
      </Head>
      <CurrentLocation />
      <SavedLocations />
      <AddLocation />
      <SingleLocation />
    </Layout>
  );
};

export default Homepage;
