import { Typography, SvgIcon } from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import BigNumber from 'bignumber.js';

import { formatCurrency } from '../../utils';
import classes from './ffAssetOverview.module.css';

function BalanceIcon(props) {
  const { color, className } = props;
  return (
    <SvgIcon viewBox="0 0 32 32" stroke-width="1" className={className}>
    <g stroke-width="2" transform="translate(0, 0)"><line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="28" y1="12" x2="25" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="21" y1="12" x2="19" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="15" y1="12" x2="13" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="9" y1="12" x2="7" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="3" y1="12" x2="1" y2="12" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="28" y1="26" x2="25" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="21" y1="26" x2="19" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="15" y1="26" x2="13" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="9" y1="26" x2="7" y2="26" stroke-linejoin="miter"></line> <line fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" x1="3" y1="26" x2="1" y2="26" stroke-linejoin="miter"></line> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M28,16V8h-6H9H4 C2.343,8,1,6.657,1,5v21c0,2.209,1.791,4,4,4h23v-8" stroke-linejoin="miter"></path> <path data-color="color-2" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M31,22h-7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h7V22z" stroke-linejoin="miter"></path> <path fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="square" stroke-miterlimit="10" d="M22,4V2H4 C2.343,2,1,3.343,1,5v0c0,1.657,1.343,3,3,3" stroke-linejoin="miter"></path></g>
  </SvgIcon>
  );
}

export default function ffAssetOverview({ asset }) {

  let balance = 0
  if(asset && asset.gauge) {
    let pooledBalance = BigNumber(asset.gauge.userPoolBalance).times(asset.gauge.virtualPrice)
    let stakedBalance = BigNumber(asset.gauge.userGaugeBalance).times(asset.gauge.virtualPrice)
    balance = BigNumber(asset.balance).plus(pooledBalance).plus(stakedBalance)
  }

  return (
    <div className={ classes.container }>
      <div className={ classes.assetTitleContainer }>
        <div className={ classes.assetTitle }>
          <img className={ classes.assetIcon } src={ asset ? `https://raw.githubusercontent.com/iearn-finance/yearn-assets/master/icons/tokens/${asset.address}/logo-128.png` : '/unknown-logo.png'} alt='' height='60px' width='60px' />
          <div>
            <Typography className={ classes.assetName }>{ asset ? asset.name : '' }</Typography>
            <Typography className={ classes.assetPrice }>${ formatCurrency(asset ? asset.price : 0) }</Typography>
          </div>
        </div>
        <div className={ classes.assetBalance }>
          <div className={classes.iconWrap}>
            <BalanceIcon className={ classes.overviewIcon } />
          </div>
          <div className={ classes.flex1 }>
            <Typography className={ classes.assetName } align='right'>{ formatCurrency(balance) }</Typography>
            <Typography className={ classes.assetPrice } align='right'>${ formatCurrency(asset ? BigNumber(asset.price).times(balance) : 0) }</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
