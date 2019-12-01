import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const override = css``;

// loading component for suspense fallback
export default ({ size, loading }) => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        css={override}
        sizeUnit="px"
        size={size || 150}
        color="#4A90E2"
        loading={loading}
      />
    </div>
  );
};
