import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Typography } from "@material-tailwind/react";
import { ManageUSERPageDescriptions, ManageUSERPageColumns } from '@/data/pages-data/manage-user-data/manage-user-data';
import ViewUSERSingleModal from './local-components/main-modals/view-users-single-modal';
import { USERViewInterface } from '@/types/types-pages';
import { USERViewAction } from '@/store/actions/users';

export default function ManageUSERPageHistory() {
  const [singleUSEROpenModal, setSingleUSEROpenModal] = useState<boolean>(false);
  const [singleUSERDetailsData, setSingleUSERDetailsData] = useState<USERViewInterface>({
    id: NaN,
    is_superuser: false,
    username: '',
    role: NaN,
    is_active: false,
    is_logged_in: false,
    is_locked: false,
    failed_login_attempts: NaN,
    last_login: '',
    old_password: '',
    date_password_changed: null,
    date_added: '',
    date_deleted: null,
    emp_no: NaN,
    groups: [],
    user_permissions: [],
  });
  const dispatch = useDispatch();
  const { USERView } = useSelector((state: RootState) => state.users);
  const { data, status } = USERView;
  const USERViewData = data as USERViewInterface[];
  const curr_user = useSelector((state: RootState) => state.auth.employee_detail?.emp_no)

  useEffect(()=> {
    if((USERViewData?.length <= 0 || USERViewData === null || USERViewData === undefined ) && curr_user){
      dispatch(USERViewAction())
    }
  }, [curr_user]);

  return (
    <Fragment>
      <div className="my-2 flex flex-wrap justify-between items-start gap-6">
        <div>
          <ViewUSERSingleModal setSingleUSERDetailsData={setSingleUSERDetailsData} singleUSERDetailsData={singleUSERDetailsData} singleUSEROpenModal={singleUSEROpenModal} setSingleUSEROpenModal={setSingleUSEROpenModal}/>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400", marginTop: '4px'}}>
          <p>{ManageUSERPageDescriptions}</p>
        </Typography>
        <Typography style={{width: "100%", fontSize: "12px", fontWeight: "400"}}>
          <i>Click on the Table Headers to Customize View, Sort, or Add/Remove Columns</i>
        </Typography>
        </div>
      </div>
      <div style={{ height: '600px', width: '100%' }}>
        <DataGrid
          rows={USERViewData? USERViewData as USERViewInterface[]:[]}
          columns={ManageUSERPageColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[25, 50, 75, 100]}
          onRowClick={(e) => {
            setSingleUSERDetailsData(e.row);
            setSingleUSEROpenModal(true);
          }}
          disableRowSelectionOnClick 
          localeText={{ noRowsLabel: `${status === 'loading' ? `${status?.toUpperCase()}...` : status === 'failed' ?  'No Users found. Contact your administrator/support.' : (status === null || status === undefined) ? 'The caller for USER Epic hasn\'t been set up, please contact your frontend developer': 'There is no USER to generate.'}` }}
        />
      </div>
    </Fragment>
  );
}
