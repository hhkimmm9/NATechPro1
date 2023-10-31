import React from 'react'
import GridLoader from "react-spinners/GridLoader";

const loading = () => {
  return (
    <>
      {/* default size 15 */}
      <GridLoader size={15} />
      loading test
    </>
  )
}

export default loading