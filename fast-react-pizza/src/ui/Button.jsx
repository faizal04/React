import PropTypes from 'prop-types';

function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="focus-ring inline-block rounded-full bg-yellow-400 p-3 font-semibold uppercase text-stone-800 transition-colors duration-500 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
