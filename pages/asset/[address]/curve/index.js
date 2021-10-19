import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Paper, Grid, Typography } from '@material-ui/core';
import Head from 'next/head';
import Layout from '../../../../components/layout/layout.js';
import FfAssetOverview from '../../../../components/ffAssetOverview'
import FFCurveLiquidity from '../../../../components/ffCurveLiquidity'
import FFCurveGauge from '../../../../components/ffCurveGauge'
import FFClaimCurveGauge from '../../../../components/ffClaimCurveGauge'
import FFClaimCurveRKP3RGauge from '../../../../components/ffClaimCurveRKP3RGauge'

import classes from './curve.module.css';

import stores from '../../../../stores/index.js';
import { FIXED_FOREX_UPDATED } from '../../../../stores/constants';
import { formatCurrency } from '../../../../utils';

function Asset({ changeTheme }) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const router = useRouter();
  const [asset, setAsset] = useState(null);

  useEffect(function () {
    const fixedForexUpdated = () => {
      const ass = stores.fixedForexStore.getAsset(router.query.address)
      setAsset(ass)
      forceUpdate()
    };

    //set asset
    const ass = stores.fixedForexStore.getAsset(router.query.address)
    setAsset(ass)

    //register emitters
    stores.emitter.on(FIXED_FOREX_UPDATED, fixedForexUpdated);

    return () => {
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, fixedForexUpdated);
    };
  }, []);

  useEffect(function () {
    //set asset
    const ass = stores.fixedForexStore.getAsset(router.query.address)
    setAsset(ass)
  }, [router.query.address])

  return (
    <Layout changeTheme={changeTheme}>
      <Head>
        <title>Fixed Forex</title>
      </Head>
      <div className={classes.container}>
        <FfAssetOverview asset={ asset } />


        <Grid container className={classes.xxxContainer} spacing={0}>
          <Grid className={classes.xxx} item lg={8} md={12} sm={12} xs={12}>
            <FFCurveLiquidity asset={ asset } />
            <FFCurveGauge asset={ asset } />
          </Grid>
          <Grid className={classes.xxx2} item lg={4} md={12} sm={12} xs={12}>
          <FFClaimCurveGauge asset={ asset } />
          <FFClaimCurveRKP3RGauge asset={ asset } />
          </Grid>
        </Grid>



      </div>
    </Layout>
  );
}

export default Asset;
