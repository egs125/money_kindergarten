import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { registerNewWish } from 'modules/wishInfo';
import ItemDetail from 'components/ItemDetail';

const ItemDetailContainer = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const { state: { type, actionType } } = location;

  const { userObj } = useSelector(state => ({
    userObj: state.userInfo.userObj,
  }));

  const [item, setItem] = useState({
    priority: '',
    itemName: '',
    itemPrice: 0,
    remark: '',
  });

  const curYm = moment().format('YYYY-MM');

  const onChangeItem = (e) => {
    const { target: { name, value } } = e;
    setItem({
      ...item,
      [name]: name === 'itemPrice' ? Number(value) : value,
    });
  };

  const onClickSubmitBtn = () => {
    const action = mapActions();
    const param = mapParamObj();
    dispatch(action(param));
  };

  const mapActions = () => {
    let action = '';

    const wishActionMap = new Map([
      ['add', registerNewWish],
    ]);

    switch (type) {
      case 'wishList':
        action = wishActionMap.get(actionType);
        break;
      default:
        break;
    }

    return action;
  };

  const mapParamObj = () => {
    let paramObj = {};

    switch (type) {
      case 'wishList':
        if (actionType === 'add') {
          paramObj = {
            userEmail: userObj.user.email,
            item,
            curYm,
          };
        }
        break;
      default:
        break;
    }

    return paramObj;
  };

  return (
    <div>
      add1!!!!
      <ItemDetail
        item={item}
        onChangeItem={onChangeItem}
        onClickSubmitBtn={onClickSubmitBtn}
      />
    </div>
  )
};

export default ItemDetailContainer;
