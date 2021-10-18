import Head from 'next/head';
import { Typography } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import Swap from '../../components/ffSwaps';
import Overview from '../../components/ffOverview';
import Assets from '../../components/ffAssets';

import classes from './home.module.css';

function Home({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme} title={ '' }>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Typography className={classes.mainHeading} variant='h1'>Curve Liquidity Pool</Typography>
        <Typography className={classes.mainDesc} variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
        </Typography>
        <Overview />
        <Assets />
      </div>
    </Layout>
  );
}

// <Swap />

export default Home;
