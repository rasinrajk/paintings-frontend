import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [paintings, setPaintings] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const paintings = await loadPaintings();
        setPaintings(paintings);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadPaintings() {
    return API.get("paintings", "/paintings");
  }

  function renderPaintingsList(paintings) {
    return (
      <>
        <LinkContainer to="/paintings/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Exhibit a new painting</span>
          </ListGroup.Item>
        </LinkContainer>
        {paintings.map(({ paintId, content, createdAt }) => (
          <LinkContainer key={paintId} to={`/paintings/$paintId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>KANVAS</h1>
        <p className="text-muted">A paintings gallery app</p>
      </div>
    );
  }

  function renderPaintings() {
    return (
      <div className="paintingss">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Paintings</h2>
        <ListGroup>{!isLoading && renderPaintingsList(paintings)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderPaintings() : renderLander()}
    </div>
  );
}