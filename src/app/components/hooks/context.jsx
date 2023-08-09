// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import React, { useState } from "react";
import AppContext from "./createContext";

const AppContextProvider = ({ children }) => {
  const [clicks, setClicks] = useState(null);
  const [image, setImage] = useState(null);
  const [maskImg, setMaskImg] = useState(null);

  return (
    <AppContext.Provider
      value={{
        clicks: [clicks, setClicks],
        image: [image, setImage],
        maskImg: [maskImg, setMaskImg],
      }}
    >
      { children }
    </AppContext.Provider>
  );
};

export default AppContextProvider;
