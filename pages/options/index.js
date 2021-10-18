import Head from 'next/head';
import { Typography } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import OptionsOverview from '../../components/ffOptionsOverview';
import FFOptions from '../../components/ffOptions';

import classes from './options.module.css';

function Options({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
      <Typography className={classes.mainHeading} variant='h1'>rKP3R Options</Typography>
        <Typography className={classes.mainDesc} variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
        </Typography>
        <OptionsOverview />
        <FFOptions />
      </div>
    </Layout>
  );
}

export default Options;
