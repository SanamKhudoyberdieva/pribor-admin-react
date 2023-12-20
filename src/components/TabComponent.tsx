import React from "react";

interface TabComponentProps {
  label: string;
  path: string;
  active: boolean;
  onClick: (path: string) => void;
}

const TabComponent: React.FC<TabComponentProps> = ({ label, path, active, onClick }) => {
  return (
    <button
      className={`nav-link d-flex align-items-center justify-content-center ${active ? "active" : ""}`}
      type="button"
      onClick={() => onClick(path)}
    >
        {path == 'saved' && <i className='tf-icons bx bx-bookmark-alt me-2'></i>}
        {path == 'checked' && <i className='tf-icons bx bx-check-double me-2'></i>}
        {path == 'rejected' && <i className='tf-icons bx bx-error-circle me-2'></i>}
        {label}
        {path == 'new' &&  <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-info pr-border-active ms-3">4</span>}
    </button>
  );
};

export default TabComponent;