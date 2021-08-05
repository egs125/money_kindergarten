import React, { useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { registerNewWish } from 'modules/wishInfo';
import ItemDetail from 'components/ItemDetail';
import { SwitchVideo } from '@material-ui/icons';

const ItemDetailContainer = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

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

  // 항목 변경 이벤트 핸들러
  const onChangeItem = (e) => {
    const { target: { name, value } } = e;
    let newValue = value;

    switch (name) {
      case 'priority':
      case 'itemPrice':
        newValue = Number(newValue.replace(/[^0-9]/gi, ''));
        break;
      case 'itemName':
      case 'remark':
        break;
      default:
        break;
    }

    setItem({
      ...item,
      [name]: newValue,
    });
  };

  // 돌아가기 버튼 클릭 이벤트 핸들러
  const onClickPrevBtn = () => {
    history.push(`/${type}`);
  };

  // 저장 버튼 클릭 이벤트 핸들러
  const onClickSubmitBtn = () => {
    const action = mapActions();
    const param = mapParamObj();
    dispatch(action(param));
  };

  // action 유형에 따라 module action mapping
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

  // action 유형에 따라 parameter mapping
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

  // detail page title mapping
  const mapPageTitle = () => {
    let typeText = '';
    let actionText = '';

    switch (type) {
      case 'wishList':
        typeText = '장바구니';
        break;
      default:
        break;
    }

    switch (actionType) {
      case 'add':
        actionText = '추가';
        break;
      default:
        break;
    }

    return `${typeText} ${actionText}`;
  };

  return (
    <div className="child-container">
      <div className="page-title">{mapPageTitle()}</div>
      <ItemDetail
        item={item}
        onChangeItem={onChangeItem}
        onClickPrevBtn={onClickPrevBtn}
        onClickSubmitBtn={onClickSubmitBtn}
      />
    </div>
  )
};

export default ItemDetailContainer;
