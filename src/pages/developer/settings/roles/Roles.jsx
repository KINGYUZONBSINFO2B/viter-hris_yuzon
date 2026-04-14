import React from "react";
import Layout from "../../Layout";
import RolesList from "./RolesList";
import { StoreContext } from "../../../../store/StoreContext";
import { setIsAdd } from "../../../../store/StoreAction";
import { FaPlus } from "react-icons/fa";
import ModalAddRoles from "./ModalAddRoles";

const Roles = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <Layout menu="settings" submenu="roles">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1>Roles</h1>
          <div>
            <button
              className="flex gap-1 hover:underline items-center"
              type="button"
              onClick={handleAdd}
            >
              <FaPlus className="text-primary" /> Add
            </button>
          </div>
        </div>
        {/* Page Content */}
        <div>
          <RolesList />
        </div>
      </Layout>

      {store.isAdd && <ModalAddRoles itemEdit={itemEdit} />}
    </>
  );
};

export default Roles;
