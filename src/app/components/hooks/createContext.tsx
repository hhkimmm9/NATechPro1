// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

import { createContext } from "react";

interface IContext {
  clicks: (React.Dispatch<React.SetStateAction<null>> | null)[];
  image: (React.Dispatch<React.SetStateAction<null>> | null)[];
  maskImg: (React.Dispatch<React.SetStateAction<null>> | null)[]; 
}

const AppContext = createContext<IContext>({
  clicks: [],
  image: [],
  maskImg: []
});

export default AppContext;
