import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import validator from "validator";
import mongoose from 'mongoose';
import User from '../models/User.model.js';


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}




class UserController {
    
    // [POST] /api/user/signUp
    async signUp(req, res) {
        const { email, password, firstName,
            lastName,
            sex,
            address,
            cccd,
            birthDay,
            phone } = req.body;
        console.log("o ham signUp " + email + " " + password)
    
        try {
            const existUser = await User.findOne({ email });
            if (existUser) {
                return res.status(400).json({success:false,message: 'Email đã tồn tại!' }); 
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            

            const newUser = new User({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                sex,
                address,
                cccd,
                birthDay,
                phone
            });
    
            const user = await newUser.save();
            const token = createToken(user._id);
            console.log("User created:", email);

            // const newOrder = new Order({
            //     user: user._id,
            //     orderDetail: [],
            //     shippingAddress: address,
            //     city: "HCM",
            //     country: "Vietnam",
            //     phone: phone,
            //     note: "",
            //     totalPrice: 0,
            //     status: "selecting"
            // })

            // await newOrder.save();

            return res.json({success:true,token, _id:user._id});
    
        } catch (error) {
            console.error(error);
            res.status(500).json({success:false,message: 'Đã có lỗi xảy ra khi tạo người dùng!' });
        }
    }
    
    // [POST] /api/user/login
    async login(req, res) {
        const { email, password } = req.body; 

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Mật khẩu không chính xác!' });
            }
            const token = createToken(user._id);
            // localStorage.setItem("_Id",user._id);
            console.log(user._id);
            return res.json({success:true,token, _id:user._id});
            //res.json({ message: 'Đăng nhập thành công!', email: user.email });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Đã có lỗi xảy ra khi đăng nhập!' });
        }
    }
    // [GET] /api/user/getAllUser
    async getAllUser(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query; // Nhận query params cho phân trang
            const userList = await User.find()
                .select('-password')
                .skip((page - 1) * limit) // Bỏ qua các bản ghi trước đó
                .limit(Number(limit));   // Lấy giới hạn số bản ghi
            return res.status(200).json(userList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getAllUser!' });
        }
    }
    //[GET] /api/user/:userId
    async getUserByID(req, res) {
        const userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ 
                message: 'User ID is not valid',
                receivedId: userId 
            });
        }
        try {
            const user = await User.findById(userId).select('-password');

            if (!user) {
                return res.status(404).json('User ID is not found')
            }

            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra khi getUserById!' });
        }
    }
    // [PUT] /api/user/:userId
    async updateUserByID(req, res) {
        const userId = req.params.userId;
        // console.log(userId)
        const {
            email,
            password,
            firstName,
            lastName,
            sex,
            address,
            cccd,
            birthDay,
            phone } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json('User ID is not valid')
        }
        if (!firstName && !lastName) {
            return res.status(400).json('Name is required');
        }
        if (!email) {
            return res.status(400).json('Email is required');
        }

        try {
            const userExist = await User.findById(userId);
            let newPassword;
            if (password) {
                newPassword = bcrypt.hashSync(password, 10);
            } else {
                newPassword = userExist.password;
            }

            const newUser = {
                email,
                password: newPassword,
                firstName,
                lastName,
                sex,
                address,
                cccd,
                birthDay,
                phone,
            }

            const user = await User.findByIdAndUpdate(
                userId,
                newUser,
                { new: true }
            )

            if (!user) {
                return res.status(400).json('User cannot be update!')
            }

            return res.status(200).json(user)

        } catch (error) {
            return res.status(500).json({
                message: 'Error in updateUserById',
                error
            })
        }
    }
    // [DELETE] /api/user/:userId
    async deleteUserById(req, res) {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json('User ID is not valid')
        }

        try {
            const user = await User.delete({ _id: userId });

            if (!user) {
                return res.status(404).json('User ID is not found');
            }

            return res.status(200).json('Delete Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in deleteUserById',
                error
            })
        }
    }
    // [GET] /api/user/restore/:userId
    async restoreUserById(req, res) {
        const userId = req.params.userId;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json('User ID is not valid')
        }

        try {
            const user = await User.restore({ _id: userId });

            if (!user) {
                return res.status(404).json('User ID is not found');
            }

            return res.status(200).json('Restore Successfully');
        } catch (error) {
            return res.status(500).json({
                message: 'Error in restoreUserById',
                error
            })
        }
    }
}


// module.exports = new UserController();
export default new UserController();
