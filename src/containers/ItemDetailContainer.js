import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { registerNewWish, updateWish } from 'modules/wishInfo';
import ItemDetail from 'components/ItemDetail';

const ItemDetailContainer = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { state: { type, actionType, targetItem, targetMonth } } = location;

  const { userObj } = useSelector(state => ({
    userObj: state.userInfo.userObj,
  }));

  const [item, setItem] = useState({
    priority: '',
    itemName: '',
    itemPrice: 0,
    remark: '',
  });

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
    history.push({
      pathname: `/${type}`,
      state: { targetMonth },
    });
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
      ['update', updateWish],
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
        paramObj = {
          userEmail: userObj.user.email,
          item,
          curYm: targetMonth,
        };
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
      case 'update':
        actionText = '수정';
        break;
      default:
        break;
    }

    return `${typeText} ${actionText}`;
  };

  useEffect(() => {
    if (targetItem) {
      setItem(targetItem);
    }
  }, [targetItem, targetMonth]);

  return (
    <div className="child-container">
      <div className="vertical-empty-space" />
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
