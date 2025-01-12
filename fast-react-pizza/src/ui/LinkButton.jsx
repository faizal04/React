import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
function LinkButton({ children, to }) {
  const navigate = useNavigate();
  if (to === '-1')
    return (
      <button
        onClick={() => navigate(-1)}
        className='hover:underline" text-sm text-blue-500 hover:text-blue-600'
      >
        &larr; Go back
      </button>
    );
  return (
    <Link
      to={to}
      className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
    >
      {children}
    </Link>
  );
}
LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
};

export default LinkButton;
