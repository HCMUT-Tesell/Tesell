import FlashOnIcon from '@mui/icons-material/FlashOn';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Criteria = () => {
    return (
        <div className="w-[1076x] h-[85px] border border-gray-300 rounded-lg bg-blue-50 p-4 flex justify-around items-center">
            <div className="flex items-center space-x-2">
                <FlashOnIcon/>
                <span>Giao hàng nhanh</span> 
            </div> 
            <div className="flex items-center space-x-2"> 
                 <GroupsIcon/>
                <span>Tư vấn chuyên nghiệp</span> 
            </div> 
            <div className="flex items-center space-x-2"> 
                <CheckCircleOutlineIcon/>
                <span>Sản phẩm chất lượng</span>
            </div>
        </div>
    );  
}

export default Criteria;