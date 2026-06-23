const Spinner = ({ size = 24 }) => (
  <div
    className="border-2 border-line border-t-ink rounded-full animate-spin"
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;