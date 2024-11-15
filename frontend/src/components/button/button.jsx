const Button = ({ label, onClick, hasIcon, icon, icon_position }) => {
    if (hasIcon) {
        if (icon_position === 'right') {
            return (
                <button onClick={onClick} className="bg-blue-400 hover:bg-blue-500 text-black h-8 w-fit px-2 rounded-sm">
                    <div className="flex flex-row">
                        <span className="mx-1">{label}</span>
                        <span className="mx-1">{icon}</span>
                    </div>
                </button>
            );
        } else if (icon_position === 'left') {
            return (
                <button onClick={onClick} className="bg-blue-400 hover:bg-blue-500 text-black h-8 w-fit px-2 rounded-sm">
                    <div className="flex flex-row">
                        <span className="mx-1">{icon}</span>
                        <span className="mx-1">{label}</span>
                    </div>
                </button>
            );
        }
    } 
    else {
        return (
            
            <button onClick={onClick} className="bg-blue-400 hover:bg-blue-500 text-black h-8 w-fit px-2 rounded-sm">
                <div className="flex flex-row">
                    <span className="mx-1">{label}</span>
                </div>
            </button>
        );
    }
};

export default Button;
