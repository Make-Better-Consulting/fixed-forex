import Head from 'next/head';
import { Typography } from "@material-ui/core";
import Layout from '../../components/layout/layout.js';
import Tokens from '../../components/ffUniV3Tokens';
import Rewards from '../../components/ffUniV3Rewards';
import Overview from '../../components/ffStakeOverview';

import classes from './staking.module.css';

function Staking({ changeTheme }) {

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.ffContainer}>
        <Typography className={classes.mainHeading} variant='h1'>Uniswap Liquidity Pool</Typography>
        <Typography className={classes.mainDesc} variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.
        </Typography>
        <Overview />
        <Tokens />
        <Rewards />
      </div>
    </Layout>
  );
}

export default Staking;
