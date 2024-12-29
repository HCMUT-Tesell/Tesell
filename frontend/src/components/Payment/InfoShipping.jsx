const InfoShipping = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md w-[700px]  border-gray-200 shadow-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <h2 className="text-lg font-bold mb-4">Thông tin nhận hàng</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Họ và tên người nhận"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Số điện thoại người nhận"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Tỉnh/Thành phố"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Quận/Huyện"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Phường/Xã"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Số nhà, tên đường"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
        <textarea
          placeholder="Ghi chú"
          className="w-full border bg-gray-50 border-gray-300 rounded-lg p-2 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default InfoShipping;
