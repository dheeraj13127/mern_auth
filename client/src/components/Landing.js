import React from 'react'

function Landing() {
  return (
    <div className="row">
      <div className="col-12 col-sm-12  align-items-center mt-5">
        <h1 className="text-center display-1" style={{fontWeight:"700"}}>Welcome To The App</h1>
        <div className="text-center">
        <a href="/signUp" className="btn btn-primary btn-lg mt-5">Click to Proceed</a>
        </div>
      
      </div>
    </div>
  )
}

export default Landing
