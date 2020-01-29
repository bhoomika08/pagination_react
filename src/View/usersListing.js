import React from 'react';
import './userListings.css';


function UserListing(props) {
  return (
    <>
      <table id='students'>
            <tbody>
              <tr className="listElement">
                <td>id</td>
                <td>Name</td>
                <td>Email</td>
              </tr>
        {props.data.map((item, key) => (
        <tr className="listElement" key={key}>
          <td>{item.id}</td>  
          <td>{item.name}</td>
          <td>{item.email}</td>
        </tr>
        ))}
      </tbody>
          </table>  
    </>    
  )
}

export default UserListing;