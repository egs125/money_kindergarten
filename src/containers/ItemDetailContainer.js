import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registerNewIncome, updateIncome } from 'modules/incomeInfo';
import { registerNewExpense, updateExpense } from 'modules/expenseInfo';
import ItemDetail from 'components/ItemDetail';

const ItemDetailContainer = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { state: { type, actionType, targetItem, targetMonth } } = location;

  const [item, setItem] = useState(() => {
    const tempItem = {
      remark: '',
    };

    switch (type) {
      case 'income':
        tempItem.itemAmount = 0;
        break;
      case 'expense':
        tempItem.itemPrice = 0;
        tempItem.itemType = '';
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

    switch (name) {
      case 'priority':
      case 'itemPrice':
      case 'itemAmount':
        newValue = Number(newValue.replace(/[^0-9]/gi, ''));
        break;
      case 'itemName':
      case 'remark':
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
      item,
      curYm: targetMonth,
    };

    dispatch(action(param));
  };

  // action 유형에 따라 module action mapping
  const mapActions = () => {
    let action = '';

    const incomeActionMap = new Map([
      ['add', registerNewIncome],
      ['update', updateIncome],
    ]);

    const expenseActionMap = new Map([
      ['add', registerNewExpense],
      ['update', updateExpense],
    ]);

    switch (type) {
      case 'income':
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
      case 'income':
        typeText = '충전';
        break;
      case 'expense':
        typeText = '사용';
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
      />
    </div>
  )
};

export default ItemDetailContainer;
