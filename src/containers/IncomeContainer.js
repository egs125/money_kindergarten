import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readIncome } from '../modules/incomeInfo';
import { registerNewAccount, login } from 'modules/userInfo';

const IncomeContainer = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login());
  }, []);
  
  return (
    <div>
      income
    </div>
  );
};

export default IncomeContainer;