import React, { useState, useEffect } from 'react';

import { Typography, Switch, Button, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import { useRouter } from "next/router";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import { CONNECT_WALLET, ACCOUNT_CONFIGURED, ACCOUNT_CHANGED, FIXED_FOREX_BALANCES_RETURNED, FIXED_FOREX_CLAIM_VECLAIM, FIXED_FOREX_VECLAIM_CLAIMED, FIXED_FOREX_UPDATED, ERROR } from '../../stores/constants';

import Unlock from '../unlock';

import stores from '../../stores';
import { formatAddress } from '../../utils';

import classes from './welcomeHeader.module.css';
import HelpIcon from '@material-ui/icons/Help';
import { useHotkeys } from 'react-hotkeys-hook';

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    paddingTop: 1.5,
    width: '75%',
    margin: 'auto',
    '&$checked': {
      transform: 'translateX(28px)',
      color: 'rgba(128,128,128, 1)',
      width: '30%',
      '& + $track': {
        backgroundColor: 'rgba(0,0,0, 0.3)',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    },
  },
  track: {
    borderRadius: 32 / 2,
    border: '1px solid rgba(128,128,128, 0.2)',
    backgroundColor: 'rgba(0,0,0, 0)',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function Header(props) {

  const accountStore = stores.accountStore.getStore('account');
  const router = useRouter();

  const [account, setAccount] = useState(accountStore);
  const [toggleAboutModal, setToggleAboutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(props.theme.palette.type === 'dark' ? true : false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [chainInvalid, setChainInvalid] = useState(false)
  const [claimable, setClaimable] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const accountConfigure = () => {
      const accountStore = stores.accountStore.getStore('account');
      setAccount(accountStore);
      closeUnlock();
    };
    const connectWallet = () => {
      onAddressClicked();
    };
    const accountChanged = () => {
      const invalid = stores.accountStore.getStore('chainInvalid');
      setChainInvalid(invalid)
    }
    const balancesReturned = () => {
      const rewards = stores.fixedForexStore.getStore('rewards')
      setClaimable(rewards?.veClaimRewards?.claimable)
    }
    const claimedReturned = () => {
      const rewards = stores.fixedForexStore.getStore('rewards')
      setClaimable(rewards?.veClaimRewards?.claimable)
      setLoading(false)
    }

    const invalid = stores.accountStore.getStore('chainInvalid');
    setChainInvalid(invalid)

    stores.emitter.on(ACCOUNT_CONFIGURED, accountConfigure);
    stores.emitter.on(CONNECT_WALLET, connectWallet);
    stores.emitter.on(ACCOUNT_CHANGED, accountChanged);
    stores.emitter.on(FIXED_FOREX_UPDATED, balancesReturned);
    stores.emitter.on(FIXED_FOREX_BALANCES_RETURNED, balancesReturned);
    stores.emitter.on(FIXED_FOREX_VECLAIM_CLAIMED, claimedReturned);
    stores.emitter.on(ERROR, claimedReturned);
    return () => {
      stores.emitter.removeListener(ACCOUNT_CONFIGURED, accountConfigure);
      stores.emitter.removeListener(CONNECT_WALLET, connectWallet);
      stores.emitter.removeListener(ACCOUNT_CHANGED, accountChanged);
      stores.emitter.removeListener(FIXED_FOREX_UPDATED, balancesReturned);
      stores.emitter.removeListener(FIXED_FOREX_BALANCES_RETURNED, balancesReturned);
      stores.emitter.removeListener(FIXED_FOREX_VECLAIM_CLAIMED, claimedReturned);
      stores.emitter.removeListener(ERROR, claimedReturned);
    };
  }, []);

  const handleToggleChange = (event, val) => {
    setDarkMode(val);
    props.changeTheme(val);
  };

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closeUnlock = () => {
    setUnlockOpen(false);
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);
  }, []);

  const navigate = (url) => {
    router.push(url)
  }

  const callClaim = () => {
    setLoading(true)
    stores.dispatcher.dispatch({ type: FIXED_FOREX_CLAIM_VECLAIM, content: {} })
  }

  return (
    <div>
      <Paper elevation={0} className={classes.headerContainer}>
        {
          props.title && <Typography className={ classes.pageTitle }>
            { props.title }
          </Typography>
        }
        <SvgIcon
          viewBox="0 0 120 40"
          fill="none"
          width="120px"
          height="26px"
          className={classes.yearnLogo}
        >
        <g>
	<rect x="10.2" y="5.7" width="4.4" height="13.9"/>
	<path d="M2.6,1.9C2.1,2.5,1.8,3.5,1.8,4.6v1H0v2.8h1.8v11.1h4.4V8.5h2.6V5.7H6.2V5c0-1.5,1-1.7,2.6-1.6V0.2
		C6.2-0.1,3.7,0.3,2.6,1.9z"/>
	<rect x="10.2" y="0.1" width="4.4" height="3.6"/>
	<polygon points="30.2,5.7 25.5,5.7 23.6,9.2 23.5,9.2 21.4,5.7 16.4,5.7 20.8,12.3 15.9,19.6 20.8,19.6 23.3,15.4 23.3,15.4
		25.6,19.6 30.8,19.6 26,12.2 	"/>
	<path d="M42.2,7c-1.2-1.1-2.8-1.7-4.8-1.7c-4.2,0-7.1,3.2-7.1,7.3c0,4.2,2.8,7.4,7.4,7.4c1.8,0,3.2-0.5,4.3-1.3
		c1.2-0.8,2-2,2.3-3.3h-4.3c-0.4,0.9-1.1,1.4-2.3,1.4c-1.8,0-2.9-1.2-3.1-3h10C44.7,10.9,43.9,8.5,42.2,7z M34.7,11.1
		c0.3-1.7,1.2-2.7,2.9-2.7c1.4,0,2.5,1.1,2.6,2.7H34.7z"/>
	<path d="M55.6,7.2L55.6,7.2c-0.9-1.2-2-2-4-2c-3.6,0-6.1,3-6.1,7.4c0,4.6,2.5,7.4,6.1,7.4c1.8,0,3.3-0.9,4.1-2.3h0.1v1.9H60V0.1
		h-4.4V7.2z M52.7,16.5C51,16.5,50,15,50,12.6c0-2.3,1-4,2.8-4c1.9,0,2.9,1.7,2.9,4C55.7,14.9,54.6,16.5,52.7,16.5z"/>
	<path d="M65.2,3.1c0-1.1,0.4-1.6,1.8-1.6h0.7V0c-0.1,0-0.8,0-1,0c-2.1,0-3.3,0.9-3.3,3v2.5h-2v1.4h2v12.7h1.7V6.9h2.6V5.5h-2.6V3.1
		z"/>
	<path d="M74.9,5.2c-4,0-6.5,3.2-6.5,7.4c0,4.2,2.5,7.4,6.5,7.4c4,0,6.5-3.2,6.5-7.4C81.4,8.4,79,5.2,74.9,5.2z M74.9,18.5
		c-3.2,0-4.8-2.7-4.8-6c0-3.3,1.6-6,4.8-6c3.1,0,4.8,2.7,4.8,6C79.7,15.8,78.1,18.5,74.9,18.5z"/>
	<path d="M85.3,8.1L85.3,8.1l-0.1-2.6h-1.7v14h1.7v-8c0-1.7,0.7-3,1.8-3.8c0.9-0.6,2-0.8,3-0.7V5.5c-0.1,0-0.2-0.1-0.5-0.1
		C87.6,5.4,86.1,6.5,85.3,8.1z"/>
	<path d="M96.9,5.2c-3.9,0-6.4,3.2-6.4,7.4c0,4.2,2.3,7.4,6.5,7.4c3.2,0,5.1-1.8,5.7-4.6h-1.6c-0.5,1.9-1.8,3.2-4.1,3.2
		c-3.2,0-4.7-2.5-4.8-5.6h10.7C103,8.9,101.4,5.2,96.9,5.2z M96.9,6.6c2.9,0,4.2,2.2,4.3,4.9h-8.9C92.6,8.7,94.1,6.6,96.9,6.6z"/>
	<polygon points="110.3,12 114.8,5.5 112.9,5.5 109.3,10.9 109.2,10.9 105.5,5.5 103.6,5.5 108.3,12.1 103,19.6 104.9,19.6
		109.2,13.2 109.3,13.2 113.7,19.6 115.7,19.6 	"/>
</g>
        </SvgIcon>

        <div className={classes.themeSelectContainer}>
          <StyledSwitch
            icon={<Brightness2Icon className={classes.switchIcon} />}
            checkedIcon={<WbSunnyOutlinedIcon className={classes.switchIcon} />}
            checked={darkMode}
            onChange={handleToggleChange}
          />
        </div>


        <Button
          disableElevation
          className={classes.accountButton}
          variant="contained"
          color={props.theme.palette.type === 'dark' ? 'primary' : 'secondary'}
          onClick={onAddressClicked}>
          {account && account.address && <div className={`${classes.accountIcon} ${classes.metamask}`}></div>}
          <Typography className={classes.headBtnTxt}>{account && account.address ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
        </Button>
        {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closeUnlock} />}
    </Paper>
    {chainInvalid ? (
      <div className={classes.chainInvalidError}>
        <div className={classes.ErrorContent}>
          <div className={classes.unitato}></div>
          <Typography className={classes.ErrorTxt}>
            The chain you're connected to isn't supported. Please check that your wallet is connected to Ethereum Mainnet.
          </Typography>
        </div>
      </div>
    ) : null}
    </div>
  );
}

export default withTheme(Header);
