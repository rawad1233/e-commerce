const Input = ({ label, name, formik, type = 'text', ...props }) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`border px-4 py-3 text-sm bg-transparent outline-none transition-colors ${
          error ? 'border-red-500' : 'border-line focus:border-ink'
        }`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;