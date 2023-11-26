import React from 'react';

const Login = () => {
  return (
    <main>
        <h5 className="card-header">Boy Toys Admin</h5>
        <div className="card-body">
        <div className="d-flex align-items-center justify-content-center h-px-500">
          <form className="w-px-400 border rounded p-3 p-md-5">
            <h3 className="mb-3">Kirish</h3>
            <div className="mb-3">
              <label className="form-label">Phone number</label>
              <input
              className="form-control"
            />
            </div>
            <div className="mb-3">
              <label className="form-label">Code</label>
              <input type="password" 
                className="form-control" 
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2 mt-4"
              type="submit"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login;