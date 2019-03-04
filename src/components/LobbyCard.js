import React from 'react';

const LobbyCard = ({lobbyName, host, joinLobby}) => (
  <div className="card col-md-6 lobby-card">
    <div className="card-header">
      <h5>{lobbyName}</h5>
    </div>
    <div className="card-body">
      <h6 className="card-title"> Host: {host} </h6>
      <button className="btn btn-primary" onClick={joinLobby}> Join </button> 
    </div>
  </div>
)

export default LobbyCard;