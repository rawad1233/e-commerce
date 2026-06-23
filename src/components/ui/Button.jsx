const variants = {
  primary: 'bg-ink text-paper hover:bg-ink/85',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:opacity-60',
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => (
  <button
    className={`px-6 py-3 text-xs uppercase tracking-widest transition-colors duration-200 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;