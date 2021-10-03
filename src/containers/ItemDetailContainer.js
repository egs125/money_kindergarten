import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { registerNewWish, updateWish } from 'modules/wishInfo';
import { registerNewIncome, updateIncome } from 'modules/incomeInfo';
import { registerNewExpense, updateExpense } from 'modules/expenseInfo';
import ItemDetail from 'components/ItemDetail';

const ItemDetailContainer = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { state: { type, actionType, targetItem, targetMonth } } = location;

  const { userObj } = useSelector(state => ({
    userObj: state.userInfo.userObj,
  }));

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [item, setItem] = useState(() => {
    const tempItem = {
      remark: '',
    };

    switch (type) {
      case 'incomes':
        tempItem.priority = '';
        tempItem.itemName = '';
        tempItem.itemAmount = 0;
        break;
      case 'expense':
        tempItem.itemType = 'salary';
        tempItem.itemTypeName = '급여';
        tempItem.itemPrice = 0;
        break;
      case 'wishList':
        tempItem.priority = '';
        tempItem.itemName = '';
        tempItem.itemPrice = 0;
        tempItem.isPurchased = false;
        break;
      default:
        break;
    }

    return tempItem;
  });

  // 항목 변경 이벤트 핸들러
  const onChangeItem = (e) => {
    const { target: { name, value } } = e;
    const tempItem = { ...item };
    let newValue = value;

    const incomeTypeMap = new Map([
      ['salary', '급여'],
      ['financial', '금융 수입'],
      ['etc', '기타 수입'],
    ]);

    switch (name) {
      case 'priority':
      case 'itemPrice':
      case 'itemAmount':
        newValue = Number(newValue.replace(/[^0-9]/gi, ''));
        break;
      case 'itemName':
      case 'remark':
        break;
      case 'itemType':
        if (type === 'incomes') {
          tempItem.itemTypeName = incomeTypeMap.get(value);
        }
        break;
      default:
        break;
    }

    tempItem[name] = newValue;

    setItem(tempItem);
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
    const param = {
      userEmail: userObj.user.email,
      item,
      curYm: targetMonth,
    };

    dispatch(action(param));
  };

  const onClickMovingCheckBox = e => {
    console.log(e, item);
    const { target: { checked } } = e;

    if (checked) {
      setOpenDatePicker(true);
    }
  };

  // action 유형에 따라 module action mapping
  const mapActions = () => {
    let action = '';

    const wishActionMap = new Map([
      ['add', registerNewWish],
      ['update', updateWish],
    ]);

    const incomeActionMap = new Map([
      ['add', registerNewIncome],
      ['update', updateIncome],
    ]);

    const expenseActionMap = new Map([
      ['add', registerNewExpense],
      ['update', updateExpense],
    ]);

    switch (type) {
      case 'wishList':
        action = wishActionMap.get(actionType);
        break;
      case 'incomes':
        action = incomeActionMap.get(actionType);
        break;
      case 'expense':
        action = expenseActionMap.get(actionType);
        break;
      default:
        break;
    }

    return action;
  };

  // detail page title mapping
  const mapPageTitle = () => {
    let ym = '';
    let typeText = '';
    let actionText = '';

    const tempYm = targetMonth.split('-');
    ym = `${tempYm[0]}년 ${Number(tempYm[1])}월`;

    switch (type) {
      case 'wishList':
        typeText = '장바구니';
        break;
      case 'incomes':
        typeText = '수입';
        break;
      case 'expense':
        typeText = '지출';
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

    return `${ym} ${typeText} ${actionText}`;
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
        type={type}
        item={item}
        onChangeItem={onChangeItem}
        onClickPrevBtn={onClickPrevBtn}
        onClickSubmitBtn={onClickSubmitBtn}
        onClickMovingCheckBox={onClickMovingCheckBox}
      />
    </div>
  )
};

export default ItemDetailContainer;
