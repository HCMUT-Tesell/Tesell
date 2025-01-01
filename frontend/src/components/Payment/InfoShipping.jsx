import { useState } from 'react';
const InfoShipping = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    street: '',
    note: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Xóa lỗi khi người dùng nhập lại
  };
  const handleSubmit = () => {
    // console.log("Form Data:", formData);
    const { email, fullName, phone, city, district, ward, street, note } = formData;

    // Kiểm tra các trường bắt buộc
    const newErrors = {};
    if (!email) newErrors.email = "Email không được bỏ trống.";
    if (!fullName) newErrors.fullName = "Họ và tên không được bỏ trống.";
    if (!phone) newErrors.phone = "Số điện thoại không được bỏ trống.";
    if (!city) newErrors.city = "Tỉnh/Thành phố không được bỏ trống.";
    if (!district) newErrors.district = "Quận/Huyện không được bỏ trống.";
    if (!ward) newErrors.ward = "Phường/Xã không được bỏ trống.";
    if (!street) newErrors.street = "Số nhà, tên đường không được bỏ trống.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const shippingData = {
      phone,
      city,
      shippingAddress: `${street}, ${ward}, ${district}, ${city}`,
      note,
    };
    // console.log("Shipping Data:", shippingData);

    if (onSubmit) {onSubmit(shippingData);}
  };
  return (
    <div className="bg-blue-50 p-6 h-fit rounded-lg shadow-md w-[500px] border-gray-200 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <h2 className="text-lg font-bold mb-4">Thông tin nhận hàng</h2>
      <form className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="text"
          name="fullName"
          placeholder="Họ và tên người nhận"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại người nhận"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        <input
          type="text"
          name="city"
          placeholder="Tỉnh/Thành phố"
          value={formData.city}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        <input
          type="text"
          name="district"
          placeholder="Quận/Huyện"
          value={formData.district}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
        <input
          type="text"
          name="ward"
          placeholder="Phường/Xã"
          value={formData.ward}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
        <input
          type="text"
          name="street"
          placeholder="Số nhà, tên đường"
          value={formData.street}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        <textarea
          name="note"
          placeholder="Ghi chú"
          value={formData.note}
          onChange={handleChange}
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Xác nhận thông tin giao hàng
        </button>
      </form>

    </div>
  );
};

export default InfoShipping;
