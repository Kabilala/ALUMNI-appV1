import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) => {
  // Styles de base pour tous les boutons
  const baseStyles = "font-sf-pro-text rounded-3xs transition-colors duration-200 focus:outline-none";
  
  // Variantes de couleur
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-100",
    secondary: "bg-gray-300 text-black hover:bg-gray-500",
    outline: "bg-transparent border border-black text-black hover:bg-gray-400",
    danger: "bg-red-100 text-white hover:bg-red-200",
  };
  
  // Tailles
  const sizeStyles = {
    small: "py-1 px-3 text-3xs",
    medium: "py-2 px-4 text-smi",
    large: "py-3 px-6 text-mini",
  };
  
  // Largeur
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Désactivé
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  // Combinaison de tous les styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;