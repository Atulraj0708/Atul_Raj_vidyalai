import React from 'react';
import styled from '@emotion/styled';
import useUserData from './useUserData';

const Table = styled.table(() => ({
  width: '100%',
  borderCollapse: 'collapse',

  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },

  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },

  '.sort-icon': {
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
}));

const UserList = () => {
  const { users, columnFields, handleOnSearch, handleSort, sortColumn, sortDirection, error } = useUserData();

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {columnFields.map(field => (
              <th key={field.value}>
                <div onClick={() => handleSort(field.value)} style={{ paddingBottom: 8 }}>
                  {field.label}
                  {sortColumn === field.value && (
                    sortDirection === 'asc' ? (
                      <span className={'sort-icon'}>▲</span>
                    ) : (
                      <span className={'sort-icon'}>▼</span>
                    )
                  )}
                </div>
                {field.enableSearch && (
                  <input
                    type={'text'}
                    placeholder={`Search by ${field.label}`}
                    name={field.value}
                    onChange={handleOnSearch}
                    style={{ padding: 6, width: 200 }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {columnFields.map(field => (
                <td key={field.value}>{user[field.value]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div></div>
    </div>
  );
};

export default UserList;