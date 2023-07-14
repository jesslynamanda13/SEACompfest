import React, { createContext, useEffect, useState } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {

  const [budget, setBudget] = useState(0);
  const initialBudget = 500000

  useEffect(() => {
    const savedBudget = () => {
      const saldo = localStorage.getItem('budget')
      if(saldo){
        setBudget(parseInt(saldo))
      }else{
        setBudget(initialBudget)
        localStorage.setItem("budget", initialBudget.toString())
      }
    }
    savedBudget();
  }, [])
  return (
    <BudgetContext.Provider value={[budget, setBudget]}>
      {children}
    </BudgetContext.Provider>
  );
};
