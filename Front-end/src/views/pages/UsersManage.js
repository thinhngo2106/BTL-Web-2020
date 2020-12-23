import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../../actions/userActions';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import '../css/userManage.css'
import {USER_DELETE_RESET } from '../../constants/userConstants';

function UsersManage(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DELETE_RESET,
    });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user.idUser));
    }
  };
  return (
    <div className="users">
    <h1>Users</h1>
    {loadingDelete && <LoadingBox></LoadingBox>}
    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
    {successDelete && (
      <MessageBox variant="success">Xóa người dùng thành công</MessageBox>
    )}
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div className="table-content">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>IS ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.idUser}>
              <td>{user.idUser}</td>
              <td>{user.userFname} {user.userLname}</td>
              <td>{user.userEmail}</td>
             
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              <td>
                <button
                  type="button"
                  className="small"
                  onClick={() => props.history.push(`/user/${user.idUser}/edit`)}
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  className="small"
                  onClick={() => deleteHandler(user)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
  </div>
  );
}

export default UsersManage;