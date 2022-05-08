const ShortcutHint = ({ children = null, className = '' }) => (
  <p className={`text-xs text-center ml-4 hidden lg:block ${className}`}>
    {children || (
      <>
        Press <b>Enter ↵</b>
      </>
    )}
  </p>
)

export default ShortcutHint
