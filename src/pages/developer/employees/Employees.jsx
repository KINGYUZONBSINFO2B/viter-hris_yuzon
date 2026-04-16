import React from 'react'
import Layout from '../Layout'
import { FaPlus } from 'react-icons/fa'
import { StoreContext } from '../../../store/StoreContext';
import { setIsAdd } from '../../../store/StoreAction';
import EmployeesList from './EmployeesList';

const Employees = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  return (
    <>
          <Layout menu="employees">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1>Employees</h1>
          <div>
            <button
              className="flex gap-1 hover:underline items-center"
              type="button"
              //onClick={handleAdd}
            >
              <FaPlus className="text-primary" /> Add
            </button>
          </div>
        </div>
        {/* Page Content */}
        <div>
          <EmployeesList itemEdit={itemEdit} setItemEdit={setItemEdit} />
        </div>
      </Layout>

      {/* {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />} */}
 
    </>
  )
}

export default Employees
