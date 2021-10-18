import React, { useState, useEffect } from 'react';
import { Typography, Paper, Switch, Button, Tooltip } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import { useRouter } from 'next/router';
import FFWarning  from '../ffWarning';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import TimerIcon from '@material-ui/icons/Timer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import WarningIcon from '@material-ui/icons/Warning';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TableChartIcon from '@material-ui/icons/TableChart';
import BuildIcon from '@material-ui/icons/Build';

import { SvgIcon } from "@material-ui/core";

import Unlock from '../unlock';

import stores from '../../stores';
import { formatAddress } from '../../utils';

import classes from './navigation.module.css';

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: '#212529',
      '& + $track': {
        backgroundColor: '#ffffff',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid #212529`,
    backgroundColor: '#212529',
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

function Navigation(props) {
  const router = useRouter();

  const account = stores.accountStore.getStore('account');

  const [darkMode, setDarkMode] = useState(false);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);

  function handleNavigate(route) {
    router.push(route);
  }

  const onMenuClicked = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleChange = (event, val) => {
    setDarkMode(val);
    props.changeTheme(val);
  };

  const onAddressClicked = () => {
    setUnlockOpen(true);
  };

  const closoeUnlock = () => {
    setUnlockOpen(false);
  };

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);

    const localStorageWarningAccepted = window.localStorage.getItem('fixed.forex-warning-accepted');
    setWarningOpen(localStorageWarningAccepted ? localStorageWarningAccepted !== 'accepted' : true);
  }, []);

  useEffect(
    function () {
      setDarkMode(props.theme.palette.type === 'dark' ? true : false);
    },
    [props.theme],
  );

  const activePath = router.asPath;
  const renderNavs = () => {
    return (
      <React.Fragment>
        {renderNav(
          'Mint Assets',
          'mint',
        )}
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Liquidity Providing'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'CRV LP',
            'home',
          )}
          {renderSubNav(
            'Uniswap LP',
            'staking',
          )}
          {renderSubNav(
            'Withdraw Inactive',
            'withdraw',
          )}
        </div>
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Rewards'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'rKP3R Options',
            'options',
          )}
          {renderSubNav(
            'Claim',
            'rewards',
          )}
        </div>
        <div className={classes.sectionDivider}></div>
        {renderSectionHeader(
          'Governance'
        )}
        <div className={ classes.subAssets }>
          {renderSubNav(
            'Vest',
            'vest',
          )}
          {renderSubNav(
            'Vote',
            'vote',
          )}
        </div>
      </React.Fragment>
    );
  };

  /*

  <div className={ classes.subAssets }>
    {renderSubNav(
      'ibAUD',
      'asset/0x3F1B0278A9ee595635B61817630cC19DE792f506/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x3F1B0278A9ee595635B61817630cC19DE792f506/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibCHF',
      'asset/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x9c2C8910F113181783c249d8F6Aa41b51Cde0f0c/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibEUR',
      'asset/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/curve',
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon} src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x96E61422b6A9bA0e068B6c5ADd4fFaBC6a4aae27/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibGBP',
      'asset/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0xD6Ac1CB9019137a896343Da59dDE6d097F710538/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibJPY',
      'asset/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x8818a9bb44Fbf33502bE7c15c500d0C783B73067/logo-128.png" alt="" height="30px" width="30px" />,
    )}
    {renderSubNav(
      'ibKRW',
      'asset/0x95dFDC8161832e4fF7816aC4B6367CE201538253/curve',
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
      <img className={classes.subIcon}  src="https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/0x95dFDC8161832e4fF7816aC4B6367CE201538253/logo-128.png" alt="" height="30px" width="30px" />,
    )}
  </div>

  */

  const openWarning = () => {
    setWarningOpen(true)
  }

  const closeWarning = () => {
    window.localStorage.setItem('fixed.forex-warning-accepted', 'accepted');
    setWarningOpen(false)
  }

  const renderSectionHeader = (title) => {
    return (
      <div
        className={classes.navigationOptionContainer}
      >
        <div className={classes.navigationOptionNotSelected}></div>
        <Typography variant="h2" className={ classes.sectionText}>{title}</Typography>
      </div>
    );
  };

  const renderNav = (title, link) => {
    return (
      <div
        className={classes.navigationOptionContainer}
        onClick={() => {
          handleNavigate('/' + link);
        }}
      >
        {activePath.includes('/' + link) ? (
          <div className={darkMode ? classes.navigationOptionSelectedWhite : classes.navigationOptionSelected}></div>
        ) : (
          <div className={classes.navigationOptionNotSelected}></div>
        )}
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
      </div>
    );
  };

  const renderSubNav = (title, link) => {
    return (
      <div
        className={classes.navigationSubOptionContainer}
        onClick={() => {
          handleNavigate('/' + link);
        }}
      >
        {activePath.includes('/' + link) ? (
          <div className={darkMode ? classes.navigationOptionSelectedWhite : classes.navigationOptionSelected}></div>
        ) : (
          <div className={classes.navigationOptionNotSelected}></div>
        )}
        <Typography variant="h2" className={ classes.subtitleText}>{title}</Typography>
      </div>
    );
  };

  return (
    <Paper elevation={0} className={classes.navigationContainer}>
      <div className={classes.navigationHeading}>
        <a onClick={() => router.push('/welcome')} className={classes.linkz}>
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
        </a>
      </div>

      <div className={classes.navigationContent}>{renderNavs()}</div>

      {menuOpen && (
        <Paper elevation={0} className={classes.navigationContentMobile}>
          <div className={classes.menuIcon}>
            <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={onMenuClicked} disableElevation>
              <CloseIcon fontSize={'large'} />
            </Button>
          </div>

          <div className={classes.navigationHeading}>
            <a onClick={() => router.push('/')} className={classes.linkz}>
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
            </a>
          </div>

          <div className={classes.navigationContentNavs}>{renderNavs()}</div>
          <div className={classes.headerThings}>
            <div className={classes.themeSelectContainer}>
              <StyledSwitch
                icon={<Brightness2Icon className={classes.switchIcon} />}
                checkedIcon={<WbSunnyOutlinedIcon className={classes.switchIcon} />}
                checked={darkMode}
                onChange={handleToggleChange}
              />
            </div>
            <Button disableElevation className={classes.accountButton} variant="contained" color="secondary" onClick={onAddressClicked}>
              <div className={`${classes.accountIcon} ${classes.metamask}`}></div>
              <Typography variant="h5">{account ? formatAddress(account.address) : 'Connect Wallet'}</Typography>
            </Button>

            {unlockOpen && <Unlock modalOpen={unlockOpen} closeModal={closoeUnlock} />}
          </div>
        </Paper>
      )}

      <div className={classes.menuIcon}>
        <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={onMenuClicked} disableElevation>
          <MenuIcon fontSize={'large'} />
        </Button>
      </div>

      {props.backClicked && (
        <div className={classes.backButtonContainer}>
          <div className={classes.backButton}>
            <Button color={props.theme.palette.type === 'light' ? 'primary' : 'secondary'} onClick={props.backClicked} disableElevation>
              <ArrowBackIcon fontSize={'large'} />
            </Button>
          </div>
        </div>
      )}

      <div className={classes.socials}>
        <Tooltip title={ 'This project is in early beta. Please be cautious when using this UI and all smart contracts this UI interfaces with. You should only use this interface if you understand and accept the risks involved.' }>
          <img src='/images/icon-warning.svg' className={ classes.warningIcon } onClick={ openWarning }/>
        </Tooltip>
      </div>
      <Typography className={classes.smallVersion}>Version 0.6.0-beta</Typography>
      { warningOpen &&
        <FFWarning close={ closeWarning } />
      }
    </Paper>
  );
}

export default withTheme(Navigation);
