import styled from "@emotion/styled";
import React from "react";

const LoadingContainer = styled.div`
  text-align: center;
  .spinner-border {
    border: 10px solid #C4E3FF;
    border-radius: 50%;
    border-top: 10px solid #2056F7;
    width: 5rem;
    height: 5rem;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading({ absolute = false }) {
  return (
    <div
      style={{
        position: absolute ? "absolute" : "fixed",
        inset: "0",
        background: "rgba(255,255,255,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 20000,
      }}>
      <LoadingContainer>
        <div className="spinner-border" role="status"></div>
        <h3>Loading...</h3>
      </LoadingContainer>
    </div>
  );
}
