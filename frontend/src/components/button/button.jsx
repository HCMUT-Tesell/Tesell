const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="bg-blue-400 hover:bg-blue-500 text-black h-8 w-fit px-2 rounded-sm">
            {label}
        </button>
    );
};

export default Button;